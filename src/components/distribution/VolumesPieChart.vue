<template>
  <div class="PieChart-card">
    <div ref="chartRef" style="width: 100%; height: 400px;"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts'
import '@/assets/styles/pie-chart.css'

export default {
  name: 'VolumesPieChart',
  props: {
    volumes: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      chartInstance: null,
    }
  },
  watch: {
    volumes: {
      handler() {
        this.updateChart()
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
          groupVolumes(volumes) {

  // 根据数据实际大小调整bins区间
  const bins = {
    '<50万': 0,
    '50万-100万': 0,
    '100万-150万': 0,
    '150万-200万': 0,
    '>200万': 0,
  }

  volumes.forEach(v => {
    const volumeInHands = v ;  

  if (volumeInHands < 500000) bins['<50万']++;
  else if (volumeInHands < 1000000) bins['50万-100万']++;
  else if (volumeInHands < 1500000) bins['100万-150万']++;
  else if (volumeInHands < 2000000) bins['150万-200万']++;
  else bins['>200万']++;
});



  return Object.entries(bins).map(([name, value]) => ({
    name,
    value,
  }))
},







    updateChart() {
      if (!this.chartInstance) {
        this.chartInstance = echarts.init(this.$refs.chartRef)
      }

      const pieData = this.groupVolumes(this.volumes)

      const option = {
        title: {
          text: '成交量区间统计',
          left: 'center',
          textStyle: { color: '#000' },
        },
        tooltip: { trigger: 'item' },
        legend: {
          orient: 'vertical',
          left: 'left',
          textStyle: { color: '#000' },
        },
        series: [
          {
            name: '成交量分布',
            type: 'pie',
            radius: '60%',
            data: pieData,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)',
              },
            },
            label: {
              color: '#000',
            },
          },
        ],
      }

      this.chartInstance.setOption(option)
    },
  },
  mounted() {
    this.chartInstance = echarts.init(this.$refs.chartRef)
    this.updateChart()
    window.addEventListener('resize', this.chartInstance.resize)
  },
  beforeDestroy() {
    if (this.chartInstance) {
      window.removeEventListener('resize', this.chartInstance.resize)
      this.chartInstance.dispose()
    }
  },
}
</script>

<style scoped>
</style>
