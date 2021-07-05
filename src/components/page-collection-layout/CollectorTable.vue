
<template>
  <x-box class="table-wrapper">
    <div class="xu-box-title" style="margin-bottom:15px">
      <span>历史采集记录</span>
    </div>
    <x-table
      :title="['采集器ID','医疗设备','开始时间','结束时间','状态','操作']"
      :size="'sm'"
      :align="'center'"
      :strip="false"
      :colWidth="['150px','320px','190px','190px']"
    >
      <tr v-for="col in colInfos" :key="col.collectionNumber">
        <td>{{ col.collectorUniqueId }}</td>
        <td>{{ col.deviceCode | deviceCodeToName}}</td>
        <td>{{ col.collectionStartTime | formatterDate}}</td>
        <td>{{ col.collectionFinishTime | formatterDate}}</td>
        <td>
          <x-badge :value="'已完成'" v-show="col.collectionStatus === 2"></x-badge>
          <x-badge :value="'已废弃'" v-show="col.collectionStatus === -1" :type="'warning'"></x-badge>
          <x-badge :value="'采集中'" v-show="col.collectionStatus === 1" :type="'success'"></x-badge>
          <x-badge :value="'无效值'" v-show="col.collectionStatus === 0" :type="'danger'"></x-badge>
        </td>
        <td>
          <x-button :value="'详情'" :size="'sm'" :type="'transparent'" @click="showDetail(col)" v-show="col.collectionStatus === 2"></x-button>
        </td>
      </tr>
    </x-table>
    <div class="pager-wrapper">
      <x-pager 
      :pageNum="totalPages"
      :totalElements="totalElements"
      @hasSelectedPage="selPage($event)">
      </x-pager>
    </div>

    <x-modal v-if="modalShow" @close="modalShow = false;isChartsShow = false" :width="'1100px'">
      <div class="modal-title">采集详情</div>
      <div class="xu-row">
        <div class="xu-col-6">
          <div class="item-wrapper"><span class="item-name">采集器ID：</span><span>{{colDetailInfo.collectorUniqueId}}</span></div>
          <div class="item-wrapper"><span class="item-name">医疗设备：</span><span>{{colDetailInfo.deviceCode | deviceCodeToName}}</span></div>
          <div class="item-wrapper"><span class="item-name">序列号：</span><span>{{colDetailInfo.serialNumber}}</span></div>
          <div class="item-wrapper"><span class="item-name">开始时间：</span><span>{{colDetailInfo.collectionStartTime | formatterDate}}</span></div>
          <div class="item-wrapper"><span class="item-name">结束时间：</span><span>{{colDetailInfo.collectionFinishTime | formatterDate}}</span></div>
          <div class="item-wrapper"><span class="item-name">采集数据量：</span><span>{{colDetailInfo.collectedDataCounter}}</span></div>
        </div>
        <div class="xu-col-6">
          <div class="item-wrapper"><span class="item-name">使用科室：</span><span>{{colDetailInfo.deviceDepartment }}</span></div>
          <div class="item-wrapper"><span class="item-name">使用体验满意度：</span><span>{{colDetailInfo.experienceLevel}}分</span></div>
          <div class="item-wrapper"><span class="item-name">可靠性满意度：</span><span>{{colDetailInfo.reliabilityLevel}}分</span></div>
          <div class="item-wrapper">
            <span class="item-name">是否出错：</span>
            <span>{{colDetailInfo.hasError | formatterError(colDetailInfo)}}</span>
          </div>
          <div class="item-wrapper"><span class="item-name">记录员：</span><span>{{colDetailInfo.recordName}}</span></div>
          <div class="item-wrapper"><span class="item-name">备注：</span><span>{{colDetailInfo.remark}}</span></div>
        </div>
      </div>
      <div class="record-title">采集数据详情</div>
      <div class="charts-wrapper xu-add-scrollBar" v-if="isChartsShow">
        <div class="chart-wrapper" v-for="(obj,index) in deviceHistoryData" :key="index">
          <x-chart :option="initChartOpt(obj['name'],obj['value'])"></x-chart>
        </div>
      </div>
    </x-modal>
  </x-box>
</template>

<script>
import xTable from "@/x-views/xTable";
import xBox from "@/x-views/xBox";
import xPager from "@/x-views/xPager";
import xBadge from "@/x-views/xBadge";
import xButton from "@/x-views/xButton";
import xModal from '@/x-views/xModal.vue';
import xChart from '@/x-views/xChart.vue';

