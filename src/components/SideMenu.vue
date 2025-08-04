<template>
  
    <el-menu :default-openeds="['1','2','3']" router :default-active="$route.path">
      <el-submenu index="1">
        <template slot="title"><i class="el-icon-message"></i>数据总览</template>
        <el-menu-item index="/overview/option1">选项1</el-menu-item>
        <el-menu-item index="/overview/option2">选项2</el-menu-item>
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

</template>

<script>
export default {
  name: 'SideMenu',
}
</script>
