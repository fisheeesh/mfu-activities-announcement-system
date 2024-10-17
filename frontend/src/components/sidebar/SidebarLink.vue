<template>
    <router-link :to="to" class="link py-4" :class="{ active: isActive }">
        <i class="icon" :class="icon"></i>
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
    display: flex;
    align-items: center;
    cursor: pointer;
    position: relative;
    font-weight: 400;
    user-select: none;
    margin: 0.3rem 0;
    padding: 0.7rem 1rem 0.7rem 1.14rem;
    border-radius: 2rem;
    height: 1.5rem;
    color: grey;
    text-decoration: none;
    white-space: nowrap;
    overflow: hidden;
}

.link:hover {
    background-color: var(--sidebar-item-hover);
}

.link.active {
    background-color: var(--sidebar-item-active);
    color: var(--sidebar-item-color);
}

.link .icon {
    flex-shrink: 0;
    font-size: 1.2rem;
    width: 1.2rem;
    margin-right: 15px;
}
</style>