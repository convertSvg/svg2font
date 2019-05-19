const path = require('path')
const fs = require('fs')
const _ = require('lodash')
const svg2ttf = require('svg2ttf')
const ttf2svg = require('ttf2svg')
const ttf2eot = require('ttf2eot')
const ttf2woff = require('ttf2woff')
const ttf2woff2 = require('ttf2woff2')


import fontTemp from "./template";
import { writeToFile } from './utils'

const DEFAULT_CONFIG = {
  font: {
    id: 'svg2font',
    horizAdvX: 1024,
    vertAdvY: 1024,
      // horizOriginX: null,
      // horizOriginY: null,
      // vertOriginX: null,
      // vertOriginY: null
  },
  fontface: {
    fontFamily: 'svg2font',
    fontWeight: '400',
    fontStretch: 'normal',
    unitsPerEm: '1024',
    ascent: '812',
    descent: '-212'
  },
  glyphs: {}
}

/**
 *
 * 字体对象
 * @class Font
 */
export default class Font {
  public glyphs;
  public fontName;
  public dist;
  constructor ({
    fontName,
    glyphs,
    dist,
  }) {
    const CONFIG = _.merge(DEFAULT_CONFIG, {
      glyphs,
      font: {
        id: fontName
      },
      fontface: {
        fontFamily: fontName
      }
    })

    this.glyphs = glyphs
    this.fontName = fontName
    this.dist = dist
    this.svgFont = fontTemp(DEFAULT_CONFIG)
  }

  getGlyph () {
    return this.svgFont
  }

  getTtf () {
    const ttf = svg2ttf(this.svgFont, {})
    return ttf
  }
}
