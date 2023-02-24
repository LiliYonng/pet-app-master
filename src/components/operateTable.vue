<template>  
<!-- 新增弹窗 -->
  <div class="form_dialog">

    <el-dialog
      width="60%"
      :title="operation === 'add' ? '新增数据' : '更新数据'"
      v-model="showForm"
      draggable
    >
      <common-form
        :formData="operate_form"
        :formLabel="formLabel"
        :isInline="true"
        :rules="rules"
        :operation="operation"
        @cancleForm="cancle"
        @submit="submit"
        @handleStore="handleStore"
      >
      </common-form>
    </el-dialog>
  </div>

  <!-- 表格操作栏 -->
  <div class="user_header">
    <el-button class="addBtn" type="primary" @click="addData" v-permission ="addBtn">新增+</el-button>
    <div class="search">
      <el-input v-model="searchKey" placeholder="请输入关键词" inline="true"></el-input>
      <el-button type="primary" @click="search">搜索</el-button>
    </div>
  </div>
  <!-- 表格 -->
  <div class="table">
    <common-table
      v-on="$listeners"
      v-bind="$attrs"
      :permission = "permission"
      :tableData="curTable"
      @del="deleteData"
      @edit="editData"
      ref="myTable"
    >
    </common-table>

  </div>
  <!-- 分页栏 -->
  <div class="pagination">
    <el-pagination
      layout="prev,pager,next, jumper"
      :page-count="totalPage"
      v-model:currentPage="currentPage"
    />
  </div>
</template>
<script>
import { ref, watch, onMounted,computed} from "vue";
import {getStore} from "../../api/data.js"
import CommonForm from "@/components/CommonForm";
import CommonTable from "@/components/CommonTable";
import axios from "axios";
import store from '@/store';
export default {
    name:'operateTable',
    components:[CommonForm,CommonTable],
    props:["tableData","operate_formLable","rules","permission"],
    emits: ['delte','add','update','search'],
    data(){
        return{
            myTable:'',
            limit:50,
            searchKey:'',
            operate_form:{},
            operation:'',
            formLabel:{},
            showForm:false,
            currentPage:1,
        }
    },
    computed: {
        addBtn(){
          return this.permission.addBtn;
        },
        emptyForm(){
            let obj = {};
            this.operate_formLable.forEach(item=>{
                obj[item.name] = "";
            });
            return obj;
        },
        totalPage(){
            return Math.ceil(this.tableData?.length / this.limit);
        },
        curTable(){
        let start = (this.currentPage-1)*this.limit;
        let end = start+this.limit-1;
        return this.tableData?.slice(start,end);
        }
    },
    mounted() {
      this.formLabel = JSON.parse(JSON.stringify(this.operate_formLable))
    },
    methods: {
        //table的相关功能：增删改查
    search()  {
    //抛出搜索事件
    this.$emit('search',this.searchKey);
    },
    addData()  {
    this.showForm = true;
    this.operation = "add";
    this.operate_form = {...this.emptyForm};
    },
    editData (row){
    this.showForm = true;
    this.operation = "edit";
    const colorsAry = row.colors.split(',')
    // const form = JSON.parse(JSON.stringify(this.operate_formLable))

    // 设置表单的选项
    const form = this.formLabel
    form[2].options=[]
    form[3].options=[]
    colorsAry.forEach((item,ind)=>{
      form[2].options.push({
        label:item,
        value:ind
      })
    })
    const sizesAry = row.sizes.split(',')
    sizesAry.forEach((item,ind)=>{
        form[3].options.push({
        label:item,
        value:ind
      })
    // this.operate_formLable = form
  })

  this.operate_form = { ...row };//将该行数据写入编辑表
  console.log('row----',this.operate_form)
},
deleteData (row) {
  ElMessageBox.confirm("数据将永久删除，确认继续？", "Warning", {
    confirmButtonText: "确认",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(() => {
        //抛出删除事件，交给父组件调用接口
        this.$emit('delete',row.gid);
    })
    .catch(() => {
      ElMessage({
        type: "info",
        message: "Delete canceled",
      });
    });
},
handleStore(){
  const data ={
    gid:this.operate_form.gid,
    color:this.operate_form.colors,
    size:this.operate_form.sizes,
  }
  getStore(data).then(res=>{
    let data= JSON.parse(res);
    let resData = data.resData[0];
    console.log(data)
    console.log(resData)
    this.operate_form.sum_store = resData.store;
    this.operate_form.sum_sale = resData.sale;
    this.operate_form.goods_core = resData.goods_core
    console.log(this.formLabel)
    this.formLabel[4].disabled = false;
    this.formLabel[4].label="库存"
  })
},
 submit ()  {
  //重置label
   this.formLabel = JSON.parse(JSON.stringify(this.operate_formLable))
  if (this.operation === "add") {
    this.$emit("add",this.operate_form);
  } 
  else {
   this.$emit("update",this.operate_form);
  }
  this.showForm = false;
  ElMessage({
    message: "操作成功",
    type: "success",
  });
},
cancle() {
  // 重置label
   this.formLabel = JSON.parse(JSON.stringify(this.operate_formLable))
 this.showForm = false;
},
    },
}
</script>

<style lang="less">
// .user_header {
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
// }
.addBtn{
  float:left;
}
.search {
  float:right;
  .el-input {
    width: 10rem;
  }
}
.pagination {
  float: right;
}
</style>
