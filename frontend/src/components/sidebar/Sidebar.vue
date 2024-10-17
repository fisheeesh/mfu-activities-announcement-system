<template>
    <div class="sidebar d-flex flex-column position-fixed top-0 left-0 bottom-0 float-start"
        :style="{ width: sidebarWidth }">
        <h1 class="mt-5 mb-4">
            <div v-if="collapsed">
                <img style="margin-left: 3px;" src="@/assets/logo.png" alt="mfu.logo">
            </div>
            <div v-else class="flexing d-flex justify-content-start align-items-center overflow-hidden">
                <div>
                    <img src="@/assets/logo.png" alt="mfu.logo">
                </div>

                <div class="d-flex flex-column">
                    <span class="mfu">MFU</span>
                    <span class="act">Activities Annoucement System</span>
                </div>

            </div>
        </h1>

        <SidebarLink to="/dashboard" icon="fas fa-columns">Dashboard</SidebarLink>
        <SidebarLink to="/upcoming" icon="fas fa-calendar-alt">Upcoming Activities</SidebarLink>
        <SidebarLink to="/ongoing" icon="fas fa-spinner">Ongoing Activities</SidebarLink>
        <SidebarLink to="/history" icon="fas fa-history">Activities History</SidebarLink>
        <SidebarLink to="/create" icon="fas fa-add">Create Activity</SidebarLink>

        <div class="flex-grow-1"></div>

        <div class="logout-button d-flex align-items-center justify-content-center text-white">
            <i class="icon fas fa-sign-out-alt"></i>
            <span class="ms-2" v-if="!collapsed">Logout</span>
        </div>

        <span :class="{ 'rotate-180': collapsed }"
            class="collapse-icon position-absolute d-flex align-items-center justify-content-center"
            :style="{ left: collapsed ? '55px' : '270px' }" @click="toggleSidebar">
            <i class="fas fa-angle-double-left"></i>
        </span>


    </div>
</template>

<script>
import SidebarLink from './SidebarLink'
import { collapsed, toggleSidebar, sidebarWidth } from './sidebarState'
export default {
    components: { SidebarLink },
    setup() {
        return { collapsed, toggleSidebar, sidebarWidth }
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

.sidebar {
    background-color: var(--sidebar-bg-color);
    z-index: 1;
    padding: 0.5rem;
    transition: 0.3s linear;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}

.collapse-icon {
    top: 17%;
    width: 25px;
    height: 25px;
    color: var(--button-color);
    transition: 0.3s linear;
    background: var(--sidebar-bg-color);
    border-radius: 50%;
    cursor: pointer;
    border: 1px solid rgb(224, 224, 224);
}

.rotate-180 {
    transform: rotate(180deg);
    transition: 0.3s linear;
}

.flexing {
    margin-left: 3px;
    white-space: nowrap;
}

.flexing .act {
    margin-left: 10px;
    font-size: 10px;
    color: black;
    font-weight: 400;
    letter-spacing: 1px;
}

.flexing .mfu {
    margin-left: 10px;
    font-size: 20px;
    font-weight: 800;
    color: black;
    letter-spacing: 1px;
}

.logout-button {
    cursor: pointer;
    padding: 10px;
    margin: 10px 0;
    border-radius: 2rem;
    background-color: var(--button-color);
    transition: background-color 0.3s;
    width: 100%;
    height: 40px;
}

.logout-button:hover {
    background-color: red;
}
</style>