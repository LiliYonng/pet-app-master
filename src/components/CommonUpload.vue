
<template>
<div>
  <el-input v-if="operation==='add'" style="width:200px;display:block;"  v-model="imgLink" :placeholder="'图片网络链接'" type="text"></el-input>
<el-upload
    class="upload-demo"
    action="https://jsonplaceholder.typicode.com/posts/"
    :on-preview="handlePreview"
    :on-remove="handleRemove"
    :on-exceed="handleExceed"
    :on-success="handleSuccess"
    :file-list="fileList"
    :multiple="false"
    list-type="picture">
    <el-button size="small" type="primary">点击上传</el-button>
    <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
    </el-upload>
</div>
</template>
<script>
  export default {
    data() {
      return {
        imgLink:'',
        fileList: []
      };
    },
    props:['limitData','operation'],
    methods: {
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      handleExceed(){
                   ElMessage({
              type: "fail",
              message: "超出限制",
            });
      },
      handleSuccess(file,list){
        console.log('文件----',list)
      }
    }
  }
</script>

<style lang="less" scoped>
    ::v-deep .el-upload{
        display:block;
    }
    ::v-deep .el-upload-list{
      display:flex;
      .el-upload-list__item{
        margin-right:10px;
      }
    }
</style>