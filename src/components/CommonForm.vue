<template>
  <el-form
    label-width="100px"
    ref="form"
    :inline="isInline"
    :model="formData"
    :rules="rules"
  >
    <el-form-item
      v-for="item in formLabel"
      :key="item.name"
      :label="item.label"
      :prop="item.name"
      :class="item.type === 'img'? 'img-item':''"
    >
      <el-input
        v-if="item.type === 'input' && item.requiredType !== 'num'"
        v-model="formData[item.name]"
        :placeholder="'请输入' + item.label"
      />
      <el-input
        v-else-if="item.type === 'input' && item.requiredType === 'num'"
        v-model.number="formData[item.name]"
        :placeholder="'请输入' + item.label"
        :disabled="item.disabled"
      />
      <el-switch v-else-if="item.type === 'switch'" v-model="formData[item.name]" />
      <el-date-picker
        v-else-if="item.type === 'date'"
        type="date"
        value-format="YYYY-MM-DD"
        placeholder="请选择日期"
        v-model="formData[item.name]"
      />
      <el-select
        v-else-if="item.type === 'select'"
        placeholder="请选择"
        @change="handleChange"
        v-model="formData[item.name]"
      >
        <el-option
          v-for="item in item.options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <common-upload v-else-if="item.type ==='img'" :limitData=1 :operation="operation"/>
      <el-input v-else v-model="formData[item.name]" :placeholder="'请输入' + item.label" type="item.type"></el-input>
    </el-form-item>
    <el-form-item><slot></slot></el-form-item>
    <el-form-item class="button">
      <el-button type="primary" @click="submitForm">确定</el-button>
      <el-button @click="$emit('cancleForm')">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup>
import { ref,watch } from "vue";
import CommonUpload from '@/components/CommonUpload'
//父子传参？在调用Form时传入参数。显示定义参数defineProps。
//store公共数据？不对，要用哪个表的数据是不知道的，必须要让父组件传入。传入的数据是从后台获得的，不然就把表格写死了、可以用mock模拟返回
const props = defineProps(["formData", "formLabel", "isInline",'operation']);
const form = ref(null);
const emit = defineEmits(["submit"]);
console.log(props.formData)
watch(()=>[props.formData.colors, props.formData.sizes], ([newColor, newSize], [preColor, preSize]) => {
  // 只有当newColor和newSize都是number时才调用接口分别获取储量
  if(typeof(newColor) ==='number' && typeof(newSize) === 'number' ){
    emit('handleStore')
    props.formData.sum_store = '120'
  }
});
const submitForm = () => {
  if (!form.value) return;
  form.value.validate((valid) => {
    if (valid) {
      console.log("提交成功!");
      emit("submit"); //抛出提交事件，让父组件处理
    } else {
      console.log("操作失败");
      return false;
    }
  });
};
</script>

<style lang="less" scoped>
.button {
  margin-top: 10px;
  margin-left: 200px;
}
.img-item{
  width:100%;
}
</style>
