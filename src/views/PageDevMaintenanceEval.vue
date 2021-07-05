/* 
 * 这是维保售后评价页面
 */

<template>
  <div class="xu-box">
    <div class="xu-box-title mb15">
      <span>仪器维保售后评价结果</span>
    </div>
    <maintenance-table></maintenance-table>
  </div>
</template>

<script>
import MaintenanceTable from '@/components/page-dev-maintenance-eval/MaintenanceTable'

export default {
  components: { MaintenanceTable },
}
</script>

<style scoped>

</style>