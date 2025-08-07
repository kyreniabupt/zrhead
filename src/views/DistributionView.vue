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
                <OpenPricePieChart :open-prices="openPrices" />
            </el-col>
            <el-col :span="12">
                <LastPricesPieChart :last-prices="lastPrices" />
            </el-col>
            </el-row>
            <el-row :gutter="20" style="margin-top: 20px;">
            <el-col :span="12">
                <VolumesPieChart :volumes="volumes" />
            </el-col>
            <el-col :span="12">
                <TurnoversPieChart :turnovers="turnovers" />
            </el-col>
            </el-row>
        </el-main>
    </el-container>
  </el-container>
</template>

<script>
import SideMenu from '@/components/SideMenu.vue'
import PageHeader from '@/components/PageHeader.vue'
import OpenPricePieChart from '@/components/distribution/OpenPricePieChart.vue';
import LastPricesPieChart from '@/components/distribution/LastPricesPieChart.vue';
import VolumesPieChart from '@/components/distribution/VolumesPieChart.vue';
import TurnoversPieChart from '@/components/distribution/TurnoversPieChart.vue';
import axios from 'axios';

export default {
  name: 'DistributionView',
  components: { 
    OpenPricePieChart,
    SideMenu,
    PageHeader,
    LastPricesPieChart,
    VolumesPieChart,
    TurnoversPieChart
  },
  data() {
    return {
      openPrices: [],
      lastPrices: [],
      volumes: [],
      turnovers: []
    };
  },
  methods: {
    async fetchOpenPrices() {
      try {
        const response = await axios.get('http://localhost:8000/api/stocks/', {
          params: {
            page_size: 3000,
            start_date: '2010-07-21',
            end_date: '2025-08-31',
          },
        });
        this.openPrices = response.data.results.map(item => item.open);
        this.lastPrices = response.data.results.map(item => item.last);
        this.volumes = response.data.results.map(item => item.total_trade_quantity);
        this.turnovers = response.data.results.map(item => item.turnover_lacs);
      } catch (error) {
        console.error('获取开盘价失败:', error);
      }
    },
  },
  mounted() {
    this.fetchOpenPrices();
  },
};
</script>