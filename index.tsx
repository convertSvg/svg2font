import svg2Font from './lib/index'
import { writeToFile } from './lib/utils'
const path = require('path')

const Font = svg2Font({
  src: './test/svgicon/*.svg', // svg path  support patterns
  dist: './test/',
  fontName: 'svg21font',  // font name
  startCodePoint: 57344 // unicode start code point
})

const svgFont = Font.getGlyph()

writeToFile(svgFont, path.join( './test/', `svg2font.svg`))

const svgFontt = Font.getTtf()

writeToFile(svgFontt, path.join( './test/', `svg2font.ttf`))