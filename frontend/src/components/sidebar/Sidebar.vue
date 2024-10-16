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
        <SidebarLink to="/analytics" icon="fas fa-calendar-alt">Upcoming Activities</SidebarLink>
        <SidebarLink to="/friends" icon="fas fa-spinner">Ongoing Activities</SidebarLink>
        <SidebarLink to="/image" icon="fas fa-history">Activities History</SidebarLink>
        <SidebarLink to="/create" icon="fas fa-add">Create Activity</SidebarLink>

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
    transition: 0.3s ease;
    display: flex;
    flex-direction: column;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}

.collapse-icon {
    position: fixed;
    top: 16%;
    left: 183px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.3rem;
    color: #BA1E23;
    transition: 0.2s linear;
    background: var(--sidebar-bg-color);
    border-radius: 50%;
    cursor: pointer;
    border: 1px solid rgb(224, 224, 224);
}


.rotate-180 {
    transform: rotate(180deg);
    transition: 0.2s linear;
}

.logout {
    position: absolute;
    bottom: 10px;
    display: flex;
    align-items: center;
    justify-content: center;

}

.logout button {
    border: none;
    border-radius: 5px;
    outline: none;
    margin-left: 10px;
    padding: 10px 60px;
    background: crimson;
    color: white;
    cursor: pointer;
    transition: 2s ease;
}

.flexing {
    display: flex;
    justify-content: start;
    align-items: center;
    margin-left: 10px;
    white-space: nowrap; 
    overflow: hidden; 
}

.flexing .act {
    margin-left: 10px;
    font-size: 10px;
    color: black;
    font-weight: 100;
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