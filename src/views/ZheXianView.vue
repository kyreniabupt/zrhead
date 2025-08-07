<template>
  <el-container style="height: 100vh; border: 1px solid #eee">
    <!-- 侧边栏 -->
    <el-aside width="200px" style="background-color: rgb(238, 241, 246); margin-top: 0;">
      <SideMenu />
    </el-aside>

    <!-- 主内容区域 -->
    <el-container>
      <el-header
        style="text-align: right; font-size: 16px; background-color: #A3C0D1; color: #333; padding: 0 20px; line-height: 60px; font-weight: 600;">
        <PageHeader />
      </el-header>

      <el-main style="padding: 20px;">
        <el-row :gutter="20">
          <el-col :span="12">
            <OpenClosePriceZheXian />
          </el-col>
          <el-col :span="12">
            <HighPriceZheXian />
          </el-col>
        </el-row>

        <el-row :gutter="20" style="margin-top: 20px;">
          <el-col :span="12">
            <VolumnZheXian />
          </el-col>
          <el-col :span="12">
            <TotalTurnoverZheXian />
          </el-col>
        </el-row>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import SideMenu from '@/components/SideMenu.vue'
import PageHeader from '@/components/PageHeader.vue'
import OpenClosePriceZheXian from '@/components/zhexian/OpenClosePriceZheXian.vue'
import HighPriceZheXian from '@/components/zhexian/HighPriceZheXian.vue'
import VolumnZheXian from '@/components/zhexian/VolumnZheXian.vue'
import TotalTurnoverZheXian from '@/components/zhexian/TotalTurnoverZheXian.vue'
export default {
  name: 'ZheXianView',
  components: {
    SideMenu,
    PageHeader,
    OpenClosePriceZheXian,
    HighPriceZheXian,
    VolumnZheXian,
    TotalTurnoverZheXian,
  },
}
</script>
