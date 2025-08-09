<template>
  <div class="PieChart-card">
    <div ref="chartRef" style="width: 100%; height: 400px;"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts';

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
      resizeHandler: null,
    };
  },
  watch: {
    openPrices: {
      handler() {
        // 只在实例存在时更新图表
        if (this.chartInstance) {
          this.updateChart();
        }
      },
      deep: true,
      // 移除 immediate 防止初始化前调用
      // immediate: true,
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
      return Object.entries(bins).map(([name, value]) => ({ name, value }));
    },

    updateChart() {
      // 先检查 DOM 是否存在
      if (!this.$refs.chartRef) {
        console.warn('chartRef DOM 不存在，无法更新图表');
        return;
      }
      const pieData = this.groupOpenPrices(this.openPrices);
      const option = {
        title: {
          text: '开盘价区间统计',
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
            label: { color: '#000' },
          },
        ],
      };
      this.chartInstance.setOption(option);
    },
  },
  mounted() {
    if (this.$refs.chartRef) {
      this.chartInstance = echarts.init(this.$refs.chartRef);
      this.updateChart();
      this.resizeHandler = () => {
        if (this.chartInstance) {
          this.chartInstance.resize();
        }
      };
      window.addEventListener('resize', this.resizeHandler);
    } else {
      console.warn('chartRef DOM 未找到，无法初始化 ECharts');
    }
  },
  beforeDestroy() {
    if (this.chartInstance) {
      window.removeEventListener('resize', this.resizeHandler);
      this.chartInstance.dispose();
      this.chartInstance = null;
    }
  },
};
</script>


<style scoped></style>
