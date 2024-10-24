<template>
    <!-- We only show the side bar if the user is logged in -->
    <div v-if="user">
        <!-- SideBar -->
        <div class="sidebar bg-white d-flex p-2 shadow-sm flex-column position-fixed top-0 left-0 bottom-0 float-start"
            :style="{ width: sidebarWidth }">
            <h1 class="mt-5 mb-4">
                <div v-if="collapsed">
                    <img class="ms-1" style="margin-left: 3px;" src="@/assets/images/logo_mfu.png" alt="mfu.logo">
                </div>
                <div v-else class="flexing ms-1 d-flex justify-content-start align-items-center overflow-hidden">
                    <div>
                        <img src="@/assets/images/logo_mfu.png" alt="mfu.logo">
                    </div>

                    <div class="d-flex flex-column ms-2">
                        <span class="mfu text-dark fw-bolder">MFU</span>
                        <span class="act text-dark">Activities Annoucement System</span>
                    </div>

                </div>
            </h1>

            <SidebarLink to="/admin/dashboard" icon="fas fa-columns">Dashboard</SidebarLink>
            <SidebarLink to="/admin/create" icon="fas fa-add">Create Activity</SidebarLink>
            <SidebarLink to="/admin/upcoming" icon="fas fa-calendar-alt">Upcoming Activities</SidebarLink>
            <SidebarLink to="/admin/ongoing" icon="fas fa-spinner">Ongoing Activities</SidebarLink>
            <SidebarLink to="/admin/history" icon="fas fa-history">Activities History</SidebarLink>

            <div class="flex-grow-1"></div>

            <span :class="{ 'rotate-180': collapsed }"
                class="collapse-icon text-primary rounded-circle bg-white position-absolute d-flex align-items-center justify-content-center"
                :style="{ left: collapsed ? '55px' : '270px' }" @click="toggleSidebar">
                <i class="fas fa-angle-double-left"></i>
            </span>

            <button data-bs-toggle="modal" data-bs-target="#logoutModal"
                class="logout-button btn btn-primary w-100 d-flex align-items-center justify-content-center text-white">
                <i class="icon fas fa-sign-out-alt"></i>
                <span class="ms-2" v-if="!collapsed">Logout</span>
            </button>
        </div>

        <!-- Logout Modal -->
        <div class="modal fade" id="logoutModal">
            <div class="modal-dialog mt-5">
                <div class="modal-content p-4 shadow-sm bg-light">
                    <h2 class="modal-title fw-bolder text-primary fs-3">Confirm Logout</h2>
                    <hr>
                    <h6 class="text-muted">Are you sure you want to logout?</h6>
                    <div class="d-flex justify-content-end gap-2 mt-4">
                        <button class="btn btn-outline-white rounded-5 border-1 border-dark text-dark"
                            data-bs-dismiss="modal">Cancel</button>
                        <button @click="logout" class="btn btn-primary rounded-5 px-4"
                            data-bs-dismiss="modal">OK</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import getUser from '@/composables/getUser';
import SidebarLink from './SidebarLink'
import { collapsed, toggleSidebar, sidebarWidth } from './sidebarState'
import useSignOut from '@/composables/useSignOut';

export default {
    components: { SidebarLink },
    setup() {
        let { signOut } = useSignOut()
        let { user } = getUser()

        let logout = async () => {
            await signOut()

        }
        return { collapsed, toggleSidebar, sidebarWidth, logout, user }
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
    z-index: 1;
    transition: 0.3s linear;
}

.collapse-icon {
    top: 17%;
    width: 25px;
    height: 25px;
    transition: 0.3s linear;
    cursor: pointer;
    border: 1px solid #e0e0e0;
}

.rotate-180 {
    transform: rotate(180deg);
    transition: 0.3s linear;
}

.flexing {
    white-space: nowrap;
}

.flexing .act {
    font-size: 10px;
    font-weight: 400;
    letter-spacing: 1px;
}

.flexing .mfu {
    font-size: 20px;
    letter-spacing: 1px;
}

.logout-button {
    cursor: pointer;
    padding: 10px;
    margin: 10px 0;
    border-radius: 2rem;
    transition: background-color 0.3s;
    height: 40px;
}
</style>