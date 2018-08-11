<template>
  <el-menu 
    :default-active="index"
    :router="true"
    class="menu-box">
    <el-menu-item index="/" class="menu-item">
      <span slot="title">首页</span>
    </el-menu-item>
    <el-menu-item index="/user" class="menu-item">
      <span slot="title">用户列表</span>
    </el-menu-item>
    <el-menu-item index="/activity" class="menu-item">
      <span slot="title">活动列表</span>
    </el-menu-item>
  </el-menu>
</template>


<script>
export default {
  data () {
    return {
      index: "1"
    }
  },
  watch: {
    '$route' (val) {

    }
  }
}
</script>

<style scoped>
  .menu-box {
    width: 240px;
    height: 100%;
  }

  .menu-item {
    text-align: center; 
  }
</style>
