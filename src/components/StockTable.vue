<template>
  <div>
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

export default {
  name: 'StockTable',
  data() {
    return {
      tableData: [],
      currentPage: 1,
      pageSize: 10,
      total: 0,
    }
  },
  methods: {
    fetchData(page = 1) {
      axios
        .get('http://127.0.0.1:8000/api/stocks/', {
          params: {
            page: page,
            page_size: this.pageSize,
          },
        })
        .then((res) => {
          this.tableData = res.data.results
          this.total = res.data.count
          this.currentPage = page
        })
    },
    handlePageChange(page) {
      this.fetchData(page)
    },
  },
  mounted() {
    this.fetchData()
  },
}
</script>
