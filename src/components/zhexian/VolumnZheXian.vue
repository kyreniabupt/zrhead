<!-- src/components/VolumeZheXian.vue -->
<template>
  <div class="ZheXian-chart">
    <el-date-picker
      v-model="dateRange"
      type="daterange"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      @change="fetchChartData"
      clearable
      unlink-panels
      format="yyyy-MM-dd"
      value-format="yyyy-MM-dd"
      class="date-picker"
    />
    <div ref="chartRef" class="chart-container"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts'
import axios from 'axios'
import '@/assets/styles/zhe-xian.css'  // 通用样式模块

export default {
  name: 'VolumeZheXian',
  data() {
    return {
      chart: null,
      dateRange: [],
    }
  },
  methods: {
    async fetchChartData() {
      const params = {}
      if (this.dateRange.length === 2) {
        params.start_date = this.dateRange[0]
        params.end_date = this.dateRange[1]
      }else{
        params.page_size = 3000  // 默认请求3000条数据
      }


      try {
        const res = await axios.get('http://127.0.0.1:8000/api/stocks/', { params })
        const data = res.data.results || []

        const dates = data.map(item => item.date)
        const volumes = data.map(item => item.total_trade_quantity)

        this.chart.setOption({
          title: {
            text: '',
            left: 'center',
            textStyle: {
              fontSize: 20,
              fontWeight: 'bold',
              color: '#333',
            }
          },
          tooltip: { trigger: 'axis' },
          legend: {
            data: ['成交量'],
            top: 10,
            textStyle: { color: '#333', fontSize: 14 },
          },
          xAxis: {
            type: 'category',
            data: dates,
            axisLabel: { rotate: 45, color: '#555', fontSize: 12 },
            axisLine: { lineStyle: { color: '#888' } },
            splitLine: { show: false },
          },
          yAxis: {
            type: 'value',
            axisLabel: { color: '#555', fontSize: 12 },
            axisLine: { lineStyle: { color: '#888' } },
            splitLine: { lineStyle: { type: 'dashed', color: '#eee' } },
          },
          series: [
            {
              name: '成交量',
              type: 'line',
              smooth: true,
              lineStyle: { width: 3, color: '#EE6666' },
              areaStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: 'rgba(238,102,102,0.4)' },
                  { offset: 1, color: 'rgba(238,102,102,0.1)' },
                ]),
              },
              data: volumes,
            }
          ],
        })
      } catch (error) {
        console.error('请求成交量数据失败:', error)
        this.chart.clear()
      }
    },
  },
  mounted() {
    this.chart = echarts.init(this.$refs.chartRef)
    this.fetchChartData()
    window.addEventListener('resize', () => {
      if (this.chart) this.chart.resize()
    })
  },
  beforeDestroy() {
    if (this.chart) {
      this.chart.dispose()
      this.chart = null
    }
    window.removeEventListener('resize')
  }
}
</script>
