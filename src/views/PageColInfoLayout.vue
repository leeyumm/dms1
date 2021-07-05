<template>
  <div>
    <div class="xu-row mb15">
      <div class="xu-col-4">
        <dev-history-collect-time-chart/>
        <div style="height:35px"></div>
        <dev-history-turn-on-num-chart/>
      </div>
      <div class="xu-col-8">
        <collector-table></collector-table>
      </div>
    </div>
    <div class="xu-row">
      <div class="xu-col-12">
        
      </div>
    </div>
  </div>
</template>

<script>
import DevHistoryTurnOnNumChart from "@/components/page-collection-layout/DevHistoryTurnOnNumChart";
import DevHistoryCollectTimeChart from "@/components/page-collection-layout/DevHistoryCollectTimeChart";
import CollectorTable from "@/components/page-collection-layout/CollectorTable";


export default {
  components:{DevHistoryCollectTimeChart,DevHistoryTurnOnNumChart,CollectorTable}
}
</script>

<style scoped>

</style>