<template>
  <x-box>
    <div class="xu-row">
      <div class="xu-col-9">
        <div v-if="isDemoMode" class="dashboard-wrapper">
          <component :is="demoPanel"></component>
          <!-- <component :is="'MeiDunLi5100C'"></component> -->
        </div>
        <div v-else class="dashboard-wrapper">
          <div v-for="col in colInProcess" :key="col.collectionNumber">
            <!-- 缓存不同采集之间的显示数据，如果使用v-if就不会缓存 -->
            <div v-show="selCollectionNumber == col.collectionNumber">
              <keep-alive>
                <component
                  :is="deviceToPanel[col.deviceCode]"
                  :operationNumber="col.collectionNumber"
                  :deviceCode="col.deviceCode"
                ></component>
              </keep-alive>
            </div>
          </div>
          <div v-show="colInProcess.length == 0">
            <component
              :is="'NoRealTimeData'"
              :operationNumber="selCollectionNumber"
              :deviceCode="selDeviceCode"
            ></component>
          </div>
        </div>
      </div>
      <div class="xu-col-3">
        <div class="mb15 demo-btn-wrapper">
          <span style="font-weight: bold; margin-left: 15px">演示模式</span>
          <x-swi v-model="isDemoMode" class="float-right"></x-swi>
        </div>
        <div class="real-ope-info">
          <span style="font-weight: bold"
            >正在进行的采集<span v-show="colInProcess.length === 0" class="hint"
              >[目前暂无]</span
            ></span
          >
          <ul class="process-ope-wrapper xu-add-scrollBar">
            <li
              v-for="col in colInProcess"
              :key="col.collectionNumber"
              :class="{ active: selCollectionNumber === col.collectionNumber }"
              @click="changeCol(col)"
            >
              <p style="margin-bottom: 5px">
                <span style="font-weight: bold">采集器:</span>
                {{ col.collectionNumber + "#" + col.collectorUniqueId }}
              </p>
              <p style="margin-bottom: 5px">
                <span style="font-weight: bold">设备:</span>
                {{ col.deviceCode + "#"
                }}{{ col.deviceCode | deviceCodeToName }}
              </p>
              <p>
                <span style="font-weight: bold">开始时间:</span>
                {{ col.collectionStartTime | formatterDate }}
              </p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </x-box>
</template>

<script>
import xBox from "@/x-views/xBox";
import NoRealTimeData from "@/components/dev-dashboard/NoRealTimeData";
import PuKeYy106 from "@/components/dev-dashboard/PuKeYy106";
import NuoHeNw9002S from "@/components/dev-dashboard/NuoHeNw9002S";
import YiAn8700A from "@/components/dev-dashboard/YiAn8700A";
import BLTA8 from "@/components/dev-dashboard/BLTA8";
import AiQinEGOS600A from "@/components/dev-dashboard/AiQinEGOS600A";
import MindaryT8 from "@/components/dev-dashboard/MindaryT8";
import MindaryWATOEX65 from "@/components/dev-dashboard/MindaryWATOEX65";
import EegVista from "@/components/dev-dashboard/EegVista";
import EliteV8 from '@/components/dev-dashboard/EliteV8'
import MeiDunLi5100C from '@/components/dev-dashboard/MeiDunLi5100C.vue'
import xSwi from "@/x-views/xSwi";
import Demo from "@/components/dev-dashboard/Demo";
import { getDevCode } from "@/global/devTypeCode";

const pattern = {
  0: "NoRealTimeData",
  [getDevCode("NUO_HE_NW9002S")]: "NuoHeNw9002S",
  [getDevCode("PU_KE_YY106")]: "PuKeYy106",
  [getDevCode("BAO_LAI_TE_A8")]: "BLTA8",
  [getDevCode("YI_AN_8700A")]: "YiAn8700A",
  [getDevCode("MAI_RUI_T8")]: "MindaryT8",
  [getDevCode("MAI_RUI_WATOEX65")]: "MindaryWATOEX65",
  [getDevCode("AI_QIN_EGOS600A")]: "AiQinEGOS600A",
  [getDevCode("MEI_DUN_LI_EEG_VISTA")]: "EegVista",
  [getDevCode("LI_BANG_ELITEV8")]: "EliteV8",
  [getDevCode("MEI_DUN_LI_5100C")]: "MeiDunLi5100C",
};

