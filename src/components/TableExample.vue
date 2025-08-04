<template>
  <el-table
    :data="tableData"
    style="width: 100%">
    <el-table-column prop="name" label="商品名称" width="180" />
    <el-table-column prop="price" label="价格" width="120" />
    <el-table-column prop="description" label="描述" width="180"/>
    <el-table-column prop="created_at" label="创建时间" width="180" />
  </el-table>
</template>

<script>
import axios from 'axios'

export default {
  name: 'ProductTable',
  data() {
    return {
      tableData: [] // 初始为空，等待加载
    }
  },
  mounted() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      axios.get('http://localhost:8000/api/products/')
        .then(response => {
          this.tableData = response.data
        })
        .catch(error => {
          console.error('获取产品数据失败:', error)
        })
    }
  }
}
</script>
