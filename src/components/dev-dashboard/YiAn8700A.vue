<template>
  <div class="real-time-panel-wrapper">
    <div class="left">
      <div class=" params-wrapper n2o-box-wrapper">
        <span class="params-title">N2O</span>
        <span class="params-units">L/min</span>
        <span class="params-value">{{ params.n2o }}</span>
      </div>
      <div class=" params-wrapper air-box-wrapper">
        <span class="params-title">AIR</span>
        <span class="params-units">L/min</span>
        <span class="params-value">{{ params.air }}</span>
      </div>
      <div class=" params-wrapper o2-box-wrapper">
        <span class="params-title">O2</span>
        <span class="params-units">L/min</span>
        <span class="params-value">{{ params.o2 }}</span>
      </div>
    </div>
    <div class="right">
      <!-- 气压参数 -->
      <div class="pressure-box-wrapper">
        <div class="params-title">Pressure</div>
        <div class="column-split-wrapper xu-clearfix">
          <div class="xu-float-left">
            <p class="params-title">PEAK</p>
            <p class="params-units">cmH2O</p>
          </div>
          <div class="xu-float-right">
            <p class="params-value">{{ params.peak }}</p>
          </div>
        </div>
        <div class="column-split-wrapper xu-clearfix">
          <div class="xu-float-left">
            <p class="params-title">MEAN</p>
            <p class="params-units">cmH2O</p>
          </div>
          <div class="xu-float-right">
            <p class="params-value">{{ params.pmean }}</p>
          </div>
        </div>
        <div class="column-split-wrapper xu-clearfix">
          <div class="xu-float-left">
            <p class="params-title">PEEP</p>
            <p class="params-units">cmH2O</p>
          </div>
          <div class="xu-float-right">
            <p class="params-value">{{ params.peep }}</p>
          </div>
        </div>
      </div>
      <!-- 流量参数 -->
      <div class="volume-box-wrapper">
        <div class="params-title">Volume</div>
        <div class="column-split-wrapper xu-clearfix">
          <div class="xu-float-left">
            <p class="params-title">MV</p>
            <p class="params-units">L/min</p>
          </div>
          <div class="xu-float-right">
            <p class="params-value">{{ params.mv }}</p>
          </div>
        </div>
        <div class="column-split-wrapper xu-clearfix">
          <div class="xu-float-left">
            <p class="params-title">VT</p>
            <p class="params-units">mL</p>
          </div>
          <div class="xu-float-right">
            <p class="params-value">{{ params.vte }}</p>
          </div>
        </div>
        <div class="column-split-wrapper xu-clearfix">
          <div class="xu-float-left">
            <p class="params-title">Freq</p>
            <p class="params-units">bpm</p>
          </div>
          <div class="xu-float-right">
            <p class="params-value">{{ params.freq }}</p>
          </div>
        </div>
      </div>

      <!-- 氧气参数 -->
      <div class="oxygen-box-wrapper">
        <div class="params-title">O2</div>
        <div class="column-split-wrapper xu-clearfix">
          <div class="xu-float-left">
            <p class="params-title">FiO2</p>
            <p class="params-units">L/min</p>
          </div>
          <div class="xu-float-right">
            <p class="params-value">{{ params.fico2 }}</p>
          </div>
        </div>
      </div>
      <!-- 二氧化碳参数 -->
      <div class="carbon-dioxide-box-wrapper">
        <div class="params-title">CO2</div>
        <div class="column-split-wrapper xu-clearfix">
          <div class="xu-float-left">
            <p class="params-title">etCO2</p>
            <p class="params-units">mmHg</p>
          </div>
          <div class="xu-float-right">
            <p class="params-value">{{ params.etco2 }}</p>
          </div>
        </div>
        <div class="column-split-wrapper xu-clearfix">
          <div class="xu-float-left">
            <p class="params-title">FiCO2</p>
            <p class="params-units">mmHg</p>
          </div>
          <div class="xu-float-right">
            <p class="params-value">{{ params.fico2 }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { createWs } from '@/api/websocket.js'
import { getDevCode } from '@/global/devTypeCode'

export default {
  props:['operationNumber','deviceCode'],
  data(){
    return {
      DEV_CODE:getDevCode('YI_AN_8700A'),
      ws:null,
      params:{
        peak:'--',
        pmean:'--',
        peep:'--',
        mv:'--',
        vte:'--',
        freq:'--',
        fio2:'--',
        etco2:'--',
        fico2:'--',
        n2o:'--',
        air:'--',
        o2:'--'
      }
    }
  },
  methods:{
    openWs(operationNumber,deviceCode){
      this.closeWs()
      this.ws = createWs(operationNumber,deviceCode,this.$utils.getFormatterDate().timestamp)
      this.ws.onopen = function(){
        console.log(`手术${operationNumber}的宜安${deviceCode}开启ws`)
      }
      this.ws.onmessage = this.onmessage  
    },
    closeWs(){
      if(this.ws){
        console.log(`宜安关闭之前ws`)
        this.ws.close()
      }
    },
    //初始化数据
    initData(){
      console.log(`手术${this.operationNumber}的宜安初始化数据`)
      for(const key in this.params){
        this.params[key] = '--'
      }
    },
    parseData(data){
      const temp = JSON.parse(data)
      // console.log(temp)
      for(const key in temp){
        this.params[key] = temp[key]
      }
    },
    onmessage(e){
      console.log(`手术${this.operationNumber}的宜安收到一条数据`)
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
.left {
  width: 390px;
  float: left;
}
.right {
  width: 390px;
  float: right;
}
.pressure-box-wrapper {
  color: #ffffff;
  padding: 5px;
  border: 1px solid #ffffff;
  margin-bottom: 10px;
}
.volume-box-wrapper {
  color: #99d3ec;
  padding: 5px;
  border: 1px solid #ffffff;
  margin-bottom: 10px;
}
.oxygen-box-wrapper {
  color: #97f28e;
  border: 1px solid #ffffff;
  padding: 5px;
  margin-bottom: 10px;
}
.carbon-dioxide-box-wrapper {
  color: #f5c239;
  border: 1px solid #ffffff;
  padding: 5px;
}
.params-title {
  font-size: 30px;
}
.params-units {
  font-size: 14px;
  color: #ffffff;
}
.params-value {
  font-size: 40px;
  font-weight: bold;
  margin-right: 20px;
}
.params-wrapper {
  position: relative;
  height: 220px;
  border: 2px solid #ffffff;
  box-sizing: border-box;
  padding: 10px;
  border-radius: 10px;
}
.params-wrapper > .params-value {
  position: absolute;
  top:50%;
  left: 50%;
  transform: translateY(-50%) translateX(-50%);
  font-size: 70px;
  font-weight: normal;
}
.n2o-box-wrapper {
  background-color: #e4e4e4;
  margin-bottom: 5px;
}
.air-box-wrapper {
  background-color: #cccccc;
  margin-bottom: 5px;
}
.o2-box-wrapper {
  background-color: #79b2f5;
}
</style>