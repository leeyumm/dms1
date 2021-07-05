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
      :options="['生产日期','使用年限','维修次数','故障解决','整体满意度']"
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
      :title="['#','设备名称','生产厂商','序列号','生产日期','使用年限','维修次数','保质期内','故障解决','整体满意度','操作']"
      :size="'sm'"
      :align="'center'"
      :strip="false"
      :colWidth="['20px','320px','260px','170px','100px']"
      >
        <tr v-for="(evalInfo,index) in handMaintenanceInfos" :key="index">
          <td>{{ index + 1 }}</td>
          <td>{{ evalInfo.deviceName }}</td>
          <td>{{ evalInfo.companyName }}</td>
          <td>{{ evalInfo.serialNumber }}</td>
          <td>{{ evalInfo.produceDate | formatterDate('YYYYMMDD') }}</td>
          <td>{{ evalInfo.serviceLife  }}年</td>
          <td>{{ evalInfo.maintenanceRecordCounter  }}次</td>
          <td>{{ evalInfo.withinShelfLifeYes  }}次</td>
          <td>{{ evalInfo.errorOvercomeYes  }}次</td>
          <!-- <td>{{ evalInfo.historyCostAccessoryNum  }}元</td>
          <td>{{ evalInfo.historyCostRepairNum  }}元</td>
          <td>{{ evalInfo.historyCostOtherNum  }}元</td> -->
          <td>{{ evalInfo.averageMaintenanceOverallProcessSatisfactionLevel.toFixed(2)  }}分</td>
          <td>
            <x-button :size="'sm'" :type="'transparent'" :value="'详情'" @click="showDetail(evalInfo)"></x-button>
          </td>
        </tr>
      </x-table>
    </div>

    <x-modal v-if="showModal" @close="showModal = false" :width="'900px'">
      <div class="modal-title">维修记录详情</div>
      <div class="xu-row">
        <div class="xu-col-6">
          <div class="item-title">设备情况</div>
          <div class="items-wrapper" v-for="(item,index) in ['设备名称','生产厂商','序列号','生产日期','使用年限']" :key='index'>
            <span class="item-name">{{ item }}：</span>
            <span class="item-value" v-if="item !== '生产日期'">{{ selectMaintenanceInfo[getNameByChar(item)] }}</span>
            <span class="item-value" v-else>{{ selectMaintenanceInfo[getNameByChar(item)] | formatterDate('YYYYMMDD')}}</span>
          </div>
        </div>
        <div class="xu-col-6">
          <div class="item-title">维修满意度</div>
          <div class="items-wrapper" v-for="(item,index) in ['维修响应时间满意度','维修价格满意度','服务态度满意度','整体满意度']" :key='index'>
            <span class="item-name">{{ item }}：</span>
            <span class="item-value">{{ selectMaintenanceInfo[getNameByChar(item)].toFixed(2) }}分</span>
          </div>
        </div>
      </div>
      <div class="xu-row">
        <div class="xu-col-6">
          <div class="item-title">维修方式</div>
          <div 
          class="items-wrapper" 
          v-for="(item,index) in ['维修次数','自修','上门修','返厂修','其他维修方式']" 
          :key='index'
          >
            <span class="item-name">{{ item }}：</span>
            <span class="item-value">{{ selectMaintenanceInfo[getNameByChar(item)] }}次</span>
          </div>
        </div>
        <div class="xu-col-6">
          <div class="item-title">维修人员</div>
          <div 
          class="items-wrapper" 
          v-for="(item,index) in ['设备科维系人员','厂家维修人员','科室配备维修人员','设备使用人员','其他维修人员']" 
          :key='index'
          >
            <span class="item-name">{{ item }}：</span>
            <span class="item-value">{{ selectMaintenanceInfo[getNameByChar(item)] }}次</span>
          </div>
        </div>
      </div>
      <div class="xu-row">
        <div class="xu-col-6">
          <div class="item-title">故障原因</div>
          <div 
          class="items-wrapper" 
          v-for="(item,index) in ['配件损坏','软件故障','操作失误','环境因素','其他故障原因']" 
          :key='index'
          >
            <span class="item-name">{{ item }}：</span>
            <span class="item-value">{{ selectMaintenanceInfo[getNameByChar(item)] }}次</span>
          </div>
        </div>
        <div class="xu-col-6">
          <div class="item-title">费用</div>
          <div 
          class="items-wrapper" 
          v-for="(item,index) in ['配件费','维修费','其他费用']" 
          :key='index'
          >
            <span class="item-name">{{ item }}：</span>
            <span class="item-value">{{ selectMaintenanceInfo[getNameByChar(item)] }}元</span>
          </div>
        </div>
      </div>
    </x-modal>
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
  '维修次数':'maintenanceRecordCounter',
  '平均维修时间':'averageRepairTime',
  '自修':'maintenanceModeCounterRepairBySelf',
  '上门修':'maintenanceModeCounterRepairByInDoor',
  '返厂修':'maintenanceModeCounterRepairByBackToFactory',
  '第三方修':'maintenanceModeCounterRepairByThirdParty',
  '其他维修方式':'maintenanceModeCounterRepairByOtherMethod',
  '设备科维系人员':'maintenancePeopleCounterFromEquipmentDepartment',
  '厂家维修人员':'maintenancePeopleCounterFromFactory',
  '科室配备维修人员':'maintenancePeopleCounterFromDetailDepartment',
  '设备使用人员':'maintenancePeopleCounterFromDeviceUser',
  '其他维修人员':'maintenancePeopleCounterFromOtherPeople',
  '在保质期内':'withinShelfLifeYes',
  // '在保质期外':'withinShelfLifeNo',
  '配件损坏':'errorReasonCounterComponentError',
  '软件故障':'errorReasonCounterSoftwareError',
  '操作失误':'errorReasonCounterOperationError',
  '环境因素':'errorReasonCounterEnvironmentReason',
  '其他故障原因':'errorReasonCounterOtherError',
  '更换配件':'replaceAccessoryYes',
  // '不更换配件':'replaceAccessoryNo',
  '故障解决':'errorOvercomeYes',
  '配件费':'historyCostAccessoryNum',
  '维修费':'historyCostRepairNum',
  '其他费用':'historyCostOtherNum',
  '维修响应时间满意度':'averageMaintenanceResponseTimeSatisfactionLevel',
  '维修价格满意度':'averageMaintenancePriceSatisfactionLevel',
  '服务态度满意度':'averageMaintenanceServiceAttitudeSatisfactionLevel',
  '整体满意度':'averageMaintenanceOverallProcessSatisfactionLevel',
  '售后与维保改进建议':'maintenanceImprovementSuggestionsCounter'
}

