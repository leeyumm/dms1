<template>
  <div class="real-time-panel-wrapper">
    <div class="row-wrapper">
      <div class="chart-wrapper">
        <x-basic-chart 
        :showXLabel='false' 
        :yName="'心率'"
        :type="'line'"
        :color="['rgb(91,245,8)']"
        :source="{x:gmtCreates,EMG:hrs}"
        :areaStyle="null"
        >
        </x-basic-chart>
      </div>
      <div class="indicator-wrapper">
        <span class="indicator-label">
          <span>心率</span>
          <span>(bpm)</span>
          <span>120</span>
          <span>50</span>
        </span>
        <span class="indicator-num">{{hr}}</span>
      </div>
      <div class="indicator-wrapper">
        <div class="indicator-small">
        <span class="indicator-label-small">
          PVCs
         </span>
        <span class="indicator-num-small">
        {{pvcs}}
        </span>
      </div>
        <div class="indicator-small">
        <span class="indicator-label-small">
          ST
         </span>
          <span class="indicator-num-small">
        关
        </span>
        </div>
      </div>
    </div>
    <div class="row-wrapper">
      <div class="chart-wrapper">
        <x-basic-chart 
        :showXLabel='false' 
        :yName="'Art'"
        :type="'line'"
        :color="['rgb(223, 85, 106)']"
        :source="{x:gmtCreates,EMG:artMaps}"
        :areaStyle="null"
        >
        </x-basic-chart>
      </div>
      <div class="indicator-wrapper">
        <span class="indicator-label">
          <span>Art</span>
          <span>(mmHg)</span>
          <span>160</span>
          <span>90</span></span>
        <span class="indicator-num">
          <span>{{artSys}}/{{artDia}}</span><span>({{artMap}})</span>
        </span>
      </div>
    </div>
    <div class="row-wrapper">
      <div class="chart-wrapper">
        <x-basic-chart 
        :showXLabel='false' 
        :yName="'血氧'"
        :type="'line'"
        :color="['rgb(103,244,245)']"
        :source="{x:gmtCreates,EMG:spo2s}"
        :areaStyle="null"
        >
        </x-basic-chart>
      </div>
      <div class="indicator-wrapper">
        <span class="indicator-label">
          <span>血氧</span>
          <span>(%)</span>
          <span>100</span>
          <span>90</span></span>
          <span class="indicator-num">{{spo2}}</span>
      </div>
      <div class="indicator-wrapper">
        <span class="indicator-label">
          <span>脉率</span>
          <span>(bpm)</span>
          <span>120</span>
          <span>50</span></span>
        <span class="indicator-num">{{pr}}</span>
      </div>
    </div>
    <div class="row-wrapper">
      <div class="chart-wrapper">
        <x-basic-chart 
        :showXLabel='false' 
        :yName="'CVP'"
        :type="'line'"
        :color="['rgb(223, 85, 106)']"
        :source="{x:gmtCreates,EMG:cvpMaps}"
        :areaStyle="null"
        >
        </x-basic-chart>
      </div>
      <div class="indicator-wrapper">
        <span class="indicator-label">
          <span>CVP</span>
          <span>(mmHg)</span>
          <span>10</span>
          <span>0</span></span>
        <span class="indicator-num">{{cvpMap}}</span>
      </div>
      <div class="indicator-wrapper">
        <span class="indicator-label">
          <span>呼吸率</span>
          <span>(rpm)</span>
          <span>30</span>
          <span>0</span></span>
        <span class="indicator-num">{{rr}}</span>
      </div>
    </div>
    <div class="row-wrapper">
      <div class="chart-wrapper">
        <x-basic-chart 
        :showXLabel='false' 
        :yName="'血压'"
        :type="'line'"
        :color="['rgb(255,255,255)']"
        :source="{x:gmtCreates,EMG:nibpMaps}"
        :areaStyle="null"
        >
        </x-basic-chart>
      </div>
      <div class="indicator-wrapper">
        <span class="indicator-label">
          <span>血压</span>
          <span>(mmHg)</span>
          <span>160</span>
          <span>90</span></span>
        <span class="indicator-num">
          <span>{{nibpSys}}/{{nibpDia}}</span><span>({{nibpMap}})</span>
        </span>

      </div>
    </div>
    <div class="row-wrapper">
      <div class="chart-wrapper">
        <div class="row-wrapper">
        <div class="indicator-wrapper">
        <span class="indicator-label">
          <span>LAP</span>
          <span>(mmHg)</span>
          <span>10</span>
          <span>0</span></span>
          <span class="indicator-num">{{lapMap}}</span>
        </div>
        <div class="indicator-wrapper">
        <span class="indicator-label">
          <span>体温</span>
          <span>(℃)</span>
         </span>
          <span class="indicator-num-t">
          <span class="indicator-num-sub">
            <span class="label-small">T1</span><span class="number-small">{{temp1}}</span>
          </span>
          <span class="indicator-num-sub">
            <span class="label-small">T2</span><span class="number-small">{{temp2}}</span>
          </span>
          <span class="indicator-num-sub">
            <span class="label-small">TD</span><span class="number-small">{{this.tempD.toFixed(1)}}</span>
          </span>
          </span>
        </div>
        </div>
      </div>
      <div class="indicator-wrapper">
        <span class="indicator-label">
          <span>P2</span>
          <span>(mmHg)</span>
          <span>160</span>
          <span>90</span></span>
        <span class="indicator-num">
          <span>{{p2Sys}}/{{p2Dia}}</span><span>({{p2Map}})</span>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { createWs } from '@/api/websocket.js'
