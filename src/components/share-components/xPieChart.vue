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
      // default:() => ['#4ea397','#22c3aa','#7bd9a5','#f2b3c9','#f58db2','#d0648a','#c12e34'],
      default:() => ['#3fb1e3','#6be6c1','#626c91','#a0a7e6','#c4ebad','#96dee8','#c12e34'],
    },
    //2.数据 {itemName:[],itemValue:[]}
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
    //6.是否显示label
    isLabelShow:{
      type:Boolean,
      default:true
    },
    //8.配置图例
    legend:{
      type:Object,
      default:null
    },
    //9.是否是弹窗中的图
    isModalChart:{
      type:Boolean,
      default:false
    },
    //10.label是否显示百分比 true-是，false-显示数字
    showPercent:{
      type:Boolean,
      default:true
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
        textStyle:{
          color:'#111',
          fontSize:14,
          fontWeight:'normal'
        }
      };
      option.legend = this.legend
      option.series = [{
        type:'pie',
        radius:this.radius,
        center:this.center,
        hoverAnimation:false,
        label:{
            show:this.isLabelShow,
            position:'outside',
            formatter:param => {
              // console.log(param)
              if(this.showPercent){
                return Math.floor(param.percent) + '%'
              } else {
                return param.data[1] + '台'
              }  
            }
        },
        labelLine:{
          length:3,
          length2:3
        },
        encode:{
          itemName:'itemName',
          value:'itemValue',
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