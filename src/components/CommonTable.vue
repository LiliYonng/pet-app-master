<template>
  <el-table ref="mytable" :data="showList" stripe max-height="450" style="width: 100%">
    <el-table-column
      v-for="item in tableLable"
      :key="item.name"
      :prop="item.name"
      :label="item.label"
      :width="item.width ? item.width : 180"
      :formatter='formatter'
    >      
    <template #default="scope" >
          <div v-if="item.name =='cover'" style="display: flex; align-items: center">
               <el-image  style="width: 4.375rem; height: 4.375rem" :src="scope.row.cover" alt="" :fit="fill" ></el-image>
          </div>
          <el-switch v-if="item.name =='onSale'" v-model="scope.row.onSale" active-color="#13ce66" inactive-color="#ff4949" 
          :active-value=1
          :inactive-value=0
          @change="$emit('changeSale',scope.row.gid,scope.row.onSale)"
          ></el-switch>
          <div v-if="item.name=='content'" style="max-height:100px;overflow:hidden scroll;">
            <span v-html="scope.row.content?scope.row.content:'...'"></span>
          </div>
          <!-- <reader v-if="item.name=='content'" :content="scope.row.content"></reader> -->
    </template>
    <!-- <template #default="scope" v-if="item.name =='on'">

        </template> -->
     
    </el-table-column>

    <el-table-column :width=160 label="操作">
      <template #default="scope">
        <el-button type="primary" plain  v-permission ="editBtn" @click="$emit('edit', scope.row)">编辑</el-button>
        <el-button type="danger" plain  v-permission ="delBtn" @click="$emit('del', scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>
<script setup>
import {ref,onMounted,watchPostEffect,computed} from 'vue'
// import  reader from './CommonEditor'
const props = defineProps(["tableData", "tableLable","itemH",'permission']);
const mytable = ref(null);
let scroll_wrap = ref(null);
let scrollTop = ref(0);
let tableView = ref(null);
let showList = ref(null);


let editBtn = computed(()=>{
  return props.permission.editBtn;
})
let delBtn = computed(()=>{
  return props.permission.delBtn;
})
let showNum = ref(null);
watchPostEffect(() => {
  /* 在 Vue 更新后执行,处理翻页后的容器高度和滚动条归零 */
  if(scroll_wrap.value)
    scroll_wrap.value.scrollTop = 0;
    //点击下一页时tableData的值改变，设置滚动条归零；
  if(tableView.value)
    {//根据数据设置table高度
      let h = props.tableData?.length * props.itemH;
      if(h)
      tableView.value.style.height = h +'px';}
  showList.value = props.tableData?.slice(0,showNum.value);
})

//动态高度，showNum根据item的高度设置

const tableBody = ref(null);
onMounted(()=>{
  scroll_wrap.value = document.querySelector('.el-scrollbar__wrap');//即视口窗口，用于设置监听
  tableView.value=document.querySelector('.el-scrollbar__view');//即相对滚动的容器，用于设置滚动条高度
  tableBody.value = document.querySelector('.el-table__body');//即绝对定位的数据容器
  //设置视口高度
  tableView.value.style.height = '2041px';
  const {clientHeight} = scroll_wrap.value;
  showNum.value = Math.ceil(clientHeight/props.itemH);//得到视口显示的列数
  const handleScroll = function(e){
   scrollTop.value = e.target.scrollTop;
   let start = Math.floor(scrollTop.value/props.itemH);
  showList.value = props.tableData.slice(start,start+showNum.value);
  tableBody.value.style.top = start*props.itemH+'px';
  }
  scroll_wrap.value.addEventListener('scroll',handleScroll);
})
const formatter =	function(row, column, cellValue){
  if(column.property=='birth')
  {
    let date = new Date(cellValue);
    let y = date.getFullYear();
    let m = date.getMonth()+1;
    let d = date.getDate();
    m=m>9?m:'0'+m;
    d=d>9?d:'0'+d;
   return `${y}-${m}-${d}`
  }
    if(column.property=='type')
  {
    let data =['0','母婴','鞋包饰品','食品','数码家电','居家百货','其他'];
    return data[cellValue];
    
  }
  return cellValue
}

</script>

<style  lang='less'>
.table{
  .wrap_div{
  height:127.5625rem;
  position:absolute;
  top:0;
}
.el-scrollbar__view{
  position:relative;
}
.el-table__body{
  position:absolute;
}
}
</style>