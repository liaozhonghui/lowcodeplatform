<template>
    <el-container class="container">
        <!-- 侧边栏 -->
        <div class="sidebar-container" :style="{width: isCollapse ? '57px' : '250px'}">
            <el-scrollbar wrap-class="scrollbar-wrapper">
                <el-menu
                    :collapse="isCollapse"
                    :uniqueOpened="true"
                    :default-active="currentPath"
                    class="el-menu-vertical-demo"
                    background-color="#435c84"
                    text-color="#cae7ff"
                    :collapse-transition="false"
                    active-text-color="#5cb1ff">
                    <template v-for="(route,index) in routes" :key="index">
                        <SidebarItem  :item="route" :base-path="route.path" />
                    </template>
                </el-menu>
            </el-scrollbar>
        </div>
        <el-container>
            <!-- 头部 -->
            <el-header>
                <div class="header-left">
                    <span class="collapse-btn" :class="isCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold'" @click="sideBarToggle"></span>
                    <BreadCrumb/>
                </div>
                <div class="header-right">
                    <span class="username">{{ username }}</span>
                    <el-dropdown trigger="click">
                        <span>
                            <img src="https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80" class="user-avatar">
                        </span>
                        <template #dropdown>
                            <el-dropdown-menu>
                                <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
                            </el-dropdown-menu>
                        </template>
                    </el-dropdown>
                </div>
            </el-header>
            <!-- 主体 -->
            <el-main>
                <router-view v-slot="{ Component }">
                    <transition name="move" mode="out-in">
                        <component :is="Component" />
                    </transition>
                </router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from "vuex"
import SidebarItem from "./components/SidebarItem.vue"
import BreadCrumb from './components/BreadCrumb.vue'
import { useRouter, useRoute } from 'vue-router'
import settings from '../config/settings'

export default defineComponent({
    components: { SidebarItem, BreadCrumb },
    setup() {

        // 使用store
        const store = useStore()

        // 当前折叠状态
        const isCollapse = computed(() => { return store.state.app.sidebar.opened })

        const username = computed(() => { return store.state.admin.userInfo.name })
        
        // 侧边栏收缩
        const sideBarToggle = () => {
            if (isCollapse.value) {
                store.dispatch("hideSideBar")
            } else {
                store.dispatch("showSideBar")
            }
        }

        // 当前导航选中值
        const route = useRoute()
        const currentPath = computed(() => route.path)

        // 全局状态获取路由
        const routes = computed(() => store.getters.routes)

        const router = useRouter()

        // 退出登录
        const logout = async () => {
            await store.dispatch('clearUserInfo')
            if (settings.wxLogin) {
                window.location.reload();
            } else {
                router.push({path: '/login'})
            }
        }

        return {
            isCollapse,
            username,
            routes,
            currentPath,
            sideBarToggle,
            logout,
        }
    }
})
</script>

<style lang="scss" scoped>
.container {
    width: 100%;
    height: 100%;
    .sidebar-container {
        height: 100%;
        background-color: #435c84;
        transition: width 0.35s;
        flex-shrink: 0;
        .scrollbar-wrapper {
            overflow-x: hidden !important;
        }
        .el-menu {
            border-right: none;
        }
    }
}
.el-aside {
    background-color: #435c84;
}
.el-header {
    border-bottom: 1px solid #eee;
    box-shadow: 0 1px 4px rgba(0,21,41,.08);
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #fff;
    .header-left {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        font-size: 22px;
        .collapse-btn {
            cursor: pointer;
            color: #435c84;
        }
    }
    .header-right {
        display: flex;
        justify-content: center;
        align-items: center;
        .user-avatar {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            cursor: pointer;
        }
        .username {
            margin-right: 15px;
            color: #666;
        }
    }
}
</style>