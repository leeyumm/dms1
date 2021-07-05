<template>
  <x-box>
    <div class="xu-box-title">
      <span>医疗设备分布</span>
    </div>
    <div class="chart-wrapper">
      <x-chart :option="option"></x-chart>
    </div>
  </x-box>
</template>

<script>
import xBox from "@/x-views/xBox";
import xChart from "@/x-views/xChart";
export default {
  components: { xBox, xChart },
  data() {
    return {
      option:null
    };
  },
  methods: {
    //0.初始化饼图的图例
    initLegend(sample) {
      return {
        tooltip: {
          trigger: "item",
        },
        legend: {
          top: "center",
          right: "10",
          orient: "vertical",
        },
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: ["40%", "80%"],
            center: ['25%','50%'],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: "center",
            },
            emphasis: {
              label: {
                show: true,
                fontSize: "20",
                fontWeight: "bold",
              },
            },
            labelLine: {
              show: false,
            },
            data: sample,
          },
        ],
      };
    },
    //1.获取数据
    getData() {
      this.$http["getDevNum"]().then((res) => {
        const { data } = res;
        const tmp = []
        for (const key in data){
          tmp.push({
            value:data[key],
            name:key
          })
        }
        this.option = this.initLegend(tmp)
      });
    },
  },
  created() {
    this.getData()
  },
};
</script>

<style scoped>
.chart-wrapper {
  height: 195px;
}
</style>