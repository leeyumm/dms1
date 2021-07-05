<template>
  <div class="home-page-wrapper">
    <div class="xu-row">
      <div class="xu-col-3">
        <div class="flex-container">
          <div class="wrapper">
            <total-dev-panel></total-dev-panel>
          </div>
          <div class="wrapper">
            <dev-category-pie></dev-category-pie>
          </div>
          <div class="wrapper">
            <total-ope-panel></total-ope-panel>
          </div>
          <div class="wrapper">
            <ope-history-chart></ope-history-chart>
          </div>
        </div>
      </div>
      <div class="xu-col-9">
        <real-time-panel></real-time-panel>
      </div>
    </div>
  </div>
</template>

<script>
import RealTimePanel from "@/components/page-home-layout/RealTimePanel";
import TotalDevPanel from "@/components/page-home-layout/TotalDevPanel";
import TotalOpePanel from "@/components/page-home-layout/TotalOpePanel";
import DevCategoryPie from "@/components/page-home-layout/DevCategoryPie";
import OpeHistoryChart from "@/components/page-home-layout/OpeHistoryChart";

export default {
  components: {
    RealTimePanel,
    TotalDevPanel,
    TotalOpePanel,
    DevCategoryPie,
    OpeHistoryChart,
  }
};
</script>

<style scoped>
.flex-container {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
</style>