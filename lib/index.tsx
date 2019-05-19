const Glob = require("glob")
const xmldom = require('xmldom')
const DOMParser = xmldom.DOMParser // 解析为文档对象
const XMLSerializer = xmldom.XMLSerializer // XML序列化
const path = require('path')

import { readToFile } from './utils'
import createUnicodes from './unicodes'
import Font from './font'

const getFileList = (pattern, options = {}) => {
  const promise = new Promise((resolve, reject) => {
    Glob(pattern, options, function (err, files) {
      if(err)reject(err)
      resolve(files)
    })
  })
  return promise
}

const svg2Font = ({
  src = '',
  dist = '',
  fontName = 'svg2font',
  startCodePoint = 57344
}) => {
  const files = Glob.sync(src, {}) || []
  const glyphs = {}
  let len = files.length
  const unicodes = createUnicodes(len, startCodePoint)
  while(len){
    len--;
    const data:any = readToFile(files[len])
    const glyphName = path.basename(files[len]).split('.')[0]
    const Node = new DOMParser().parseFromString(data, 'application/xml')
    Array.from(Node.documentElement.childNodes).map( (node:any) => {
      if (node.nodeName.toUpperCase() === 'PATH' && node.hasAttribute && node.hasAttribute('d')) {
          const d = node.getAttribute('d')
          glyphs[glyphName] = { unicode: unicodes[len], d, horizAdvX: 1024, vertAdvY: 1024}
      }
    })
  }

  const font = new Font({
    fontName,
    glyphs,
    dist,
  })

  return font
}

export default svg2Font