import xBasicChart from '@/components/share-components/xBasicChart'
import { getDevCode } from '@/global/devTypeCode'
export default {
  name: "EliteV8",
  components:{xBasicChart},
  props:['operationNumber','deviceCode'],
  data(){
    return{
      gmtCreates:[],
      hrs:[],
      artMaps:[],
      spo2s:[],
      cvpMaps:[],
      nibpMaps:[],
      MAX_LENGTH:20,
      hr:'--',
      pvcs:'--',
      artSys:'--',
      artDia:'--',
      artMap:'--',
      spo2:'--',
      pr:'--',
      cvpMap:'--',
      rr:'--',
      nibpSys:'--',
      nibpDia:'--',
      nibpMap:'--',
      p2Sys:'--',
      p2Dia:'--',
      p2Map:'--',
      lapMap:'--',
      temp1:0,
      temp2:0,
      DEV_CODE:getDevCode('LI_BANG_ELITEV8')
    }
  },
  computed:{
    tempD(){
      // if(this.temp1 === '--' || this.temp2 === '--'){
      //   return '--'
      // }
      return Math.abs(this.temp1 - this.temp2)
    }
  },
  methods:{
    openWs(operationNumber,deviceCode){
      this.closeWs()
      this.ws = createWs(operationNumber,deviceCode,this.$utils.getFormatterDate().timestamp)
      this.ws.onopen = function(){
        console.log(`采集-${operationNumber}的理邦V8${deviceCode}开启ws`)
      }
      this.ws.onmessage = this.onmessage
    },
    closeWs(){
      if(this.ws){
        console.log(`理邦V8关闭之前的ws`)
        this.ws.close()
      }
    },
    onmessage(e){
      console.log(`采集${this.operationNumber}的理邦V8收到一条数据`)
      // console.log(JSON.parse(e.data))
      const parsedData = JSON.parse(e.data)
      for(const key in parsedData){
        if(this[key] !== undefined && parsedData[key] != -1000){
          this[key] = parsedData[key]
        }
      }
      const lines = ['hrs','artMaps','spo2s','cvpMaps','nibpMaps','gmtCreates']
      const targets = ['hr','artMap','spo2','cvpMap','nibpMap','gmtCreate']
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
  .row-wrapper{
    box-sizing: border-box;
    position: relative;
    height: 115px;
    display: flex;
  }
  .chart-wrapper{
    box-sizing: border-box;
    flex: 0 0 550px;
    border-radius: 5px;
    margin-right: 2px;
  }

  .row-wrapper:not(:last-child) >.chart-wrapper{
    border:1px solid #eeeeee;
  }
  .indicator-wrapper{
    box-sizing: border-box;
    position: relative;
    flex: 1;
    padding: 2px 0;

  }
  .row-wrapper:first-child{
    color: rgb(91,245,8);
  }
  .row-wrapper:nth-child(2),.row-wrapper:last-child{
    color: rgb(223, 85, 106);
  }
  .row-wrapper:nth-child(3){
    color: rgb(103,244,245);
  }
  .row-wrapper:nth-child(4){
    color: rgb(253,72,98);
  }
  .row-wrapper:nth-child(4) > .indicator-wrapper:last-child{
    color: rgb(247,231,17);
  }
  .row-wrapper:nth-child(5){
    color: rgb(255,255,255);
  }
  .row-wrapper:last-child >.chart-wrapper > .row-wrapper >.indicator-wrapper:last-child{
    color: rgb(247,231,17);
  }
  .row-wrapper:first-child >.indicator-wrapper:nth-last-of-type(1){
    flex: 0.5;
  }
  .row-wrapper:last-child >.chart-wrapper > .row-wrapper{
    width: 280px;
  }
  .row-wrapper:last-child >.chart-wrapper > .row-wrapper >.indicator-wrapper{
    flex: 1;
  }
 
  .indicator-label{
    position: absolute;
    left:1px;
    font-size: 12px;
    transform: scale(0.9);
  }
  .indicator-label > span{
    display: block;
  }
  .indicator-label > span:nth-last-child(-n + 2){
    padding-left: 10px;
    text-align: right;
  }
  .indicator-num{
    position: absolute;
    top:50%;
    left:60%;
    transform: translateX(-50%) translateY(-50%);
    font-size: 55px;
  }
  .row-wrapper:nth-child(2) >.indicator-wrapper > .indicator-num{
    font-size: 25px;
  }
  .row-wrapper:nth-child(n+5) >.indicator-wrapper > .indicator-num{
    font-size: 25px;
  }
  .row-wrapper:nth-child(2) >.indicator-wrapper > .indicator-num > span:first-child {
    font-size: 45px;
  }
  .row-wrapper:nth-child(n+5) >.indicator-wrapper > .indicator-num > span:first-child{
    font-size: 45px;
  }
  .row-wrapper:nth-child(3) >.indicator-wrapper:last-child > .indicator-num{
    font-size: 40px;
  }
  .indicator-num-t{
    position: absolute;
    top:50%;
    left:60%;
    transform: translateX(-50%) translateY(-50%);
  }
  .indicator-num-sub{
    display: block;
  }
  .indicator-num-sub > .label-small{
    font-size: 10px;
  }
  .indicator-num-sub > .number-small{
    font-size: 24px;
    margin-left: 10px;
  }
  .indicator-small{
    margin-top: 20px;
  }
  .indicator-label-small,.indicator-num-small{
    font-size: 10px;
    font-weight: bold;
    /*color: rgb(91,245,8);*/
    padding: 8px;
  }
</style>
