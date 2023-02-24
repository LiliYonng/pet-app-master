<template>
        <common-table
      :permission = "{addBtn:'addMall',editBtn:'editMall',delBtn:'delMall'}"
      :tableLable ="tableLable"
      :tableData="tableData"
      :itemH=88
      @del="deleteData"
      @edit="editData"
      ref="myTable"
    >
    </common-table>
</template>

<script setup>
import CommonTable from "@/components/CommonTable";
import { ref, watch, onMounted,computed} from "vue";
import { getNewsData,addNews,delNews,editNews } from "../../api/data.js";

const tableLable =  ref([
  {
    name: 'cover',
    label: '封面'
  },
  {
    name: 'title',
    label: '标题'
  },
  {
    name: 'created_at',
    label: '创建时间'
  },
  {
    name: 'content',
    label: '内容',
    width: 200
  }
]);
const rules = ref({
    title: [
    { required: true, message: "请输入文章标题", trigger: "blur" },
    { min: 2, max: 20, message: "请输入有效标题，不超过20个字符", trigger: "blur" },
  ]
});

const operate_formLable = ref([
 {
    name: "cover",
    label: "封面",
    type: "img",
  },
  {
    name: "title",
    label: "标题",
    type: "input",
    requiredType: "num",
  },
]);
const tableData = ref(null);

const getData = (title = "") => {
  return getNewsData({title})
    .then((res) => {
      let data= JSON.parse(res);
      console.log(data.newsData)
      tableData.value = data.newsData;
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