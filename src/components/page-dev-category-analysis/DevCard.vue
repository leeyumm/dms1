<template>
  <div class="xu-box" style="margin-bottom: 15px">
    <div class="xu-row">
      <div class="xu-col-3">
        <div class="dev-img-wrapper">
          <img :src="devInfo.imgUrl" />
        </div>
      </div>
      <div class="xu-col-9">
        <div class="dev-desc">
          <p class="desc-item">
            <span class="desc-name">生产厂商：</span>{{ devInfo.devCompany }}
          </p>
          <p class="desc-item">
            <span class="desc-name">设备名称：</span>{{ devInfo.devName }}
          </p>
          <p class="desc-item">
            <span class="desc-name">采集场次：</span
            >{{ devEvalInfo.totalCollectionCounter }}场
          </p>
          <p class="desc-item">
            <span class="desc-name">采集时长：</span
            >{{ devEvalInfo.totalCollectionTime }}秒
          </p>
        </div>
      </div>
    </div>
    <div class="xu-row">
      <div class="xu-col-4">
        <div class="eval-wrapper">
          <span class="eval-name">维修服务满意度分析</span>
          <div class="bar-wrapper">
              <x-chart :option="initBarChartOpt(devEvalInfo)"></x-chart>
            </div>
        </div>
      </div>
      <div class="xu-col-3">
        <div class="eval-wrapper">
          <span class="eval-name">使用评价分析</span>
          <div class="pie-wrapper">
            <x-chart :option="initPieChartOpt(devEvalInfo.averageUsageExperienceLevel,'平均使用满意度')"></x-chart>
          </div>
          <div class="pie-wrapper">
            <x-chart :option="initPieChartOpt(devEvalInfo.averageUsageReliabilityLevel,'平均可靠性满意度')"></x-chart>
          </div>
        </div>
      </div>
      <div class="xu-col-5">
        <div class="eval-wrapper">
          <span class="eval-name"> 经效比分析 </span>
          <div class="">
            <div class="economic-item">
              <span class="economic-name">购买价格</span>
              <span class="economic-val">{{ devEvalInfo.devicePurchasePrice | toInteger}}<span class="economic-unit">元</span></span>
            </div>
            <div class="economic-item">
              <span class="economic-name">技师总工资</span>
              <span class="economic-val">{{ devEvalInfo.totalTechnicianMonthlySalary | toInteger }}<span class="economic-unit">元</span></span> 
            </div>
            <div class="economic-item">
              <span class="economic-name">手术耗材</span>
              <span class="economic-val">{{ devEvalInfo.totalConsumableCostMoney | toInteger }}<span class="economic-unit">元</span></span> 
            </div>
            <div class="economic-item">
              <span class="economic-name">固定维护维修</span>
              <span class="economic-val">{{ devEvalInfo.totalFixRepairCostMoney | toInteger}}<span class="economic-unit">元</span></span> 
            </div>
            <div class="economic-item">
              <span class="economic-name">总维修保养费</span>
              <span class="economic-val">{{ devEvalInfo.historyMaintenanceCostSum | toInteger }}<span class="economic-unit">元</span></span> 
            </div>
            <div class="economic-item">
              <span class="economic-name">总收益</span>
              <span class="economic-val">{{ devEvalInfo.totalProfitMoney | toInteger }}<span class="economic-unit">元</span></span> 
            </div>
          </div>
        </div>
      </div>
      
    </div>
  </div>
</template>

<script>
import xChart from "@/x-views/xChart.vue";

