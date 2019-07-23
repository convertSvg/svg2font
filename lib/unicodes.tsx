/**
 * Unicode字符平面 4号平面 至 13号平面
 * 私人使用区编号范围  U+E000-U+F8FF U+F0000-U+FFFFD U+100000-U+10FFFD
 * 注意执行 #x， 输出显示 0x，parseInt('0x40000', 16) 结果 262144， parseInt('#x40000', 16) 结果 null
 * 字符码点 (code point) 范围 57344 ~ 63743 983040 ~ 1048573 1048576 ~ 1114109
 */
import { unicodeToCodePoint } from './utils'

/**
 * 生成私人区 unicode
 * @param {*} num 需要 unicode 字符个数
 * @param {*} startCodePoint 起始码点值
 * @param {*} type 若取值为 '&#x' 则返回为 &#x40000; 格式，反之返回16进制码点
 */
export default function createUnicodes (num: number = 0, startCodePoint: number  = 57344, type?: string): Array<string> {
    if(
        !(
          (startCodePoint - unicodeToCodePoint('E000') >= 0 &&  unicodeToCodePoint('F8FF') - startCodePoint - num >= 0) ||
          (startCodePoint - unicodeToCodePoint('F0000') >= 0 &&  unicodeToCodePoint('FFFFD') - startCodePoint - num >= 0) ||
          (startCodePoint - unicodeToCodePoint('100000') >= 0 &&  unicodeToCodePoint('10FFFD') - startCodePoint - num >= 0)
        )
    ){
      throw new Error('The startCodePoint  is not within the private use areas range !')
    }

    let unicodes = []
    while(num){
        num--;
        unicodes.push()
        const codePoint = startCodePoint + num
        if(type === '#x'){
          unicodes[num] = `&#x${codePoint.toString(16)};`
        }else{
          unicodes[num] = codePoint.toString(16)
        }

    }
    return unicodes
}

