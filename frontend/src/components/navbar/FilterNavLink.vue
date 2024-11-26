<template>
    <router-link :to="to"
        class="link py-4 d-flex align-items-center position-relative user-select-none text-decoration-none overflow-hidden"
        :class="{ active: isActive }">
        <i class="icon flex-shrink-0 me-3" :class="icon"></i>
        <span class="text">
            <slot />
        </span>
    </router-link>
</template>

<script>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

export default {
    props: {
        to: { type: String, required: true },
        icon: { type: String, required: true }
    },
    setup(props) {
        const route = useRoute()
        const isActive = computed(() => route.path === props.to)

        return { isActive }
    }
}
</script>

<style scoped>
.link {
    cursor: pointer;
    font-weight: 400;
    margin: 0.3rem 0;
    padding: 0.7rem 1rem 0.7rem 1.1rem;
    border-radius: 2rem;
    height: 1.5rem;
    color: grey;
    white-space: nowrap;
}

.link:hover:not(.active) {
    background-color: #ddd !important;
}

.link.active {
    background-color: var(--sidebar-item-active);
    color: var(--sidebar-item-color);
}

.link .icon {
    font-size: 1.2rem;
    width: 1.2rem;
}
@media (max-width : 559px) {
    .text{
        display: none;
    }
    .link .icon{
        margin-left: 4.5px !important;
    }
}
</style>