## svg2font
svg -> svgfont -> ttf 

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
npm install svg2font
```

## Features

- 支持创建一个空白字体
- 支持解析已有字体(ttf，SVG)
- 支持使用 SVG来设置字的展现
- 支持解析 SVG的各种转换还有各种非 path 图形
- 支持针对某一个字，导出对应的 SVG
- 支持导出四种浏览器主流字体（ttf，eot，woff，woff2, svg）
- 支持设置各种字体相关内容

## License

[MIT](./LICENSE)
