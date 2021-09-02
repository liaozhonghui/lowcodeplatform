<template>
  <div class="admin-container">
    <div class="header">
      <div class="left">
        <el-button type="primary">添加</el-button>
      </div>
      <div class="right">
        <span class="label">关键词</span>
        <el-input placeholder="请输入关键词"></el-input>
      </div>
    </div>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="date" label="日期" width="180"></el-table-column>
      <el-table-column prop="name" label="姓名" width="180"></el-table-column>
      <el-table-column prop="address" label="地址"></el-table-column>
    </el-table>

    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pager.page"
      :page-sizes="[10, 20, 30, 40, 50]"
      :page-size="pager.limit"
      layout="total, sizes, prev, pager, next, jumper"
      :total="pager.total"
    >
    </el-pagination>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import useBase from "../../composition/base";
import { listApps } from "../../api/appcenter";

export default defineComponent({
  name: "App",
  components: {},
  setup() {
    const { pager, handleSizeChange, handleCurrentChange } = useBase();
    const tableData = [
      {
        date: "2016-05-02",
        name: "王小虎",
        address: "上海市普陀区金沙江路 1518 弄",
      },
      {
        date: "2016-05-04",
        name: "王小虎",
        address: "上海市普陀区金沙江路 1517 弄",
      },
      {
        date: "2016-05-01",
        name: "王小虎",
        address: "上海市普陀区金沙江路 1519 弄",
      },
      {
        date: "2016-05-03",
        name: "王小虎",
        address: "上海市普陀区金沙江路 1516 弄",
      },
    ];

    return {
      pager,
      handleSizeChange,
      handleCurrentChange,
      tableData,
    };
  },
  created() {
    listApps().then((v) => {
      console.log("list apps:");
      console.log(v);
    });
  },
});
</script>

<style scoped>
.right .label {
  margin-right: 5px;
}
</style>
