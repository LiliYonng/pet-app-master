<template>
  <header>
    <div class="left-container">
      <el-button type="primary" @click="handleMenu">
        <el-icon style="vertical-align: middle"><IconMenu /></el-icon>
      </el-button>
      <!--面包屑功能-->
      <el-breadcrumb separator="/">
        <el-breadcrumb-item
          v-for="item in tabList"
          :key="item.path"
          @click="selectMenu(item)"
          :to="{ path: item.path }"
          >{{ item.label }}</el-breadcrumb-item
        >
      </el-breadcrumb>
    </div>
    <div class="right-container">
      <el-dropdown size="small" trigger="click">
        <span>
          <img src='../assets/userImg1.jpg' class="user" />
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>个人中心</el-dropdown-item>
            <el-dropdown-item @click="logout">退出</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { computed } from "@vue/reactivity";
import { Menu as IconMenu } from "@element-plus/icons-vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
const Store = useStore();
const Router = useRouter();
const userImg = ref("");
const handleMenu = () => {
  Store.commit("handleMenu");
};
const tabList = computed(() => {
  return Store.state.tab.tabList;
});

const selectMenu = (item) => {
  console.log(item);
  Store.commit("selectMenu", item);
};
const logout = () => {
  localStorage.removeItem('refreshToken');
  Store.commit("clearToken");
  Store.commit("clearMenu");
  Store.commit("clearUserInfo");
  Router.push({ name: "login" });
};
onMounted(() => {
  // userImg.value = require("../assets" + Store.state.user.userInfo.Profilephoto);
});
</script>

<style lang="less" scoped>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 0;
}
.left-container {
  display: flex;
  align-items: center;
  h3 {
    color: #fff;
  }
  .el-button {
    margin-right: 2em;
  }
}
.right-container {
  display: flex;
  align-items: center;
  .user {
    width: 3em;
    height: 3em;
    border-radius: 50%;
  }
}
</style>
