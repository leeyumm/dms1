
export const typeInfo = {
  '麻醉机':{
    'devTypeCode':1,
    'include':['MAI_RUI_WATOEX65','MAI_RUI_WATOEX_55Pro','YI_AN_8700A','DRAGER_FABIUS_PLUS','DRAGER_ZIUS_IE','PU_BO_BOARAY700',
               'CHEN_WEI_CWH302','KE_MAN_AX700'],
    'url':'/dev-anesthesia'//前端路由地址
  },
  '呼吸机':{
    'devTypeCode':2,
    'include':['PU_BO_5000D','CHEN_WEI_CWH3020B'],
    'url':'/dev-respirator'
  },
  '无创血压监测仪(监护仪)':{
    'devTypeCode':3,
    'include':['MAI_RUI_T8','BAO_LAI_TE_A8','LI_BANG_ELITEV8','KE_MAN_C90'],
    'url':'/dev-noninvasive-blood-pressure'
  },
  '麻醉深度监测仪':{
    'devTypeCode':4,
    'include':['NUO_HE_NW9002S','MEI_DUN_LI_EEG_VISTA','PU_KE_YY106','WEI_HAO_KANG_ANGEL6000D','TAI_JI_TD3200A'],
    'url':'/dev-depth-of-anesthesia',
  },
  '无创血红蛋白监测仪':{
    'devTypeCode':5,
    'include':['AI_QIN_EGOS600A','MASIMO_RADICAL7'],
    'url':'/dev-noninvasive-hemoglobin'
  },
  '无创脑氧饱和度监测仪':{
    'devTypeCode':6,
    'include':['AI_QIN_EGOS600A','MEI_DUN_LI_5100C','MING_XI_MNIR_P100'],
    'url':'/dev-noninvasive-brain-oxygen'
  }
}

