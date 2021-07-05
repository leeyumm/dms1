<template>
  <div id="xu-alert-wrapper" v-show='show' :class="style">
    {{msg}}
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
#xu-alert-wrapper {
  position: fixed;
  top:50%;
  left:50%;
  transform: translateX(-50%) translateY(-50%);
  background-color: rgba(0,0,0,0.7);
  animation: ZoomIn .1s;
  padding: 15px 20px;
  border-radius: 5px;
  z-index: 1024;
  height: 24px;
  line-height: 24px;
  box-sizing: content-box;
}
.success {
  color: #f1f1f1;
}
.failure {
  color: #dc3545;
}
@keyframes ZoomIn {
  0% {
    opacity: 0;
  }
  25% {
    opacity: 0.25;
  }
  50% {
    opacity: 0.5;
  }
  75% {
    opacity: 0.75;
  }
  100% {
    opacity: 1;
  }
}
</style>