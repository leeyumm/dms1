<template>
  <div class="real-time-panel-wrapper">
    <!-- CH1 -->
    <div class="xu-row">
      <div class="xu-col-4">
        <div class="ch1-wrapper xu-clearfix">
          <div class="xu-float-left">
            <span class="ch-name">CH1</span>
            <ul class="ch-inner-indi-box">
              <li>
                <span class="params-name">△Hb</span>
                <span class="params-value">{{ params.chb1 }}</span>
                <span class="params-units">umol/L</span>
              </li>
              <li>
                <span class="params-name">△HbO2</span>
                <span class="params-value">{{ params.chbo21 }}</span>
                <span class="params-units">umol/L</span>
              </li>
              <li>
                <span class="params-name">△tHb</span>
                <span class="params-value">{{ params.cthb1 }}</span>
                <span class="params-units">umol/L</span>
              </li>
            </ul>
          </div>
          <div class="xu-float-right ch-inner-panel">
            <p>TOI %</p>
            <p class="large-value">{{ params.toi1 }}</p>
            <p>
              <span class="params-name">THI</span>
              <span>{{ params.thi1 }}</span>
            </p>
          </div>
        </div>
      </div>
      <div class="xu-col-8">
        <div class="chart-wrapper">
          <x-basic-chart
          :color="['#0f94ff']" 
          :yName="'TOI'"
          :type="'line'"
          :source="{x:x,TOI:toi1}"
          :areaStyle="null"
          :showXLabel="false"
          >
          </x-basic-chart>
        </div>
      </div>
    </div>
    <!-- CH2 -->
    <div class="xu-row">
      <div class="xu-col-4">
        <div class="ch2-wrapper xu-clearfix">
          <div class="xu-float-left">
            <span class="ch-name">CH2</span>
            <ul class="ch-inner-indi-box">
              <li>
                <span class="params-name">△Hb</span>
                <span class="params-value">{{ params.chb2 }}</span>
                <span class="params-units">umol/L</span>
              </li>
              <li>
                <span class="params-name">△HbO2</span>
                <span class="params-value">{{ params.chbo22 }}</span>
                <span class="params-units">umol/L</span>
              </li>
              <li>
                <span class="params-name">△tHb</span>
                <span class="params-value">{{ params.cthb2 }}</span>
                <span class="params-units">umol/L</span>
              </li>
            </ul>
          </div>
          <div class="xu-float-right ch-inner-panel">
            <p>TOI %</p>
            <p class="large-value">{{ params.toi2 }}</p>
            <p>
              <span class="params-name">THI</span>
              <span>{{ params.thi2 }}</span>
            </p>
          </div>
        </div>
      </div>
      <div class="xu-col-8">
        <div class="chart-wrapper">
          <x-basic-chart
          :color="['#b7e723']" 
          :yName="'TOI'"
          :type="'line'"
          :source="{x:x,TOI:toi2}"
          :areaStyle="null"
          :showXLabel="false"
          >
          </x-basic-chart>
        </div>
      </div>
    </div>
    <!-- CH3 -->
    <div class="xu-row">
      <div class="xu-col-4">
        <div class="ch3-wrapper xu-clearfix">
          <div class="xu-float-left">
            <span class="ch-name">CH3</span>
            <ul class="ch-inner-indi-box">
              <li>
                <span class="params-name">△Hb</span>
                <span class="params-value">{{ params.chb3 }}</span>
                <span class="params-units">umol/L</span>
              </li>
              <li>
                <span class="params-name">△HbO2</span>
                <span class="params-value">{{ params.chbo23 }}</span>
                <span class="params-units">umol/L</span>
              </li>
              <li>
                <span class="params-name">△tHb</span>
                <span class="params-value">{{ params.cthb3 }}</span>
                <span class="params-units">umol/L</span>
              </li>
            </ul>
          </div>
          <div class="xu-float-right ch-inner-panel">
            <p>TOI %</p>
            <p class="large-value">{{ params.toi3 | fixNum}}</p>
            <p>
              <span class="params-name">THI</span>
              <span>{{ params.thi3 }}</span>
            </p>
          </div>
        </div>
      </div>
      <div class="xu-col-8">
        <div class="chart-wrapper">
          <x-basic-chart
          :color="['#f19037']" 
          :yName="'TOI'"
          :type="'line'"
          :source="{x:x,TOI:toi3}"
          :areaStyle="null"
          :showXLabel="false"
          >
          </x-basic-chart>
        </div>
      </div>
    </div>
    <!-- CH4 -->
    <div class="xu-row">
      <div class="xu-col-4">
        <div class="ch4-wrapper xu-clearfix">
          <div class="xu-float-left">
            <span class="ch-name">CH4</span>
            <ul class="ch-inner-indi-box">
              <li>
                <span class="params-name">△Hb</span>
                <span class="params-value">{{ params.chb4 }}</span>
                <span class="params-units">umol/L</span>
              </li>
              <li>
                <span class="params-name">△HbO2</span>
                <span class="params-value">{{ params.chbo24 }}</span>
                <span class="params-units">umol/L</span>
              </li>
              <li>
                <span class="params-name">△tHb</span>
                <span class="params-value">{{ params.cthb4 }}</span>
                <span class="params-units">umol/L</span>
              </li>
            </ul>
          </div>
          <div class="xu-float-right ch-inner-panel">
            <p>TOI %</p>
            <p class="large-value">{{ params.toi4 }}</p>
            <p>
              <span class="params-name">THI</span>
              <span>{{ params.thi4 }}</span>
            </p>
          </div>
        </div>
      </div>
      <div class="xu-col-8">
        <div class="chart-wrapper">
          <x-basic-chart
          :color="['#cac9fd']" 
          :yName="'TOI'"
          :type="'line'"
          :source="{x:x,TOI:toi4}"
          :areaStyle="null"
          :showXLabel="false"
          >
          </x-basic-chart>
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
      DEV_CODE:getDevCode('AI_QIN_EGOS600A'),
      x:[],
      toi1:[],
      toi2:[],
      toi3:[],
      toi4:[],
      params:{
        chb1:'--',
        chbo21:'--',
        cthb1:'--',
        toi1:'--',
        thi1:'--',
        chb2:'--',
        chbo22:'--',
        cthb2:'--',
        toi2:'--',
        thi2:'--',
        chb3:'--',
        chbo23:'--',
        cthb3:'--',
        toi3:'--',
        thi3:'--',
        chb4:'--',
        chbo24:'--',
        cthb4:'--',
        toi4:'--',
        thi4:'--',
      }
    }
  },
  methods:{
    openWs(operationNumber,deviceCode){
      this.closeWs()
      this.ws = createWs(operationNumber,deviceCode,this.$utils.getFormatterDate().timestamp)
      this.ws.onopen = function(){
        console.log(`手术${operationNumber}的爱琴${deviceCode}开启ws`)
      }
      this.ws.onmessage = this.onmessage  
    },
    closeWs(){
      if(this.ws){
        console.log(`爱琴关闭之前ws`)
        this.ws.close()
      }
    },
    //初始化数据
    initData(){
      console.log(`手术${this.operationNumber}的爱琴初始化数据`)
      for(const key in this.params){
        this.params[key] = '--'
      }
    },
    parseData(data){
      const temp = JSON.parse(data)
      console.log(temp)
      // console.log(temp['gmtCreate'].split(' ')[1])
      // console.log(this.toi3.length)
      if(this.toi1.length > this.MAX_LENGTH){
        this.toi1.shift()
      }

      if(this.toi2.length > this.MAX_LENGTH){
        this.toi2.shift()
      }

      if(this.toi3.length > this.MAX_LENGTH){
        this.toi3.shift()
      }
      
      if(this.toi4.length > this.MAX_LENGTH){
        this.toi4.shift()
      }


      if(this.x.length > this.MAX_LENGTH){
        this.x.shift()
      }
      temp['toi1'] != -1000 && this.toi1.push(temp['toi1'])
      temp['toi2'] != -1000 && this.toi2.push(temp['toi2'])
      temp['toi3'] != -1000 && this.toi3.push(temp['toi3'])
      temp['toi4'] != -1000 && this.toi4.push(temp['toi4'])
      this.x.push(temp['gmtCreate'].split('T')[1])

      for(const key in temp){
        if(key.includes('thi') && temp[key] != -1000){
          this.params[key] = parseFloat(temp[key]).toFixed(3)
        } else if(temp[key] != -1000 && this.params[key] !== undefined){
          this.params[key] = parseFloat(temp[key]).toFixed(1)
        }
      }
    },
    onmessage(e){
      console.log(`手术${this.operationNumber}的爱琴收到一条数据`)
      this.parseData(e.data)
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
  filters:{
    fixNum(value){
      if(value !== '--'){
        return Number(value).toFixed(1)
      } else {
        return '--'
      }
    }
  },
  beforeDestroy(){
    this.closeWs()
  },
}
</script>

<style scoped>
.chart-wrapper {
  height: 145px;
  margin-bottom: 30px;
  border: 1px solid #f1f1f1
}
.ch-name {
  font-size: 50px;
  font-weight: bold;
}
.large-value {
  font-size: 50px;
  margin: 5px 0;
}
.ch-inner-indi-box {
  font-size: 13px;
}
.params-name {
  display: inline-block;
  width: 47px;
}
.params-value {
  display: inline-block;
  width: 32px;
}
.ch-inner-panel {
  background-color: #000000;
  border-radius: 10px;
  padding: 4px 10px;
  box-shadow: 0 0 2px 2px #cccccc inset;
  min-width: 100px;
}
.ch1-wrapper {
  background-color: #0f94ff;
  color: #ffffff;
  border-radius: 10px;
  padding: 15px 5px;
}
.ch2-wrapper {
  background-color: #b7e723;
  color: #ffffff;
  border-radius: 10px;
  padding: 15px 5px;
}
.ch3-wrapper {
  background-color: #f19037;
  color: #ffffff;
  border-radius: 10px;
  padding: 15px 5px;
}
.ch4-wrapper {
  background-color: #cac9fd;
  color: #ffffff;
  border-radius: 10px;
  padding: 15px 5px;
}
</style>