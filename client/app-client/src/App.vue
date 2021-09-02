<template>
  <router-view></router-view>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'App',
  components: {}
})
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 100%;
  height: 100%;
}
.admin-container {
  width: 100%;
  min-height: 100%;
  background: #fff;
  padding: 30px 20px;
  .header {
    height: 42px;
    margin: 0px 0 15px;
    display: flex;
    justify-content: space-between;
    .label {
      color: #666;
      font-size: 14px;
    }
    .el-input {
      width: 200px;
    }
  }
  .el-pagination {
    margin-top: 15px;
    text-align: center;
  }
}
</style>