<template>
  <x-modal @close="close">
    <div><span class="xu-text-title">{{operation.operationName}}的历史标记记录</span></div>
    <div class="his-mark-wrapper xu-add-scrollBar">
      <ul>
        <li v-for="item in markInfos" :key="item.id" class="mb15">
          <x-button :value="'删除'" :type="'danger'" :size="'sm'" @click="delOneMarkInfo(item.id)"></x-button>
          <x-button :value="'修改'" :type="'warning'" :size="'sm'" @click="showEditOneMarkInfoModal(item)"></x-button>
          <span class="mr">{{ item.markTime | formatterDate}}</span>
          <span>
            {{ item.markMainType }} |
            {{ item.markSubType }} |
            {{ item.markEvent }} |
            {{ item.giveMedicineMethod }} |
            {{ item.giveMedicineVolume }} |
            {{ item.sideEffect }}
          </span>
        </li>
      </ul>
    </div>
    <div><span class="xu-text-title">添加术中标记</span></div>
    <div class="mark-form-wrapper">
      <div class="xu-col-9">
        <div class="mb15">
          <x-select v-model='level1' :options='level1Option' :styleObj="{'width':'100px'}" class="mr" :readonly="true"></x-select>
          <x-select v-model='level2' :options='level2Option' :styleObj="{'width':'150px'}" class="mr" v-if='level2Show' :readonly="true"></x-select>
          <x-select v-model='level3' :options='level3Option' :styleObj="{'width':'300px'}" v-if='level3Show'></x-select>
        </div>
        <div class="xu-text-std mb15">
          <span class="mr">不良反应：</span>
          <label class="mr">
            <span>无</span>
            <input type="radio" :value="false" v-model="hasReaction" class="xu-input-radio">
          </label>
          <label>
            <span>有</span>
            <input type="radio" :value="true" v-model="hasReaction" class="xu-input-radio">
          </label>
        </div>
        <div>
          <p class="xu-text-second">不良反应描述:</p>
          <textarea :disabled='!hasReaction' class="xu-input-textarea reaction-desc" v-model='reactionDesc'></textarea>
        </div>
      </div>
      <div class="xu-col-3">
        <div class="xu-text-second">*标记时间：</div>
        <input type="datetime-local" step=1 class="xu-input xu-input-time" v-model="markTime">
        <div class="prefix-wrapper" v-show="prefixShow">
          <div class="xu-text-second">
            <span v-if="level1 === '用药'">*给药途径：</span>
            <span v-if="level1 === '补液/输血'">*输入途径：</span>
          </div>
          <x-select v-model='level4' :options='level4Option' :styleObj="{'width':'100px'}" class="mb15"></x-select>
          <div class="xu-text-second">
            <span>*剂量：</span>
          </div>
          <input type="number" class="dose-input mb15" v-model="level5">
        </div>
      </div>
    </div>
    <div>
      <x-button :value="'确认提交'" :type="'success'" @click="submitMark()"></x-button>
    </div>
    <!-- 修改标记的时间弹窗 -->
    <x-modal v-if="editModalShow" @close="editModalShow = false">
      <div class="xu-text-second">选择一个新的标记时间：</div>
      <input type="datetime-local" step=1 class="xu-input xu-input-time mb15" v-model="newMarkTime">
      <div>
        <x-button :value="'确认修改'" :type="'success'" @click="editOneMarkInfo()"></x-button>
      </div>
    </x-modal>
  </x-modal>
</template>

