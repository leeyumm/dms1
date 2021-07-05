<template>
  <button 
  :class="[`xu-btn-${this.size}`,`xu-btn-${this.type}`,{'xu-btn-invalid':disable}]"  
  @click="emitClick">
  <span :class="markerObj"> {{ value }}</span>
  </button>
</template>

<script>
export default {
  props:{
    //按钮的尺寸 sm lg default
    size:{
      type:String,
      default:'default'
    },
    //按钮的类型 success primary warning danger cancel dark
    type:{
      type:String,
      default:'primary'
    },
    //值
    value:{
      type:String
    },
    //是否禁用
    disable:{
      type:Boolean,
      default:false
    },
    //可以传入fontawesome的class名
    markerObj:{
      type:Array,
      default: () => []
    }
  },
  methods:{
    emitClick(){
      this.$emit('click')
    }
  }
}
</script>

<style scoped>

</style>