export default {
  components: { xTable, xSelect, xButton, xModal },
  data(){
    return {
      maintenanceInfos:[],
      handMaintenanceInfos:[],
      sortedField:'',
      selectedDeviceType:'',
      showModal:false,
      selectMaintenanceInfo:{}
    }
  },
  methods:{
    getData(){
      this.$http['getMaintenanceEvalInfos']()
      .then(r => {
        const {code,data} = r
        if(code === 200){
          this.handMaintenanceInfos = [...data]
          this.maintenanceInfos = data
          // console.log(this.evalHandInfos)
        }
      })
    },
    sortBy(selectedDeviceType,field){
      if(field === ''){
        return
      }
      const selectedDeviceTypeCode = getTypeCodes()[selectedDeviceType]
      this.handMaintenanceInfos = this.maintenanceInfos.filter(obj => {
        if(selectedDeviceType === ''){
          return true
        }
        const {deviceType} = obj
        return deviceType.includes(selectedDeviceTypeCode)
      })
      if(this.handMaintenanceInfos.length === 0){
        showAlert('暂无相关的仪器')
        return
      }
      this.handMaintenanceInfos.sort((a,b) => {
        return b[charToName[field]] - a[charToName[field]]
      })
      showAlert('排序完毕')
    },
    reset(){
      this.sortedField = '',
      this.selectedDeviceType = ''
      this.handMaintenanceInfos = [...this.maintenanceInfos]
      showAlert('还原成功')
    },
    showDetail(maintenanceInfo){
      this.selectMaintenanceInfo = maintenanceInfo
      this.showModal = true
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