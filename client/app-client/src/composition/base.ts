/**
 * 基础通用变量和方法
 */
import { ref } from 'vue'
import http from '../libs/http'
import { ElMessage } from 'element-plus'

export default () => {

    // 分页
    const pager = ref({
        page: 1,
        limit: 10,
        total: 0
    })

    // 每页显示条数事件
    const handleSizeChange = (val: number) => {
        pager.value.limit = val
    }

    // 当前页切换事件
    const handleCurrentChange = (val: number) => {
        pager.value.page = val
    }

    return {
        http,
        ElMessage,
        pager,
        handleSizeChange,
        handleCurrentChange
    }
}