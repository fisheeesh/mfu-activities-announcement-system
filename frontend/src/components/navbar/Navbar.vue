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
                    <li style="width: 180px;" class="nav-item dropdown me-3 w-md-100 w-sm-100">
                        <span class="nav-link dropdown-toggle d-flex justify-content-between align-items-center"
                            role="button" id="dropdownMenuBtn" data-bs-toggle="dropdown" aria-expanded="false">
                            All Schools
                        </span>
                        <ul class="dropdown-menu">
                            <li @click="filterSch(school)" v-for="(school, index) in schLists" :key="index">
                                <span class="dropdown-item">{{ school }}</span>
                            </li>
                        </ul>
                    </li>
                    <li class="nav-item dropdown">
                        <button class="nav-link dropdown-toggle me-3" href="#" role="button" data-bs-toggle="dropdown"
                            aria-expanded="false">
                            Category
                        </button>
                        <ul class="dropdown-menu">
                            <li><a class="dropdown-item" href="#">Action</a></li>
                            <li><a class="dropdown-item" href="#">Another action</a></li>
                        </ul>
                    </li>
                    <li class="nav-item dropdown">
                        <span class="nav-link dropdown-toggle me-3" href="#" role="button" data-bs-toggle="dropdown"
                            aria-expanded="false">
                            Host
                        </span>
                        <ul class="dropdown-menu">
                            <li><a class="dropdown-item" href="#">Action</a></li>
                            <li><a class="dropdown-item" href="#">Another action</a></li>
                            <li>
                                <hr class="dropdown-divider">
                            </li>
                            <li><a class="dropdown-item" href="#">Something else here</a></li>
                        </ul>
                    </li>
                </ul>
                <form class="d-flex w-25" role="search">
                    <input @keydown.enter.prevent="handleSearch" v-model="query"
                        class="form-control form-control-sm me-2 rounded-5 px-4" type="search" placeholder="Search..."
                        aria-label="Search">
                </form>


                <button data-bs-toggle="modal" data-bs-target="#logoutModal"
                    class="logout-button btn btn-primary rounded-5 px-3 fw-bold mt-lg-0 mb-lg-0 mt-md-3 mb-md-2"
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
import { onMounted, ref } from 'vue';
import useSignOut from '@/composables/auth/useSignOut';

const query = ref(null)

const handleSearch = () => {
    if (query.value.trim()) {
        console.log(query.value)
        query.value = ''
    }
    else {
        query.value = ''
    }
}

const { signOut } = useSignOut()

const logout = async () => {
    await signOut()
}

const schLists = ref([
    'School of Agro Industry',
    'School of Anti-aging Regenerative Medicine',
    'School of Cosmetic Science', 'School of Dentistry',
    'School of Health Science',
    'School of Applied Digital Technology',
    'School of Integrated Medicine',
    'School of Laws',
    'School of Liberal Arts',
    'School of Management',
    'School of Medicine',
    'School of Nursing',
    'School of Science',
    'School of Sinology',
    'School of Social Innovation'
])

const filterSch = (school) => {
    console.log(school)
    document.getElementById('dropdownMenuBtn').textContent = school
}

onMounted(() => {
    schLists.value.unshift('All Schools')
})

</script>

<style scoped>
@media (max-width: 599px) {
    .nav-item {
        width: 100% !important;
    }
}
</style>