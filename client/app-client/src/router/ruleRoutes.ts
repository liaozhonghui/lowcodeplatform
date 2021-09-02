import { RouteRecordRaw } from 'vue-router'
const Layout = () => import('../layout/index.vue')

// 权限路由
export const ruleRoutes: RouteRecordRaw[] = [
    { 
        path: '/testrule',
        component:  Layout,
        meta: {
            icon: 'el-icon-s-data',
            title: '异步路由'
        },
        children: [
            {
                path: "demo1",
                meta: { title: '列表1' },
                component: () => import('../views/Home/Home.vue'),
                children: [
                    {
                        path: "demo3",
                        meta: { title: '列表2', rule: ['test3'] },
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
    }
]