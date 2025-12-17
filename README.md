# HTML To RTF
>This project convert html to rtf format in the browser. It is based on the oziresrds/html-to-rtf awesome project.
>I looked into the 20+ forks to try get the best parts glued to in one place. This could be called html-to-rtf-frankenstein lol.

> Highlight for the developers:
* Ozires for the base framework. Without him, we would not have this.
* Heron Silva for several improvements (as font-family support) (heronsilva / html-to-rtf)
* wodka for making it possible to use in browser (wodka/html-to-rtf).
* Leon Strauß for image support (MinePlay96/html-to-rtf).

If I missed some functionality in other forks, please let me know, or make a PR.

## Build Pre
Looks need npm install webpack-cli@4 first then run `webpack` to build.

## Prerequisites
>This project work in the browser (maybe it works on the server side, but this is not the main goal.

## Installation
```
$ npm install html-to-rtf-browser
```
## Getting Started
```javascript
const HtmlToRtfBrowser = require('html-to-rtf-browser');
var htmlToRtf = new HtmlToRtfBrowser();
var html = `
<h1>Title <span style="color:rgb(255,0,0);">with</span> tag h1<h1>
<p> start of an image (with width and height defined): </p>
<img style="width: 5cm; height: 300px" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFQAAABdCAAAAAAeDx7VAAAAAmJLR0QA
/4ePzL8AAAAJcEhZcwAACxIAAAsSAdLdfvwAAAGxSURBVFjD7dctdsMwDABgQcPCwMDCwsHAwsLCwcLeoLBHCMwRDAsHB3uMHCFQs52sP4llW7H33oDEmtZf/WxZcgD/IEBQQQUVVFBBOaFrqLvCaK8AQGWgt9oA7/MaH50y0ApcqNkj7flpOjqab/MyH/fen3LQhEf/ATUbXbdmc5quIHqeFvVlq/LR4fNXLYg+2Of+T3+yOFNZJ0rBMnez0asnd7NRKgQVVFBBw3Fr2vKouThciqO2RyWqjB61t+W4L4uOqrquQV/7+lw9WDVhrgu08lwNH6GVt3tGUaqXj3H2ds9MFPUO4lmwEFR0iJ1tHdwv8A0Jqy4L4M5B3ZDQiOn6c+CgODTmfjyEV+AeXnnwj9h+h9ULc6aIJ7tmKSeHg2K3MepXYRT7D5M1A5OKodhvfC9diyAKBbWJXVL1JAoFmRmHFJXILBJ1hyCmctGUo8VH3dEKpThiy0fd0Qo1Jfu2f+SiaAuH6sivTUHbeZM5iLqmRK9r5X/bj3ZTvQVoiBXoyVIVa9F3IFudqTu7dehYsqjQK9Gp1Xljj2tRfL6DzuI45KDcEFRQQQUVtEz8AL3L59EiRcoBAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDIwLTA4LTIxVDA5OjE3OjE0KzAyOjAwSUJYdgAAACV0RVh0ZGF0ZTptb2RpZnkAMjAyMC0wOC0yMVQwOToxNzoxNCswMjowMDgf4MoAAAAASUVORK5CYII="></img>
<p> end of an image</p>
<div>
	<p style="color:#333; margin:5px;" class="test" align="center">
	    text of paragraph <b>text with bold <i>text with italic and bold</i></b><i>text with italic</i>
	</p>
	<p style="color:rgb(255,0,0);" align="right">red paragraph => right with tag</p>
	<p style="color:rgb(0,0,255); text-align:center;">blue paragraph => center with style</p>
	<table>
		<tbody>
			<tr>
                <td><mark>column 1</mark></td>
                <td>column 2</td>
				<td><mark>column 3</mark></td>
				<td>column 4</td>
			</tr>
			<tr>
				<td>content 1</td>
				<td>content 2<br></td>
				<td>content 3<br></td>
				<td>content 4<br></td>
			</tr>
		</tbody>
	</table>
</div>
`
const rtf = htmlToRtf.convertHtmlToRtf(html)
// from here on, works only on browser
const blob = new Blob([rtf], {type: "application/rtf;charset=utf-8"});
const link=window.URL.createObjectURL(blob);
window.location=link;

```
>  Now test in your preferred text editor (wordpad, word, libreoffice, ...).
##

##### Important:
#
> You can't copy the output of terminal or console.
> Save the output at a file.rtf. See above for an example

### Allowed html tags
```html
<b>, <br>, <center>, <div>, <em>, <font>, <h1>, <h2>, <h3>, <h4>,
<h5>, <h6>, <i>, <li>, <mark>, <p>, <ol>, <s>, <span>, <sub>, <sup>,
<strong>, <table>, <td>, <th>, <tr>, <u>, <ul>, <a>, <img> (PNG and JPG in base64 - experimental support to BMP - fixed size)
```
### Allowed style properties

> color(Hex and Rgb), font-family, font-size(px/pt), text-align, text-indent (px/cm), margin-left (px/cm), padding-left (px/cm)

> inside img tag: width and height (px/cm)

## Running the tests
```
$ gulp tests
```

## Author

> * **antoniolucasnobar**

## License
This project is licensed under the MIT License
