<template>
  <div class="real-time-panel-wrapper">
    <div class="no-ope-info">
      <p>目前没有正在进行的采集</p>
      <p style="font-size:30px;margin-top:8px">请开启采集器</p>
    </div>
  </div>
</template>

<script>
export default {
  props:['operationNumber','deviceCode'],
  created(){
    // console.log('默认',this.operationNumber)
  }
}
</script>

<style scoped>
.no-ope-info {
  display: block;
  font-size: 40px;
  color: #ccc;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  white-space: nowrap;
  text-align: center;
}
</style>