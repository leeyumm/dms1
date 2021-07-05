<template>
  <div ref="chart" id="chart"></div>
</template>

<script>
import echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/radar'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/title'
export default {
  props:{
    option:{
      type:Object,
      default:() => { return {} }
    }
  },
  methods:{
    draw(option){
      echarts.init(this.$refs['chart']).setOption(option)
    }
  },
  watch:{
    option(newVal){
      this.draw(newVal)
    }
  }
}
</script>

<style scoped>
#chart {
  height: 100%;
}
</style>