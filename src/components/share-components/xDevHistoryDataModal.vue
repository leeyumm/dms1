<template>
  <!-- 一台仪器在某一场手术中的监测数据弹窗  -->
  <x-modal @close="close">
    <div class="wrapper xu-add-scrollBar">
      <div class="chart-wrapper" v-for="(param,index) in params" :key="index">
        <x-basic-chart 
        :type="'line'"
        :yName="paramName[index]"
        :color="[color[index % (color.length)]]"
        :source="{x:x,[paramName[index]]:param}"
        :areaStyle="null"
        :boundaryGap="false"
        ></x-basic-chart>
      </div>
    </div>
  </x-modal>
</template>

<script>
import xModal from '@/x-views/xModal'
import xBasicChart from "@/components/share-components/xBasicChart"
export default {
  components:{xModal,xBasicChart},
  props:['operationNumber','serialNumber','deviceCode'],
  data(){
    return {
      color:['#4ea397','#22c3aa','#7bd9a5','#d0648a','#f58db2','#f2b3c9'],
      x:[],
      params:[],
      paramName:[],
    }
  },
  methods:{
    getData(operationNumber,serialNumber){
      this.$http['getDevHistoryData']({
        params:{
          operationNumber:this.operationNumber,
          serialNumber:this.serialNumber,
          deviceCode:this.deviceCode
        }
      }).then(res => {
        const {data} = res
        if(data){
          this.source = {}
          for(const key in data){
            if(key === 'time'){
              this.x = data[key].map(ele => this.$utils['getFormatterDate'](ele)['HHMMSS'])
            } else {
              this.paramName.push(key)
              this.params.push(data[key].map(ele => ele===-1000?-5:ele))
            }
          }
        }
        // console.log(this.params)
        // console.log(this.paramName)
        // console.log(this.x)
      })
    },
    close(){
      this.$emit('close')
    }
  },
  created(){
    this.getData(this.operationNumber,this.serialNumber)
  }
}
</script>

<style scoped>
.chart-wrapper {
  height: 150px;
  width: 1200px;
}
.wrapper {
  max-height: 750px;
}
</style>