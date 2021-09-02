import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
const Layout = () => import('../layout/index.vue')

// 公共路由
export const constantRoutes: RouteRecordRaw[] = [
    { 
        path: '/', 
        component:  Layout,
        children: [
            {
                path: "/",
                meta: {
                    icon: 'el-icon-s-home',
                    title: '首页'
                },
                component: () => import('../views/Home/Home.vue')
            }
        ]
    },
    {
        path: '/login',
        component: () => import('../views/Login/index.vue'),
        meta: { hidden: true },
    },
    {
        path: '/404',
        component: () => import('../views/ErrorPage/404.vue'),
        meta: { hidden: true },
    },
    {
        path: '/401',
        component: () => import('../views/ErrorPage/401.vue'),
        meta: { hidden: true },
    },
    { 
        path: '/test',
        component:  Layout,
        meta: {
            icon: 'el-icon-s-grid',
            title: '案例'
        },
        children: [
            {
                path: "demo1",
                meta: { title: '列表1' },
                component: () => import('../views/Home/Home.vue'),
                children: [
                    {
                        path: "demo3",
                        meta: { title: '列表2' },
                        component: () => import('../views/Home/Home.vue')
                    },
                    {
                        path: "demo4",
                        meta: { title: '列表3' },
                        component: () => import('../views/Home/Home.vue')
                    }
                ]
            },
            {
                path: "demo2",
                meta: { title: '列表4' },
                component: () => import('../views/Home/Home.vue')
            }
        ]
    },
    {
        path: '/:catchAll(.*)',
        component: () => import('../views/ErrorPage/404.vue'),
        meta: { hidden: true },
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes: constantRoutes,
})

export default router