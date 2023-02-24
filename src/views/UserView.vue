<template>
    <operate-table
    :tableLable ="tableLable"
    :tableData = "tableData"
    :rules = "rules"
    :operate_formLable = "operate_formLable"
    :itemH = 50
    :permission = "{addBtn:'addUser',editBtn:'editUser',delBtn:'delUser'}"
    @search="getData"
    @add="handleAdd"
    @update="handleEdit"
    @delete="handleDelete"
    ></operate-table>
</template>

<script setup>
import operateTable from '@/components/operateTable'
import { ref, watch, onMounted,computed} from "vue";
import { getUserData,addUser,delUser,editUser } from "../../api/data.js";

const tableLable =  ref([
  {
    name: 'name',
    label: '姓名'
  },
  {
    name: 'age',
    label: '年龄'
  },
  {
    name: 'sex',
    label: '性别'
  },
  {
    name: 'birth',
    label: '出生日期',
    width: 200
  },
  {
    name: 'addr',
    label: '地址',
    width: 200
  }
]);
const rules = ref({
    name: [
    { required: true, message: "请输入您的名字", trigger: "blur" },
    { min: 2, max: 5, message: "请输入有效名字，不超过5个字符", trigger: "blur" },
  ],
  age: [
    { required: true, message: "请输入您的年龄" },
    { type: "number", message: "请输入有效数字" },
  ],
  sex: [{ required: true, message: "请选择您的性别" }],
});

const operate_formLable = ref([
 {
    name: "name",
    label: "姓名",
    type: "input",
  },
  {
    name: "age",
    label: "年龄",
    type: "input",
    requiredType: "num",
  },
  {
    name: "sex",
    label: "性别",
    type: "select",
    options: [
      {
        label: "男",
        value: "男",
      },
      {
        label: "女",
        value:"女",
      },
    ],
  },
  {
    name: "birth",
    label: "出生日期",
    type: "date",
  },
  {
    name: "addr",
    label: "地址",
    type: "input",
  },
]);
const tableData = ref(null);

const getData = (name = "") => {
  return getUserData({name})
    .then((res) => {
      let data= JSON.parse(res);
      tableData.value = data.userData;
    })
    .catch((err) => console.log(err));
};
const handleAdd = (form)=>{
    addUser(form).then(res=>{
           ElMessage({
              type: "success",
              message: "添加成功",
            });
      })
    .catch(err=>alert(err));
    getData();
}
const handleEdit=(form)=>{
      editUser(form)
      .then((res) =>{            
        return(res);
      })
      .catch(alert);
       getData();
}
const handleDelete=(id)=>{
        delUser(id)
        .then((res) => {
            ElMessage({
              type: "success",
              message: "删除成功",
            });
            getData();
        })
        .catch((err) => {
          console.log(err);
        });
}

onMounted(()=>{
    getData();
})
</script>