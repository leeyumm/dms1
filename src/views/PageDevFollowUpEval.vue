/* 
 * 这是追踪评价页面
 */

<template>
  <div class="xu-box">
    <div class="xu-box-title mb15">
      <span>仪器追踪评价结果</span>
    </div>
    <follow-up-table></follow-up-table>

  </div>
</template>

<script>
import FollowUpTable from '@/components/page-dev-follow-up-eval/FollowUpTable.vue'

export default {
  components: { FollowUpTable },
}
</script>

<style scoped>

</style>