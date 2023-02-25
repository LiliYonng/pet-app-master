
<template>
<div>
  <el-input style="width:200px;display:block;"  v-model="imgLink" :placeholder="'输入链接或点击上传'" type="text"></el-input>
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
        fileList: [],
        imgLink:'',
      };
    },
    emits: ['updateCover'],
    props:['link','operation'],
    watch:{
      link:{
        handler: function(newVal){
          this.imgLink = newVal;
          if(!newVal){
            this.fileList = []
          }
        },
        immediate:true
      }
    },
    mounted() {
      if(this.link){
        this.imgLink = this.link
        this.fileList.push({
          name:'cover',
          url:this.link
        })
      }
    },
    methods: {
      handleRemove(file, fileList) {
        this.imgLink = ''
        console.log(file, fileList);
        console.log('link',this.link);
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
        this.imgLink = list.url
        this.$emit('updateCover',this.imgLink)
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