const devInfo = {
  'NUO_HE_NW9002S':{
    imgUrl:require('../assets/dev-image/NW9002S.jpg'),
    deviceCode:30,
    // devName:'诺和 NW9002S 麻醉深度/血红蛋白',
    devName:'麻醉深度多参数监护仪(NW-9002S)',
    devType:'NW9002S',
    devCompany:'合肥诺和电子科技有限公司'
  },
  'PU_KE_YY106':{
    imgUrl:require('../assets/dev-image/ConView YY-106.png'),
    deviceCode:31,
    // devName:'普可 YY-106 麻醉深度',
    devName:'麻醉深度监测仪(YY-106)',
    devType:'YY-106',
    devCompany:'浙江普可医疗科技有限公司'
  },
  'BAO_LAI_TE_A8':{
    imgUrl:require('../assets/dev-image/BLTA8.jpg'),
    deviceCode:32,
    // devName:'宝莱特 A8 无创血压/血红蛋白',
    devName:'重症插件式监护仪(A8)',
    devType:'A8',
    devCompany:'广东宝莱特医用科技股份有限公司'
  },
  'YI_AN_8700A':{
    imgUrl:require('../assets/dev-image/Aeon8700A.jpg'),
    deviceCode:33,
    // devName:'宜安 8700A 麻醉机',
    devName:'麻醉机(Aeon8700A)',
    devType:'8700A',
    devCompany:'北京谊安医疗系统股份有限公司'
  },
  'MAI_RUI_T8':{
    imgUrl:require('../assets/dev-image/beneview T8.jpg'),
    deviceCode:42,
    // devName:'迈瑞 T8 无创血压/监护仪',
    devName:'监护仪(BeneViewT8)',
    devType:'T8',
    devCompany:'深圳迈瑞生物医疗电子股份有限公司'
  },
  'MAI_RUI_WATOEX65':{
    imgUrl:require('../assets/dev-image/WATO EX55.jpg'),
    deviceCode:43,
    // devName:'迈瑞 WATOEX65/55Pro 麻醉机',
    devName:'麻醉机(WATOEX65)',
    devType:'WATOEX65',
    devCompany:'深圳迈瑞生物医疗电子股份有限公司'
  },
  'MAI_RUI_WATOEX_55Pro':{
    imgUrl:require('../assets/dev-image/MAI_RUI_WATOEX_55Pro.png'),
    deviceCode:44,
    // devName:'迈瑞 WATOEX65/55Pro 麻醉机',
    devName:'麻醉机(WATOEX55-Pro)',
    devType:'WATOEX55-Pro',
    devCompany:'深圳迈瑞生物医疗电子股份有限公司'
  },
  'LI_BANG_ELITEV8':{
    imgUrl:require('../assets/dev-image/LI_BANG_ELITEV8.jpg'),
    deviceCode:45,
    // devName:'理邦 Elite-V8 无创血压/监护仪',
    devName:'监护仪(ELiteV8)',
    devType:'Elite-V8',
    devCompany:'深圳市理邦精密仪器股份有限公司',
  },
  'KE_MAN_C90':{
    imgUrl:require('../assets/dev-image/KE_MAN_C90.png'),
    deviceCode:46,
    devName:'无创血压/监护仪(C90)',
    devType:'C90',
    devCompany:'深圳市科曼医疗设备有限公司',
  },
  'WEI_HAO_KANG_ANGEL6000D':{
    imgUrl:require('../assets/dev-image/WEI_HAO_KANG_ANGEL6000D.png'),
    deviceCode:47,
    devName:'麻醉深度监测仪(ANGEL6000D)',
    devType:'ANGEL6000D',
    devCompany:'深圳市威浩康医疗器械有限公司',
  },
  'KE_MAN_AX700':{
    imgUrl:require('../assets/dev-image/KE_MAN_AX700.png'),
    deviceCode:48,
    devName:'麻醉机(AX700)',
    devType:'AX700',
    devCompany:'深圳市科曼医疗设备有限公司',
  },
  'AI_QIN_EGOS600A':{
    imgUrl:require('../assets/dev-image/EGOS600A.jpg'),
    deviceCode:71,
    devName:'爱琴 EGOS-600A 血红蛋白/脑氧',
    devType:'EGOS-600A',
    devCompany:'苏州爱琴生物医疗电子有限公司',
  },
  'AI_QIN_EGOS600B':{//不做
    imgUrl:'',
    deviceCode:72,
    devName:'爱琴 EGOS-600B 血红蛋白/脑氧',
    devType:'EGOS-600B',
    devCompany:'苏州爱琴生物医疗电子有限公司',
  },
  'AI_QIN_EGOS600C':{//不做
    imgUrl:'',
    deviceCode:73,
    devName:'爱琴 EGOS-600C 脑氧',
    devType:'EGOS-600C',
    devCompany:'苏州爱琴生物医疗电子有限公司',
  },
  'MING_XI_MNIR_P100':{
    imgUrl:require('../assets/dev-image/MING_XI_MNIR_P100.png'),
    deviceCode:74,
    devName:'名希 MNIR-P100 脑氧',
    devType:'MNIR-P100',
    devCompany:'重庆名希医疗器械有限公司',
  },
  'MEI_DUN_LI_EEG_VISTA':{
    imgUrl:require('../assets/dev-image/EEG-VISTA.jpg'),
    deviceCode:75,
    // devName:'美敦力 186-1046 麻醉深度',
    devName:'麻醉深度监护仪(EEG-VISTA)',
    devType:'EEG-VISTA(186-1046)',
    devCompany:'美国美敦力公司',
  },
  'MEI_DUN_LI_5100C':{
    imgUrl:require('../assets/dev-image/MEI_DUN_LI_5100C.jpg'),
    deviceCode:76,
    // devName:'美敦力 5100C 血红蛋白',
    devName:'脑氧饱和度监测仪(5100C)',
    devType:'5100C',
    devCompany:'美国美敦力公司',
  },
  'PU_BO_BOARAY700':{
    imgUrl:require('../assets/dev-image/PU_BO_BOARAY700.png'),
    deviceCode:77,
    devName:'麻醉机(Boaray700)',
    devType:'Boaray700',
    devCompany:'深圳市普博科技有限公司',
  },
  'DRAGER_V300':{
    imgUrl:require('../assets/dev-image/DRAGER_V300.jpg'),
    deviceCode:78,
    devName:'呼吸机(V300)',
    devType:'V300',
    devCompany:'德国德尔格公司',
  },
  'DRAGER_FABIUS_PLUS':{
    imgUrl:require('../assets/dev-image/DRAGER_FABIUS_PLUS.jpg'),
    deviceCode:79,
    devName:'麻醉机(Fabius Plus)',
    devType:'Fabius Plus',
    devCompany:'德国德尔格公司',
  },
  'SHU_PU_SI_DA_S1200':{
    imgUrl:require('../assets/dev-image/SHU_PU_SI_DA_S1200.jpg'),
    deviceCode:80,
    devName:'呼吸机(S1200)',
    devType:'S1200',
    devCompany:'南京舒普思达医疗设备有限公司',
  },
  'PU_BO_5000D':{
    imgUrl:require('../assets/dev-image/PU_BO_5000D.png'),
    deviceCode:81,
    devName:'呼吸机(5000D)',
    devType:'5000D',
    devCompany:'深圳市普博科技有限公司',
  },
  'CHEN_WEI_CWH302':{
    imgUrl:require('../assets/dev-image/CHEN_WEI_CWH302.png'),
    deviceCode:82,
    devName:'麻醉机(CWM302)',
    devType:'CWM302',
    devCompany:'南京晨伟医疗设备有限公司',
  },
  'CHEN_WEI_CWH3020B':{
    imgUrl:require('../assets/dev-image/CHEN_WEI_CWH3020B.png'),
    deviceCode:83,
    devName:'呼吸机(CWM3020B)',
    devType:'CWM3020B',
    devCompany:'南京晨伟医疗设备有限公司',
  },
  'DRAGER_ZIUS_IE':{
    imgUrl:require('../assets/dev-image/DRAGER_ZIUS_IE.png'),
    deviceCode:100,
    devName:'麻醉机(ZEUS-IE)',
    devType:'ZEUS-IE',
    devCompany:'德国德尔格公司',
  },
  'TAI_JI_TD3200A':{
    imgUrl:require('../assets/dev-image/TAI_JI_TD3200A.png'),
    deviceCode:101,
    devName:'麻醉深度监护仪(TD-3200A)',
    devType:'TD-3200A',
    devCompany:'深圳市太极医疗科技有限公司',
  },
  'MASIMO_RADICAL7':{
    imgUrl:require('../assets/dev-image/MASIMO_RADICAL7.png'),
    deviceCode:102,
    devName:'无创血红蛋白监测仪(Radical7)',
    devType:'Radical7',
    devCompany:'美国MASIMO公司',
  },
  'PHILIPS_MX':{
    imgUrl:'',
    deviceCode:103,
    devName:'无创血压/监护仪(MX)',
    devType:'MX',
    devCompany:'荷兰皇家飞利浦公司',
  },
}


