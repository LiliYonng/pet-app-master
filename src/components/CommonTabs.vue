<template>
  <el-tabs
    v-model="activeName"
    type="card"
    @tab-click="changeTab"
    @tab-remove="removeTab"
  >
    <el-tab-pane
      v-for="(tab, index) in tabList"
      :key="tab.path"
      :closable="tab.name !== 'home'"
      :label="tab.label"
      :name="tab.name"
    />
  </el-tabs>
</template>

<script setup>
import { ref } from "vue";
import { computed } from "@vue/reactivity";
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";
const Store = useStore();
const Router = useRouter();
const Route = useRoute();

const tabList = computed(() => {
  return Store.state.tab.tabList;
});

const activeName = computed(() => {
  const active = Store.state.tab.active;
  return active ? active.name : null;
});
const changeTab = (tabContext) => {
  const tabName = tabContext.props.name; //因为element-plus中的事件回调参数是tabContext
  const tab = tabList.value.find((item) => item.name === tabName);
  Store.commit("selectMenu", tab); //修改currentMenu
  Router.push({
    name: tabName,
  });
};
const removeTab = (tabName) => {
  const index = tabList.value.findIndex((item) => item.name === tabName);
  let nextTab = null;
  const endIndex = tabList.value.length - 1;
  nextTab = index === endIndex ? tabList.value[index - 1] : tabList.value[index + 1];
  if (activeName.value === tabName) {
    Router.push({ name: nextTab.name });
    Store.commit("selectMenu", nextTab);
  }
  Store.commit("closeTab", index);
};
</script>
