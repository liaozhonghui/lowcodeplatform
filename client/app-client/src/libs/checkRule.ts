import store from '../store'
import { ruleRoutes } from "../router/ruleRoutes"
import { ElMessage } from 'element-plus'
import { getUserInfo } from '../api/user'
import router from '../router'
import { RouteLocationNormalized, RouteRecordRaw, NavigationGuardNext }  from 'vue-router'

/**
 * 通过meta.rule判断是否与当前用户权限匹配
 * @param rules  // 用户权限
 * @param route  // 路由对象
 */
const hasPermission = (rules: string[], route: any) => {
    if (rules.includes('*') || (route?.meta?.rule && route.meta.rule.includes('*'))) {
        return true
    } else if (route?.meta?.rule) {
        return route.meta.rule.some((module: string) => rules.includes(module))
    } else {
        return true
    }
}

/**
 * 递归重写异步路由表，返回符合用户角色权限的路由表
 * @param routes // 异步路由 
 * @param rules  // 用户权限
 */
const filterAsyncRoutes = (routes: RouteRecordRaw[], rules: string[]) => {
    const res: any = [];
    routes.forEach(route => {
        const r = { ...route };
        if (hasPermission(rules, r)) {
            if (r.children) {
                r.children = filterAsyncRoutes(r.children, rules);
            }
            res.push(r);
            if (r.children && r.children.length === 0 && !r.redirect) {
                res.pop();
            }
        }
    });
    return res;
}

/**
 * 异步过滤路由
 */
export const generateRoutes = async (rules: string[]) => {
    let accessedRouters = filterAsyncRoutes(ruleRoutes, rules);
    await store.dispatch("filterRouter", accessedRouters);
}


// 是否登录
const isLogin = () => {
    if (sessionStorage.getItem('sessiontoken') && sessionStorage.getItem('freshtoken')) return true;
    if (sessionStorage.getItem('userInfo')) return true;
    return false;
}

// 清空Token
const resetToken = () => {
    sessionStorage.removeItem('sessiontoken');
    sessionStorage.removeItem('freshtoken');
}

export enum PermissionErrorType {
    SUCCESS = 'success',
    FAIL = 'fail',
    ERROR = 'error',
    DONE = 'done',
}

export const actionPermission = async (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {

    // 路由白名单
    const whiteList = ['/login', '/404', '/401'];

    if (isLogin() === true) {
        try {
            if (to.path === '/login') {
                next({ path: '/' });
                return PermissionErrorType.SUCCESS;
            }
            // 是否已经获取过用户信息
            if (store.state.admin.isLoadRule) {
                next()
                return PermissionErrorType.SUCCESS;
            }
            const rules = await getUserInfo({});
            await generateRoutes(rules);
            const routes = store.state.admin.dynamicRoutes;
            for (const route of routes) {
                router.addRoute(route);
            }
            next({ ...to, replace: true })
            return PermissionErrorType.SUCCESS
        } catch (err) {
            // Remove token and redirect to login page
            resetToken();
            ElMessage.error(err || '权限验证出错!');
            return PermissionErrorType.ERROR;
        }
    } else if (whiteList.includes(to.path)) {
        next();
        return PermissionErrorType.SUCCESS; 
    } else {
        return PermissionErrorType.FAIL;
    }
}