export default {
  components: { xChart },
  props: {
    devInfo: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      devEvalInfo: {},
    };
  },
  methods: {
    getData(deviceCode) {
      // console.log(deviceCode)
      this.$http["getDevEvaluationInfos"]({
        params: { deviceCode: deviceCode },
      }).then((r) => {
        const { data, code } = r;
        if (code === 200) {
          this.devEvalInfo = data;
          // console.log(this.devEvalInfo);
        }
      });
    },
    initPieChartOpt(value, name) {
      if (!value) {
        return null;
      }
      let getvalue = [value.toFixed(2)];
      return {
        title: {
          text: getvalue + "分",
          textStyle: {
            color: "#28BCFE",
            fontSize: 16,
          },
          subtext: name,
          subtextStyle: {
            color: "#666666",
            fontSize: 12,
          },
          itemGap: 10,
          left: "center",
          top: "33%",
        },
        tooltip: {
          formatter:function(params){
            return name + '：' + getvalue[0]
          }
        },
        angleAxis: {
          max: 5,
          clockwise: true, // 逆时针
          // 隐藏刻度线
          show: false,
        },
        radiusAxis: {
          type: "category",
          show: true,
          axisLabel: {
            show: false,
          },
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
        },
        polar: {
          center: ["50%", "50%"],
          radius: "175%", //图形大小
        },
        series: [
          {
            type: "bar",
            data: getvalue,
            showBackground: true,
            backgroundStyle: {
              color: "#BDEBFF",
            },
            coordinateSystem: "polar",
            roundCap: true,
            barWidth: 13,
            itemStyle: {
              normal: {
                opacity: 1,
                color: {
                  type: "linear",
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [
                    {
                      offset: 0,
                      color: "#25BFFF",
                    },
                    {
                      offset: 1,
                      color: "#5284DE",
                    },
                  ],
                  global: false, // 缺省为 false
                  shadowBlur: 5,
                  shadowColor: "#2A95F9",
                },
              },
            },
          },
        ],
      };
    },
    initBarChartOpt(devEvalInfo) {
      let data = [
        devEvalInfo.averageMaintenanceResponseTimeSatisfactionLevel,
        devEvalInfo.averageMaintenancePriceSatisfactionLevel,
        devEvalInfo.averageMaintenanceServiceAttitudeSatisfactionLevel,
        devEvalInfo.averageMaintenanceOverallProcessSatisfactionLevel,
      ]
      return {
        xAxis: {
          type: "value",
          max: 5
        },
        yAxis: {
          type: "category",
          data: ["整体过程","服务态度","维修价格","响应时间"],
          axisTick:{
            show:false
          },
          axisLine:{
            show:false
          }
        },
        tooltip:{
          trigger: 'axis',
        },
        grid:{
          containLabel:false,
          left:'60px',
          top:'20px',
          bottom:'20px'
        },
        series: [
          {
            data: data,
            type: "bar",
            showBackground: true,
            barCategoryGap:'40px',
            barWidth:'15px',
            backgroundStyle: {
              color: "rgba(180, 180, 180, 0.2)",
            },
          },
        ],
      };
    },
  },
  watch:{
    'devInfo':function(newVal){
      console.log(newVal)
      this.getData(this.devInfo.deviceCode);
    }
  },
  created() {
    this.getData(this.devInfo.deviceCode);
    // console.log(this.devInfo)
  },
};
</script>

<style scoped>
.dev-img-wrapper {
  text-align: center;
  margin-bottom: 10px;
}
.dev-img-wrapper > img {
  height: 100px;
  width: 100px;
  vertical-align: text-bottom;
}
.dev-desc {
  font-size: 12px;
}
.desc-item {
  line-height: 25px;
  white-space: nowrap;
  overflow: hidden;
}
.desc-name {
  font-weight: bold;
}
.economic-item {
  /* height: 85px; */
  margin-top: 20px;
  position: relative;
  text-align: start;
  /* margin-left: 20px; */
}
.economic-name {
  color: #bbb;
  font-size: 15px;
  font-weight: bold;
  margin-bottom: 5px;
  display: inline-block;
  width: 100px;
  /* vertical-align: center; */
}
.economic-val {
  font-size: 25px;
  display: inline-block;
  width: 151px;
  overflow: hidden;
  white-space: nowrap;
  vertical-align: bottom;
  text-align: end;
  font-weight: bold;
}
.economic-unit {
  font-size: 14px;
  color: #bbb;
  /* position: absolute;
  right: 20px;
  bottom: 22px */
}
.eval-wrapper {
  position: relative;
  text-align: center;
}
.eval-name {
  display: inline-block;
  font-size: 18px;
  font-weight: bold;
  margin-top: 15px;
}
.pie-wrapper {
  height: 150px;
}
.bar-wrapper {
  height: 300px;
}
</style>>

