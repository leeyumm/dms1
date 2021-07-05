<template>
  <div class="xu-row">
    <div class="xu-col-5">
      <dev-card :devInfo="devInfo" v-for="(devInfo,index) in devInfos" :key="index"></dev-card>
    </div>
    <div class="xu-col-7">
      <dev-info-table :devInfo="devInfo" v-for="(devInfo,index) in devInfos" :key="index"></dev-info-table>
    </div>
  </div>
</template>

<script>
import DevCard from './DevCard.vue'
import { getDevInfos } from "@/global/devTypeCode"
import DevInfoTable from './DevInfoTable.vue'
export default {
 components:{
  DevCard,
  DevInfoTable
 },
 props:{
   deviceCategory:{
     type:String,
    //  default:'麻醉机'
   }
 },
 data(){
   return {
     devInfos:getDevInfos(this.deviceCategory)
   }
 },
}
</script>