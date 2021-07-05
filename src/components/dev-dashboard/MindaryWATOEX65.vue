<template>
  <div class="real-time-panel-wrapper">
    <!-- Ppeak Pmean peep -->
    <div class="xu-row">
      <div class="xu-col-3">
        <div class="ppeak-pmean-wrapper half-height">
          <div class="ppeak-wrapper">
            <span class="indicator-name">Ppeak</span>
            <span class="indicator-value indicator-value-pos">{{ params.pPeak }}</span>
          </div>
          <div class="pmean-wrapper">
            <span class="indicator-name">Pmean</span>
            <span class="indicator-units">cmH2O</span>
            <span class="indicator-value indicator-value-pos">{{ params.pMean }}</span>
          </div>
        </div>
      </div>
      <div class="xu-col-6">
        <div class="chart-wrapper half-height">
          <x-basic-chart
          :color="['#53d0c0']" 
          :yName="'Pmean'"
          :type="'line'"
          :source="{x:x,Pmean:pMean}"
          :showXLabel="false"
          :boundaryGap="false"
          :areaStyle="{color:'rgba(83, 208, 192, 0.4)'}"
          >
          </x-basic-chart>
        </div>
      </div>
      <div class="xu-col-3">
        <div class="peep-wrapper">
          <span class="indicator-name">PEEP</span>
          <span class="indicator-units">cmH2O</span>
          <span class="indicator-value indicator-value-pos">{{ params.peep}}</span>
        </div>
      </div>
    </div>
    <!-- MV TVe Rate FiO2 IE -->
    <div class="xu-row">
      <div class="xu-col-3">
        <div class="mv-tve-rate-fio2-wrapper half-height">
          <div class="mv-wrapper">
            <div class="indicator-name">MV</div>
            <div class="indicator-units">L/min</div>
            <div class="indicator-value indicator-value-pos">{{ params.mv }}</div>
            <div class="indicator-value-range">
              <p class="value-range">10.0</p>
              <p class="value-range">2.0</p>
            </div>
          </div>
          <div class="tve-wrapper">
            <div class="indicator-name">TVe</div>
            <div class="indicator-units">mL</div>
            <div class="indicator-value indicator-value-pos">{{ params.tve }}</div>
            <div class="indicator-value-range">
              <p class="value-range">1000</p>
              <p class="value-range">5</p>
            </div>
          </div>
          <div class="rate-wrapper">
            <div class="indicator-name">Rate</div>
            <div class="indicator-units">bpm</div>
            <div class="indicator-value indicator-value-pos">{{ params.rate }}</div>
            <div class="indicator-value-range">
              <p class="value-range">40</p>
              <p class="value-range">2</p>
            </div>
          </div>
          <div class="fio2-wrapper">
            <div class="indicator-name">fiO2</div>
            <div class="indicator-units">%</div>
            <div class="indicator-value indicator-value-pos">{{ params.fiO2 }}</div>
            <div class="indicator-value-range">
              <p class="value-range">100</p>
              <p class="value-range">21</p>
            </div>
          </div>
        </div>
      </div>
      <div class="xu-col-6">
        <div class="chart-wrapper half-height">
          <x-basic-chart
          :color="['#81bd5d']" 
          :yName="'MV'"
          :type="'line'"
          :source="{x:x,MV:mv}"
          :showXLabel="false"
          :boundaryGap="false"
          :areaStyle="{color:'rgba(129, 189, 93, 0.4)'}"
          >
          </x-basic-chart>
        </div>
      </div>
      <div class="xu-col-3">
        <div class="ie-wrapper">
          <span class="indicator-name">I:E</span>
          <span class="indicator-value indicator-value-pos">{{ params.ie }}</span>
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
      MAX_LENGTH:5,
      ws:null,
      DEV_CODE:getDevCode('MAI_RUI_WATOEX65'),
      x:[],
      pMean:[],
      mv:[],
      params:{
        fiO2:'--',
        ie:'--',
        mv:'--',
        peep:'--',
        pMean:'--',
        pPeak:'--',
        rate:'--',
        tve:'--'
      }
    }
  },
  methods:{
    openWs(operationNumber,deviceCode){
      this.closeWs()
      this.ws = createWs(operationNumber,deviceCode,this.$utils.getFormatterDate().timestamp)
      this.ws.onopen = function(){
        console.log(`手术${operationNumber}的迈瑞EX65${deviceCode}开启ws`)
      }
      this.ws.onmessage = this.onmessage  
    },
    closeWs(){
      if(this.ws){
        console.log(`迈瑞EX65关闭之前ws`)
        this.ws.close()
      }
    },
    initData(){
      console.log(`手术${this.operationNumber}的迈瑞EX65初始化数据`)
      for(const key in this.params){
        this.params[key] = '--'
      }
    },
    onmessage(e){
      console.log(`手术${this.operationNumber}的迈瑞EX65收到一条数据`)
      this.parseData(e.data)
    },
    parseData(data){
      const temp = JSON.parse(data)
      // console.log(temp)
      this.pushLimit(this.mv,this.MAX_LENGTH,temp['mv'])
      this.pushLimit(this.pMean,this.MAX_LENGTH,temp['pMean'])
      this.pushLimit(this.x,this.MAX_LENGTH,temp['gmtCreate'].split('T')[1])
      for(const key in temp){
        if(temp[key] != -1000){
          this.params[key] = temp[key]
        }
      }
    },
    pushLimit(arr,maxLen,ele){
      if(arr.length > maxLen){
        arr.shift()
      }
      ele == -1000 ? arr.push(0) : arr.push(ele)
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
.half-height {
  height: 340px;
}
.indicator-value-pos {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
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
  color: #acabab;
}
.indicator-value {
  font-size: 80px;
  font-weight: bold;
  font-stretch: ultra-condensed;
  line-height: 1em;
}
.ppeak-wrapper {
  position: relative;
  color: #53d0c0;
  height: 50%;
}
.pmean-wrapper {
  position: relative;
  color: #53d0c0;
  height: 50%;
}
.peep-wrapper {
  position: relative;
  color: #53d0c0;
  height: 100%;
}
.mv-wrapper,
.tve-wrapper,
.rate-wrapper,
.fio2-wrapper{
  position: relative;
  color: #81bd5d;
  height: 25%;
}
.ie-wrapper {
  position: relative;
  color: #82e4a9;
  height: 100%;
}
.indicator-value-range {
  position:absolute;
  right: 0;
  top: 50%;
  color: #acabab;
  transform: translateY(-50%);
  width: 30px;
}
.value-range {
  margin-bottom: 10px;
}
</style>