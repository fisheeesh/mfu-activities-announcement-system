<template>
    <div>
        <h1 class="fs-4 fw-bold text-center mt-5">Upcoming Activities</h1>
        <section class="activities mt-4">
            <div class="container">
                <div class="row">
                    <div class="col-12">
                        <div v-if="error">{{ error }}</div>
                        <div v-if="filteredActivities.length > 0">
                            <div class="card mb-3 shadow-sm border-0 rounded-3" v-for="activity in filteredActivities"
                                :key="activity.id">
                                <div class="card-body d-flex flex-column justify-content-center align-items-start">
                                    <h4 class="fw-bold">{{ activity.title }}</h4>
                                    <div class="d-flex gap-2 mt-2">
                                        <div class="px-4 py-2 bg-secondary rounded-5">
                                            {{ activity.date }} | {{ activity.duration }}
                                        </div>
                                        <div class="px-4 py-2 bg-white rounded-5 border border-1">
                                            {{ activity.location }}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div v-else class="mt-6 d-flex justify-content-center gap-2">
                            <div class="spinner-border text-primary" role="status">
                                <span class="visually-hidden">Loading...</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import getActivities from '@/componsables/getActivities';
import { computed } from 'vue';

export default {
    setup() {
        let { error, activities, load } = getActivities()

        load()

        let filteredActivities = computed(() => activities.value.filter(activity => activity.status === 'upcoming'))

        return { error, activities, filteredActivities}
    }
}
</script>

<style></style>