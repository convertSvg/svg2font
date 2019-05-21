import svg2Font from './lib/index'
import { writeToFile } from './lib/utils'
const path = require('path')
const fs = require('fs')

const Font = svg2Font({
  src: './test/svgicon/*.svg', // svg path  support patterns
  dist: './test/',
  fontName: 'svg2font',  // font name
  startCodePoint: 57344, // unicode start code point
  ascent: 924,
  descent: -100,
}).then(() => {
  console.log('svg2Font done !')
})

// const svgFont = Font.getGlyph()

// writeToFile(svgFont, path.join( './test/', `svg2font.svg`))

// const svgFontTTF = Font.getTTF()

// fs.writeFileSync(path.join( './test/', `svg2font.ttf`), svgFontTTF)


// const svgFontEOT = Font.getEOT()

// fs.writeFileSync(path.join( './test/', `svg2font.eot`), svgFontEOT)

// const svgFontWOFF = Font.getWOFF()
// fs.writeFileSync(path.join( './test/', `svg2font.woff`), svgFontWOFF)


// const svgFontWOFF2 = Font.getWOFF2()
// fs.writeFileSync(path.join( './test/', `svg2font.woff2`), svgFontWOFF2)
