<template>
  <el-container style="height: 100vh; border: 1px solid #eee">
    <!-- 侧边栏 -->
    <el-aside width="200px" style="background-color: rgb(238, 241, 246); margin-top: 0px;">
      <!-- 这里放 SideMenu 内容，或者用组件插槽 -->
      <SideMenu />
    </el-aside>

    <!-- 主内容区域 -->
    <el-container>
      <el-header style="text-align: right; font-size: 16px; background-color: #A3C0D1; color: #333; padding: 0 20px; line-height: 60px; font-weight: 600;">
        <PageHeader />
      </el-header>

      <el-main>
        <ChatWindow />
      </el-main>
    </el-container>
  </el-container>
</template>


<script>
import SideMenu from '@/components/SideMenu.vue'
import PageHeader from '@/components/PageHeader.vue'
import ChatWindow from '@/components/chat/ChatWindow.vue'

export default {
  name: 'ChatView',
  components: {
    SideMenu,
    PageHeader,
    ChatWindow,
  },
}
</script>
