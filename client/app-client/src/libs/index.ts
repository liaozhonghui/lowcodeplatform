import router from '../router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { actionPermission, PermissionErrorType } from './checkRule';
import settings from '../config/settings'
import { RouteLocationNormalized, NavigationGuardNext }  from 'vue-router'

NProgress.configure({ showSpinner: false });

const resetRoute = (next: NavigationGuardNext, route: string) => {
    next(route);
    NProgress.done();
    return true;
}

router.beforeEach(async (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {

    // Start progress bar
    NProgress.start();

    const permission = await actionPermission(to, from, next);
    switch (permission) {
        case PermissionErrorType.SUCCESS:
            return;
        case PermissionErrorType.FAIL:
            return resetRoute(next, settings.wxLogin ? `/401?redirect=${to.path}` : `/login?redirect=${to.path}`);
        case PermissionErrorType.ERROR:
            return resetRoute(next, settings.wxLogin ? `/404?redirect=${to.path}` : `/login?redirect=${to.path}`);;
        default: 
            return resetRoute(next, settings.wxLogin ? `/401?redirect=${to.path}` : `/login?redirect=${to.path}`);;
    }
});

router.afterEach((to: RouteLocationNormalized) => {
    // Finish progress bar
    NProgress.done();
});