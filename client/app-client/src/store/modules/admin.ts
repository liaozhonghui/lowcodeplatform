import { Commit } from 'vuex'
import { constantRoutes } from '../../router'
import { AdminState, UserInfo } from '../../types/store'
import { RouteRecordRaw } from 'vue-router'

// 状态
const state: AdminState = {
    routers: constantRoutes,    // 路由列表
    dynamicRoutes: [],          // 动态路由
    isLoadRule: false,       // 是否登录
    userInfo: {
        name: '',
        modules: []
    },                          // 用户信息
}

// 计算属性
const getters = {
    routes: (state: AdminState) => state.routers
}

// 修改state
const mutations = {
    filterRouter: (state: AdminState, routers: RouteRecordRaw[]) => {
        state.routers = constantRoutes.concat(routers);
        state.dynamicRoutes = routers;
    },
    setUserInfo: (state: AdminState, userInfo: UserInfo) => {
        state.userInfo = userInfo
        state.isLoadRule = true
    },
    clearUserInfo: () => {
        state.isLoadRule = false
    }
}

// 业务代码
const actions = {
    // 过滤路由
    filterRouter: ({ commit }: { commit: Commit }, accessedRouters: RouteRecordRaw[]) => {
        if (accessedRouters && accessedRouters.length > 0) {
            commit('filterRouter', accessedRouters);
        }
    },
    // 设置用户信息
    setUserInfo: ({ commit }: { commit: Commit }, userInfo: UserInfo) => {
        commit('setUserInfo', userInfo);
    },
    // 清除用户信息
    clearUserInfo: ({ commit }: { commit: Commit }) => {
        sessionStorage.removeItem('userInfo')
        sessionStorage.removeItem('sessiontoken')
        sessionStorage.removeItem('freshtoken')
        commit('clearUserInfo');
    }
}

export default {
    state,
    getters,
    actions,
    mutations,
}