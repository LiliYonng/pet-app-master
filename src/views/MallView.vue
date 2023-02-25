<template>
    <operate-table
    :tableLable ="tableLable"
    :tableData = "tableData"
    :rules = "rules"
    :operate_formLable = "operate_formLable"
    :itemH = 88
    :permission = "{addBtn:'addMall',editBtn:'editMall',delBtn:'delMall'}"
    @search="getData"
    @add="handleAdd"
    @update="handleEdit"
    @delete="handleDelete"
    @changeSale ='handleChange'
    ></operate-table>
</template>

<script setup>
import operateTable from '@/components/operateTable'
import { ref, watch, onMounted,computed} from "vue";
import { getMallData,addMall,delMall,editMall,changeState } from "../../api/data";

const tableLable =  ref([
  {
    name: 'cover',
    label: '',
    width: '120rem'
  },
    {
    name: 'name',
    label: '商品名称',
  },
  {
    name: 'colors',
    label: '参数1-颜色',
    width:120,
  },
  {
    name:'sizes',
    label:'参数2-尺寸'
  },
    {
    name: 'priceMin',
    label: '价格',
    width:80
  },
  {
    name: 'sum_store',
    label: '总库存',
    width:80
  },
  {
    name: 'sum_sale',
    label: '总销量',
    width:100,
  },
  {
    name: 'onSale',
    label: '上架',
    width:80,
  },
]);
const rules = ref({
  name: [
    { required: true, message: "请输入商品名", trigger: "blur" },
    { min: 2, max: 50, message: "请输入有效名字，不超过20个字符", trigger: "blur" },
  ],
  price: [
    { required: true, message: "请输入商品价格" },
  ],
  type: [{ required: true, message: "请选择分类" }],
});
const operate_formLable = ref([
    {
    name: 'name',
    label: '商品名称',
    type:'input',
  },
  {
    name: 'priceMin',
    label: '价格',
    type:'input',
    requiredType: "num",
  },
  {
    name: 'colors',
    label: '参数1-颜色',
    type:'select',
    options:[],
  },
  {
    name: 'sizes',
    label: '参数2-尺寸',
    type:'select',
    options:[],
  },
  {
    name: 'sum_store',
    label: '总库存',
    type:'input',
    requiredType: "num",
    disabled:true
  },
  {
    name: 'sum_sale',
    label: '总销量',
    type:'input',
    requiredType: "num",
    disabled:true,
  },
    {
    name: 'cover',
    label: '封面图片',
    type:'img'
  }
]);
const tableData = ref(null);

const getData = (name = "") => {
  return getMallData({name})
    .then((res) => {
      console.log('res',res)
      let data= JSON.parse(res);
      console.log('data----',data)
      tableData.value = data.mallData;
    })
    .catch((err) => console.log(err));
};
const handleAdd = (form)=>{
    addMall(form).then(res=>{
           ElMessage({
              type: "success",
              message: "添加成功",
            });
            getData();
      }
      )
    .catch(err=>alert(err));
}
const handleEdit=(form)=>{
      editMall(form)
      .then((res) =>{            
        return(res);
      })
      .catch(alert);
       getData();
}
const handleDelete=(gid)=>{
  console.log(gid)
        delMall(gid)
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
const handleChange=(gid,onSale)=>{
 changeState({gid,onSale}).then(res=>{
  ElMessage({              type: "success",
              message: "操作成功",})
 }).catch(alert)
}

onMounted(()=>{
    getData();
})
</script>