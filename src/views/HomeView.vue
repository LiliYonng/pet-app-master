<template>
  <el-row :gutter="2" class="home">
    <el-col :span="Lspan">
      <el-card shadow="hover">
        <!--用户卡片展示用户数据userInfo-->
        <div class="user">
          <img  src='../assets/userImg1.jpg' />
          <div class="userinfo">
            <p class="name">昵称:{{ userInfo.name }}</p>
            <p class="acess">{{ userInfo.identity }}</p>
          </div>
        </div>
        <div class="login-info">
          <p>
            上次登陆的时间:<span>{{ userInfo.lastDate }}</span>
          </p>
          <p>
            上次登陆的地点:<span>{{ userInfo.lastLocation }}</span>
          </p>
        </div>
      </el-card>
      <!-- 列表展示购买数据tableData-->
      <el-card style="margin-top: 1.25rem; height: auto">
        <el-table :data="tableData" style="font-size:1rem; width: 100%">
          <el-table-column 
            v-for="(val, key, index) in tableLabel"
            :prop="key"
            :label="val"
            :key="index"
            width="width"
          >
          </el-table-column>
        </el-table>
      </el-card>
    </el-col>
    <el-col :span ="Rspan">
      <!-- 多个flex盒子展示countData数据-->
      <div class="num">
        <el-card
          v-for="item in countData"
          :key="item.name"
          :body-style="{ display: flex, padding: 0 }"
        >
          <component
            class="icon"
            :is="$icon[item.icon]"
            :style="{ background: item.color }"
          />
          <div class="detail">
            <p class="num">{{ item.value }}</p>
            <p class="txt">{{ item.name }}</p>
          </div>
        </el-card>
      </div>
      <!--多种形式图表展示数据-->
      <el-card class='warp_chart'>
        <!--折线图-->
        <div class='chartBox' ref="lineChart"></div>
      </el-card>
      <div class="graph">
        <!--柱状图-->
        <el-card  class='warp_chart' >
          <div class='chartBox' ref="barChart"></div>
        </el-card>
        <!--饼状图-->
        <el-card  class='warp_chart' >
          <div class='chartBox' ref="pieChart"></div>
        </el-card>
      </div>
    </el-col>
  </el-row>
</template>
<script setup>
import { useEchart } from "../../api/useEchart";
import { onMounted, ref,computed } from "vue";
import { getData } from "../../api/data.js";
import { useStore } from "vuex";
const store = useStore();
const tableData = ref([]);
const tableLabel = ref({});
const countData = ref([]);
const userInfo = ref({});
//不同的图表数据
const chartOption = ref({
  //折线图数据
  orderData: {
    title: "",
    xData: [], //x轴数据
    series: [], //折线图y坐标，即购买量数据
  },
  //柱状图展示数据
  userData: {
    title: "",
    xData: [],
    series: [],
  },
  //饼图展示数据
  videoData: {
    title: "",
    series: [],
  },
});

//不同图表的dom位置
const Lspan = ref(null);
const Rspan = ref(null);
const lineChart = ref(null);
const pieChart = ref(null);
const barChart = ref(null);
const screenWidth = computed(()=>{
    return document.body.clientWidth;
})
const chartData = ref(null);
const handleChart = function(){
        const data = chartData.value;
         tableData.value = data.tableData;
        tableLabel.value = data.tableLabel;
        countData.value = data.countData;

        //获取图表数据
        //折线图的购买数据
        const order = data.orderData;
        const orderX = order.date;
        const orderKeyArr = Object.keys(order.data[0]);
        let orderSeries = [];
        orderKeyArr.forEach((key) => {
          orderSeries.push({
            type: "line",
            name: key,
            data: order.data.map((item) => item[key]),
          });
        });
        chartOption.value.orderData.title = order.title;
        chartOption.value.orderData.xData = orderX;
        chartOption.value.orderData.series = orderSeries;
        //传入折线图数据和dom位置
        useEchart(chartOption.value.orderData, lineChart.value);

        //柱状图
        const user = data.userData;
        const userX = user.data.map((item) => item.date);
        const userSeries = [];
        userSeries.push(
          {
            name: "新增用户",
            data: user.data.map((item) => item.new),
            type: "bar",
          },
          {
            name: "活跃用户",
            data: user.data.map((item) => item.active),
            type: "bar",
          }
        );
        chartOption.value.userData.title = user.title;
        chartOption.value.userData.xData = userX;
        chartOption.value.userData.series = userSeries;
        useEchart(chartOption.value.userData, barChart.value);

        //饼状图
        chartOption.value.videoData.title = data.videoData.title;
        chartOption.value.videoData.series.push({
          type: "pie",
          data: data.videoData.data,
        });
        useEchart(chartOption.value.videoData, pieChart.value);
};
onMounted(() => {
  /**处理响应的样式数据 */
        if(screenWidth.value>900){
          Lspan.value = 8;
          Rspan.value = 16;
        }
        else{
          Lspan.value = 24;
          Rspan.value = 24;
        }
  /**处理接口数据 */
  userInfo.value = store.state.user.userInfo;
  // userImg.value = require("../assets" + userInfo.value.Profilephoto);
  //getData是二次封装的axios请求，使用mock拦截请求返回模拟数据
  getData()
    .then((res) => {
      chartData.value = res.data;
      //处理表格
      handleChart();
    })
    .catch((err) => console.log(err.message));
});
</script>

<style lang="less">
.user,.login-info{
   flex-wrap:wrap;
}
.el-col {
  margin-top: 1.25rem;
}
.num{
  font-size:0.5rem;
}
</style>
