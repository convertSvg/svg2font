const Glob = require("glob")
const path = require('path')

import { readToFile, readStreamToFile } from './utils'
import createUnicodes from './unicodes'
import Font from './font'

const getFileList = (pattern, options = {}) => {
  const promise = new Promise((resolve, reject) => {
    Glob(pattern, options, (err, files:string[]) => {
      if(err){
        console.error(err)
        reject([])
      }
      resolve(files)
    })
  })
  return promise
}

async function svg2Font({
  src = '',
  dist = '',
  fontName = 'svg2font',
  fontFamily = 'svg2font',
  startCodePoint = 57344,
  ascent = 896,
  descent = -128,
  css = true,
  symbol = true,
  fontTypes = ['eot', 'woff2', 'woff', 'ttf', 'svg'],
}) {

  // const files = Glob.sync(src, {}) || []
  const files = await getFileList(src)
  const glyphSvgs = {}

  for(let i = 0, len = files.length; i< len; i++){
    const data:any = await readStreamToFile(files[i])
    const glyphName = path.basename(files[i]).split('.')[0]
    glyphSvgs[glyphName] = data
  }

  const font = new Font({
    fontName,
    fontFamily,
    glyphSvgs,
    ascent,
    descent,
    startCodePoint,
  })

  return font.convertFonts({dist, fontTypes, css, symbol})
}
export { svg2Font, Font }

