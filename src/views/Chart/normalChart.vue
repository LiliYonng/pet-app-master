<template>
    <div>
        <div class="box">
            选择类别
            <el-select v-model="selectedInd" class="m-2"  size="large"
            @change="handleChange"
            placeholder="请选择类别"
            >
            <el-option
            v-for="(item,index) in options"
            :key="index"
            :label="item"
            :value="index"
            />
            </el-select>
            <span style="margin:0 20px;">改变占比:<el-input style="width:200px" 
            v-model="selectedItem.value" placeholder="请输入新增用户" 
            @input="selectedItem.value=selectedItem.value.replace(/[^\d]/g,'')"
            @change="resizeChart"></el-input></span>
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
    series: [],
})
const selectedItem = ref({
    date:'',
    new:'',
    active:''
})
const handleChange = (val)=>{
    selectedItem.value = chartData.value.data[val]
}
const options = ref(null)
    onMounted(() => {
     getData().then((res) => {
      chartData.value = res.data.videoData;
      options.value = res.data.videoData.data.map(item=>item.name)
      handleChart();
    })
    .catch((err) => console.log(err.message));
    });
const resizeChart = ()=>{
    console.log('输入完毕')
    handle()
}
const handle = ()=>{
    if(!myChart.value) return;
      myChart.value.setOption({
          type: "pie",
          data: chartData.value.data,
    });
}
const handleChart = ()=>{
    chartOption.value.title = chartData.value.title;
    chartOption.value.series.push({
          type: "pie",
          data: chartData.value.data,
    });
    myChart.value =  useEchart(chartOption.value, chartDom.value);
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