<template>
  <div>
    <ul class="device-category-wrapper">
      <li 
      v-for="(devCategory,index) in deviceCategorys" 
      :key="index" 
      class="device-category" 
      :class="{'active':selectDeviceCategory === devCategory}"
      @click="changeDeviceCategory(index)"
      >
        {{ devCategory }}
      </li>
    </ul>
    <dev-analysis-cards :deviceCategory="selectDeviceCategory" v-if="refresh"></dev-analysis-cards>
  </div>
</template>

<script>
import DevAnalysisCards from '@/components/page-dev-category-analysis/DevAnalysisCards'
export default {
  components:{DevAnalysisCards},
  data(){
    return {
      deviceCategorys:['麻醉深度监测仪','无创血压监测仪(监护仪)','麻醉机','无创血红蛋白监测仪','无创脑氧饱和度监测仪','呼吸机'],
      selectDeviceCategory:'麻醉深度监测仪',
      refresh:true
    }
  },
  methods:{
    changeDeviceCategory(index){
      this.selectDeviceCategory = this.deviceCategorys[index]
      //强制刷新组件 重要!!!
      this.refresh = false
      this.$nextTick(() => {
        this.refresh = true
      })
    }
  }
}
</script>

<style scoped>
.device-category-wrapper {
  display: flex;
  margin: 0 -15px 15px -15px;
}
.device-category {
  display: inline-block;
  margin: 0 15px;
  background-color: #fff;
  padding: 10px;
  font-size: 16px;
  text-align: center;
  flex: 1;
  cursor: pointer;
  box-sizing: border-box;
  border-radius: 20px;
  transition: background-color 0.1s ease-in 0s;
}
.device-category:hover {
  background-color: rgb(248, 248, 248);
}
.active {
  background-color: #5473e8;
  color: #fff;
}
.active:hover {
  background-color: #5473e8;
}
</style>