export default {
  components: {
    xBox,
    xSwi,
    PuKeYy106,
    NoRealTimeData,
    NuoHeNw9002S,
    YiAn8700A,
    BLTA8,
    AiQinEGOS600A,
    MindaryT8,
    MindaryWATOEX65,
    EegVista,
    EliteV8,
    MeiDunLi5100C,
    Demo,
  },
  data() {
    return {
      colInProcess: [],
      colInProcessDemo: [
        {
          collectionNumber: 9,
          deviceCode: "xxx",
          collectorUniqueId: "70:3A:51:2D:2D:20",
          collectionStartTime: 1622535978000,
        },
        {
          collectionNumber: 8,
          deviceCode: "xxx",
          collectorUniqueId: "70:3A:51:2D:2D:20",
          collectionStartTime: 1622535979000,
        },
        {
          collectionNumber: 7,
          deviceCode: "xxx",
          collectorUniqueId: "70:3A:51:2D:2D:20",
          collectionStartTime: 1622535979000,
        },
        {
          collectionNumber: 6,
          deviceCode: "xx",
          collectorUniqueId: "70:3A:51:2D:2D:20",
          collectionStartTime: 1622535979000,
        },
        {
          collectionNumber: 5,
          deviceCode: "xx",
          collectorUniqueId: "70:3A:51:2D:2D:20",
          collectionStartTime: 1622535979000,
        },
        {
          collectionNumber: 4,
          deviceCode: "xx",
          collectorUniqueId: "70:3A:51:2D:2D:20",
          collectionStartTime: 1622535979000,
        },
        
      ],
      deviceToPanel: pattern,
      selCollectionNumber: 0,
      selDeviceCode: 0,
      currentPanel: "NoRealTimeData",
      currentPanels: [],
      opePanelPattern: {}, //用来存放所有手术的面板组件
      timer: null,
      isDemoMode: false, //用来控制是否是演示模式
      demoPanel: "Demo",
    };
  },
  methods: {
    //1.获取正在进行的手术 -- 30s定时访问
    getOpeInProcessData() {
      // console.log("获取正在进行的采集");
      this.$http["getColInProcess"]({ params: { size: 1000 } }).then((res) => {
        const {
          data: { content },
        } = res;
        console.log(`一共有${content.length}场正在采集`);
        this.colInProcess = content;

        const cols = this.colInProcess.map((ele) => ele.collectionNumber);

        //分配选中的采集的采集号和设备号
        if (this.colInProcess.length > 0) {
          //还有正在采集的数据
          if (!cols.includes(this.selCollectionNumber)) {
            this.selDeviceCode = this.colInProcess[0].deviceCode;
            this.selCollectionNumber = this.colInProcess[0].collectionNumber;
          }
        } else {
          this.selCollectionNumber = 0;
          this.selDeviceCode = 0;
        }
      });
    },
    changeCol(collection) {
      this.selCollectionNumber = collection.collectionNumber;
      this.selDeviceCode = collection.deviceCode;
    },
  },
  watch: {
    selCollectionNumber: function () {
      console.log(
        `选择的deviceCode${this.selDeviceCode}-采集号${this.selCollectionNumber}`
      );
      this.currentPanel = pattern[this.selDeviceCode];
    },
    isDemoMode: {
      handler: function (newVal, oldVal) {
        clearInterval(this.timer);
        if (newVal) {
          this.colInProcess = this.colInProcessDemo; //是演示模型清空正在进行的采集
        }
        if (!newVal) {
          //不是演示模式,才发起请求
          this.colInProcess = []
          this.selCollectionNumber = 0;
          this.selDeviceCode = 0;
          this.getOpeInProcessData();
          this.timer = setInterval(() => {
            this.getOpeInProcessData();
          }, 30000);
        }
      },
      immediate:true
    },
  },
  created() {
    //如果不是演示模式才进行数据请求
    // if (!this.isDemoMode) {
    //   this.getOpeInProcessData();
    //   this.timer = setInterval(() => {
    //     this.getOpeInProcessData();
    //   }, 30000);
    // }
  },
  beforeDestroy() {
    clearInterval(this.timer);
  },
};
</script>

<style scoped>
.real-ope-info {
  /* height: 96%; */
  background-color: #f8f8f8;
  box-sizing: border-box;
  /* border: 1px solid #24c79f; */
  border-radius: 15px;
  color: #111;
  /* outline:1px solid black; */
}
.real-ope-info > span {
  display: inline-block;
  /* font-size: 18px; */
  padding: 10px 15px;
  width: 100%;
  box-sizing: border-box;
}
.process-ope-wrapper {
  /* margin-bottom: 20px; */
  height: 692px;
  /* outline: 1px solid red; */
  padding: 0 15px;
}
.process-ope-wrapper > li {
  padding: 8px 10px;
  cursor: pointer;
  border-bottom: 1px solid #e9ecef;
  font-size: 14px;
  white-space: nowrap;
  word-break: keep-all;
  overflow: hidden;
  border-radius: 5px;
  background-color: #fff;
  margin-bottom: 10px;
}
.process-ope-wrapper > li:hover {
  background-color: #f1f1f1;
}
.active {
  background-color: #5473e8 !important;
  color: #ffffff !important;
  transition: background-color 0.3s;
}
.dashboard-wrapper {
  margin-top: 10px;
  border-right: 25px solid rgb(233, 230, 230);
  border-left: 25px solid rgb(233, 230, 230);
  border-top: 25px solid rgb(233, 230, 230);
  border-bottom: 25px solid rgb(233, 230, 230);
  box-sizing: border-box;
  border-radius: 15px;
}
.hint {
  color: #cccccc;
}
.demo-btn-wrapper {
  margin-top: 10px;
}
</style>