<script setup lang="ts">
import { ref, onMounted } from 'vue'

interface TableData {
  id: number
  name: string
  age: number
  address: string
  phone: string
  email: string
  department: string
  position: string
  salary: number
  joinDate: string
}

// 生成模拟数据
const generateData = (count: number): TableData[] => {
  const data: TableData[] = []
  for (let i = 1; i <= count; i++) {
    data.push({
      id: i,
      name: `用户${i}`,
      age: 20 + Math.floor(Math.random() * 20),
      address: `上海市浦东新区张江高科技园区第${i}街`,
      phone: `1381234${i.toString().padStart(4, '0')}`,
      email: `user${i}@example.com`,
      department: `部门${(i % 5) + 1}`,
      position: `职位${(i % 3) + 1}`,
      salary: 5000 + Math.floor(Math.random() * 10000),
      joinDate: `2023-${Math.floor(Math.random() * 12) + 1}-${Math.floor(Math.random() * 28) + 1}`
    })
  }
  return data
}

// 列配置
const columns = ref([
  { title: '序号', key: 'id', width: '80px' },
  { title: '姓名', key: 'name', width: '100px' },
  { title: '年龄', key: 'age', width: '80px' },
  { title: '地址', key: 'address', width: '300px' },
  { title: '电话', key: 'phone', width: '150px' },
  { title: '邮箱', key: 'email', width: '200px' },
  { title: '部门', key: 'department', width: '120px' },
  { title: '职位', key: 'position', width: '120px' },
  { title: '薪资', key: 'salary', width: '120px' },
  { title: '入职日期', key: 'joinDate', width: '120px' }
])

// 表格数据
const tableData = ref<TableData[]>([])

// 页面加载时填充数据
onMounted(() => {
  tableData.value = generateData(30)
})
</script>

<template>
  <div class="scrollable-table-container">
    <div class="table-header">
      <h2>员工信息表</h2>
    </div>

    <div class="scrollable-wrapper">
      <div class="table-container">
        <table class="data-table">
          <thead>
            <tr>
              <th v-for="column in columns" :key="column.key" :style="{ width: column.width }">
                {{ column.title }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="row in tableData" :key="row.id">
              <td v-for="column in columns" :key="column.key">
                {{ row[column.key as keyof TableData] }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style scoped>
.scrollable-table-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: #f7f8fa;
}

.table-header {
  padding: 16px;
  background-color: #fff;
  border-bottom: 1px solid #ebedf0;
}

.table-header h2 {
  margin: 0;
  font-size: 16px;
  font-weight: 500;
  color: #323233;
}

.scrollable-wrapper {
  flex: 1;
  overflow: hidden;
  position: relative;
}

.table-container {
  width: 100%;
  height: 100%;
  overflow: auto;
  -webkit-overflow-scrolling: touch; /* 提升iOS滚动体验 */
}

.data-table {
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;
  white-space: nowrap;
}

.data-table th,
.data-table td {
  padding: 12px 8px;
  text-align: left;
  border-bottom: 1px solid #ebedf0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.data-table th {
  font-weight: 500;
  color: #646566;
  background-color: #f7f8fa;
  position: sticky;
  top: 0;
  z-index: 1;
}

.data-table tr:nth-child(even) {
  background-color: #fafafa;
}

.data-table tr:hover {
  background-color: #f2f3f5;
}
</style>
