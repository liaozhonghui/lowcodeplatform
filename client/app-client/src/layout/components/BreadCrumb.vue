<template>
    <el-breadcrumb class="app-breadcrumb" separator="/">
        <el-breadcrumb-item v-for="item in levelList" :key="item.path">
            <span class="no-redirect">{{ item.meta.title }}</span>
        </el-breadcrumb-item>
    </el-breadcrumb>
</template>

<script lang="ts">
import { defineComponent, ref, Ref, watch } from "vue";
import { useRoute, RouteLocationMatched } from "vue-router";

export default defineComponent({
    name: "BreadCrumb",
    setup() {
        
        const levelList: Ref<RouteLocationMatched[]> = ref([])
        const route = useRoute()

        const getBreadcrumb = () => {
            // only show routes with meta.title
            const matched = route.matched.filter(item => item.meta && item.meta.title)
            levelList.value = matched.filter((item: RouteLocationMatched) => item.meta && item.meta.title && item.meta.breadcrumb !== false)
        }

        // 是否是首页
        const isDashboard = (route: RouteLocationMatched) => {
            const title = route?.meta?.title as string
            if (!title) {
                return false
            }
            return title.trim() === '首页'.toLocaleLowerCase()
        }

        getBreadcrumb()

        // 监听路由变化
        watch(() => route, () => {
            if (route.path.startsWith('/redirect/')) {
                return
            }
            getBreadcrumb()
        }, {
            immediate: true,
            deep: true
        })

        return {
            levelList
        }
    }
});
</script>

<style scoped>
.app-breadcrumb.el-breadcrumb {
    display: inline-block;
    font-size: 14px;
    line-height: 50px;
    margin-left: 8px;
}
.no-redirect {
    color: #56709a;
    cursor: text;
}
</style>
