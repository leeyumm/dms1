
const API = {
  /*实时监测页面的接口*/
  getRadarData:{
    method:'get',
    url:'/radar-map-evaluation/get-device-radar-evaluation-map-by-device-type'
  },

  /*实时监测页面的接口*/
  //1.获取采集总场次
  getTotalCol:{
    method: 'get',
    url:'/info-device-data-collection/system-total-data-collection-number'
  },
  //2.获取历史采集场次信息
  getOpeHistoryCases:{
    method:'get',
    url:'/device-manage/history-total-collection-counter-of-one-day'
  },
  //3.获取接入平台的设备数目
  getDevTotalNums:{
    method:'get',
    url:'/info-medical-device/access-in-system-counter-total'
  },
  //4.获取医疗设备分布饼图的数据
  getDevNum:{
    method: 'get',
    url:'/info-medical-device/access-in-system-counter-by-type'
  },
  //5.获取目前正在进行的采集 ?page size
  getColInProcess:{
    method:'get',
    url:'/info-device-data-collection/list-collecting-status'
  },

  /*采集记录页面的接口*/
  //1.获取设备历史每天的总采集时长
  getDevHistoryCollectTime:{
    method:'get',
    url:'/device-manage/history-total-collection-time-of-one-day'
  },
  //2.获取设备历史每天的开机数目
  getDevHistoryTurnOnNums:{
    method:'get',
    url:'/device-manage/history-device-open-counter-all-of-one-day'
  },
  //3.获取所有采集信息分页查询 ?page size
  getColInfos:{
    method:'get',
    url:'/info-device-data-collection/list-all-status'
  },
  //4.获取一场采集的详细信息 ?collectionNumber
  getColDetailInfos:{
    method:'get',
    url:'/info-device-data-collection/detail-info'
  },
  //5.获取仪器的历史采集数据 ?collectionNumber deviceCode serialNumber
  getDevHistoryData:{
    method:'get',
    url:'/device-data/get-history-data-for-platform'
  },


  /*追踪评价页面的接口 */
  getDevFollowUpEvalInfos:{
    method:'get',
    url:'/follow-up-evaluation/cover-all-by-device-code-and-serial-number'
  },

  
  /*维保售后评价接口 */
  getMaintenanceEvalInfos:{
    method:'get',
    url:'/maintenance-evaluation/cover-all-by-device-code-and-serial-number'
  },

  /*经济评价接口 */
  getEconomicEvalInfos:{
    method:'get',
    url:'/economic-evaluation/cover-all-by-device-code-and-serial-number'
  },


  /*仪器分类评价页面的接口*/
  //1.获取某类仪器已有的序列号情况 ?deviceCode
  getDevCardSerialNumbers:{
    method:'get',
    url:'/info-medical-device/device-serial-number-list'
  },
  //2.获取具体某一台仪器的统计信息 ?deviceCode deviceSerialNumber
  getDevCardStatisticInfo:{
    method:'get',
    url:'/device-card/info-device-detail'
  },
   //3.获取某类仪器的评价统计信息 ?deviceCode
   getDevEvaluationInfos:{
    method:'get',
    url:'/device-card/info-device-model'
  },
}

export default API