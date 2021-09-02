<template>
    <template v-if="!item.meta || (item.meta && !item.meta.hidden)">

        <!-- 一级导航 -->
        <template v-if="!alwaysShowRootMenu && theOnlyOneChild && !theOnlyOneChild.children">
            <sidebar-item-link v-if="theOnlyOneChild.meta" :to="resolvePath(theOnlyOneChild.path)">
                <el-menu-item :index="resolvePath(theOnlyOneChild.path)">
                    <i class="nav-icon" :class="theOnlyOneChild.meta.icon || ''"></i>
                    <template #title v-if="theOnlyOneChild.meta.title">{{ theOnlyOneChild.meta.title }}</template>
                </el-menu-item>
            </sidebar-item-link>
        </template>

        <!-- 多级导航 -->
        <el-submenu
            v-else
            :index="resolvePath(item.path)"
            popper-append-to-body
        >   
            <template #title>
                <i class="nav-icon" :class="item.meta && item.meta.icon ? item.meta.icon : ''"></i>
                <span v-if="item.meta && item.meta.title">{{ item.meta.title }}</span>
            </template>
            <template v-if="item.children">
                <template v-for="(child,index) in item.children" :key="index">
                    <sidebar-item :item="child" :base-path="resolvePath(child.path)" />
                </template>
            </template>
        </el-submenu>

    </template>
</template>

<script lang="ts">
import { computed, defineComponent, toRefs } from "vue";
import SidebarItemLink from './SidebarItemLink.vue';
import { isExternal } from '../../utils/validate';

export default defineComponent({
    name: "SidebarItem",
    components: {
        SidebarItemLink
    },
    props:{
        item: Object,
        basePath: String
    },
    setup(props) {

        // 接受到的参数
        const { item, basePath } = toRefs(props)

        const itemVal: any = item?.value

        const alwaysShowRootMenu = computed(() => {
            if (itemVal.meta?.alwaysShow) {
                return true
            }
            return false
        })

        const showingChildNumber = computed(() => {
            if (itemVal.children) {
                const showingChildren = itemVal.children.filter((item: any) => {
                    if (item.meta?.hidden) {
                        return false;
                    } else {
                        return true;
                    }
                });
                return showingChildren.length;
            }
            return 0;
        })

        const theOnlyOneChild = computed(() => {
            const showingChildNumberVal = showingChildNumber.value
            if (showingChildNumberVal > 1) {
                return null;
            } 
            // useDropDown 有一个子元素时允许下拉
            else if (showingChildNumberVal == 1 && itemVal.meta?.useDropDown) {
                return null
            }
            if (itemVal.children) {
                for (let child of itemVal.children) {
                    if (!child.meta || !child.meta.hidden) {
                        return child;
                    }
                }
            }
            // If there is no children, return itself with path removed,
            // because basePath already conatins item's path information
            return { ...itemVal, path: '' };
        })

        // 路由拼接
        const pathJoin = (paths: Array<string>) => {
            const pathStr = '/' + paths.join('/')
            return pathStr.replace(/\/{2,}/g, '/')
        }

        const resolvePath = (routePath: string) => {
            if (isExternal(routePath)) {
                return routePath;
            }
            const basePathVal = basePath?.value || ''
            if (isExternal(basePathVal)) {
                return basePathVal;
            }
            return pathJoin([basePathVal, routePath]);
        }

        return {
            item,
            basePath,
            resolvePath,
            alwaysShowRootMenu,
            theOnlyOneChild
        }
    }
});
</script>
<style scoped>
i {
    color: #fff;
}
.el-submenu .el-menu-item {
    background: #273e63 !important;
}
.el-submenu .el-menu-item:hover {
    background: #182840 !important;
}
.nav-icon {
    position: relative;
    top: -2px;
    left: -3px;
    font-size: 19px;
    color: #cae7ff;
}
</style>