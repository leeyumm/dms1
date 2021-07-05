<template>
  <div id="chart" ref="chart"></div>
</template>

<script>
import echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/pie'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/title'
export default {
  props:{
    //1.数据项的颜色
    color:{
      type:Array,
      default:() => ['#4ea397','#22c3aa','#7bd9a5','#d0648a','#f58db2','#f2b3c9'],
    },
    //2.数据 {y:[]}
    source:{
      type:Object,
      default:null
    },
    //3.标题
    titleText:{
      type:String
    },
    //4.内外圆环半径
    radius:{
      type:Array,
      default:() => {return ['50%','65%']}
    },
    //5.饼图的中心位置
    center:{
      type:Array,
      default:() => {return ['50%','60%']}
    },
    //9.是否是弹窗中的图
    isModalChart:{
      type:Boolean,
      default:false
    },
    //10.标题距离底部的距离
    bottom:{
      type:Number,
    }
  },
  methods:{
    initOption(){
      const option = {}
      option.dataset = {}
      option.dataset.source = this.source
      option.color = this.color
      option.title = {
        text:this.titleText,
        x:'center',
        bottom:this.bottom,
        textStyle:{
          color:'#111',
          fontSize:14,
          fontWeight:'normal'
        }
      }
      option.series = [{
        type:'pie',
        radius:this.radius,
        center:this.center,
        hoverAnimation:false,
        label:{
          position:'center',
          fontSize:18,
          formatter:param => {
            if(param.dataIndex === 1){
              return Math.floor(param.percent) + '%'
            }
          }
        },
        encode:{
          value:'y'
        }
      }]
      return option
    },
    draw(){
      const option = this.initOption()
      echarts.init(this.$refs['chart']).setOption(option)
    }
  },
  watch:{
    'source':{
      deep:true,
      handler(newVal,oldVal){
        this.$nextTick(() => {
          this.draw()
        })
      },
      immediate:true
    }
  }
}
</script>

<style scoped>
#chart {
  height: 100%;
}
</style>