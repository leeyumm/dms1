<template>
  <table 
  :class="[
  'xu-table',
  `xu-table-${size}`,
  `xu-table-${align}`,
  `xu-table-hover`,
  {'xu-table-strip':strip}
  ]">
    <thead>
      <tr>
        <th v-for="(th,index) in title" :key="index" :style="{'width':colWidth[index]}">{{ th }}</th>
      </tr>
    </thead>
    <tbody>
      <slot></slot>
    </tbody>
  </table>
</template>

<script>
export default {
  props:{
    //表格首行
    title:{
      type:Array,
      default:() => {return []}
    },
    //对齐方式
    align:{
      type:String,
      default:'center'
    },
    //尺寸 normal sm lg
    size:{
      type:String,
      default:'normal'
    },
    //是否显示条纹
    strip:{
      type:Boolean,
      default:false
    },
    //表格中每列的宽度
    colWidth:{
      type:Array,
      default:() => {return []}
    }
  }
}
</script>

<style scoped>

</style>