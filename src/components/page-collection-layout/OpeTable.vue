
<template>
<!-- 该文件不用 -->
  <x-box class="table-wrapper">
    <div class="xu-box-title">
      <span>历史采集记录</span>
    </div>
    <x-table
      :title="['手术顺序号','患者入院ID','麻醉方式','既往病史','特殊情况','手术名称','开始时间','结束时间','设备','操作']"
      :size="'sm'"
      :align="'center'"
      :strip="true"
    >
    <!-- colWidth="['80px','250px','150px','300px']" -->
      <tr v-for="ope in opeInfos" :key="ope.patientId">
        <td>
          <span>{{ ope.operationNumber }}</span>
        </td>
        <td>{{ ope.admissionId }}</td>
        <td>{{ ope.operationAnesthesiaMode }}</td>
        <td>{{ ope.pastMedicalHistory }}</td>
        <td>{{ ope.specialDiseaseCase }}</td>
        <td>{{ ope.operationName }}</td>
        <td>{{ ope.operationStartTime | formatterDate }}</td>
        <td>{{ ope.operationEndTime | formatterDate }}</td>
        <td>{{ ope.usedDeviceInfoForPlatform | formatterDevName}}</td>
        <td>
          <x-button :value="'详情'" :size="'sm'" :type="'success'" @click="showModal(ope,1)"></x-button>
          <x-button :value="'+标记'" :size="'sm'" :type="'success'" @click="showModal(ope,2)"></x-button>
        </td>
      </tr>
    </x-table>
    <div class="pager-wrapper">
      <x-pager 
      :pageNum="totalPages"
      :totalElements="totalElements"
      @hasSelectedPage="selPage($event)">
      </x-pager>
    </div>
    <!-- 弹窗 手术详情-->
    <x-ope-detail-info 
     v-if="modalShow" 
     @close="modalShow = false"
     :operationNumber = "selOpe.operationNumber"
    ></x-ope-detail-info>
    <!-- 弹窗 添加标记 -->
    <x-add-ope-mark-modal 
     v-if="opeMarkModalShow" 
     @close="opeMarkModalShow = false"
     :operation="selOpe"
    ></x-add-ope-mark-modal>
  </x-box>
</template>

<script>
import xTable from "@/x-views/xTable";
import xBox from "@/x-views/xBox";
import xPager from "@/x-views/xPager";
import xBadge from "@/x-views/xBadge";
import xButton from "@/x-views/xButton";
import xOpeDetailInfo from "@/components/share-components/xOpeDetailInfo";
import xAddOpeMarkModal from "@/components/share-components/xAddOpeMarkModal"
export default {
  components: { xTable, xBox, xPager, xBadge, xButton, xOpeDetailInfo, xAddOpeMarkModal},
  data() {
    return {
      opeInfos: [],
      totalPages: 1,
      totalElements: 0,
      modalShow: false,
      opeMarkModalShow: false,
      selOpe: {}
    };
  },
  methods: {
    getData(page = 0, size = 14) {
      this.$http["getOpeInfos"]({ params: { page: page, size: size } }).then(
        res => {
          // console.log(res)
          const { data } = res;
          // const reg = /(?<=\().+?(?=\))/g
          this.opeInfos = data["content"];
          this.totalPages = data["totalPages"];
          this.totalElements = data["totalElements"];
          // console.log(this.opeInfos[0].usedDeviceInfoForPlatform.match(reg))
        }
      );
    },
    selPage(page) {
      this.getData(page - 1);
    },
    showModal(ope,whichModal){
      this.selOpe = ope;
      if(whichModal === 1){
        this.modalShow = true
      } else if(whichModal === 2){
        this.opeMarkModalShow = true
      }
      
    }
  },
  created() {
    // this.getData();
  }
};
</script>

<style scoped>
.pager-wrapper {
  position: absolute;
  right: 20px;
  bottom: 5px;
}
.table-wrapper {
  height: 450px;
  font-size: 14px;
}
.total-badge {
  font-size: 12px;
  vertical-align: bottom;
}
</style>