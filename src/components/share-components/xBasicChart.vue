<template>
  <div ref="chart" id="chart"></div>
</template>

<script>
import * as echarts from 'echarts';
import 'echarts/lib/chart/line'
import 'echarts/lib/chart/bar'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/title'
export default {
  props:{
    //数据项颜色
    color:{
      type:Array,
      default:() => { return ['#4ea397','#22c3aa','#7bd9a5','#d0648a','#f58db2','#f2b3c9'] },
    },
    //图类型 line bar
    type:{
      type:String,
      default:'line'
    },
    //配置图例
    legend:{
      type:Object,
      default:null
    },
    //配置x轴
    xName:{
      type:String,
      default:''
    },
    //配置x轴是否显示
    showXLabel:{
      type:Boolean,
      default:true
    },
    boundaryGap:{
      type:Boolean,
      default:true
    },
    //配置y轴是否显示
    showYLabel:{
      type:Boolean,
      default:true
    },
    //配置y轴
    yName:{
      type:String,
      default:''
    },
    yMax:{
      type:Number
    },
    yMin:{
      type:Number
    },
    //数据 {x:[],y1:[],y2:[],...}
    source:{
      type:Object,
      default:null
    },
    //是否平滑
    smooth:{
      type:Boolean,
      default:false
    },
    //是否填充颜色,默认为填充，如果不要输入null,需要填充就输入{color:'rgba(41, 37, 37, 0.1)'}
    areaStyle:{
      type:Object,
      default:() => {return {}}
    },
    //控制数据点的样式，默认为空心小圆圈
    symbol:{
      type:String,
      default:'emptyCircle'
    }
  },
  methods: {
    initOption(){
      const option = {}
      option.dataset = {}
      option.dataset.source = this.source
      option.color = this.color
      option.yAxis = {
        show:this.showYLabel,
        type:'value',
        nameLocation:'center',
        nameTextStyle:{
          fontWeight:'bold'
        },
        nameGap:35,
        name:this.yName,
        max:this.yMax,
        min:this.yMin,
        axisTick:{
          show:false
        },
        axisLine:{
          lineStyle:{
            color:'#5a5c69'
          }
        },
        splitNumber:3
      }
      option.xAxis = {
        show:this.showXLabel,
        type:'category',
        nameLocation:'center',
        nameGap:20,
        name:this.xName,
        boundaryGap:this.boundaryGap,
        axisTick:{
          show:false
        },
        axisLine:{
          lineStyle:{
            color:'#5a5c69'
          }
        }
      }
      option.legend = this.legend
      option.tooltip = {trigger:'item'}
      option.grid = {containLabel: false, left:'55px', right:'15px', top:'15px', bottom:'15px'}
      option.series = []
      for(let key in this.source){
        if(key !== 'x'){
          option.series.push({
            type:this.type,
            areaStyle:this.areaStyle,
            smooth:this.smooth,
            symbol:this.symbol,
            encode:{x:'x',y:key,seriesName:key}
          })
        }
      };
      return option
    },
    draw(){
      const option = this.initOption()
      const h = this.$refs['chart'].clientHeight
      const w = this.$refs['chart'].clientWidth
      // console.log(`宽${w},高${h}`)
      let chartInst = null
      if(this.$refs['chart']){
        chartInst = echarts.init(this.$refs['chart'])
        chartInst.setOption(option)
        chartInst.resize({ //使用v-show必须要调用resize()函数
          'width':w,
          'heigt':h
        })       
      }
    }
  },
  mounted(){
  },
  watch:{
    'source':{
      deep:true,
      handler(newVal,oldVal){ 
        //如果不用nextTick，那么在这个组件初始化的时候由于不能操作DOM而报错
        // this.draw()
        this.$nextTick(() => {
          this.draw()
        })
      },
      immediate:true
    }
  }
}
</script>

<style>
#chart {
  height: 100%;
}
</style>