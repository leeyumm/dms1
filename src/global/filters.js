
import util from '@/utils/util'
import { getDevNameByCode } from '@/global/devTypeCode'


export default {
  //1.标准化时间输出 输入的时间戳单位为毫秒
  formatterDate(val,format='YYYYMMDDHHMMSS'){
    return util.getFormatterDate(val)[format]
  },
  //2.
  formatterSex(val){
    return val===1?'男':'女'
  },
  //3.
  formatterDevName(val) {
    const reg = /(?<=\().+?(?=\))/g;
    const res = val.match(reg);
    if (res) {
      return res.join(" ");
    } else {
      return "";
    }
  },
  //4.小数转换为百分数
  numberToPercent(val){
    if(val >= 0 && val <= 1){
      return (val*100).toFixed(2) + '%'
    }
    return val
  },
  //5.通过设备号获取设备名称
  deviceCodeToName(val){
    return getDevNameByCode(val)
  },
  //6.保留整数
  toInteger(val){
    if(typeof val === 'number'){
      return Math.floor(val)
    } else {
      return val
    }
  }
}