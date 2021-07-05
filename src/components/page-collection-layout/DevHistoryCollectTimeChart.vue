<template>
  <x-box>
    <div class="xu-box-title">
      <span>采集总时长</span>
      <div class="panel-select-wrapper">
        <x-button :value="'一个月内'" :size="'sm'" :type="'cancel'" @click="getHistoryOf(30)" :class="{'panel-select-active':days===30}"></x-button>
        <x-button :value="'半个月内'" :size="'sm'" :type="'cancel'" @click="getHistoryOf(15)" :class="{'panel-select-active':days===15}"></x-button>
        <x-button :value="'一周以内'" :size="'sm'" :type="'cancel'" @click="getHistoryOf(7)" :class="{'panel-select-active':days===7}"></x-button>
      </div>
    </div>
    <div class="xu-box-content chart-wrapper">
      <x-chart :option="option"></x-chart>
    </div>
  </x-box>
</template>

<script>
import xBox from '@/x-views/xBox'
import xButton from '@/x-views/xButton'
import xChart from "@/x-views/xChart"

export default {
  components:{xBox,xButton,xChart},
  data(){
    return {
      historyData:null,
      days:7,
      option:null
    }
  },
  methods: {
    initOption(sample){
      return {
        grid:{
          containLabel:false,
          top:'50px',
          bottom:'20px',
          right:'10px',
          left:'70px'
        },
        tooltip: {
          trigger: "item",
        },
        xAxis: {
          type: "category",
          data: Object.keys(sample)
        },
        yAxis: {
          type: "value",
          min:0,
          max:(value) => {
            return value.max + 100
          },
          name:'采集时长/s',
          nameLocation:'center',
          nameGap:45
        },
        series: [
          {
            data: Object.values(sample),
            type: "line",
            smooth: true,
            areaStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{
                        offset: 0,
                        color: 'rgba(84,112,198,0.5)'
                    },
                    {
                        offset: 1,
                        color: 'rgba(84,112,198,0.1)'
                    }
                ],
                global: false // 缺省为 false
              }
            }
          },
        ],
      };
    },
    getData(days=this.days){
      this.$http['getDevHistoryCollectTime']({params:{days:days}})
      .then(res => {
        const {data} = res
        if(data){
          this.option = this.initOption(data)
        }
      })
    },
    getHistoryOf(days){
      this.days = days
      this.getData()
    }
  },
  created(){
    this.getData()
  }
}
</script>

<style scoped>
.chart-wrapper {
  height: 325px;
}
</style>