<template>
  <div class="real-time-panel-wrapper">
    <div class="chart-wrapper">
      <div class="chart-top">
        <x-basic-chart 
        :xName="'时间'"
        :showXLabel='false' 
        :yName="'EMG'"
        :type="'line'"
        :color="['#cd6765']"
        :source="{x:x,EMG:EMGLOWS}"
        :areaStyle="null"
        >
        </x-basic-chart>
      </div>
      <div class="chart-bottom">
        <x-basic-chart 
        :xName="'时间'"
        :showXLabel='false' 
        :yName="'BIS'"
        :type="'line'"
        :color="['#fffd36']"
        :source="{x:x,EMG:BISs}"
        :areaStyle="null"
        >
        </x-basic-chart>
      </div>
    </div>
    <div class="indicator-wrapper">
      <div class="indicator-top">
        <div>
          <span class="indicator-label">BIS</span>
          <span class="indicator-num">{{ BIS }}</span>
        </div>
      </div>
      <div class="indicator-bottom">
        <div>
          <span class="indicator-label">SEF</span>
          <span class="indicator-num">{{ SEF }}</span>
        </div>
        <div>
          <span class="indicator-label">SQI</span>
          <span class="indicator-num">{{ SQI }}</span>
        </div>
      </div>
    </div>
    <div class="process">
      <div class="background"></div>
      <div class="show" :style="EmgShow"></div>
    </div>
  </div>
</template>

<script>
import { createWs } from '@/api/websocket.js'
import xBasicChart from '@/components/share-components/xBasicChart'
import { getDevCode } from '@/global/devTypeCode'
export default {
  name: "EegVista",
  props:['operationNumber','deviceCode'],
  components: {
    xBasicChart
  },
  data() {
    return {
      BIS: "--",
      BISBIT: "--",
      EMGLOW: 10,
      EMGLOWS:[],
      BISs:[],
      EMGLOWshow: "",
      SQI: "--",
      IMPEDNCE: "--",
      SEF: "--",
      ws:null,
      MAX_LENGTH:10,
      x:[],
      DEV_CODE:getDevCode('MEI_DUN_LI_EEG_VISTA')
    };
  },
  computed: {
    EmgShow() {
      if(this.EMGLOW > 100){
        this.EMGLOW = 100
      }
      if(this.EMGLOW < 0){
        this.EMGLOW = 0
      }
      this.EMGLOWshow = (100 - this.EMGLOW) * 1.9;
      return {
        height: this.EMGLOWshow + "px",
        backgroundColor: "#778ca2",
        width: "30px",
        position: "absolute",
        top: "10px",
        left: "10px",
      };
    },
  },
  methods:{
    openWs(operationNumber,deviceCode){
      this.closeWs()
      this.ws = createWs(operationNumber,deviceCode,this.$utils.getFormatterDate().timestamp)
      this.ws.onopen = function(){
        console.log(`手术${operationNumber}的美敦力${deviceCode}开启ws`)
      }
      this.ws.onmessage = this.onmessage

    },
    closeWs(){
      if(this.ws){
        console.log(`美敦力关闭之前的ws`)
        this.ws.close()
      }
    },
    parseData(data){
      // console.log(JSON.parse(data))
      const {bis1:BIS,sqi1:SQI,emglow1:EMGLOW,sef1:SEF,gmtCreate} = JSON.parse(data)
      this.EMGLOWS.length > this.MAX_LENGTH ? this.EMGLOWS.shift() : ''
      this.BISs.length > this.MAX_LENGTH ? this.BISs.shift() : ''
      this.x.length > this.MAX_LENGTH ? this.x.shift() : ''
      this.x.push(gmtCreate.split('T')[1])
      this.BIS = BIS > 0 ? BIS : '--'
      this.SQI = SQI > 0 ? SQI : '--'
      this.EMGLOW = EMGLOW > 0 ? EMGLOW : '--'
      this.SEF = SEF > 0 ? SEF : '--'
      EMGLOW > 0 ? this.EMGLOWS.push(EMGLOW) : this.EMGLOWS.push(0)
      BIS > 0 ? this.BISs.push(BIS) : this.BIS.push(0)
    },
    onmessage(e){
      console.log(`采集${this.operationNumber}的美敦力收到一条数据`)
      this.parseData(e.data)
    }
  },
  watch:{
    'operationNumber':{
      handler(newVal,oldVal){
        if(this.deviceCode == this.DEV_CODE){
          // this.initData()
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
};
</script>

<style scoped>
/* .real-time-panel-wrapper {
  padding: 15px;
  background-color: #778ca2;
  box-sizing: border-box;
  position: relative;
  height: 720px;
  width: 830px;
  padding: 15px;
  border: 25px solid #e5e5e5;
  border-radius:2%;
  position: relative;
} */
.chart-wrapper {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-right: 10px;
  margin-top: 20px;
}
.chart-bottom {
  height: 320px;
  width: 580px;
  margin-top: 90px;
  margin-bottom: 10px;
  border: 1px solid #eeeeee;
  border-radius: 5px;
}
.chart-top {
  height: 210px;
  width: 470px;
  border: 1px solid #eeeeee;
  border-radius: 5px;
  margin-top: 10px;
}
/* .indicator-wrapper {
  display: flex;
  flex-direction: column;
} */
.indicator-top,
.indicator-bottom > div {
  flex: 1;
  border-radius: 10px;
  height: 100%;
  position: relative;
  box-sizing: border-box;
  border: 1px solid #eeeeee;
}
.indicator-top,
.indicator-bottom {
  /* flex: 1; */
  display: flex;
  flex-direction: column;
  position: absolute;
  left: 20px;
}
.indicator-bottom {
  bottom: 50px;
  width: 180px;
  height: 325px;
}
.indicator-top {
  top: 40px;
  width: 180px;
  height: 215px;
}
.indicator-top > div:first-child {
  color: #fffd36;
}
.indicator-bottom > div:first-child {
  color: #fdae96;
  margin-bottom: 15px;
}
.indicator-bottom > div:last-child {
  color: #5bf751;
}
.indicator-label {
  position: absolute;
  top: 20px;
  left: 20px;
}
.indicator-num {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
}
.indicator-top .indicator-label {
  font-size: 30px;
}
.indicator-top .indicator-num {
  font-size: 60px;
}
.indicator-bottom .indicator-label {
  font-size: 20px;
}
.indicator-bottom .indicator-num {
  font-size: 50px;
}
.process {
  border: 4px solid white;
  width: 50px;
  height: 210px;
  position: absolute;
  top: 40px;
  left: 240px;
  border-radius: 5px;
}
.process .background {
  border: 2px solid white;
  background-color: #cd6765;
  width: 30px;
  height: 190px;
  margin: 8px;
}
.show {
  transition: height 300ms ease 0s;
}
</style>