//获取设备类型中的信息
//输入:'麻醉机','devTypeCode'
//返回: 1
export const getTypeInfo = function(devCategoryStr,field){
  return typeInfo[devCategoryStr][field]
}

// 获取仪器的代号
//输入:'MEI_DUN_LI_5100C',
//返回: '76'
export const getDevCode = function(devTypeStr){
  return devInfo[devTypeStr]['deviceCode']
}

//获取所有类型的代号
//返回 {'麻醉机':1,...}
export const getTypeCodes = function(){
  const ans = {}
  for(const key in typeInfo){
    ans[key] = getTypeInfo(key,'devTypeCode')
  }
  return ans
}

//获取所有代号的类型
//返回 {'1':''麻醉机'...}
export const getCodeTypes = function(){
  const ans = {}
  for(const key in typeInfo){
    ans[getTypeInfo(key,'devTypeCode')] = key
  }
  return ans
}


export const getDevCodeToDevName = function(){
  const ans = {}
  const typeCodes = getTypeCodes()
  for(const key in typeCodes){
    ans[typeCodes[key]] = key
  }
  return ans
}

//获取某一类型中所有的仪器信息
//输入：'麻醉机'
/*返回 
  [
    {
      imgUrl:'',
      deviceCode:'76',
      devName:'美敦力 5100C 血红蛋白',
      devType:'5100C',
      devCompany:'美国美敦力公司',
    },
    ...
  ]
*/
export const getDevInfos = function(devCategoryStr){
  const ans = []
  const includeDevices = typeInfo[devCategoryStr]['include']
  for(const item of includeDevices){
    if(devInfo[item]['imgUrl'] !== ''){
      ans.push(devInfo[item])
    }
  }
  // console.log(ans)
  return ans
}


//输入deviceCode，查询对应的仪器名称
export const getDevNameByCode = function(deviceCode){
  for(const key in devInfo){
    if(devInfo[key]['deviceCode'] == deviceCode){
      return devInfo[key]['devName']
    }
  }
}