<script>
import xModal from '@/x-views/xModal'
import xSelect from '@/x-views/xSelect'
import xButton from '@/x-views/xButton'
import showAlert from '@/x-views/xAlert/xAlert'
import axios from 'axios'
export default {
  components:{
    xModal,
    xSelect,
    xButton
  },
  props:['operation'],
  data(){
    return {
      markRecords:{},
      level1:'',
      level1Option:[],
      level2:'',
      level2Option:[],
      level3:'',
      level3Option:[],
      level4:'',
      level4Option:[],
      level5:'',
      hasReaction:false,
      reactionDesc:'',
      level2Show:false,
      level3Show:false,
      markInfos:[],//历史标记记录
      editModalShow:false,//是否显示修改标记时间的弹窗
      selectedMark:{},
      newMarkTime:this.$utils.getFormatterDate()['h5datetime'],
      markTime:this.$utils.getFormatterDate()['h5datetime'], 
    }
  },
  watch:{
    //是否要显示第二级选择框
    level1:function(newVal,oldVal){
      if(newVal === '用药'){
        this.level4Option = [
          "静脉注射","静脉滴注","皮下注射","肌肉注射","气道吸入","硬膜外","蛛网膜下","关节腔内注射"
        ]
      }
      if(newVal === '补液/输血'){
        this.level4Option = [
          "静脉滴注","静脉加压输注","静脉快速推注"
        ]
      }
      const tmp = this.markRecords[newVal]
      this.level2 = ''
      this.level3 = ''
      this.level4 = ''
      this.level5 = ''
      if(typeof tmp === 'object'){//有下一级选择框
        this.level2Show = true
        if(Array.isArray(tmp)){
          this.level2Option = tmp
        } else {
          this.level2Option = Object.keys(tmp)
        }
      } else {
        this.level2Show = false
      }
    },
    //是否显示第三级选择框
    level2:function(newVal,oldVal){
      const tmp = this.markRecords[this.level1][newVal]
      this.level3 = ''
      if(typeof tmp === 'object'){//有下一级选择框
        this.level3Show = true
        if(Array.isArray(tmp)){
          this.level3Option = tmp
        } else {
          this.level3Option = Object.keys(tmp)
        }
      } else {
        this.level3Show = false
      }
    },
    hasReaction:function(newVal,oldVal){
      if(!newVal){
        this.reactionDesc = ''
      }
    },
    //初始化选择框中的值
    level1Option:function(newVal){
      this.level1 = newVal[0]
    },
    level2Option:function(newVal){
      this.level2 = newVal[0]
    },
    level3Option:function(newVal){
      this.level3 = newVal[0]
    },
    level4Option:function(newVal){
      this.level4 = newVal[0]
    }
  },
  computed:{
    prefixShow:function(){
      if(this.level1 === '用药' && this.level2 !== '' && this.level3 !== ''){
        return true
      }
      if(this.level1 === '补液/输血' && this.level2 !== '' && this.level3 !== ''){
        return true
      }
      return false
    }
  },
  methods:{
    close(){
      this.$emit('close')
    },
    //1.获取手术标记信息
    getMarkRecords(){
      axios.get('./ope-mark.json')
      .then(res => {
        this.markRecords = res.data
        this.level1Option = Object.keys(res.data)
      })
      .catch(e => {
        console.log('获取或者解析手术标记信息出错')
      })
    },
    //2.提交标记信息
    submitMark(){
      const data ={
        'operationNumber':this.operation.operationNumber,
        'markMainType':this.level1,
        'markSubType':this.level2 ? this.level2 : '--',
        'markEvent':this.level3 ? this.level3 : '--',
        'giveMedicineMethod':this.level4 ? this.level4 : '--',
        'giveMedicineVolume':this.level5 ? this.level5 : '--',
        'sideEffect':this.hasReaction ? this.reactionDesc ? this.reactionDesc : '--' : '无',
        'markTime':this.$utils.getFormatterDate(this.markTime)['timestamp']
      }
      this.$http['addOneMarkInfo'](data)
      .then(res => {
        const { code } = res;
        if(code === 200){
          showAlert('添加成功','success')
          this.getMarkInfos()
        }
      })
      .catch(e => console.log(e))
      
    },
    //3.获取历史标记记录
    getMarkInfos(operationNumber=this.operation.operationNumber){
      this.$http['getAllMarkInfos']({params:{operationNumber:operationNumber}})
      .then(res => {
        const {data} = res
        this.markInfos = data
      })
      .catch(e => console.log('获取历史标记信息或者解析出错'))
    },
    //4.删除一条标记
    delOneMarkInfo(markId){
      this.$http['delOneMarkInfo']({params:{markId:markId}})
      .then(res => {
        const { code } = res;
        if(code === 200){
          showAlert('删除成功','success')
          this.getMarkInfos()
        }
      })
    },
    //5.显示修改标记的时间弹窗
    showEditOneMarkInfoModal(mark){
      this.editModalShow = true
      this.selectedMark = mark
      this.newMarkTime = this.$utils.getFormatterDate(mark.markTime)['h5datetime']
    },
    //6.修改标记时间
    editOneMarkInfo(){
      this.selectedMark['markTime'] = this.$utils.getFormatterDate(this.newMarkTime)['timestamp']
      this.selectedMark['operationNumber'] = this.operation.operationNumber
      this.$http['editOneMarkInfo'](this.selectedMark)
      .then(res => {
        const { code } = res;
        if(code === 200){
          showAlert('修改成功','success')
          this.getMarkInfos()
          this.editModalShow = false
        }
      })
    }
  },
  created(){
    this.getMarkRecords()
    this.getMarkInfos()
  }
}
</script>

<style scoped>
.his-mark-wrapper{
  height: 300px;
}
.mark-form-wrapper {
  width: 1000px;
  height: 260px;
  display: flex;
  margin: 0 -15px;
}
.mr {
  margin-right: 15px;
}
.prefix-wrapper {
  margin-top: 40px;
}
.dose-input {
  padding: 6px 25px 6px 10px;
  border: 0;
  border-bottom: 1px solid #dcdfe6;
  font-size: 1.2em;
}
.dose-input:focus {
  border-bottom: 1px solid #48a8ff
}
.reaction-desc {
  width: 680px;
  height: 120px;
  padding: 5px;
}
</style>