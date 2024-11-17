<template>
    <nav class="navbar navbar-expand-lg fixed-top shadow-sm bg-body-tertiary">
        <div class="container-fluid px-4">
            <router-link to="/admin/dashboard" class="navbar-brand">
                <div class="flexing ms-1 d-flex justify-content-start align-items-center overflow-hidden">
                    <div>
                        <img src="@/assets/images/logo.png" width="45" alt="mfu.logo">
                    </div>

                    <div class="d-flex flex-column ms-2">
                        <span class="nav_mfu text-black fs-5 fw-bolder">MFU</span>
                        <span style="font-size: 13px; letter-spacing: 1px;" class="nav_act text-dark">Activities
                            Annoucement System</span>
                    </div>
                </div>
            </router-link>
            <button class="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav ms-auto">
                    <li class="nav-item d-flex align-items-center">
                        <span class="nav-link" style="width: 100px; color: grey;">Hosted By</span>
                    </li>
                    <li class="nav-item dropdown me-3 w-md-100 w-sm-100">
                        <span
                            class="nav-link dropdown-toggle text-dark d-flex gap-4 justify-content-between align-items-center"
                            role="button" id="dropdownMenuBtn" data-bs-toggle="dropdown" aria-expanded="false">
                            {{ store.selectedSch.length > 15 ? store.selectedSch.substring(0, 15) + '...' :
                                store.selectedSch }}
                        </span>
                        <ul class="dropdown-menu">
                            <li @click="filteredSch(school)" v-for="(school, index) in schLists" :key="index">
                                <span class="dropdown-item">{{ school }}</span>
                            </li>
                        </ul>
                    </li>
                    <li class="nav-item d-flex align-items-center">
                        <span class="nav-link" style="width: 100px; color: grey;">Category</span>
                    </li>
                    <li class="nav-item dropdown">
                        <span
                            class="nav-link dropdown-toggle text-dark d-flex gap-4 justify-content-between align-items-center"
                            role="button" id="dropdownMenuBtN" data-bs-toggle="dropdown" aria-expanded="false">
                            {{ store.selectedCate }}
                        </span>
                        <ul class="dropdown-menu">
                            <li v-for="(category, index) in categoryLists" :key="index">
                                <span @click="filteredCategory(category)" class="dropdown-item">{{ category }}</span>
                            </li>
                        </ul>
                    </li>
                </ul>
                <form class="d-flex ms-2" role="search">
                    <input style="transition: border-color 0.4s ease-in-out;" @keydown.prevent.enter
                        @input="handleSearch($event)" v-model="searchQuery"
                        class="form-control form-control-sm me-2 rounded-5 px-4" type="search" placeholder="Search..."
                        aria-label="Search">
                </form>

                <button data-bs-toggle="modal" data-bs-target="#logoutModal"
                    class="logout-button btn btn-primary rounded-5 px-3 fw-bold mt-lg-0 mb-lg-0"
                    style="padding: 8px 0;">
                    <!-- <i class="icon fas fa-sign-out-alt"></i> -->
                    LogOut
                </button>
            </div>
        </div>
    </nav>
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
                    <button @click="logout" class="btn btn-primary rounded-5 px-4" data-bs-dismiss="modal">OK</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import useSignOut from '@/composables/auth/useSignOut';
import { useActivityFilterStore } from '@/store/activityFilter';
import { onBeforeRouteLeave } from 'vue-router';

const { signOut } = useSignOut()

const logout = async () => {
    await signOut()
}

const schLists = ref([
    'All',
    'School of Agro Industry',
    'School of Applied Digital Technology',
    'School of Cosmetic Science', 'School of Dentistry',
    'School of Health Science',
    'School of Laws',
    'School of Liberal Arts',
    'School of Management',
    'School of Medicine',
    'School of Nursing',
    'School of Sinology',
    'School of Public Health',
    'Mae-Fah-Luang University'
])

const categoryLists = ref([
    'All',
    'University',
    'Major',
    'School',
    'Other'
])

const store = useActivityFilterStore();

const handleSearch = (event) => {
    store.searchQuery = event.target.value.trim();
};

const filteredSch = (school) => {
    store.selectedSch = school;
    if (school.length > 15) {
        document.getElementById('dropdownMenuBtn').textContent = school.substring(0, 15) + '...';
    }
    else {
        document.getElementById('dropdownMenuBtn').textContent = school;
    }
};

const filteredCategory = (category) => {
    store.selectedCate = category
    document.getElementById('dropdownMenuBtN').textContent = category;
}

/**
 * ! Reset the state data when user go to other route to avoid bug and enhance user experience
 */
onBeforeRouteLeave((to, from) => {
    if (to.name !== from.name) {
        store.searchQuery = '';
        store.selectedSch = 'All';
        store.selectedCate = 'All';
    }
});

</script>

<style scoped>
.dropdown-item {
    cursor: pointer ! important;
}

#dropdownMenuBtn:hover,
#dropdownMenuBtN:hover {
    color: #BA1E23 !important;
}

@media (max-width: 1000px) {
    .nav-item {
        width: 100% !important;
    }

    .form-control {
        width: 100% !important;
        margin: 10px 0px !important;
    }
}
</style>