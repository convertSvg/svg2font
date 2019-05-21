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

// const icon = fs.readFileSync(path.join( './test/svgicon', `icon_7days.svg`), 'utf8')

// const font = new Font({
//   fontName: 'svg2font',
//   glyphSvgs: icon,  // string array object
//   ascent: 896,
//   descent: -128,
//   startCodePoint: 57344,
// })

// font.convertFonts({
//   dist: './test/',
//   fontTypes: ['eot', 'ttf', 'svg'],
//   css: true,
// })

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
