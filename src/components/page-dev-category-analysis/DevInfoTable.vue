<template>
  <div class="xu-box" style="margin-bottom: 15px">
    <div class="table-title">{{ devInfo.devName }}</div>
    <div class="table-wrapper xu-add-scrollBar">
      <x-table 
      :title="['序列号','生产日期','使用年限','采集场次','维修次数','总收益','操作']"
      :size="'sm'"
      :align="'center'"
      :strip="false"
      :colWidth="['200px','150px']"
      >
        <tr v-for="(dev,index) in devSpecInfos" :key="index">
          <td>{{ dev.serialNumber }}</td>
          <td>{{ dev.produceDate | formatterDate('YYYYMMDD')}}</td>
          <td>{{ dev.serviceLife }}年</td>
          <td>{{ dev.totalCollectionCounter }}</td>
          <td>{{ dev.maintenanceRecordCounter }}</td>
          <td>{{ dev.totalProfitMoney | toInteger }}元</td>
          <!-- <td>{{ dev.historyCostRepairNum }}元</td>
          <td>{{ dev.historyCostOtherNum }}元</td> -->
          <td>
            <x-button :value="'详情'" :size="'sm'" :type="'transparent'" @click="showDetail(dev)"></x-button>
          </td>
        </tr>
      </x-table>
    </div>
    <x-modal v-if="isModalShow" @close="isModalShow = false">
      <div class="modal-title">评价详情</div>
      <div class="usage-wrapper">
        <div>使用评价结果</div>
        <p><span class="item-name">平均使用满意度：</span>{{ selectDevice.averageUsageExperienceLevel.toFixed(2)}}</p>
        <p><span class="item-name">平均可靠性满意度：</span>{{ selectDevice.averageUsageReliabilityLevel.toFixed(2)}}</p>
      </div>
      <div class="history-cost-wrapper">
        <div>经效比评价结果</div>
        <p><span class="item-name">购买价格：</span>{{ selectDevice.devicePurchasePrice | toInteger }}元</p>
        <p><span class="item-name">技师工资：</span>{{ selectDevice.technicianMonthlySalary | toInteger }}元/月</p>
        <p><span class="item-name">手术耗材费用：</span>{{ selectDevice.consumableCostMoney | toInteger }}元/年</p>
        <p><span class="item-name">固定维护维修费用：</span>{{ selectDevice.fixRepairCostMoney | toInteger }}元/年</p>
        <p><span class="item-name">每小时收益：</span>{{ selectDevice.profitMoney | toInteger }}元/小时</p>
        <p><span class="item-name">技师总工资：</span>{{ selectDevice.totalTechnicianMonthlySalary | toInteger }}元</p>
        <p><span class="item-name">手术总耗材费用：</span>{{ selectDevice.totalConsumableCostMoney | toInteger }}元</p>
        <p><span class="item-name">固定维护维修总费用：</span>{{ selectDevice.totalFixRepairCostMoney | toInteger }}元</p>
        <p><span class="item-name">配件费用：</span>{{ selectDevice.historyCostAccessoryNum | toInteger }}元</p>
        <p><span class="item-name">维修费用：</span>{{ selectDevice.historyCostRepairNum | toInteger }}元</p>
        <p><span class="item-name">其他费用：</span>{{ selectDevice.historyCostOtherNum | toInteger }}元</p>
        <p><span class="item-name">历史维保费用总和：</span>{{ selectDevice.historyMaintenanceCostSum | toInteger }}元</p>
        <p><span class="item-name">总收益：</span>{{ selectDevice.totalProfitMoney | toInteger }}元</p>  
      </div>
      <div class="maintence-wrapper">
        <div>维修服务评价结果</div>
        <p><span class="item-name">响应时间满意度：</span>{{ selectDevice.averageMaintenanceResponseTimeSatisfactionLevel.toFixed(2) }}</p>
        <p><span class="item-name">维修价格满意度：</span>{{ selectDevice.averageMaintenancePriceSatisfactionLevel.toFixed(2) }}</p>
        <p><span class="item-name">服务态度满意度：</span>{{ selectDevice.averageMaintenanceServiceAttitudeSatisfactionLevel.toFixed(2) }}</p>
        <p><span class="item-name">整体过程满意度：</span>{{ selectDevice.averageMaintenanceOverallProcessSatisfactionLevel.toFixed(2) }}</p>
      </div>
    </x-modal>
  </div>
</template>

<script>
import xTable from '@/x-views/xTable.vue'
import xButton from '@/x-views/xButton.vue'
import xModal from '@/x-views/xModal.vue'
export default {
  components: { xTable, xButton, xModal},
  props:{
    devInfo: {
      type: Object,
      default: () => {},
    },
  },
  data(){
    return {
      devSpecInfos:[],
      deviceSerialNumbers:[],
      isModalShow:false,
      selectDevice:{}
    }
  },
  methods:{
    getdeviceSerialNumbers(deviceCode){
      this.$http['getDevCardSerialNumbers']({params:{deviceCode:deviceCode}})
      .then(r => {
        const {data,code} = r
        if(code === 200){
          this.deviceSerialNumbers = data
          for(const deviceSerialNumber of data){
            this.getData(deviceCode,deviceSerialNumber)
          }
        }
      })
    },
    getData(deviceCode,deviceSerialNumber){
      this.$http['getDevCardStatisticInfo']({params:{deviceCode,deviceSerialNumber}})
      .then(r => {
        const {data,code} = r
        if(code === 200){
          this.devSpecInfos.push(data)
        }
        // console.log(this.devSpecInfos)
      })
    },
    showDetail(device){
      this.selectDevice = device
      this.isModalShow = true
    }
  },
  created(){
    this.getdeviceSerialNumbers(this.devInfo.deviceCode)
  }
}
</script>

<style scoped>
.table-title {
  font-weight: bold;
  font-size: 18px;
  margin-bottom: 10px;
}
.table-wrapper {
  height: 416px;
  font-size: 14px;
}
.modal-title {
  font-weight: bold;
  font-size: 18px;
  margin-bottom: 10px;
}
.usage-wrapper,
.history-cost-wrapper,
.maintence-wrapper{
  margin-top: 15px;
  line-height: 25px;
  font-size: 16px;
}
.item-name {
  color: #9ea9af
}
</style>