const { svg2Font, Font, writeToFile } = require('./dist/index.js')
const path = require('path')
const fs = require('fs')

// svg2Font({
//   src: './test/svgicon/*.svg', // svg path  support patterns
//   dist: './test/dist/',
//   fontName: 'svg2font',  // font name
//   startCodePoint: 57344, // unicode start code point
//   ascent: 924,
//   descent: -100,
//   css: true,
//   symbol: true,
// }).then(() => {
//   console.log('svg2Font done !')
// })

const icon = fs.readFileSync(path.join( './test/svgicon', `icon_7days.svg`), 'utf8')
const icon1 = fs.readFileSync(path.join( './test/svgicon', `icon_postage.svg`), 'utf8')
console.error('icon', icon)
const font = new Font({
  fontName: 'svg2font',
  fontFamily: 'iconfont',
  fontFamilyClass: 'iconfont',
  // glyphSvgs: [icon, icon1],  // string array object
  glyphSvgs: {'icon_7days': { path: icon, originName: 'icon_7days1' }, 'icon_hour': { path: icon1 , originName: 'icon_7days1' }},  // string array object
  ascent: 896,
  descent: -128,
  startCodePoint: 57344,
  customUnicodeList: ['e975', 'e973'] // custom defined codePoint 57344 ~ 63743
})

font.convertFonts({
  dist: './test/',
  fontTypes: ['eot', 'woff2', 'woff', 'ttf', 'svg'],
  fontCdnUrl: '//storage.360buyimg.com/lcstatic/plugins/',
  css: true,
  symbol: true,
  html: true,
})


// const svgFont = font.getGlyph()

// writeToFile(svgFont, path.join( './test/', `svg2font.svg`))

// const svgFontTTF = font.getTTF()

// fs.writeFileSync(path.join( './test/', `svg2font.ttf`), svgFontTTF)


// const svgFontEOT = font.getEOT()

// fs.writeFileSync(path.join( './test/', `svg2font.eot`), svgFontEOT)

// const svgFontWOFF = font.getWOFF()
// fs.writeFileSync(path.join( './test/', `svg2font.woff`), svgFontWOFF)


// const svgFontWOFF2 = font.getWOFF2()
// fs.writeFileSync(path.join( './test/', `svg2font.woff2`), svgFontWOFF2)
