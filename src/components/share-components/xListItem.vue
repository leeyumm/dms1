<template>
  <div class="wrapper">
    <span class="item-name">{{ itemName + "：" }}</span>
    <span class="item-value">{{ itemValue }}</span>
  </div>
</template>

<script>
export default {
  props:{
    itemName:{
      type:String
    },
    itemValue:{
      type:String
    }
  }
}
</script>

<style scoped>
.wrapper {
  margin-top: 10px;
  line-height: 20px;
  font-size: 16px;
}
.item-name {
  color: #9ea9af
}
</style>