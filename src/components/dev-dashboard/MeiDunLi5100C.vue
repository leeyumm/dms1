<template>
  <div class="real-time-panel-wrapper">
    <div class="xu-row">
      <div class="xu-col-7">
        <div class="chart-wrapper">
          <x-basic-chart 
          :showXLabel='false' 
          :yName="'lal(L)'"
          :type="'line'"
          :color="['rgb(111,171,232)']"
          :source="{x:gmtCreates,EMG:lalLs}"
          :areaStyle="null"
          >
          </x-basic-chart>
        </div>
      </div>
      <div class="xu-col-5">
        <div class="indicator-wrapper">
          <div class="indicator-name">L&nbsp;{{oxygenSaturationL}}</div>
          <div class="channel-number bg1">1</div>
        </div>
      </div>
    </div>
    <div class="xu-row">
      <div class="xu-col-7">
        <div class="chart-wrapper">
          <x-basic-chart 
          :showXLabel='false' 
          :yName="'lal(R)'"
          :type="'line'"
          :color="['rgb(201,204,223)']"
          :source="{x:gmtCreates,EMG:lalRs}"
          :areaStyle="null"
          >
          </x-basic-chart>
        </div>
      </div>
      <div class="xu-col-5">
        <div class="indicator-wrapper">
          <div class="indicator-name">R&nbsp;{{oxygenSaturationR}}</div>
          <div class="channel-number bg2">2</div>
        </div>
      </div>
    </div>
    <div class="xu-row">
      <div class="xu-col-7">
        <div class="chart-wrapper">
          <x-basic-chart 
          :showXLabel='false' 
          :yName="'lal(S1)'"
          :type="'line'"
          :color="['rgb(218, 143, 51)']"
          :source="{x:gmtCreates,EMG:lalS1s}"
          :areaStyle="null"
          >
          </x-basic-chart>
        </div>
      </div>
      <div class="xu-col-5">
        <div class="indicator-wrapper">
          <div class="indicator-name">S&nbsp;{{oxygenSaturationS1}}</div>
          <div class="s-number">1</div>
          <div class="channel-number bg3">3</div>
        </div>
      </div>
    </div>
    <div class="xu-row">
      <div class="xu-col-7">
        <div class="chart-wrapper">
          <x-basic-chart 
          :showXLabel='false' 
          :yName="'lal(S2)'"
          :type="'line'"
          :color="['rgb(78, 207, 26)']"
          :source="{x:gmtCreates,EMG:lalS2s}"
          :areaStyle="null"
          >
          </x-basic-chart>
        </div>
      </div>
      <div class="xu-col-5">
        <div class="indicator-wrapper">
          <div class="indicator-name">S&nbsp;{{oxygenSaturationS2}}</div>
          <div class="s-number">2</div>
          <div class="channel-number bg4">4</div>
        </div>
      </div>
    </div>
    
  </div>
</template>

<script>
import { createWs } from '@/api/websocket.js'
import xBasicChart from '@/components/share-components/xBasicChart'
import { getDevCode } from '@/global/devTypeCode'
export default {
  components:{xBasicChart},
  props:['operationNumber','deviceCode'],
  data(){
    //一定要保留整数，不然页面会出现错位
    return {
      oxygenSaturationL:'--',
      oxygenSaturationR:'--',
      oxygenSaturationS1:'--',
      oxygenSaturationS2:'--',
      lalLs:[],
      lalRs:[],
      lalS1s:[],
      lalS2s:[],
      gmtCreates:[],
      MAX_LENGTH:20,
    }
  },
  methods:{
    openWs(operationNumber,deviceCode){
      this.closeWs()
      this.ws = createWs(operationNumber,deviceCode,this.$utils.getFormatterDate().timestamp)
      this.ws.onopen = function(){
        console.log(`采集-${operationNumber}的美敦力5100C${deviceCode}开启ws`)
      }
      this.ws.onmessage = this.onmessage
    },
    closeWs(){
      if(this.ws){
        console.log(`美敦力5100C关闭之前的ws`)
        this.ws.close()
      }
    },
    onmessage(e){
      console.log(`采集${this.operationNumber}的理邦美敦力5100C收到一条数据`)
      // console.log(JSON.parse(e.data))
      const parsedData = JSON.parse(e.data)
      for(const key in parsedData){
        if(this[key] !== undefined && parsedData[key] != -1000){
          this[key] = Math.floor(parsedData[key])
        }
      }
      const lines = ['lalLs','lalRs','lalS1s','lalS2s','gmtCreates']
      const targets = ['lalL','lalR','lalS1','lalS2','gmtCreate']
      for(const elm of lines){
        if(this[elm].length > this.MAX_LENGTH){
          this[elm].shift()
        }
      }
      for(const target of targets){
        if(parsedData[target] != -1000){
          this[target + 's'].push(parsedData[target])
        }
      }
    }
  },
  created(){
    this.openWs(this.operationNumber,this.deviceCode)
  },
  beforeDestroy(){
    this.closeWs()
  }
}
</script>

<style scoped>
.chart-wrapper,
.indicator-wrapper{
  height: 160px;
  margin-bottom: 15px;
  box-sizing: border-box;
}
.chart-wrapper {
  border: 1px solid #f1f1f1;
}
.indicator-wrapper {
  color: #ffffff;
  position: relative;
}
.indicator-name {
  font-size: 120px;
  font-weight: bold;
  line-height: 110px;
}
.channel-number {
  font-size: 24px;
  width: 40px;
  margin-top: 6px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  border-radius: 50%;
  margin-left: 20px;
}
.s-number {
  font-size: 20px;
  color: #ffffff;
  position: absolute;
  left: 80px;
  bottom: 60px;
}
.bg1 {
  background-color: rgb(111,171,232);
}
.bg2 {
  background-color: rgb(201,204,223);
}
.bg3 {
  background-color: rgb(218, 143, 51);
}
.bg4 {
  background-color: rgb(78, 207, 26);
}
</style>
