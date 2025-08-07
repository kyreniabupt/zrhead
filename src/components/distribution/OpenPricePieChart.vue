<template>
<div class="PieChart-card">
  <div ref="chartRef" style="width: 100%; height: 400px;"></div>
</div>
</template>

<script>
import * as echarts from 'echarts';
import '@/assets/styles/pie-chart.css'; // 通用样式模块
export default {
  name: 'OpenPricePieChart',
  props: {
    openPrices: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      chartInstance: null,
    };
  },
  watch: {
    openPrices: {
      handler() {
        this.updateChart();
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    groupOpenPrices(openPrices) {
      const bins = {
        '<50': 0,
        '50-100': 0,
        '100-150': 0,
        '150-200': 0,
        '>200': 0,
      };

      openPrices.forEach(price => {
        if (price < 50) bins['<50']++;
        else if (price < 100) bins['50-100']++;
        else if (price < 150) bins['100-150']++;
        else if (price < 200) bins['150-200']++;
        else bins['>200']++;
      });

      return Object.entries(bins).map(([name, value]) => ({
        name,
        value,
      }));
    },

    updateChart() {
      if (!this.chartInstance) {
        this.chartInstance = echarts.init(this.$refs.chartRef);
      }

      const pieData = this.groupOpenPrices(this.openPrices);

      const option = {
        title: {
          text: '开盘价区间统计',
          left: 'center',
          textStyle: { color: '#000' },
        },
        tooltip: {
          trigger: 'item',
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          textStyle: { color: '#000' },
        },
        series: [
          {
            name: '开盘价分布',
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
      };

      this.chartInstance.setOption(option);
    },
  },
  mounted() {
    this.chartInstance = echarts.init(this.$refs.chartRef);
    this.updateChart();
    window.addEventListener('resize', this.chartInstance.resize);
  },
  beforeDestroy() {
    if (this.chartInstance) {
      window.removeEventListener('resize', this.chartInstance.resize);
      this.chartInstance.dispose();
    }
  },
};
</script>

<style scoped>
</style>
