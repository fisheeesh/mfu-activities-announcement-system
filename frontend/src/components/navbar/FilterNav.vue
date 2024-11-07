<template>
    <section class="mt-6 mb-3">
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-10 offset-md-2 mt-3">
                    <div class="filter-nav btn-group rounded-5" role="group" aria-label="Basic example">
                        <FilterNavLink class="p-4 rounded-end-5" to="/admin/dashboard" icon="fas fa-columns">Dashboard
                        </FilterNavLink>
                        <FilterNavLink class="p-4 rounded-5" to="/admin/upcoming" icon="fas fa-calendar-alt">Upcoming
                            Activities
                        </FilterNavLink>
                        <FilterNavLink class="p-4 rounded-5" to="/admin/ongoing" icon="fas fa-spinner">Ongoing
                            Activities
                        </FilterNavLink>
                        <FilterNavLink class="p-4 rounded-start-5" to="/admin/history" icon="fas fa-history">Activities
                            History
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

<style></style>