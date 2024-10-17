<template>
    <router-link :to="to" class="link py-4 d-flex align-items-center position-relative user-select-none text-decoration-none overflow-hidden" :class="{ active: isActive }">
        <i class="icon flex-shrink-0 me-3" :class="icon"></i>
        <transition name="fade">
            <span v-if="!collapsed">
                <slot />
            </span>
        </transition>
    </router-link>
</template>

<script>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { collapsed } from './sidebarState'

export default {
    props: {
        to: { type: String, required: true },
        icon: { type: String, required: true }
    },
    setup(props) {
        const route = useRoute()
        const isActive = computed(() => route.path === props.to)

        return { collapsed, isActive }
    }
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.1s;
}

.fade-enter,
.fade-leave-to {
    opacity: 0;
}

.link {
    cursor: pointer;
    font-weight: 400;
    margin: 0.3rem 0;
    padding: 0.7rem 1rem 0.7rem 1.14rem;
    border-radius: 2rem;
    height: 1.5rem;
    color: grey;
    white-space: nowrap;
}

.link:hover {
    background-color: var(--sidebar-item-hover);
}

.link.active {
    background-color: var(--sidebar-item-active);
    color: var(--sidebar-item-color);
}

.link .icon {
    font-size: 1.2rem;
    width: 1.2rem;
}
</style>