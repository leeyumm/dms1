<template>
  <div class="real-time-panel-wrapper">
    <div class="demo-hint">演示模式</div>
    <div class="chart-wrapper">
      <x-basic-chart 
      :xName="'时间'" 
      :yName="'EMG'"
      :yMax="150"
      :type="'line'"
      :smooth="true"
      :source="{x:x,EMG:EMG}"
      :color="['#fffd36']"
      :showXLabel='false'
      :areaStyle="null"
      :symbol="'none'"
      >
      </x-basic-chart>
    </div>
    <div class="indicator-wrapper">
      <div>
        <span class="indicator-label">CSI</span>
        <span class="indicator-num">{{ CSI }}</span>
      </div>
      <div>
        <span class="indicator-label">BS</span>
        <span class="indicator-num">{{ BS }}</span>
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
export default {
  components:{xBasicChart},
  data(){
    return {
      MAX_LENGTH:100,
      periodData:[60,60.2,62,60.2,59,90,58,59,58.5,60,59.5,60,60,60,60,60,60,60,60],
      x:this.initWaveData()['x'],//[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15], //时间
      EMG:this.initWaveData()['EMG'],//[60,60.2,62,60.2,59,95,58,59,58.5,60,59.5,60,60,60,60],
      CSI:40,
      BS:50,
      SQI:45,
      timer:null,
    }
  },
  methods:{
    initWaveData(){ 
      const periodData = [60,60.2,62,60.2,59,90,58,59,58.5,60,59.5,60,60,60,60,60,60,60,60];
      const x = []
      const EMG = []
      for(let i=0;i<80;i++){
        const data = periodData.shift()
        EMG.push(data + this.getRandomNumber(1,5))
        x.push(i+1)
        periodData.push(data)
      }
      return {x,EMG}
    },
    getRandomNumber(min,max){
      return Math.floor((Math.random() - 0.5)*(max-min))
    },
    cbGenerateData(){
      const data = this.periodData.shift()
      const x = this.x[this.x.length - 1]
      this.EMG.shift()
      this.x.shift()
      this.EMG.push(this.getRandomNumber(5,15) + data)
      this.x.push(x+1)
      this.periodData.push(data)
      this.CSI = 40 + this.getRandomNumber(-5,5)
      this.BS = 50 + this.getRandomNumber(-5,5)
      this.SQI = 45 + this.getRandomNumber(-5,5)
    }
  },
  mounted(){
    console.log('进入演示模式')
    this.timer = setInterval(this.cbGenerateData,2000)
  },
  beforeDestroy(){
    console.log('退出演示模式')
    clearInterval(this.timer)
  }
}
</script>

<style scoped>
.chart-wrapper {
  height: 400px;
  margin-bottom: 15px;
}
.indicator-wrapper {
  display: flex;
  height: 268px;
}
.indicator-wrapper > div {
  flex: 1;
  border-radius: 10px;
  height: 100%;
  position: relative;
  box-sizing: border-box;
}
.indicator-wrapper > div:first-child {
  color: #fffd36;
}
.indicator-wrapper > div:nth-child(2){
  margin: 0 10px;
  color: #fdae96;
}
.indicator-wrapper > div:last-child {
  color: #5bf751;
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
.demo-hint {
  position: absolute;
  top:40%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  background-color:rgba(120, 120, 120, 0.5);
  padding: 10px 30px;
  font-size: 60px;
  color: #cccccc;
}
</style>