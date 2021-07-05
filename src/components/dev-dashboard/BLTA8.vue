<template>
  <div class=" real-time-panel-wrapper">
    <!-- HR部分 -->
    <div class="xu-row mb15">
      <div class="xu-col-8">
        <div class="chart-wrapper">
          <x-basic-chart
          :color="['#00ff01']" 
          :yName="'HR'"
          :type="'line'"
          :source="{x:x,HR:hr}"
          :showXLabel="false"
          :areaStyle="null"
          >
          </x-basic-chart>
        </div>
      </div>
      <div class="xu-col-4">
        <div class="indicator-wrapper hr-wrapper">
          <span class="indicator-name">HR</span>
          <span class="indicator-units">bpm</span>
          <span class="indicator-value">{{ params.hr }}</span>
        </div>
      </div>
    </div>
    <!-- spo2部分 -->
    <div class="xu-row mb15">
      <div class="xu-col-8">
        <div class="chart-wrapper">
          <x-basic-chart
          :color="['#fbff26']" 
          :yName="'SpO2'"
          :type="'line'"
          :source="{x:x,SpO2:spo2}"
          :showXLabel="false"
          :areaStyle="null"
          >
          </x-basic-chart>
        </div>
      </div>
      <div class="xu-col-4">
        <div class="indicator-wrapper spo2-wrapper">
          <span class="indicator-name">SpO2</span>
          <span class="indicator-units">%</span>
          <span class="indicator-value">{{ params.spo2 }}</span>
        </div>
      </div>
    </div>
    <!-- IBP部分 -->
    <div class="xu-row mb15">
     <div class="xu-col-8">
        <div class="chart-wrapper">
          <x-basic-chart
          :color="['#ff3a28']" 
          :yName="'IBP'"
          :type="'line'"
          :source="{x:x,IBP:ibpMap1}"
          :showXLabel="false"
          :areaStyle="null"
          >
          </x-basic-chart>
        </div>
      </div>
      <div class="xu-col-4">
        <div class="indicator-wrapper IBP-wrapper">
          <span class="indicator-name">IBP</span>
          <span class="indicator-units">mmHg</span>
          <span class="indicator-value text-small">
            {{ params.ibpSys1 + '/'}}
            {{ ' ' + params.ibpDia1 }}
            {{ params.ibpMap1 }}
          </span>
        </div>
      </div>
    </div>
    <!-- 温度 pr NIBP部分 -->
    <div class="xu-row">
      <div class="xu-col-4">
        <div class="indicator-wrapper temperature-wrapper">
          <span class="indicator-name">T1</span>
          <span class="indicator-units">℃</span>
          <span class="indicator-value">{{ params.temperature1 }}</span>
        </div>
      </div>
      <div class="xu-col-4">
        <div class="indicator-wrapper pr-wrapper">
          <span class="indicator-name">PR</span>
          <span class="indicator-units">bpm</span>
          <span class="indicator-value">{{ params.pr }}</span>
        </div>
      </div>
      <div class="xu-col-4">
        <div class="indicator-wrapper NIBP-wrapper">
          <span class="indicator-name">NIBP</span>
          <span class="indicator-units">mmHg</span>
          <span class="indicator-value text-small">
            {{ params.nibpSys + '/'}}
            {{ ' ' + params.nibpDia }}
            {{ params.nibpMap }}
          </span>
        </div>
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
      MAX_LENGTH:10,
      ws:null,
      DEV_CODE:getDevCode('BAO_LAI_TE_A8'),
      x:[],
      hr:[],
      spo2:[],
      ibpMap1:[],
      params:{
        hr:'--',
        ibpDia1:'--',
        ibpMap1:'--',
        ibpSys1:'--',
        nibpDia:'--',
        nibpMap:'--',
        nibpSys:'--',
        pr:'--',
        spo2:'--',
        temperature1:'--'
      }
    }
  },
  methods:{
    openWs(operationNumber,deviceCode){
      this.closeWs()
      this.ws = createWs(operationNumber,deviceCode,this.$utils.getFormatterDate().timestamp)
      this.ws.onopen = function(){
        console.log(`手术${operationNumber}的宝莱特${deviceCode}开启ws`)
      }
      this.ws.onmessage = this.onmessage  
    },
    closeWs(){
      if(this.ws){
        console.log(`宝莱特关闭之前ws`)
        this.ws.close()
      }
    },
    //初始化数据
    initData(){
      console.log(`手术${this.operationNumber}的宝莱特初始化数据`)
      for(const key in this.params){
        this.params[key] = '--'
      }
    },
    parseData(data){
      const temp = JSON.parse(data)
      // console.log(temp)
      if(this.hr.length > this.MAX_LENGTH){
        this.hr.shift()
      }
      if(this.spo2.length > this.MAX_LENGTH){
        this.spo2.shift()
      }
      if(this.ibpMap1.length > this.MAX_LENGTH){
        this.ibpMap1.shift()
      }
      if(this.x.length > this.MAX_LENGTH){
        this.x.shift()
      }
      temp['hr'] != -1000 && this.hr.push(temp['hr'])
      temp['spo2'] != -1000 && this.spo2.push(temp['spo2'])
      temp['ibpMap1'] != -1000 && this.ibpMap1.push(temp['ibpMap1'])
      this.x.push(temp['gmtCreate'])
      for(const key in temp){
        if(temp[key] != -1000){
          this.params[key] = temp[key]
        }
      }
      // console.log(temp['hr'])
    },
    onmessage(e){
      console.log(`手术${this.operationNumber}的宝莱特收到一条数据`)
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
   beforeDestroy(){
    this.closeWs()
  }
}
</script>

<style scoped>
.chart-wrapper {
  height: 140px;
}
.indicator-wrapper {
  height: 160px;
  position: relative;
  padding: 0 10px;
  box-sizing: border-box;
}
.hr-wrapper {
  color: #00ff01;
}
.spo2-wrapper {
  color: #fbff26;
}
.IBP-wrapper {
  color: #ff3a28;
}
.temperature-wrapper {
  color: #f7c31f;
}
.pr-wrapper {
  color: #faff05;
}
.NIBP-wrapper {
  color: #fefaf7;
}
.indicator-value {
  position: absolute;
  top:50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  font-size: 80px;
  font-weight: bold;
  font-stretch: ultra-condensed;
}
.indicator-name {
  font-size: 20px;
}
.indicator-units {
  font-size: 14px;
  position: absolute;
  top:30px;
  left: 20px;
}
.text-small {
  font-size: 50px !important;
  white-space: nowrap;
}
</style>