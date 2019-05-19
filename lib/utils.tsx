const fs = require('fs')

/**
 * unicode 转 string
 * @param {*} code 十六进制
 * utf-8 编码格式 如 0x2001  unicode 编码格式 \u2001
 * str.charCodeAt(0) Unicode 编码值 20013
 */
export function unicodeToCodePoint (code) {
  return parseInt(code, 16)
}

/**
 * unicode 转 string
 * @param {*} code 十六进制
 * utf-8 编码格式 如 0x2001  unicode 编码格式 \u2001
 * str.charCodeAt(0) Unicode 编码值 20013
 */
export function codePointToUnicode (codePoint) {
  return codePoint.toString(16)
}


/**
 * unicode 转 string
 * @param {*} code 十六进制
 * utf-8 编码格式 如 0x2001  unicode 编码格式 \u2001
 * str.charCodeAt(0) Unicode 编码值 20013
 */
export function unicodeToString (code) {
  return String.fromCharCode(code)
}

/**
 * utf-8 转十进制字符串
 * @param {*} code 十六进制
 * utf-8 编码格式 如 0x2001  unicode 编码格式 \u2001
 */
export function utf8ToString (code) {
  return String.fromCharCode(parseInt(code, 16))
}

/*
 * [writeToFile description]
 * @param  {[type]} data [数组数据列表]
 * @param  {[type]} path [写入的路径]
 */
// eslint-disable-next-line no-unused-vars
export function writeToFile (data, path, calllback?:() => void) {
  if(typeof data === 'object')data = JSON.stringify(data, null, '\t')
  fs.writeFile(path, data, 'utf-8', function (err) {
    if (err) throw err
    calllback && calllback()
  })
}

/*
 * [readToFile 读取文件]
 * @param  {[type]} path [读取路径]
 */
export function readToFile (path, calllback?:() => void) {
  const data = fs.readFileSync(path, 'UTF-8')
  calllback && calllback()
  return data
}


/*
 * [readToFile 读取文件]
 * @param  {[type]} path [读取路径]
 */
export function readStreamToFile (path, calllback?:(dataString:any) => void) {
  const promise = new Promise((resolve, reject) => {
    const stream = fs.createReadStream(path, {
      'encoding': 'utf8'
    })

    let dataString = ''

    stream.on('data', data => {
      dataString += data
    })

    stream.on('error', err => {
      reject(err)
    })

    stream.on('end', () => {
      resolve(dataString)
      calllback && calllback(dataString)
    })
  })
  return promise
}
