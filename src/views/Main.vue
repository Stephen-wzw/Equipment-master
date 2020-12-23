<template>
  <el-container style="height: 100%">
    <el-aside width="200px"><common-aside></common-aside></el-aside>
    <el-container>
      <el-header><common-header></common-header></el-header>
      <el-main><router-view /></el-main>
    </el-container>
  </el-container>
</template>

<script>
import CommonAside from '../components/CommonAside.vue'
import CommonHeader from '../components/CommonHeader.vue'
export default {
    components: {
        CommonHeader,
        CommonAside,
    },
};
</script>

<style>
.el-header {
    background-color: #B3C0D1;
}
.el-main {
    background-color: #f5f5f5;
}
</style>
