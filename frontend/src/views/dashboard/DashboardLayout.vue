<template>
    <div class="dashboard-layout">
        <!-- With Side Bar -->
        <!-- <Sidebar></Sidebar> -->
        <!-- <div class="main w-100 me-2 overflow-hidden" :style="{ 'margin-left': `${parseInt(sidebarWidth) + 10}px` }"> -->
        <!-- <router-view /> -->
        <!-- </div> -->
        <CreateButton/>
        <Navbar />
        <FilterNav />
        <router-view />
    </div>
</template>

<script>
import { sidebarWidth } from '@/components/sidebar/sidebarState';
import Sidebar from '../../components/sidebar/Sidebar'
import getUser from '@/composables/auth/getUser';
import { useRouter } from 'vue-router';
import { watch } from 'vue';
import Navbar from '@/components/navbar/Navbar.vue';
import FilterNav from '@/components/navbar/FilterNav.vue';
import CreateButton from '@/components/navbar/CreateButton.vue';

export default {
    components: { Sidebar, Navbar, FilterNav, CreateButton },
    setup() {
        const router = useRouter();
        const { user } = getUser();

        /**
         * ? As soon as user logout, we want to redirect to login as for the user experience
         * ? not let user to stay or show the dashboard page all the time, so we handled it by watcing user states
         */
        watch(user, () => {
            !user.value && router.push({ name: 'login' })
        })

        return { sidebarWidth }
    }

};
</script>

<style scoped>
.main {
    transition: 0.3s linear;
}
</style>