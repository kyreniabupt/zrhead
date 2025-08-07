<template>
  <div class="side-menu-container">
    <!-- 顶部标题或 LOGO -->
    <div class="side-menu-header">
      <i class="el-icon-s-grid"></i>
      <span class="title">股票分析预测系统</span>
    </div>

    <!-- 菜单 -->
    <el-menu
      :default-openeds="['1', '2', '3']"
      router
      :default-active="$route.path"
      class="side-menu"
    >
      <el-submenu index="1">
        <template slot="title"><i class="el-icon-message"></i>数据总览</template>
        <el-menu-item index="/overview/option1">后台统计</el-menu-item>
        <el-menu-item index="/overview/option2">变化趋势统计</el-menu-item>
        <el-menu-item index="/overview/option3">分布统计</el-menu-item>
      </el-submenu>

      <el-submenu index="2">
        <template slot="title"><i class="el-icon-menu"></i>导航二</template>
        <el-menu-item index="/nav2/option1">选项1</el-menu-item>
        <el-menu-item index="/nav2/option2">选项2</el-menu-item>
      </el-submenu>

      <el-submenu index="3">
        <template slot="title"><i class="el-icon-setting"></i>导航三</template>
        <el-menu-item index="/nav3/option1">选项1</el-menu-item>
        <el-menu-item index="/nav3/option2">选项2</el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: 'SideMenu',
}
</script>

<style scoped>
.side-menu-container {
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: #f5f7fa;
  border-right: 1px solid #dcdfe6;
}

.side-menu-header {
  display: flex;
  align-items: center;
  height: 60px;
  padding-left: 20px;
  background-color: #e9eef3;
  font-weight: bold;
  color: #333;
  border-bottom: 1px solid #dcdfe6;
}

.side-menu-header .title {
  margin-left: 8px;
}

.side-menu {
  flex: 1;
  border: none;
}
</style>
