<template>
  <x-box>
    <div class="xu-box-title">
      <span>历史采集场次</span>
      <div class="panel-select-wrapper">
        <x-button
          :value="'一个月内'"
          :size="'sm'"
          :type="'cancel'"
          @click="getHistoryOf(30)"
          :class="{ 'panel-select-active': days === 30 }"
        ></x-button>
        <x-button
          :value="'半个月内'"
          :size="'sm'"
          :type="'cancel'"
          @click="getHistoryOf(15)"
          :class="{ 'panel-select-active': days === 15 }"
        ></x-button>
        <x-button
          :value="'一周以内'"
          :size="'sm'"
          :type="'cancel'"
          @click="getHistoryOf(7)"
          :class="{ 'panel-select-active': days === 7 }"
        ></x-button>
      </div>
    </div>
    <div class="chart-wrapper">
      <x-chart :option="option"></x-chart>
    </div>
  </x-box>
</template>

<script>
import xBox from "@/x-views/xBox";
import xChart from "@/x-views/xChart";
import xButton from "@/x-views/xButton";
export default {
  components: { xBox, xButton, xChart },
  data() {
    return {
      historyData: null,
      days: 7,
      option:null,
      data:[]
    };
  },
  methods: {
    initOption(sample) { 
      return {
        grid:{
          containLabel:false,
          top:'20px',
          bottom:'20px'
        },
        tooltip: {
          trigger: "item",
        },
        xAxis: {
          type: "category",
          data: Object.keys(sample)
        },
        yAxis: {
          type: "value",
          min:0,
          max:(v) => {
            if(v.max > 10){
              return v.max+2
            } else {
              return 10
            }
          },
        },
        series: [
          {
            data: Object.values(sample),
            type: "line",
            smooth: true,
            areaStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{
                        offset: 0,
                        color: 'rgba(84,112,198,0.5)'
                    },
                    {
                        offset: 1,
                        color: 'rgba(84,112,198,0)'
                    }
                ],
                global: false // 缺省为 false
              }
            }
          },
        ],
      };
    },
    getData(days = this.days) {
      this.$http["getOpeHistoryCases"]({ params: { days: days } }).then(
        (res) => {
          const { data } = res;
          const tmp = {}
          if(data) {
            this.option = this.initOption(data)
          }
        }
      );
    },
    getHistoryOf(days) {
      this.days = days;
      this.getData();
    },
  },
  created() {
    this.getData()
    // this.test()
  },
};
</script>

<style scoped>
.chart-wrapper {
  height: 222px;
}
</style>