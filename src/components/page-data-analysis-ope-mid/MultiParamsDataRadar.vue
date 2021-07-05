<template>
  <x-box>
    <div class="chart-wrapper">
      <div class="choose-wrapper">
        <x-select v-model="selectDevType" :options="Object.keys(devTypeCode)"></x-select>
      </div>
      <x-radar-chart :option="option"></x-radar-chart>
    </div>
  </x-box>
</template>

<script>
import xBox from '@/x-views/xBox'
import xSelect from '@/x-views/xSelect'
import xRadarChart from '@/components/share-components/xRadarChart'
import {getTypeCodes} from '@/global/devTypeCode'

export default {
  components:{
    xBox,
    xSelect,
    xRadarChart
  },
  data(){
    return {
      selectDevType:Object.keys(getTypeCodes())[0],
      devTypeCode:getTypeCodes(),
      option:{}
    }
  },
  methods:{
    getData(devType){
      const type = this.devTypeCode[devType]
      this.$http['getDevPerformanceEvaluationRadar']({params:{deviceType:type}})
      .then(res => {
        const {data} = res
        const radarData = []
        data.forEach(elm => {
          radarData.push({
            value:[
              1-elm["averageDropRate"],
              1-elm['errorRate'],
              elm['averageExperienceLevel'],
              elm['averageReliabilityLevel'],
              elm['totalCollectionOperationTimes']
            ],
            name:elm['deviceName'],
            areaStyle: {
              color:"rgba(220,220,220,0.4)"
            },
          })
        })
        this.option = this.initOption(radarData)
      })
      .catch(e => {
        console.log('获取或者解析仪器多指标分析数据出错')
        console.log(e)
      })
    },
    //初始化雷达图的option
    initOption(data){
      return {
        color:['#3fb1e3','#6be6c1','#626c91','#a0a7e6','#c4ebad','#96dee8','#c12e34'],
        tooltip: {},
        legend: {
          left:'left',
          orient:'vertical'
        },
        radar:{
          name:{
            textStyle:{
              color: '#111',
              borderRadius: 3,
              padding: [5, 5]
            }
          },
          indicator:[
            {name:'在线率',max:1},
            {name:'临床可靠性',max:1},
            {name:'临床使用体验',max:5},
            {name:'临床使用满意度',max:5},
            {name:'采集场次'}
          ],
          radius:'80%',
          splitArea:false,
        },
        series:[{
          type:'radar',
          data:data
        }]
      }
    }
  },
  watch:{
    selectDevType(newVal){
      this.getData(newVal)
    }
  },
  created(){
    this.getData(this.selectDevType)
  }
}
</script>

<style scoped>
.chart-wrapper {
  height: 500px;
  position: relative;
}
.choose-wrapper {
  position: absolute;
  right: 0px;
  top: 0px;
  z-index: 1024;
}
</style>