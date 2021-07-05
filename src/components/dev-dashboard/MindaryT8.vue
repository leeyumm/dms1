<template>
  <div class="real-time-panel-wrapper">
    <!-- ECG部分 -->
    <div class="xu-row">
      <div class="xu-col-7">
        <div class="chart-wrapper">
          <x-basic-chart
          :color="['#25d804']" 
          :yName="'ECG'"
          :type="'line'"
          :source="{x:x,ECG:ecg}"
          :showXLabel="false"
          :showYLabel="true"
          :areaStyle="null"
          :boundaryGap="false"
          >
          </x-basic-chart>
        </div>
      </div>
      <div class="xu-col-5">
        <div class="ecg-wrapper">
          <span class="indicator-name">ECG</span>
          <span class="indicator-value center-box">{{ params.ecgHeartRate }}</span>
        </div>
      </div>
    </div>
    <!-- SpO2部分 -->
    <div class="xu-row">
      <div class="xu-col-7">
        <div class="chart-wrapper">
          <x-basic-chart
          :color="['#1ed8d9']" 
          :yName="'SpO2'"
          :type="'line'"
          :source="{x:x,SpO2:spo2}"
          :showXLabel="false"
          :areaStyle="null"
          :boundaryGap="false"
          >
          </x-basic-chart>
        </div>
      </div>
      <div class="xu-col-5">
        <div class="spo2-wrapper xu-float-left">
          <span class="indicator-name">SpO2</span>
          <span class="indicator-units">%</span>
          <span class="indicator-value center-box">{{ params.spo2PercentOxygenSaturation }}</span>
        </div>
        <div class="pr-wrapper xu-float-right">
          <span class="indicator-name">PR</span>
          <span class="indicator-value center-box text-small">{{ params.spo2PulseRate }}</span>
        </div>
      </div>
    </div>
    <!-- Art部分 -->
    <div class="xu-row">
      <div class="xu-col-7">
        <div class="chart-wrapper">
          <x-basic-chart
          :color="['#fc232a']" 
          :yName="'Art'"
          :type="'line'"
          :source="{x:x,Art:artMean}"
          :showXLabel="false"
          :areaStyle="null"
          :boundaryGap="false"
          >
          </x-basic-chart>
        </div>
      </div>
      <div class="xu-col-5">
        <div class="art-wrapper">
          <span class="indicator-name">Art</span>
          <span class="indicator-units">mmHg</span>
          <span class="indicator-value center-box text-small">
            {{ params.artIbpSystolic + '/' + params.artIbpMean + ' ' + params.artIbpDiastolic }}
          </span>
        </div>
      </div>
    </div>
    <!-- CVP部分 -->
    <div class="xu-row">
      <div class="xu-col-7">
        <div class="chart-wrapper">
          <x-basic-chart
          :color="['#87c0e7']" 
          :yName="'CVP'"
          :type="'line'"
          :source="{x:x,cvp:cvp}"
          :showXLabel="false"
          :areaStyle="null"
          :boundaryGap="false"
          >
          </x-basic-chart>
        </div>
      </div>
      <div class="xu-col-5">
        <div class="cvp-wrapper">
          <span class="indicator-name">CVP</span>
          <span class="indicator-units">cmH2O</span>
          <span class="indicator-value center-box">{{ params.cvp }}</span>
        </div>
      </div>
    </div>
    <!-- Resp部分 -->
    <div class="xu-row">
      <div class="xu-col-7">
        <div class="chart-wrapper">
          <x-basic-chart
          :color="['#f3cb26']" 
          :yName="'resp'"
          :type="'line'"
          :yMax="30"
          :source="{x:x,resp:resp}"
          :showXLabel="false"
          :areaStyle="null"
          :boundaryGap="false"
          >
          </x-basic-chart>
        </div>
      </div>
      <div class="xu-col-5">
        <div class="resp-wrapper">
          <span class="indicator-name">Resp</span>
          <span class="indicator-value center-box">{{ params.respRespirationRate }}</span>
        </div>
      </div>
    </div>
    <!-- temp和NIBP部分 -->
    <div class="xu-row">
      <div class="xu-col-7">
        <div class="temp-wrapper">
          <span class="indicator-name">Temp</span>
          <span class="indicator-units">℃</span>
          <div class="pos-center-box">
            <div class="temp-left xu-float-left">
              <p>
                <span class="temp-units">T1</span>
                <span class="temp-value">{{ params.tempTemperature1 }}</span>
              </p>
              <p>
                <span class="temp-units">T2</span>
                <span class="temp-value">{{ params.tempTemperature2 }}</span>
              </p>
            </div>
            <div class="temp-right xu-float-right">
              <p class="temp-units">TD</p>
              <p class="temp-value">{{ params.tempTemperatureDifference }}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="xu-col-5">
        <div class="nibp-wrapper">
          <span class="indicator-name">NIBP</span>
          <span class="indicator-units">mmHg</span>
          <span class="indicator-value center-box text-small">
            {{ 
              params.nibpSystolic + '/' + 
              params.nibpDiastolic + ' ' + 
              params.nibpMean}}
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
      MAX_LENGTH:40,
      ws:null,
      DEV_CODE:getDevCode('MAI_RUI_T8'),
      x:[],
      ecg:[],
      spo2:[],
      artMean:[],
      cvp:[],
      resp:[],     
      params:{
        ecgHeartRate:'--',
        spo2PercentOxygenSaturation:'--',
        spo2PulseRate:"--",
        artIbpSystolic:'--',
        artIbpMean:'--',
        artIbpDiastolic:'--',
        cvp:'--',
        respRespirationRate:'--',
        nibpSystolic:'--',
        nibpMean:'--',
        nibpDiastolic:'--',
        tempTemperature1:'--',
        tempTemperature2:'--',
        tempTemperatureDifference:'--'
      }
    }
  },
  methods:{
    openWs(operationNumber,deviceCode){
      this.closeWs()
      this.ws = createWs(operationNumber,deviceCode,this.$utils.getFormatterDate().timestamp)
      this.ws.onopen = function(){
        console.log(`手术${operationNumber}的迈瑞T8--DEVCODE:${deviceCode}开启ws`)
      }
      this.ws.onmessage = this.onmessage  
    },
    closeWs(){
      if(this.ws){
        console.log(`迈瑞T8关闭之前ws`)
        this.ws.close()
      }
    },
     //初始化数据
    initData(){
      console.log(`手术${this.operationNumber}的迈瑞T8初始化数据`)
      for(const key in this.params){
        this.params[key] = '--'
      }
    },
    onmessage(e){
      console.log(`手术${this.operationNumber}的迈瑞T8收到一条数据`)
      this.parseData(e.data)
    },
    parseData(data){
      const temp = JSON.parse(data)
      if(this.ecg.length > this.MAX_LENGTH){
        this.ecg.shift()
      }
      if(this.spo2.length > this.MAX_LENGTH){
        this.spo2.shift()
      }
      if(this.artMean.length > this.MAX_LENGTH){
        this.artMean.shift()
      }
      if(this.cvp.length > this.MAX_LENGTH){
        this.cvp.shift()
      }
      if(this.resp.length > this.MAX_LENGTH){
        this.resp.shift()
      }
      if(this.x.length > this.MAX_LENGTH){
        this.x.shift()
      }
      temp['ecgHeartRate'] != -1000 && this.ecg.push( temp['ecgHeartRate'] + Math.random())
      temp['spo2PercentOxygenSaturation'] != -1000 && this.spo2.push( temp['spo2PercentOxygenSaturation']+ Math.random())
      temp['artIbpMean'] != -1000 && this.artMean.push( temp['artIbpMean']+ Math.random())
      temp['cvp'] != -1000 && this.cvp.push( temp['cvp']+ Math.random())
      temp['respRespirationRate'] != -1000 && this.resp.push( temp['respRespirationRate']+ Math.random())
      temp['gmtCreate'] ? this.x.push(temp['gmtCreate'].split('T')[1]):this.x.push(this.$utils.getFormatterDate().HHMMSS)
      for(const key in temp){
        if(temp[key] != -1000){
          this.params[key] = temp[key]
        }
      }
    }
  },
  watch:{
    'operationNumber':{
      handler(newVal,oldVal){
        // console.log(1)
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
  },
}
</script>

<style scoped>
.center-box {
  position: absolute;
  top: 50%;
  left: 50px;
  transform: translateY(-50%);
}
.pos-center-box {
  position: absolute;
  overflow: hidden;
  width: 250px;
  top: 50%;
  left: 50%;
  transform: translateY(-50%) translateX(-50%);
}
.indicator-name {
  font-size: 20px;
  font-weight: bold;
}
.indicator-units {
  font-size: 14px;
  position: absolute;
  top:30px;
  left: 0;
  font-weight: bold;
}
.indicator-value {
  font-size: 60px;
  font-weight: bold;
  font-stretch: ultra-condensed;
}
.chart-wrapper {
  height: 110px;
}
.ecg-wrapper {
  position: relative;
  color: #25d804;
  height: 110px;
}
.spo2-wrapper {
  position: relative;
  color: #1ed8d9;
  height: 110px;
  width: 150px;
}
.pr-wrapper {
  position: relative;
  color: #1ed8d9;
  height: 110px;
  width: 150px;
}
.art-wrapper {
  position: relative;
  color: #fc232a;
  height: 110px;
}
.cvp-wrapper {
  position: relative;
  color: #87c0e7;
  height: 110px;
}
.resp-wrapper {
  position: relative;
  color: #f3cb26;
  height: 110px;
}
.nibp-wrapper {
  position: relative;
  color: #ffffff;
  height: 120px;
}
.temp-wrapper {
  position: relative;
  color: #ffffff;
  height: 120px;
}
.temp-left {
  width: 150px;
}
.temp-right {
  width: 100px;
  padding-top: 15px;
}
.temp-units {
  font-size: 14px;
  margin-right: 10px;
}
.temp-value {
  font-size: 40px;
  vertical-align:middle
}
.text-small {
  font-size: 50px !important;
  white-space: nowrap;
}
</style>