<template>
  <div>
    <!-- 日期区间选择器 + 查询按钮 -->
    <div style="margin-bottom: 20px;">
      <el-date-picker
        v-model="dateRange"
        type="daterange"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        range-separator="至"
        format="yyyy-MM-dd"
        value-format="yyyy-MM-dd"
        style="margin-right: 10px;"
      />
      <el-button type="primary" @click="handleSearch">查询</el-button>
      <el-button @click="resetSearch">重置</el-button>
    </div>

    <!-- 表格 -->
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="date" label="交易日期" />
      <el-table-column prop="open" label="开盘价" />
      <el-table-column prop="high" label="最高价" />
      <el-table-column prop="low" label="最低价" />
      <el-table-column prop="last" label="最后成交价" />
      <el-table-column prop="close" label="收盘价" />
      <el-table-column prop="total_trade_quantity" label="成交量" />
      <el-table-column prop="turnover_lacs" label="成交额(万)" />
    </el-table>

    <!-- 分页 -->
    <el-pagination
      background
      layout="prev, pager, next, jumper"
      :page-size="pageSize"
      :current-page="currentPage"
      :total="total"
      @current-change="handlePageChange"
      style="margin-top: 20px; text-align: center;"
    />
  </div>
</template>

<script>

import axios from 'axios'
import '@/assets/styles/table-style.css'

export default {
  data() {
    return {
      tableData: [],
      currentPage: 1,
      pageSize: 10,
      total: 0,
      dateRange: [],  // [开始日期, 结束日期]
    }
  },
  methods: {
    fetchData(page = 1) {
      const params = {
        page: page,
        page_size: this.pageSize,
      }

      if (this.dateRange.length === 2) {
        params.start_date = this.dateRange[0]
        params.end_date = this.dateRange[1]
      }

      axios
        .get('http://127.0.0.1:8000/api/stocks/', { params })
        .then(res => {
          this.tableData = res.data.results
          this.total = res.data.count
          this.currentPage = page
        })
        .catch(() => {
          this.tableData = []
          this.total = 0
        })
    },
    handlePageChange(page) {
      this.fetchData(page)
    },
    handleSearch() {
      this.fetchData(1)
    },
    resetSearch() {
      this.dateRange = []
      this.fetchData(1)
    },
  },
  mounted() {
    this.fetchData()
  },
}
</script>
