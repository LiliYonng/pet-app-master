<template>
  <el-menu
    :default-active=activeName
    class="el-menu-vertical-demo"
    :collapse="isCollapse"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
    :unique-opened="true"
    @open="handleSubOpen"
  >
    <h3>{{ isCollapse ? "后台" : "商域后台管理系统" }}</h3>

    <el-menu-item
      v-for="item in noChildren"
      :index="item.name"
      :key="item.path"
      @click="clickMenu(item)"
    >
      <component class="icon" :is="$icon[item.icon]" />
      <template #title>{{ item.label }}</template>
    </el-menu-item>

    <el-sub-menu v-for="item in hasChildren" :key="item.path" :index="item.name">
      <template #title
        ><component class="icon" :is="$icon[item.icon]" />
        <span slot="title">{{ item.label }}</span>
      </template>

      <el-menu-item-group
        v-for="(subItem, subIndex) in item.children"
        :key="subItem.path"
        @click="clickMenu(subItem)"
      >
        <el-menu-item :index="subItem.name">
          <component class="icon" :is="$icon[subItem.icon]" />
          {{ subItem.label }}</el-menu-item
        >
      </el-menu-item-group>
    </el-sub-menu>
  </el-menu>
</template>

<script setup>
import store from "@/store";
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
const Router = useRouter();
const Store = useStore();
const menu = ref([]);
const defaultOpen =ref(['chart'])
const isCollapse = computed(()=>{
  return store.state.tab.isCollapse;
})
const noChildren = computed(() => {
  return menu.value.filter((item) => !item.children);
});
const hasChildren = computed(() => {
  return menu.value.filter((item) => {
    return item.children});
});
const clickMenu = (item) => {
  console.log('点击菜单',item)
  Store.commit("selectMenu", item);
  Router.push({
    name: item.name,
  });
};
const activeName = computed(() => {
  const active = Store.state.tab.active;
  console.log('首次激活',active.name)
  return active ? active.name : 'home';
});
onMounted(() => {
  menu.value = store.state.menu.menuData;
});
</script>

<style lang="less" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.el-menu {
  font-size: 14px;
  height: 100%;
  border: none;
  overflow: auto;
  h3 {
    color: #fff;
    text-align: center;
    line-height: 28px;
  }
}
.icon {
  color: #909399;
  width: 24px;
  height: 24px;
  margin-right: 5px;
}
</style>
