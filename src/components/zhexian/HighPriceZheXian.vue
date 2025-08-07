<!-- src/components/HighPriceZheXian.vue -->
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
// 导入外部 CSS 样式
import '@/assets/styles/zhe-xian.css'

export default {
  name: 'HighPriceZheXian',
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
        params.page_size = 3000  // 请求足够多的数据
      }else{
        params.page_size = 3000  // 默认请求3000条数据
      }

      try {
        const res = await axios.get('http://127.0.0.1:8000/api/stocks/', { params })
        const data = res.data.results || []

        const dates = data.map(item => item.date)
        const openPrices = data.map(item => item.high)
        const closePrices = data.map(item => item.low)
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
                data: ['最高价', '最低价'],
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
                  name: '最高价',
                  type: 'line',
                  smooth: true,
                  lineStyle: { width: 3, color: '#5470C6' },
                  areaStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                      { offset: 0, color: 'rgba(84,112,198, 0.4)' },
                      { offset: 1, color: 'rgba(84,112,198, 0.1)' },
                    ]),
                  },
                  data: openPrices,
                },
                {
                  name: '最低价',
                  type: 'line',
                  smooth: true,
                  lineStyle: { width: 3, color: '#91CC75' },
                  data: closePrices,  // 你需要在请求数据后提取这个数组
                },
              ],
            })
      } catch (error) {
        console.error('请求股票数据失败:', error)
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
