<template>
  <div class="PieChart-card">
    <div ref="chartRef" style="width: 100%; height: 400px;"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts'
import '@/assets/styles/pie-chart.css'

export default {
  name: 'TurnoversPieChart',
  props: {
    turnovers: {
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
    turnovers: {
      handler() {
        this.updateChart()
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    groupTurnovers(turnovers) {
      const bins = {
        '<500万': 0,
        '500万-1000万': 0,
        '1000万-2000万': 0,
        '2000万-5000万': 0,
        '>5000万': 0,
      }

      turnovers.forEach(t => {
        const turnover = parseFloat(t) // 确保为浮点数
        if (turnover < 500) bins['<500万']++
        else if (turnover < 1000) bins['500万-1000万']++
        else if (turnover < 2000) bins['1000万-2000万']++
        else if (turnover < 5000) bins['2000万-5000万']++
        else bins['>5000万']++
      })

      return Object.entries(bins).map(([name, value]) => ({
        name,
        value,
      }))
    },

    updateChart() {
      if (!this.chartInstance) {
        this.chartInstance = echarts.init(this.$refs.chartRef)
      }

      const pieData = this.groupTurnovers(this.turnovers)

      const option = {
        title: {
          text: '成交额区间统计（单位：万元）',
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
            name: '成交额分布',
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
