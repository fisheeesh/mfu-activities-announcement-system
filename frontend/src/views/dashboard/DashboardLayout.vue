<template>
    <div class="dashboard-layout">
        <!-- With Side Bar -->
        <!-- <Sidebar></Sidebar> -->
        <!-- <div class="main w-100 me-2 overflow-hidden" :style="{ 'margin-left': `${parseInt(sidebarWidth) + 10}px` }"> -->
        <!-- <router-view /> -->
        <!-- </div> -->

        <!-- With Navbar -->
        <Navbar />
        <!-- FilterNav stays in place at the top -->
        <div class="content">
            <FilterNav />
            <!-- Scrollable area for router-view content -->
            <div class="router-view-container mt-3">
                <router-view />
            </div>
        </div>
    </div>
</template>

<script setup>
import { sidebarWidth } from '@/components/sidebar/sidebarState';
import Sidebar from '../../components/sidebar/Sidebar'
import getUser from '@/composables/auth/getUser';
import { useRouter } from 'vue-router';
import { watch } from 'vue';
import Navbar from '@/components/navbar/Navbar.vue';
import FilterNav from '@/components/navbar/FilterNav.vue';

const router = useRouter();
const { user } = getUser();

/**
 * ? As soon as user logout, we want to redirect to login as for the user experience
 * ? not let user to stay or show the dashboard page all the time, so we handled it by watcing user states
 */
watch(user, () => {
    !user.value && router.push({ name: 'login' })
})

</script>

<style scoped>
.dashboard-layout {
    display: flex;
    flex-direction: column;
    height: 100vh;
    overflow: hidden;
}

.content {
    display: flex;
    flex-direction: column;
    flex: 1;
    overflow: hidden;
}

.router-view-container {
    overflow-y: auto;
    flex: 1;
    padding: 1rem;
}
</style>