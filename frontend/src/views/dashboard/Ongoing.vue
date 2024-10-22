<template>
    <div>
        <!-- Page Title -->
        <h1 class="fs-4 fw-bold text-center mt-5">Ongoing Activities</h1>
        <!-- Ongoing Activities -->
        <section class="activities mt-4">
            <div class="container">
                <div class="row">
                    <div class="col-12">
                        <!-- Show Erorr if the data-fetcing process fails -->
                        <div v-if="error">{{ error }}</div>
                        <!-- Show Placeholder durin data-fetching process, cuz it delays 1s -->
                        <div v-if="loading" class="mt-2">
                            <Placeholder></Placeholder>
                        </div>
                        <!-- After we get data, show this -->
                        <div v-else>
                            <!-- If there is no data, show this -->
                            <div v-if="filteredActivities.length === 0" class="mt-5 text-center fw-bolder">
                                No Activity(s) yet
                            </div>
                            <!-- If not, that means we got data -->
                            <div v-else>
                                <div v-for="activity in filteredActivities" :key="activity.id">
                                    <SingleActivity @deleteActivity="handleDelete" :activity="activity">
                                    </SingleActivity>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import Placeholder from '@/components/loaders/Placeholder.vue';
import SingleActivity from '@/components/SingleActivity.vue';
import getActivities from '@/composables/getActivities';
import { computed, ref } from 'vue';

export default {
    components: {
        SingleActivity,
        Placeholder
    },
    setup() {
        let { error, activities, load } = getActivities()
        let loading = ref(true)

        load().then(() => loading.value = false)

        let filteredActivities = computed(() => activities.value.filter(activity => activity.status === 'ongoing'))
        let handleDelete = (id) => {
            activities.value = activities.value.filter(activity => activity.id !== id);
        }

        return { error, activities, filteredActivities, loading, handleDelete }
    }
}
</script>

<style></style>