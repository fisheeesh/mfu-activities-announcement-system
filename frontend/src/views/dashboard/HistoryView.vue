<template>
    <div>
        <!-- Page Title -->
        <!-- <h1 class="fs-4 fw-bold text-center mt-5">Activities History</h1> -->
        <!-- Ongoing Activities -->
        <Navbar @search="searchQuery = $event" @school="selectedSch = $event" />
        <section class="activities">
            <div class="container">
                <div class="row">
                    <div class="col-12">
                        <!-- Show Error if the data-fetching process fails -->
                        <div v-if="error">{{ error }}</div>
                        <!-- Show Placeholder during data-fetching process -->
                        <div v-if="loading" class="mt-2">
                            <Placeholder></Placeholder>
                            <CreateButton />
                        </div>
                        <!-- After we get data, show this -->
                        <div v-else>
                            <CreateButton />
                            <!-- If there is no data, show this -->
                            <div v-if="searchActivities.length === 0" class="mt-8 fs-4 text-center fw-bolder">
                                No Activity(s) yet
                            </div>
                            <!-- If not, that means we got data -->
                            <div v-else>
                                <!-- Activity List -->
                                <div v-for="activity in searchActivities" :key="activity.id">
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

const searchQuery = ref('')
const selectedSch = ref('')

load().then(() => loading.value = false)

const searchActivities = computed(() => {
    if (!searchQuery.value && !selectedSch.value) {
        return activities.value
    }

    let filteredBySchool = activities.value
    if (selectedSch.value && selectedSch.value !== 'All') {
        filteredBySchool = filteredBySchool.filter(activity => activity.school === selectedSch.value)
    }

    return filteredBySchool.filter(activity => activity.title.toLowerCase().includes(searchQuery.value.toLowerCase()))
})

let handleDelete = (id) => {
    activities.value = activities.value.filter(activity => activity.documentId !== id);
}

let handleUpdate = (id, type) => {
    let findedActivity = activities.value.find(activity => activity.documentId === id)
    findedActivity.type = type
}

</script>

<style></style>