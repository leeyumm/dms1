<template>
  <div class="real-time-panel-wrapper">
    <div class="chart-wrapper">
      <x-basic-chart 
      :xName="'时间'"
      :showXLabel="false" 
      :yName="'Ai'"
      :type="'line'"
      :source="{x:x,Ai:Ai}"
      :areaStyle="null"
      >
      </x-basic-chart>
    </div>
    <div class="indicator-wrapper">
      <div>
        <span class="indicator-label">EMG</span>
        <span class="indicator-num">{{ EMG }}</span>
      </div>
      <div>
        <span class="indicator-label">BSR</span>
        <span class="indicator-num">{{ BSR }}</span>
      </div>
      <div>
        <span class="indicator-label">SQI</span>
        <span class="indicator-num">{{ SQI }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import xBasicChart from '@/components/share-components/xBasicChart'
import { createWs } from '@/api/websocket.js'
import { getDevCode } from '@/global/devTypeCode'

export default {
  components:{xBasicChart},
  props:['operationNumber','deviceCode'],
  data(){
    return {
      MAX_LENGTH:20,
      x:[], //时间
      EMG:'--',
      Ai:[],
      BSR:'--',
      SQI:'--',
      ws:null,
      DEV_CODE:getDevCode('PU_KE_YY106')
    }
  },
  methods:{
    openWs(operationNumber,deviceCode){
      this.closeWs()
      this.ws = createWs(operationNumber,deviceCode,this.$utils.getFormatterDate().timestamp)
      this.ws.onopen = function(){
        console.log(`手术${operationNumber}的普可${deviceCode}开启ws`)
      }
      this.ws.onmessage = this.onmessage
    
    },
    closeWs(){
      if(this.ws){
        console.log(`普可关闭之前ws`)
        this.ws.close()
      }
    },
    //初始化数据
    initData(){
      console.log(`手术${this.operationNumber}的普可初始化数据`)
      this.EMG = '--'
      this.Ai = []
      this.BSR = '--'
      this.SQI = '--'
      this.x = []
    },
    //从ws中解析数据 data为ws收到的数据
    parseData(data){
      const {ai:Ai,bsr:BSR,emg:EMG,sqi:SQI,gmtCreate} = JSON.parse(data)
      if(this.Ai.length > this.MAX_LENGTH){
        this.Ai.shift()
        this.x.shift()
      }
      // console.log(this.Ai)
      this.Ai.push(Ai)
      this.x.push(gmtCreate.split('T')[1])
      this.EMG = EMG
      this.BSR = BSR
      this.SQI = SQI
    },
    //ws收到数据的回调
    onmessage(e){
      console.log(`手术${this.operationNumber}的普可收到一条数据`)
      this.parseData(e.data)
    }
  },
  watch:{
    'operationNumber':{
      handler(newVal,oldVal){
        if(this.deviceCode === this.DEV_CODE){
          this.initData()
          this.openWs(newVal,this.deviceCode)
        } else {
          this.closeWs()
        }
      },
      immediate:true
    }
  },
  created(){
    // console.log(`手术${this.operationNumber}的普可开启ws`)
  },
  beforeDestroy(){
    this.closeWs()
  }
}
</script>

<style scoped>
.chart-wrapper {
  height: 400px;
  margin-bottom: 10px;
}
.indicator-wrapper {
  display: flex;
  height: 268px;
}
.indicator-wrapper > div {
  flex: 1;
  border: 3px solid #ffffff;
  color: #ffffff;
  border-radius: 10px;
  height: 100%;
  position: relative;
  box-sizing: border-box;
}
.indicator-wrapper > div:nth-child(2){
  margin: 0 10px;
}
.indicator-label {
  position: absolute;
  top:15px;
  left: 15px;
  font-size: 40px;

}
.indicator-num {
  position: absolute;
  top:50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  font-size: 90px;
}
</style>