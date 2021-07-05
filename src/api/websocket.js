

let developMode = undefined
if(process.env.NODE_ENV === 'development'){
  developMode = false
}
if(process.env.NODE_ENV === 'production'){
  developMode = false
}

const WS_BASE_URL = developMode 
? 'ws://172.20.29.106:10086/devicemanage/device-real-time-data'
:'ws://www.dms.yuhualab.com:10086/devicemanage/device-real-time-data'

export function createWs(collectionNumber,deviceCode,timestamp){
  const url = WS_BASE_URL + '/' + collectionNumber +'/'+ deviceCode + '/' + timestamp 
  return new WebSocket(url)
}
  
