<template>
  <div class="nav-wrapper">
    <div class="avatar-wrapper">
      <img src="../../assets/doctor.png" alt="" width="120px">
    </div>
    <ul class="nav-links-wrapper">
      <router-link tag="li" to='/home' active-class="active" exact class="nav-link">
        <i class="fa fa-table fa-fw"></i>
        <span>综合分析</span>
      </router-link>
      <router-link tag="li" to='/realtime' active-class="active" exact class="nav-link">
        <i class="fa fa-line-chart fa-fw"></i>
        <span>实时监测</span>
      </router-link>
      <router-link tag="li" to='/col-info' active-class="active" exact class="nav-link">
        <i class="fa fa-server fa-fw"></i>
        <span>采集记录</span>
      </router-link>
      <router-link tag="li" to='/follow-up' active-class="active" exact class="nav-link">
        <i class="fa fa-calendar-o fa-fw"></i>
        <span>追踪评价</span>
      </router-link>
      <router-link tag="li" to='/maintenance' active-class="active" exact class="nav-link">
        <i class="fa fa-cogs fa-fw"></i>
        <span>维保售后评价</span>
      </router-link>
      <router-link tag="li" to='/economic' active-class="active" exact class="nav-link">
        <i class="fa fa-rmb fa-fw"></i>
        <span>经济评价</span>
      </router-link>
      <router-link tag="li" to='/dev-category-analysis' active-class="active" exact class="nav-link">
        <i class="fa fa-list fa-fw"></i>
        <span>仪器分类评价</span>
      </router-link>
    </ul>
  </div>
</template>

<script>
import { typeInfo } from '@/global/devTypeCode'

export default {
  data(){
    return {
      isSpread:false,
      urls:this.getUrls()
    }
  },
  methods:{
    toggle(){
      this.isSpread = !this.isSpread
    },
    getUrls(){
      const ans = []
      for(const key in typeInfo){
        ans.push({'name':key,'url':typeInfo[key]['url']})
      }
      return ans
    }
  },
}
</script>

<style scoped>
.avatar-wrapper {
  padding: 25px 52px 25px 52px;
  /* border-bottom:1px solid #566579 */
}
.nav-links-wrapper {
  font-size: 14px;
}
.nav-link {
  padding: 10px 0 10px 15px;
  /* border-bottom:1px solid #566579 */
}
.nav-link:hover {
  color: #ffffff;
  cursor: pointer;
}
.nav-link > i {
  margin-right: 10px;
  /* font-size: 16px; */
  color: #1890ff;
}
.arrow {
  float: right;
  font-size: 14px;
  margin-right: 20px;
  margin-top: 3px;
}
.active {
  color: #ffffff;
  background-color: #5473e8;
}
.active > i {
  color: #fff;
}
.shrink-links-wrapper {
  height: 0;
}
.spread-links-wrapper {
  height: 260px; 
}
.toggle-links-wrapper {
  transition: height ease 0.3s;
  overflow: hidden;
}
.toggle-links-wrapper > .nav-link {
  padding-left: 20px;
}
</style>