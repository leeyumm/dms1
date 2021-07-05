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
      :options="['生产日期','使用年限','历史维保费用总和','技师总工资','手术耗材总费用','固定维护维修费用','总收益']"
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
    <!--  -->
    <div class="table-wrapper xu-add-scrollBar">
      <x-table 
      :title="['#','设备名称','生产厂商','序列号','生产日期','使用年限','历史维保费用总和','技师总工资','手术耗材总费用','固定维护维修费用','总收益']"
      :size="'sm'"
      :align="'center'"
      :strip="false"
      :colWidth="['20px','320px','260px','170px','100px']"
      >
        <tr v-for="(evalInfo,index) in handEconomicEvalInfos" :key="index">
          <td>{{ index + 1 }}</td>
          <td>{{ evalInfo.deviceName }}</td>
          <td>{{ evalInfo.companyName }}</td>
          <td>{{ evalInfo.serialNumber }}</td>
          <td>{{ evalInfo.produceDate | formatterDate('YYYYMMDD') }}</td>
          <td>{{ evalInfo.serviceLife  }}年</td>
          <td>{{ evalInfo.historyMaintenanceCostSum.toFixed(0)  }}元</td>
          <td>{{ evalInfo.totalTechnicianMonthlySalary.toFixed(0)  }}元</td>
          <td>{{ evalInfo.totalConsumableCostMoney.toFixed(0)  }}元</td>
          <td>{{ evalInfo.totalFixRepairCostMoney.toFixed(0)  }}元</td>  
          <td>{{ evalInfo.totalProfitMoney.toFixed(0)  }}元</td>  
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
import xModal from '@/x-views/xModal.vue'

const charToName = {
  '序列号':'serialNumber',
  '生产厂商':'companyName',
  '设备名称':'deviceName',
  '生产日期':'produceDate',
  '使用年限':'serviceLife',
  '历史维保费用总和':'historyMaintenanceCostSum',
  // '历史配件费用总和':'historyCostAccessoryNum',
  // '历史维修费用总和':'historyCostRepairNum',
  // '历史其他费用总和':'historyCostOtherNum',
  '技师总工资':'totalTechnicianMonthlySalary',
  '手术耗材总费用':'totalConsumableCostMoney',
  '固定维护维修费用':'totalFixRepairCostMoney',
  '总收益':'totalProfitMoney'
}

export default {
  components: { xTable, xSelect, xButton, xModal },
  data(){
    return {
      economicEvalInfos:[],
      handEconomicEvalInfos:[],
      sortedField:'',
      selectedDeviceType:'',
      showModal:false,
      // selectMaintenanceInfo:{}
    }
  },
  methods:{
    getData(){
      this.$http['getEconomicEvalInfos']()
      .then(r => {
        const {code,data} = r
        if(code === 200){
          this.handEconomicEvalInfos = [...data]
          this.economicEvalInfos = data
          // console.log(this.economicEvalInfos)
        }
      })
    },
    sortBy(selectedDeviceType,field){
      if(field === ''){
        return
      }
      const selectedDeviceTypeCode = getTypeCodes()[selectedDeviceType]
      this.handEconomicEvalInfos = this.economicEvalInfos.filter(obj => {
        if(selectedDeviceType === ''){
          return true
        }
        const {deviceType} = obj
        return deviceType.includes(selectedDeviceTypeCode)
      })
      if(this.handEconomicEvalInfos.length === 0){
        showAlert('暂无相关的仪器')
        return
      }
      this.handEconomicEvalInfos.sort((a,b) => {
        return b[charToName[field]] - a[charToName[field]]
      })
      showAlert('排序完毕')
    },
    reset(){
      this.sortedField = '',
      this.selectedDeviceType = ''
      this.handEconomicEvalInfos = [...this.economicEvalInfos]
      showAlert('还原成功')
    },
    getNameByChar(char){
      return charToName[char]
    }
  },
  created(){
    this.getData()
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
.modal-title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
}
.item-title {
  font-weight: bold;
  margin-bottom: 5px;
  margin-top: 5px;
}
.items-wrapper {
  display: flex;
  line-height: 25px;
}
.item-name,
.item-value {
  font-size: 14px;
}
.item-name {
  flex: 1.5;
  color: #9ea9af;
}
.item-value {
  flex:3;
  text-align: end;
}
</style>