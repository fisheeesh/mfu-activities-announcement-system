<template>
    <div>
        <!-- Page Title -->
        <h1 class="fs-4 fw-bold text-center mt-5">Activities History</h1>
        <!-- Ongoing Activities -->
        <section class="activities mt-4">
            <div class="container">
                <div class="row">
                    <div class="col-12">
                        <!-- Show Error if the data-fetching process fails -->
                        <div v-if="error">{{ error }}</div>
                        <!-- Show Placeholder during data-fetching process -->
                        <div v-if="loading" class="mt-2">
                            <Placeholder></Placeholder>
                        </div>
                        <!-- After we get data, show this -->
                        <div v-else>
                            <!-- If there is no data, show this -->
                            <div v-if="activities.length === 0" class="mt-5 text-center fw-bolder">
                                No Activity(s) yet
                            </div>
                            <!-- If not, that means we got data -->
                            <div v-else>
                                <!-- Activity List -->
                                <div v-for="activity in activities" :key="activity.id">
                                    <SingleActivity :activity="activity"></SingleActivity>
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
import Placeholder from '@/components/Placeholder.vue';
import SingleActivity from '@/components/SingleActivity.vue';
import getActivities from '@/componsables/getActivities';
import { ref } from 'vue';

export default {
    components: {
        SingleActivity,
        Placeholder,
    },
    setup() {
        let { error, activities, load } = getActivities()
        let loading = ref(true)

        load().then(() => loading.value = false)

        return { error, activities, loading }
    }
}
</script>

<style>

</style>