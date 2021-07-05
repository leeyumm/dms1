<template>
  <div :style="{'height':height}" ref="chart-wrapper"></div>
</template>

<script>
import * as echarts from 'echarts';
export default {
  props:{
    //绘图的配置项
    option:{
      type:Object,
      default:() => {}
    },
    //图容器的高度
    height:{
      type:String,
      default:'100%'
    }
  },
  methods:{
    draw(){
      const myChart = echarts.init(this.$refs['chart-wrapper'])
      if(this.option){
         myChart.setOption(this.option)
      } 
    }
  },
  watch:{
    'option':{
      deep:true,
      handler(){
        this.draw()
      }
    }
  },
  mounted(){
    this.draw()
  }
}
</script>

<style scoped>

</style>