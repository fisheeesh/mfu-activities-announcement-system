<template>
    <section class="mt-6">
        <div class="container-fluid">
            <div class="row">
                <div class="col-lg-10 offset-lg-1 col-md-8 offset-md-2 mt-3 main-nav">
                    <div class="filter-nav btn-group rounded-5 w-100" role="group" aria-label="Filter navigation">
                        <FilterNavLink class="flex-fill p-3 rounded-end-5" to="/admin/dashboard" icon="fas fa-columns">
                            Dashboard
                        </FilterNavLink>
                        <FilterNavLink class="flex-fill p-3 rounded-5" to="/admin/upcoming" icon="fas fa-calendar-alt">
                            Upcoming Activities
                        </FilterNavLink>
                        <FilterNavLink class="flex-fill p-3 rounded-5" to="/admin/ongoing" icon="fas fa-spinner">
                            Ongoing Activities
                        </FilterNavLink>
                        <FilterNavLink class="flex-fill p-3 rounded-start-5" to="/admin/history" icon="fas fa-history">
                            Activities History
                        </FilterNavLink>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import FilterNavLink from './FilterNavLink.vue';
</script>

<style scoped>
.filter-nav {
    position: sticky;
    top: 0;
    z-index: 10;
    background-color: white;
}

@media (max-width: 768px) {
    .main-nav {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .filter-nav {
        width: 50% ! important;
    }

    .filter-nav .btn-group .p-3 {
        padding: 0.5rem 0.75rem;
        font-size: 0.9rem;
    }
}
</style>