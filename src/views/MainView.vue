<template>
  <el-container style="height: 100%">
    <el-aside width="auto">
      <CommonAside />
    </el-aside>
    <el-container>
      <el-header>
        <CommonHeader />
      </el-header>
      <CommonTabs />
      <el-main>
      <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup>
// @ is an alias to /src
import CommonAside from "@/components/CommonAside.vue";
import CommonHeader from "@/components/CommonHeader.vue";
import CommonTabs from "@/components/CommonTabs";
</script>

<style lang="less" scoped>
.el-header {
  background-color: black;
}
.el-main {
  padding-top: 0;
}
</style>
