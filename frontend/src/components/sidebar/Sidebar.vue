<template>
    <div class="sidebar" :style="{ width: sidebarWidth }">
        <h1 style="margin-top: 50px">
            <div v-if="collapsed">
                <img style="margin-left: 3px;" src="@/assets/logo.png" alt="">
            </div>
            <div v-else class="flexing">
                <div>
                    <img src="@/assets/logo.png" alt="">
                </div>

                <div style="display: flex; flex-direction: column;">
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

        <div style="flex-grow: 1;"></div>

        <div class="logout-button" @click="handleLogout">
            <i class="icon fas fa-sign-out-alt"></i>
            <span v-if="!collapsed">Logout</span>
        </div>

        <span :class="{ 'rotate-180': collapsed }" class="collapse-icon" :style="{ left: collapsed ? '55px' : '270px' }"
            @click="toggleSidebar">
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
.logout-button {
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    padding: 13px 10px;
    margin: 10px 0;
    border-radius: 2rem;
    color: white;
    background-color: var(--button-color);
    transition: background-color 0.3s;
}

.logout-button:hover {
    background-color: crimson;
}

.logout-button span {
    margin-left: 15px;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.1s;
}

.fade-enter,
.fade-leave-to {
    opacity: 0;
}

.sidebar {
    color: white;
    background-color: var(--sidebar-bg-color);
    float: left;
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0;
    bottom: 0;
    padding: 0.5rem;
    transition: 0.3s linear;
    display: flex;
    flex-direction: column;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}

.collapse-icon {
    position: absolute;
    top: 16%;
    right: -15px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 25px;
    height: 25px;
    color: var(--button-color);
    transition: 0.3s linear;
    background: var(--sidebar-bg-color);
    border-radius: 50%;
    cursor: pointer;
    border: 1px solid rgb(224, 224, 224);
}

.logout {
    background: var(--button-color);
    color: white;
    display: flex;
    align-items: center;
    justify-content: start;
    transition: 0.3s linear;
    margin-top: auto;
}

.logout:hover {
    background: rgb(173, 0, 0);
}

.rotate-180 {
    transform: rotate(180deg);
    transition: 0.3s linear;
}

.flexing {
    display: flex;
    justify-content: start;
    align-items: center;
    margin-left: 3px;
    white-space: nowrap;
    overflow: hidden;
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
</style>