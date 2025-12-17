const cheerio         = require('cheerio');
const Alignment       = require('../alignment/alignment.class');
const Color           = require('../color/color.class');
const Sources         = require('../sources/sources.class');
const Style           = require('../style/style.class');
const AllowedHtmlTags = require('../allowed-html-tags/allowed-html-tags.class');
const Table           = require('../table/table.class');
const MyString        = require('../string/my-string.class');
const juice 		  = require('juice');
const charset         = require('./charset.module');

class Rtf {
  constructor() {
        this.rtfHeaderOpening = '{\\rtf1\\ansi\\ansicpg1252\\deff0\\nouicompat{\\fonttbl{\\f0\\fnil\\fcharset0 Arial;}{\\f1\\fnil\\fcharset0 Arial Black;}{\\f2\\fnil\\fcharset0 Courier New;}{\\f3\\fnil\\fcharset0 Georgia;}{\\f4\\fnil\\fcharset0 Tahoma;}{\\f5\\fnil\\fcharset0 Times New Roman;}{\\f6\\fnil\\fcharset0 Verdana;}}';
    this.rtfHeaderContent = '';
        this.rtfClosing = '}';
    this.rtfContentReferences = [];
    this.Table = new Table();
  }

  convertHtmlToRtf(html) {
        charset.forEach(c =>
            html = html.replace(new RegExp(c.htmlEntity, 'g'), c.rtfEscapeChar)
        );
        html = html.replace(/[^\u0000-\u007F]/g, function (element) {
            // handle based on https://www.zopatista.com/python/2012/06/06/rtf-and-unicode/
            let char = element.charCodeAt(0)
            return `\\u${char}?`
        });
    let htmlWithoutStrangerTags, $, treeOfTags;

    htmlWithoutStrangerTags = this.swapHtmlStrangerTags(html, 'p');
    $ = cheerio.load(juice(htmlWithoutStrangerTags));
    treeOfTags = $('html').children();

    Array.from(treeOfTags).forEach(tag => this.readAllChildsInTag(tag));

    return this.buildRtf();
  }

  swapHtmlStrangerTags(html, dafaultTag) {
    return html.replace(/<(\/?[a-z-_]+[a-z0-9-_]*)( *[^>]*)?>/gi, (match, tagName, options) => {
      let newTag = !tagName.includes('/') ? `<${ dafaultTag }${ options ? options : '' }>` : `</${ dafaultTag }>`;
      return AllowedHtmlTags.isKnowedTag(tagName) ? match : `${ newTag }`;
    });
  }

  buildRtf() {
    this.rtfHeaderContent += Style.getRtfColorTable();

        let content = (
            this.rtfHeaderOpening +
            this.rtfHeaderContent +
            this.getRtfContentReferences() +
            this.rtfClosing
        );

    this.clearCacheContent();

    return content;
  }

  getRtfContentReferences() {
    let rtfReference = '';

        this.rtfContentReferences.forEach(
            value => rtfReference += value.content
        );

    return rtfReference;
  }

  // Don't has a test
    readAllChildsInTag(parentTag) {
        if (parentTag.children !== undefined) {
            this.addOpeningTagInRtfCode(parentTag.name);
            this.ifExistsAttributesAddAllReferencesInRtfCode(parentTag.attribs);

            if (parentTag.name.toLowerCase() === 'table') {
                this.Table.setAmountOfColumns(this.getAmountOfColumnThroughOfFirstChildOfTbodyTag(parentTag.children));
            }

            if (parentTag.name.toLowerCase() === 'tr') {
                this.addReferenceTagInRtfCode(this.Table.buildCellsLengthOfEachColumn());
            }

            if (parentTag.name.toLowerCase() === 'mark') {
                this.setHighlightInRtf();
            }
            if (parentTag.name.toLowerCase() === 'a') {
                this.setHrefInRtf(parentTag);
                this.setOpenLinkFrameInRtf();
            }

            (parentTag.children).forEach((child) => {
                if (child.type !== 'text') {
                    this.readAllChildsInTag(child);
                } else {
                    this.addContentOfTagInRtfCode(child.data);
                }
            });
        }

        if (parentTag.name.toLowerCase() === 'a') {
            this.setCloseLinkFrameInRtf();
        }
        this.addClosingFatherTagInRtfCode(parentTag.name);
    }
  getAmountOfColumnThroughOfFirstChildOfTbodyTag(tableChildren) {
    let count = 0;
    let tbodyIndex = tableChildren.findIndex(value => value.name === 'tbody');

    for(let i = 0; i < tableChildren[tbodyIndex].children.length; i++) {
      if(tableChildren[tbodyIndex].children[i].type !== 'text') {
        (tableChildren[tbodyIndex].children[i].children).forEach((child) => {
                    if (child.type !== 'text') {
            count++;
                    }
        });

        break;
      }
    }

    return count;
  }

  ifExistsAttributesAddAllReferencesInRtfCode(attributes) {
        if (attributes.style !== undefined) {
      this.addReferenceTagInRtfCode(Style.getRtfReferencesInStyleProperty(attributes.style));
        }

        if (attributes.align !== undefined) {
      this.addReferenceTagInRtfCode(Alignment.getRtfAlignmentReference(attributes.align));
    }
    if(attributes.src !== undefined) {
      this.addReferenceTagInRtfCode(Sources.getRtfSourcesReference(attributes.src, attributes.style, attributes.width, attributes.height));
  }
    }

  addReferenceTagInRtfCode(referenceTag) {
        if (referenceTag !== undefined) {
            this.rtfContentReferences.push({
                content: referenceTag,
                tag: true
            });
        }
  }

  addOpeningTagInRtfCode(tag) {
    this.addReferenceTagInRtfCode(AllowedHtmlTags.getRtfReferenceTag(tag));
  }

  addClosingFatherTagInRtfCode(closingFatherTag) {
    this.addReferenceTagInRtfCode(AllowedHtmlTags.getRtfReferenceTag(`/${ closingFatherTag }`));
  }

    addContentOfTagInRtfCode(content) {
        content = MyString
            .removeCharacterOfEscapeInAllString(content, '\n\t')
            .trim();

        if (content !== undefined && !MyString.hasOnlyWhiteSpace(content)) {
            this.rtfContentReferences.push({
                content: ` ${content}`,
                tag: false
            });
  }
  }

  setHighlightInRtf() {
    let rtfReferenceColor = Color.getRtfReferenceColor('rgb(255, 255, 0)');
    let referenceColorNumber = rtfReferenceColor.match(/[0-9]+/);

    this.addReferenceTagInRtfCode('\\highlight' + referenceColorNumber.toString());
  }

  setHrefInRtf(tag) {
    if (tag.attribs.href) {
      this.addReferenceTagInRtfCode(`{\\*\\fldinst { HYPERLINK "${tag.attribs.href}" }}`);
    }
  }

  setOpenLinkFrameInRtf() {
    this.addReferenceTagInRtfCode('{\\fldrslt');
  }

  setCloseLinkFrameInRtf() {
    this.addReferenceTagInRtfCode('}');
  }

  clearCacheContent() {
    this.rtfHeaderContent = '';
    this.rtfContentReferences = [];
  }
}

module.exports = Rtf;
