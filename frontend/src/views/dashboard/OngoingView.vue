<template>
    <div>
        <!-- Page Title -->
        <!-- <h1 class="fs-4 fw-bold text-center mt-5">Ongoing Activities</h1> -->
        <!-- Ongoing Activities -->
        <Navbar />
        <section class="activities">
            <div class="container">
                <div class="row">
                    <div class="col-12">
                        <!-- Show Erorr if the data-fetcing process fails -->
                        <div v-if="error">{{ error }}</div>
                        <!-- Show Placeholder durin data-fetching process, cuz it delays 1s -->
                        <div v-if="loading" class="mt-2">
                            <Placeholder></Placeholder>
                            <CreateButton />
                        </div>
                        <!-- After we get data, show this -->
                        <div v-else>
                            <CreateButton />
                            <!-- If there is no data, show this -->
                            <div v-if="filteredActivities.length === 0" class="mt-8 fs-4 text-center fw-bolder">
                                No Activity(s) yet
                            </div>
                            <!-- If not, that means we got data -->
                            <div v-else>
                                <div v-for="activity in filteredActivities" :key="activity.id">
                                    <SingleActivity @updated="handleUpdate" :isEditable="true"
                                        @deleteActivity="handleDelete" :activity="activity">
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

<script setup>
import Placeholder from '@/components/loaders/Placeholder.vue';
import SingleActivity from '@/components/activity/SingleActivity.vue';
import getActivities from '@/composables/controller/getActivities';
import { computed, ref } from 'vue';
import CreateButton from '@/components/navbar/CreateButton.vue';
import Navbar from '@/components/navbar/Navbar.vue';

let { error, activities, load } = getActivities()
let loading = ref(true)

load().then(() => loading.value = false)

let filteredActivities = computed(() => activities.value.filter(activity => activity.type === 'ongoing'))
let handleDelete = (id) => {
    activities.value = activities.value.filter(activity => activity.documentId !== id);
}

let handleUpdate = (id, type) => {
    let findedActivity = activities.value.find(activity => activity.documentId === id)
    findedActivity.type = type
}

</script>

<style></style>