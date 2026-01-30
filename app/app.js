const Rtf = require('./src/rtf/rtf.class');
const htmlToRtf = new Rtf();
const charset = require('./src/rtf/charset.module');
const fs = require('fs');
const path = require('path');

let html = fs.readFileSync(path.join(__dirname, '/files/input.html'), 'utf8');

charset.forEach(c =>
    html = html.replace(new RegExp(c.htmlEntity, 'g'), c.rtfEscapeChar)
);

const visomaTicketsHtml = `<p><a href="https://visoma.atlassian.net/browse/SP-1234">SP-1234</a></p>`;
const tickets = new Rtf();
// console.log(
    tickets.convertHtmlToRtf(visomaTicketsHtml)
// );
// tickets.saveRtfInFile('./app/files/tickets.rtf', tickets.convertHtmlToRtf(visomaTicketsHtml));
// htmlToRtf.saveRtfInFile(path.join(__dirname, '/files/output.rtf'), htmlToRtf.convertHtmlToRtf(html));
