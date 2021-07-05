<template>
  <div class="page-wrapper">
    <div class="xu-row mb15">
      <div class="xu-col-12">
        <multi-params-data-table></multi-params-data-table>
      </div>
    </div>
    <div class="xu-row">
      <div class="xu-col-6">
        <multi-params-data-radar></multi-params-data-radar>
      </div>
    </div>
  </div>
</template>

<script>
import MultiParamsDataTable from '@/components/page-data-analysis-ope-mid/MultiParamsDataTable'
import MultiParamsDataRadar from '@/components/page-data-analysis-ope-mid/MultiParamsDataRadar'
export default {
  components: {
    MultiParamsDataTable,
    MultiParamsDataRadar
  }
}
</script>

<style scoped>

</style>