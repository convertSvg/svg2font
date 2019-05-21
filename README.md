## svg2Font

Converts SVG to TTF/EOT/WOFF/WOFF2/SVG format.
> Note: svg -> svgfont -> ttf  ttf -> EOT ttf -> WOFF ttf -> WOFF2 ttf -> svg，[DominantBaselineProperty](https://www.w3.org/TR/SVG/text.html#DominantBaselineProperty), [FontElementAscentAttribute](https://www.w3.org/TR/1999/WD-SVG-19991203/fonts.html#FontElementAscentAttribute)

## Unicode字符平面映射

|        平面         |     始末字符值      |                           中文名称                           |                     英文名称                     |
| :-----------------: | :-----------------: | :----------------------------------------------------------: | :----------------------------------------------: |
|       0号平面       |   U+0000 - U+FFFF   |                      **基本多文种平面**                      |      Basic Multilingual Plane，简称**BMP**       |
|       1号平面       |  U+10000 - U+1FFFF  |                      **多文种补充平面**                      |  Supplementary Multilingual Plane，简称**SMP**   |
|       2号平面       |  U+20000 - U+2FFFF  |                     **表意文字补充平面**                     |   Supplementary Ideographic Plane，简称**SIP**   |
|       3号平面       |  U+30000 - U+3FFFF  | **表意文字第三平面**（未正式使用[[1\]](https://zh.wikipedia.org/wiki/Unicode字符平面映射#cite_note-1)） |     Tertiary Ideographic Plane，简称**TIP**      |
| 4号平面 至 13号平面 |  U+40000 - U+DFFFF  |                         （尚未使用）                         |                                                  |
|      14号平面       |  U+E0000 - U+EFFFF  |                     **特别用途补充平面**                     | Supplementary Special-purpose Plane，简称**SSP** |
|      15号平面       |  U+F0000 - U+FFFFF  | 保留作为**私人使用区（A区）**[[2\]](https://zh.wikipedia.org/wiki/Unicode字符平面映射#cite_note-PUA-2) |        Private Use Area-A，简称**PUA-A**         |
|      16号平面       | U+100000 - U+10FFFF | 保留作为**私人使用区（B区）**[[2\]](https://zh.wikipedia.org/wiki/Unicode字符平面映射#cite_note-PUA-2) |        Private Use Area-B，简称**PUA-B**         |

> Unicode 字符三个私人使用区(Private Use Areas)：一个在基本多语言平面（U+E000-U+F8FF）中，另外两个几乎包含了整个第15和第16平面（分别为U+F0000-U+FFFFD，U+100000-U+10FFFD）

## Install 

```
npm install svg-to-fonts
```

## Usage

```
const { svg2Font, Font, writeToFile } = require('./dist/index.js')
const path = require('path')
const fs = require('fs')

svg2Font({
  src: './test/svgicon/*.svg', // svg path  support patterns
  dist: './test/',
  fontName: 'svg2font',  // font name
  startCodePoint: 57344, // unicode start code point
  ascent: 924,
  descent: -100,
  css: true,
}).then(() => {
  console.log('svg2Font done !')
})

const icon = fs.readFileSync(path.join( './test/svgicon', `icon_7days.svg`), 'utf8')

const font = new Font({
  fontName: 'svgfont',
  glyphSvgs: icon,  //  support string array object
  ascent: 896,
  descent: -128,
  startCodePoint: 57344,
})

font.convertFonts({
  dist: './test/',
  fontTypes: ['eot', 'ttf', 'svg'],
  css: true,
})

```
## API

### svg2Font(options)
- `options`
  - `src`- SVG file 
  - `dist` - out file
  - `fontName` - font family name
  - `startCodePoint` - Unicode Private Use Areas start Code Point
  - `ascent`
  - `descent`

### new Font(options)
- `options`
  - `fontName` - font family name
  - `glyphSvgs` - svg datas support string array object
  - `startCodePoint` - Unicode Private Use Areas start Code Point
  - `ascent`
  - `descent`

- `method`
  - `getGlyph`
  - `getTTF`
  - `getWOFF`
  - `getWOFF2`
  - `convertFonts`

## Features

- 支持解析 SVG 基本路径转换
- 支持导出四种浏览器主流字体（ttf，eot，woff，woff2, svg）
- 支持设置各种字体相关内容

## License

[MIT](./LICENSE)
