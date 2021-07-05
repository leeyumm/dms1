/* 
 * 这是经济评价页面
 */

<template>
  <div class="xu-box">
    <div class="xu-box-title mb15">
      <span>仪器经济评价结果</span>
    </div>
    <economic-table></economic-table>

  </div>
</template>

<script>
import EconomicTable from '@/components/page-dev-economic-eval/EconomicTable.vue'

export default {
  components: { EconomicTable },
}
</script>

<style scoped>

</style>