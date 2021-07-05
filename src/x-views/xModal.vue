<template>
  <div class="modal-backdrop" @click.self="close">
    <div class="modal-wrapper" :style="{'width':width}">
      <slot>这是插槽的默认内容</slot>
    </div>
  </div>
</template>

<script>
export default {
  props:{
    width:{
      type:String
    }
  },
  methods:{
    close:function(){
      this.$emit('close')
    }
  }
}
</script>

<style scoped>
.modal-backdrop {
  position: fixed;
  top:0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.6);
}

.modal-wrapper {
  position: relative;
  animation: zoomIn 0.1s linear 0s;
  background-color: #ffffff;
  padding: 20px;
  border-radius: 5px;
}
</style>