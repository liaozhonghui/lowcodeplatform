<template>
    <a v-if="isExternal(to)" :href="to" target="_blank" rel="noopener">
        <slot />
    </a>
    <router-link v-else :to="to">
        <slot />
    </router-link>
</template>

<script lang="ts">
import { defineComponent, toRefs } from "vue";
import { isExternal } from '../../utils/validate';

export default defineComponent({
    name: "SidebarItemLink",
    props:{
        to: String
    },
    setup(props) {
        const { to } = toRefs(props)

        return {
            to,
            isExternal
        }
    }
});
</script>
