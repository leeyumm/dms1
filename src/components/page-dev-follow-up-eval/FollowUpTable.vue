<template>
  <div>
    <div class="table-head-wrapper mb15">
      <span class="field-item">仪器类别筛选：</span>
      <x-select 
      :options="['无创脑氧饱和度监测仪','无创血红蛋白监测仪','麻醉机','呼吸机','麻醉深度监测仪','无创血压监测仪(监护仪)']"
      :styleObj="{'border-radius':0,'width':'150px'}"
      v-model="selectedDeviceType"
      >
      </x-select>
      <span class="field-item ml15">排序字段：</span>
      <x-select 
      :options="['生产日期','使用年限','采集场次','采集时长','体验满意度','可靠性满意度','15天开机率','30天开机率','90天开机率']"
      :styleObj="{'border-radius':0,'width':'150px'}"
      v-model="sortedField"
      >
      </x-select>
      <span class="ml15">
        <x-button 
        :value="'排序'" 
        :markerObj="['fa','fa-sort-amount-desc']" 
        @click="sortBy(selectedDeviceType,sortedField)" 
        :disable="sortedField === ''">
        </x-button>
        <x-button :value="'还原'" :markerObj="['fa','fa-refresh']" :type="'warning'" @click="reset()"></x-button>
      </span>
    </div>
    <div class="table-wrapper xu-add-scrollBar">
      <x-table 
      :title="['#','设备名称','生产厂商','序列号','生产日期','使用年限','采集场次','采集时长','体验满意度','可靠性满意度','15天开机率','30天开机率','90天开机率']"
      :size="'sm'"
      :align="'center'"
      :strip="false"
      :colWidth="['20px','320px','260px','170px','100px']"
      >
        <tr v-for="(evalInfo,index) in evalHandInfos" :key="index">
          <td>{{ index + 1 }}</td>
          <td>{{ evalInfo.deviceName }}</td>
          <td>{{ evalInfo.companyName }}</td>
          <td>{{ evalInfo.serialNumber }}</td>
          <td>{{ evalInfo.produceDate | formatterDate('YYYYMMDD') }}</td>
          <td>{{ evalInfo.serviceLife }}年</td>
          <td>{{ evalInfo.totalDataCollectionCounter }}</td>
          <td>{{ evalInfo.totalDataCollectionTime }}秒</td>
          <td>{{ evalInfo.averageUsageExperienceLevel.toFixed(2) }}分</td>
          <td>{{ evalInfo.averageUsageReliabilityLevel.toFixed(2) }}分</td>
          <td>{{ evalInfo.usedDaysInPast15Days }}%</td>
          <td>{{ evalInfo.usedDaysInPast30Days }}%</td>
          <td>{{ evalInfo.usedDaysInPast90Days }}%</td>
        </tr>
      </x-table>
    </div>
  </div>
</template>

<script>
import xTable from '@/x-views/xTable.vue'
import xSelect from '@/x-views/xSelect.vue'
import xButton from '@/x-views/xButton.vue'
import showAlert from "@/x-views/xAlert/xAlert"
import { getTypeCodes } from '@/global/devTypeCode';

const charToName = {
  '生产日期':'produceDate',
  '使用年限':'serviceLife',
  '采集场次':'totalDataCollectionCounter',
  '采集时长':'totalDataCollectionTime',
  '体验满意度':'averageUsageExperienceLevel',
  '可靠性满意度':'averageUsageReliabilityLevel',
  '15天开机率':'usedDaysInPast15Days',
  '30天开机率':'usedDaysInPast30Days',
  '90天开机率':'usedDaysInPast90Days',
}

export default {
  components: { xTable, xSelect, xButton },
  data(){
    return {
      evalInfos:[],
      evalHandInfos:[],
      sortedField:'',
      selectedDeviceType:''
    }
  },
  methods:{
    getEvalInfos(){
      this.$http['getDevFollowUpEvalInfos']()
      .then(r => {
        const {code,data} = r
        if(code === 200){
          this.evalHandInfos = data.map(this.handleData)
          this.evalInfos = [...this.evalHandInfos] //深复制一份
          // console.log(this.evalHandInfos)
        }
      })
    },
    handleData(obj){
      const fields = ['usedDaysInPast15Days','usedDaysInPast30Days','usedDaysInPast90Days']
      // console.log(obj)
      for(const field of fields){
        const entires = Object.entries(obj[field])
        const usedEntries = entires.filter(elm => elm[1])
        obj[field] = Math.round((usedEntries.length / entires.length) * 100)
      }
      return obj
    },
    sortBy(selectedDeviceType,field){
      if(field === ''){
        return
      }
      const selectedDeviceTypeCode = getTypeCodes()[selectedDeviceType]
      this.evalHandInfos = this.evalInfos.filter(obj => {
        if(selectedDeviceType === ''){
          return true
        }
        const {deviceType} = obj
        // const types = deviceType.includes('#') ? deviceType.split('#') : [deviceType]
        // console.log(deviceType)
        return deviceType.includes(selectedDeviceTypeCode)
      })
      if(this.evalHandInfos.length === 0){
        showAlert('暂无相关的仪器')
        return
      }
      this.evalHandInfos.sort((a,b) => {
        return b[charToName[field]] - a[charToName[field]]
      })
      showAlert('排序完毕')
    },
    reset(){
      this.sortedField = '',
      this.selectedDeviceType = ''
      this.evalHandInfos = [...this.evalInfos]
      showAlert('还原成功')
    }
  },
  created(){
    this.getEvalInfos()
  }
}
</script>

<style scoped>
.field-item {
  color: #9ea9af;
  vertical-align: baseline;
}
.table-head-wrapper {
  font-size: 14px;
}
.table-wrapper {
  height: 685px;
  font-size: 14px;
  box-sizing: border-box;
}
.btn-wrapper {
  display: inline-block;
  margin-right: 15px;
}
</style>