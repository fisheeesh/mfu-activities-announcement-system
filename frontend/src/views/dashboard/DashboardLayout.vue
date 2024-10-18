<template>
    <div class="dashboard-layout">
        <Sidebar></Sidebar>
        <div class="main w-100 me-2 overflow-hidden" :style="{ 'margin-left': `${parseInt(sidebarWidth) + 30}px` }">
            <router-view />
        </div>
    </div>
</template>

<script>
import { sidebarWidth } from '@/components/sidebar/sidebarState';
import Sidebar from '../../components/sidebar/Sidebar'
export default {
    components: { Sidebar },
    setup() {
        return { sidebarWidth }
    }

};
</script>

<style scoped>
.dashboard-layout {
    display: flex;
    height: 100vh;
}

.main {
    transition: 0.3s linear;
}
</style>