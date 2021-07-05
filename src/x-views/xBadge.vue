<template>
  <span :class="[`xu-badge xu-badge-${type}`,{'xu-badge-round':round}]">{{ value }}</span>
</template>

<script>
export default {
  props:{
    //类型 primary success warning danger  
    type:{
      type:String,
      default:'primary'
    },
    //值
    value:{
      type:String
    },
    //是否圆角
    round:{
      type:Boolean,
      default:true
    }
  }
}
</script>

<style scoped>

</style>