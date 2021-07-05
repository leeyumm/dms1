<template>
  <div class="page-wrapper">
    <div class="xu-row" style="margin-bottom:25px">
      <div class="xu-col-6">
        <radar :devTypeCode="'1'" :radarData="radarData['1']"></radar>
      </div>
      <div class="xu-col-6">
        <radar :devTypeCode="'2'" :radarData="radarData['2']"></radar>
      </div>
    </div>
    <div class="xu-row" style="margin-bottom:25px">
      <div class="xu-col-6">
        <radar :devTypeCode="'3'" :radarData="radarData['3']"></radar>
      </div>
      <div class="xu-col-6">
        <radar :devTypeCode="'4'" :radarData="radarData['4']"></radar>
      </div>
    </div>
    <div class="xu-row" style="margin-bottom:25px">
      <div class="xu-col-6">
        <radar :devTypeCode="'5'" :radarData="radarData['5']"></radar>
      </div>
      <div class="xu-col-6">
        <radar :devTypeCode="'6'" :radarData="radarData['6']"></radar>
      </div>
    </div>
  </div>
</template>

<script>
import Radar from '@/components/page-dev-comprehensive-analysis/Radar.vue'
export default {
  components:{Radar},
  data(){
    return {
      radarData:{}
    }
  },
  methods:{
    getRadarData(){
      this.$http['getRadarData']()
      .then(r => {
        const { data } = r
        this.radarData = data
      })
    }
  },
  created(){
    this.getRadarData()
  }
}
</script>

<style scoped>

</style>