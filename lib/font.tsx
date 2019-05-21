import { writeToFile } from './utils'
import createUnicodes from './unicodes'
const path = require('path')
const fs = require('fs')
const _ = require('lodash')

const xmldom = require('xmldom')
const DOMParser = xmldom.DOMParser // 解析为文档对象
const svgpath = require('svgpath')

const svg2ttf = require('svg2ttf')
const ttf2svg = require('ttf2svg')
const ttf2eot = require('ttf2eot')
const ttf2woff = require('ttf2woff')
const ttf2woff2 = require('ttf2woff2')


import { fontTemplate, fontCSSTemplate } from "./template";

// font attribute doc
// https://www.w3.org/TR/1999/WD-SVG-19991203/fonts.html#FontElementAscentAttribute
const DEFAULT_CONFIG = {
  font: {
    id: 'svg2font',
    horizAdvX: 1024,
    vertAdvY: 1024,
  },
  fontface: {
    fontFamily: 'svg2font',
    fontWeight: '500',
    fontStretch: 'normal',
    unitsPerEm: '1024',
    ascent: '896',
    descent: '-128'
  },
  glyphs: []
}

/**
 *
 * 字体对象
 * @class Font
 * @support svg, ttf, eot, woff, woff2
 */
export default class Font {
  public glyphs;
  public fontName;
  public svgFont;
  public ascent;
  public descent;
  constructor ({
    fontName = 'svg2font',
    glyphSvgs,
    ascent = 896,
    descent = -128,
    startCodePoint = 57344,
  }) {
    this.fontName = fontName
    this.ascent = ascent
    this.descent = descent

    this.glyphs = this.createGlyphs(glyphSvgs, startCodePoint)
    const CONFIG = _.merge(DEFAULT_CONFIG, {
      font: {
        id: fontName
      },
      fontface: {
        fontFamily: fontName,
        ascent,
        descent,
      },
      glyphs: this.glyphs,
    })

    this.svgFont = fontTemplate(DEFAULT_CONFIG)
  }

  createGlyphs (glyphSvgs, startCodePoint) {
    const { ascent } = this
    const glyphs = []

    if(Array.isArray(glyphSvgs)){
      const unicodes = createUnicodes(glyphSvgs.length, startCodePoint)
      glyphSvgs.map((data, idx) => {
        const d = this.getGlyphData(data, ascent)
        glyphs.push({ unicode: unicodes[idx], d, horizAdvX: 1024, vertAdvY: 1024})
      })
    }

    if(Object.prototype.toString.call(glyphSvgs) === '[object Object]'){
      const glyphArr = Object.keys(glyphSvgs)
      const unicodes = createUnicodes(glyphArr.length, startCodePoint)
      glyphArr.map((glyphName, idx) => {
        const d = this.getGlyphData(glyphSvgs[glyphName], ascent)
        glyphs.push({ unicode: unicodes[idx], d, horizAdvX: 1024, vertAdvY: 1024, glyphName})
      })
    }

    return glyphs
  }

  getGlyphData (data, ascent) {
    let d = ''
    const Node = new DOMParser().parseFromString(data, 'application/xml')
    Array.from(Node.documentElement.childNodes).map( (node:any) => {
      if (node.nodeName.toUpperCase() === 'PATH' && node.hasAttribute && node.hasAttribute('d')) {
          // SVG字体与标准图形坐标系不一致 https://www.w3.org/TR/SVG/text.html#DominantBaselineProperty
          d = svgpath(node.getAttribute('d')).scale(1, -1).translate(0, ascent)
      }
    })
    return d
  }

  getGlyph () {
    return this.svgFont
  }

  getTTF () {
    const ttfBuffer = Buffer.from(svg2ttf(this.svgFont, {
      copyright: 'Copyright (C) 2019 by original authors @ master Gao'
    }).buffer)
    return ttfBuffer
  }

  getEOT () {
    const ttfBuffer = this.getTTF()
    return ttf2eot(ttfBuffer)
  }

  getWOFF () {
    const ttfBuffer = this.getTTF()
    return ttf2woff(ttfBuffer)
  }

  getWOFF2 () {
    const ttfBuffer = this.getTTF()
    return ttf2woff2(ttfBuffer)
  }

  convertFonts ({dist = './', fontTypes = ['eot', 'woff2', 'woff', 'ttf', 'svg'], fontName = 'svg2font', css = true}) {
    fontTypes.map( format => {
      switch (format) {
        case 'svg':
            fs.writeFileSync(path.join(dist, `${fontName}.svg`), this.getGlyph())
        case 'ttf':
            fs.writeFileSync(path.join(dist, `${fontName}.ttf`), this.getTTF())
        case 'eot':
            fs.writeFileSync(path.join(dist, `${fontName}.eot`), this.getEOT())
        case 'woff':
            fs.writeFileSync(path.join(dist, `${fontName}.woff`), this.getWOFF())
        case 'woff2':
            fs.writeFileSync(path.join(dist, `${fontName}.woff2`), this.getWOFF2())
      }
    })

    if(css && fontTypes.length > 0){
      const CSSTMPL =fontCSSTemplate(fontTypes, fontName)
      fs.writeFileSync(path.join(dist, `${fontName}.css`), CSSTMPL)
    }
  }
}
