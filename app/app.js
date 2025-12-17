const Rtf = require('./src/rtf/rtf.class');
const htmlToRtf = new Rtf();
const charset = require('./src/rtf/charset.module');
const fs = require('fs');
const path = require('path');

let html = fs.readFileSync(path.join(__dirname, '/files/input.html'), 'utf8');

charset.forEach(c =>
    html = html.replace(new RegExp(c.htmlEntity, 'g'), c.rtfEscapeChar)
);

const visomaTicketsHtml = `<body><h2>Headline 1</h2><h3>Headline 2</h3><h4>Headline 3</h4><p>Normal text</p><p><strong>Bold</strong></p><p><i>Italic</i></p><p><u>underlined</u></p><p><s>crosed</s></p><p><sup>uped</sup></p><p><sub>downed</sub></p><ul><li>unorderd&nbsp;</li><li>list&nbsp;<ul><li>2&nbsp;</li><li>ebene</li></ul></li></ul><ol><li>orderd&nbsp;</li><li>list&nbsp;<ol><li>2&nbsp;</li><li>ebene</li></ol></li></ol><p style="margin-left:40px;">einzug</p><p style="margin-left:80px;">einzug&nbsp;</p><p><a href="https://Test.de">link</a></p><blockquote><p>quote</p></blockquote><figure class="image"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJIAAACqCAYAAABGUhZOAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAATBSURBVHhe7d0hU+tMGEBhJBKJRCKRSCQSiUQikTgUU4lEIsEhkUgkkp+ArETm4/0moUu7FAqn6XvT88ysuNB02vTQbLZcstFIAEMSwpCEMCQhDEkIQxLCkIQwJCEMSQhDEsKQhDAkIQxJCEMSwpCEMCQhDEkIQxLCkIQwJCEMSQhDEiJlSA8PD83Ozk6zsbHx5Yjvn5+fN29vb+1WWqWUIX0XUTl2d3ebp6endkutSu8hPT4+NgcHB83t7W37lVmj0agazbxxdnbWvL6+tvegvvUe0v7+/v8v/ObmZjMej9uvLu7m5qbZ2tr6FFPcZ0So/q0spBgxF/qLeAc6PDz8FFOMi4uL9hbqS+8hxSGoe8Gpd4/7+/tmb2/PmFao95DikNS92EdHR+1X/y7O3qbfnYypP72H9Pz8/PFCx9kZqRaTc6Z+9B5SiElx90LHoY5cC6rF5Nnc8q0kpHKeFINeC4qYykn99fV1+x0ty0pCihc65kdlTDHIw1A5F4t1Ky3XSkLq1NaCYsGSEGtU5f1m0X38EyOe/1CsfA/H/KU8DMUOpuZMGUPa3t7+eEwxVxyKFHs4YirfmU5PT9vv/E13fzGyKB8T9TwzSLOHyzlNDGINqLy/LDI+JkKqZzM9AY+f2L+cupf3lUXGx0RI9Wxqa0Axj/jtJ/vl/WRRrqHF4uxQpPux+GppIF6AeIda5Kyu3D6L4+Pjj8e0yEdEcbYXyxhZz/TSvr/WPojtRpz5xAsSC40vLy/tFrPKbbIoPyKK8dO5YHe2l/VML21InXlBLTIyOTk5+fTYfhJTefuM0ofUiZ/kmCst8mu45cikNheMuOYdtsvbZvTPhFSKw1kc1mKOMb0yXhsZ12tqMcWIQ9jV1VV7q4nyNhn9kyENxVcnFt+NjAwpgUUP2xkZUiLxDjU9EZ8eWT9WMSQhDEkIQxLCkIQwJCEMSQhDEsKQhDAkIQxJCEMSwpCEMCQhDEkIQxLCkIQwJCEMSQhDEsKQhDAkIQxJCEN6d3d311xeXrb/0m8Y0ruIKP7PmH7PvSeEIQlhSEIMOqTsfy5vSAYdUvY/lzckgw6p/CseWi5DEsKQhDAkIQxJCEMSwpCEMCQhDEkIQxJi0Hu4vDYaddFl1Q06pPLaaORFlzVr0CEt66LLmjX4ycMyLrqsWWsxC52+AtFfYvJ3nOrWIqTatdF+G5O/41S3FiEFKqZye02s1d6oxRQT8EUuBV9uq4m12xu1mOIwNRqN2lvMV26nibXcGxHT9AT8p3OechtNrPXeiEvBl6vf382Z4vuGVLf2eyOuJVvGUYtpPB7P3C5WzTWx9iHV5kzfjbh9bKcJ35/fLRKTEdUZUivimHeF6/jQ19XsrxmSEIYkhCEJYUhCGJIQhiSEIQlhSEIYkhCGJIQhCWFIQhiSEIYkhCEJYUhCGJIQhiSEIQlhSEIYkhCGJIQhCWFIQhiSEIYkhCEJYUhCGJIQhiSEIQlhSEIYkhCGJIQhCWFIQhiSEIYkhCEJYUhCGJIQhiSEIQlhSEIYkhCGJIQhCWFIQhiSEIYkhCEJYUhCGJIQhiSEIQlhSEIYkhCGJIQhCWFIQhiSEIYkhCEJYUhCGJIQhiSEIQlhSEIYkgBN8x/zw1cQSPyXOAAAAABJRU5ErkJggg=="></figure><figure class="table"><table><tbody><tr><td>T</td><td>a</td><td>b</td><td>b</td><td>e</td></tr><tr><td>l</td><td>l</td><td>e</td><td>i</td><td>q</td></tr></tbody></table></figure></body>`;
const tickets = new Rtf();
// console.log(
    tickets.convertHtmlToRtf(visomaTicketsHtml)
// );
// tickets.saveRtfInFile('./app/files/tickets.rtf', tickets.convertHtmlToRtf(visomaTicketsHtml));
// htmlToRtf.saveRtfInFile(path.join(__dirname, '/files/output.rtf'), htmlToRtf.convertHtmlToRtf(html));
