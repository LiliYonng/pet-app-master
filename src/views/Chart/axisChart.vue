<template>
    <div>
        <div class="box">
            选择横坐标
            <el-select v-model="selectedInd" class="m-2"  size="large"
            @change="handleChange"
            placeholder="请选择x坐标值"
            >
            <el-option
            v-for="(item,index) in options"
            :key="index"
            :label="item"
            :value="index"
            />
            </el-select>
            <span>
            <span style="margin:0 20px;">新增用户:<el-input style="width:200px" 
            v-model="selectedItem.new" placeholder="请输入新增用户" 
             @input="selectedItem.new=selectedItem.new.replace(/[^\d]/g,'')"
            @change="resizeChart"></el-input></span>
            <span>活跃用户：<el-input  style="width:200px" class="input" 
            v-model="selectedItem.active" placeholder="请输入活跃用户" 
             @input="selectedItem.active=selectedItem.active.replace(/[^\d]/g,'')"
            @change="resizeChart"></el-input></span>
            </span>
        </div>
        <el-card  class='warp_chart' >
          <div class='chartBox' ref="chartDom"></div>
        </el-card>
    </div>
</template>

<script setup>
import { useEchart } from "../../../api/useEchart";
import { onMounted, ref,computed } from "vue";
import { getData } from "../../../api/data.js";
    //柱状图
const chartData = ref(null);
const chartDom = ref(null)
const myChart = ref(null)
const chartOption = ref({
    title: "",
    xData: [],
    series: [],
})
const selectedItem = ref({
    date:'',
    new:'',
    active:''
})
const handleChange = (val)=>{
    selectedItem.value = chartData.value.userData.data[val]
}
const options = ref(null)
    onMounted(() => {
     getData().then((res) => {
      chartData.value = res.data;
      options.value = res.data.userData.data.map(item=>item.date)
      handleChart();
    })
    .catch((err) => console.log(err.message));
    });
const resizeChart = ()=>{
    console.log('输入完毕')
    handle()
}
const handle = ()=>{
    const user = chartData.value.userData;
    if(!myChart.value) return;
      myChart.value.setOption({
        xAxis: {
        data: chartOption.value.xData
        },
        series: [
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
        ]
    });
}
const handleChart = ()=>{
    const user = chartData.value.userData;
    console.log(user)
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
    chartOption.value.title = user.title;
    chartOption.value.xData = userX;
    chartOption.value.series = userSeries;
    myChart.value  = useEchart(chartOption.value, chartDom.value);
    myChart.value.resize({
         height: 400
    })
    }

</script>

<style scoped>
.warp_chart{
    width:100%;
    height:500px;
}
.box{
    margin-bottom:20px;
}
</style>