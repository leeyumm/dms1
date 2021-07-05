<template>
  <x-box>
    <div class="choose-wrapper xu-clearfix">
      <div class="xu-float-left">
        <span>仪器类型：</span>
        <x-select v-model="selectDevType" :options="Object.keys(devTypeCode)"></x-select>
      </div>
      <div class="xu-float-right">
        <span>排序：</span>
        <x-select v-model="sortedBy" :options="Object.keys(sortedCode)"></x-select>
      </div>
    </div>
    <div class="xu-box-content">
      <p class="mb15">仪器多指标分析结果</p>
      <div class="table-wrapper xu-add-scrollBar">
        <x-table 
          :title="['公司','仪器','序列号','采集场次','掉线率','故障率','使用体验(5分)','使用满意度(5分)']"
          :align="'center'"
          :strip="true"
          :size="'sm'"
          :colWidth="['400px','200px','200px']"
        >
          <tr v-for="item in performanceEvaluationData" :key="item.deviceCode + item.deviceSerialNumber">
            <td>{{ item.companyName }}</td>
            <td>{{ item.deviceName | formatterDevName }}</td>
            <td>{{ item.deviceSerialNumber }}</td>
            <td>{{ item.totalCollectionOperationTimes }}</td>
            <td>{{ item.averageDropRate | numberToPercent }}</td>
            <td>{{ item.errorRate | numberToPercent }}</td>
            <td>{{ item.averageExperienceLevel }}</td>
            <td>{{ item.averageReliabilityLevel }}</td>
          </tr>
        </x-table>
      </div>
    </div>
  </x-box>
</template>

<script>
import xBox from '@/x-views/xBox'
import xTable from '@/x-views/xTable'
import xSelect from '@/x-views/xSelect'
import {getTypeCodes} from '@/global/devTypeCode'

export default {
  components:{
    xBox,
    xTable,
    xSelect
  },
  data(){
    return {
      sortedBy:'使用满意度',
      selectDevType:Object.keys(getTypeCodes())[0],
      sortedCode:{
        '采集时长':'totalCollectionOperationTimes',
        '掉线率':'averageDropRate',
        '故障率':'errorRate',
        '使用体验':'averageExperienceLevel',
        '使用满意度':'averageReliabilityLevel'
      },
      devTypeCode:getTypeCodes(),
      performanceEvaluationData:[]
    }
  },
  methods:{
    getData(devType){
      const type = this.devTypeCode[devType]
      this.$http['getDevPerformanceEvaluationTable']({params:{deviceType:type}})
      .then(res => {
        // console.log(res)
        const {data} = res
        this.mySort(data,this.sortedBy)
        this.performanceEvaluationData = data
      })
      .catch(e => {
        console.log('获取或者解析仪器多指标分析数据出错')
        console.log(e)
      })
    },
    //2.排序函数
    compFn(str){
      return (a,b) => {
        return b[this.sortedCode[str]] - a[this.sortedCode[str]]
      }
    },
    //3.数据排序
    mySort(data,keyStr){
      data.sort(this.compFn(keyStr))
    }
  },
  watch:{
    selectDevType(newVal,oldVal){
      this.getData(newVal)
    },
    sortedBy(newVal,oldVal){
      this.mySort(this.performanceEvaluationData,newVal)
    }
  },
  created(){
    this.getData(this.selectDevType)
  }
}
</script>

<style scoped>
.choose-wrapper {
  border-bottom: 1px solid #e7eaec;
  margin: -20px -20px 10px -20px;
  padding: 10px 20px;
  font-size: 18px;
}
.table-wrapper {
  height: 500px;
  font-size: 14px;
}
</style>