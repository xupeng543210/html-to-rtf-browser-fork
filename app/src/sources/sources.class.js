const MyString = require('../string/my-string.class');
const Style = require('../style/style.class');
const Indentation = require('../indentation/indentation.class');

const IMG_MAP = {
    'png': '\\pngblip',
    'jpg': '\\jpegblip',
    'jpeg': '\\jpegblip',
    'bmp': '\\wbitmap0\\picw6400\\pich4260\\wbmbitspixel1\\wbmplanes1\\wbmwidthbytes220'
}

class Sources {
    static base64ToHex(base64) {
        // 1. base64 → binary string
        const binary = atob(base64);

        // 2. binary string → Uint8Array
        const bytes = new Uint8Array(binary.length);
        for (let i = 0; i < binary.length; i++) {
            bytes[i] = binary.charCodeAt(i);
        }

        // 3. Uint8Array → hex string
        return Array.from(bytes)
            .map(b => b.toString(16).padStart(2, '0'))
            .join('');
    }
  static getRtfSourcesReference(src, style, w, h) {
      const width = Sources.getAttributeInImgTag(w) || Sources.getStyleInImgTag(style, 'width');
      const height = Sources.getAttributeInImgTag(h) || Sources.getStyleInImgTag(style, 'height');
      let sizeStyle = width > 0 ? '\\picwgoal' + width : '';
      sizeStyle += height > 0 ? '\\pichgoal' + height : '';
      const imgType = MyString.findTextBetween(src, 'data:image/', ';' ) || '';
      const isBrowser = typeof window !== 'undefined' && typeof window.document !== 'undefined';
      const innerText = src.replace( 'data:image/'+ imgType + ';base64,', '' );
      const str = isBrowser ? Sources.base64ToHex(innerText) : new Buffer(innerText, 'base64' ).toString('hex')
      return IMG_MAP[imgType.toLowerCase()] + sizeStyle + ' ' + str;
  }

  static getStyleInImgTag( style, property ) {
      if ( style ) {
          const value = Style.getStyleValueOfProperty( style, property) || '0';
          const multiplier = Indentation.getMultiplier( value ) || 0;
          return Math.trunc(parseFloat(value) * multiplier);
      }
  }

  static getAttributeInImgTag(value) {
    if(value) {
        const multiplier = Indentation.getMultiplier( value ) || 0;
        return Math.trunc(parseFloat(value) * multiplier);
    }
  }
}

module.exports = Sources;
