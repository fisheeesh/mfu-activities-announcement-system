<template>
    <div>
        <h1 class="fs-4 fw-bold text-center mt-5">Upcoming Activities</h1>
        <section class="activities mt-4">
            <div class="container">
                <div class="row">
                    <div class="col-12">
                        <div v-if="error">{{ error }}</div>
                        <div v-if="filteredActivities.length > 0">
                            <div v-for="activity in filteredActivities"
                                :key="activity.id">
                                <SingleActivity :activity="activity"></SingleActivity>
                            </div>
                        </div>
                        <div v-else class="mt-2">
                            <Placeholder></Placeholder>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import SingleActivity from '../../components/SingleActivity'
import Placeholder from '../../components/Placeholder'
import getActivities from '@/componsables/getActivities';
import { computed } from 'vue';

export default {
    components: {
        SingleActivity, Placeholder
    },
    setup() {
        let { error, activities, load } = getActivities()

        load()

        let filteredActivities = computed(() => activities.value.filter(activity => activity.status === 'upcoming'))

        return { error, activities, filteredActivities }
    }
}
</script>

<style></style>