export default {
  components: { xTable, xBox, xPager, xBadge, xButton, xModal, xChart},
  data() {
    return {
      colInfos: [],
      totalPages: 1,
      totalElements: 0,
      modalShow: false,
      colDetailInfo:{},
      deviceHistoryData:{},
      isChartsShow:false
    };
  },
  methods: {
    getData(page = 0, size = 18) {
      this.$http["getColInfos"]({ params: { page: page, size: size } }).then(
        res => {
          const { data } = res;
          this.colInfos = data["content"];
          this.totalPages = data["totalPages"];
          this.totalElements = data["totalElements"];
        }
      );
    },
    getColDetailInfo(collectionNumber){
      this.$http['getColDetailInfos']({params:{collectionNumber}})
      .then(r => {
        const {data,code} = r
        if(code === 200){
          this.colDetailInfo = data
          // console.log(data)
          const {collectionNumber,deviceCode,serialNumber} = data
          if(this.colDetailInfo['collectedDataCounter'] > 0){
            this.getDevHistoryData(collectionNumber,deviceCode,serialNumber)
          } 
        }
      })
    },
    getDevHistoryData(collectionNumber,deviceCode,serialNumber){
      // this.deviceHistoryData = {}
      
      this.$http['getDevHistoryData']({params:{collectionNumber,deviceCode,serialNumber}})
      .then(r => {
        const {data,code} = r
        if(code === 200){
          // this.deviceHistoryData = {}
          const sortedHistoryData = []
          // this.deviceHistoryData = data
          const tmp = Object.keys(data)
          tmp.sort()
          // console.log(data)
          // this.interpolate(data[key])
          for(const key of tmp){
           sortedHistoryData.push({'name':key,value:this.interpolate(data[key])})
          }
          this.deviceHistoryData = sortedHistoryData
          this.isChartsShow = true
        }
      })
    },
    selPage(page) {
      this.getData(page - 1);
    },
    showDetail(col) {
      this.modalShow = true
      this.getColDetailInfo(col.collectionNumber)
    },
    initChartOpt(name,sample){
      return {
        xAxis: {
          type: 'category',
          boundaryGap: false,
          axisLine:{
            show:false
          },
          splitLine:{
            show: true
          }
        },
        yAxis: {
          type: 'value',
          name: name,
          nameTextStyle: {
            fontWeight:'bold'
          },
          axisLine:{
            show:true
          }
        },
        grid:{
          containLabel:false,
          left: '50px',
          top:'30px',
          bottom: '20px',
          right:'50px'
        },
        series: [{
            data: sample,
            type: 'line',
            smooth: true
        }]
      }
    },
    interpolate(arr){
      const ans = []
      let flag = 0
      const len = arr.length
      for(;flag < len;flag++){
        if(arr[flag] < 0){
          let l = flag
          let r = flag
          while(l >= 0 && arr[l] < 0){
            l--
          }
          while( r < len && arr[r] < 0){
            r++
          }
          if(l === -1 && r !== len){
            ans.push(arr[r])
          } else if(l !== -1 && r === len){
            ans.push(arr[l])
          }else {
            ans.push(Math.round((arr[r] + arr[l]) / 2))
          }
        } else {
          ans.push(arr[flag])
        }
      }
      return ans
    }
  },
  filters:{
    formatterError(val,col){
      if(val){
        return col.knownError + col.otherError
      } else {
        return '无'
      }
    }
  },
  created() {
    this.getData();
  }
};
</script>

<style scoped>
.pager-wrapper {
  position: absolute;
  right: 20px;
  bottom: 15px;
}
.table-wrapper {
  height: 768px;
  font-size: 14px;
}
.total-badge {
  font-size: 12px;
  vertical-align: bottom;
}
.modal-title {
  font-weight: bold;
  font-size: 18px;
  /* margin-bottom: 10px; */
}
.record-title {
  margin: 10px 0;
  font-weight: bold;
  font-size: 18px;
}
.item-wrapper {
  margin-top: 10px;
  line-height: 20px;
  font-size: 16px;
}
.item-name {
  color: #9ea9af
}
.charts-wrapper {
  height: 600px;
  padding-top: 5px;
}
.chart-wrapper {
  height: 150px;
}
</style>