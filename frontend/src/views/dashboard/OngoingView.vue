<template>
    <div>
        <!-- Page Title -->
        <!-- <h1 class="fs-4 fw-bold text-center mt-5">Ongoing Activities</h1> -->
        <!-- Ongoing Activities -->
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
                            <div v-if="searchActivities.length === 0" class="mt-8 fs-4 text-center fw-bolder">
                                No Activity(s) yet
                            </div>
                            <!-- If not, that means we got data -->
                            <div v-else>
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
import { useActivityFilterStore } from '@/store/activityFilter';

let { error, activities, load } = getActivities()
let loading = ref(true)

const store = useActivityFilterStore();

const searchQuery = computed(() => store.searchQuery);
const selectedSch = computed(() => store.selectedSch);
const selectedCate = computed(() => store.selectedCate)

load().then(() => loading.value = false)

let filteredActivities = computed(() => activities.value.filter(activity => activity.type === 'ongoing'))

const searchActivities = computed(() => {
    if (!searchQuery.value && !selectedSch.value) {
        return filteredActivities.value
    }

    let filteredBySchool = filteredActivities.value
    if (selectedSch.value && selectedSch.value !== 'All') {
        filteredBySchool = filteredBySchool.filter(activity => activity.school === selectedSch.value)
        if (selectedCate.value && selectedCate.value !== 'All') {
            filteredBySchool = filteredBySchool.filter(activity => activity.category === selectedCate.value)
        }
    }

    if (selectedCate.value && selectedCate.value !== 'All') {
        filteredBySchool = filteredBySchool.filter(activity => activity.category === selectedCate.value)
        if (selectedSch.value && selectedSch.value !== 'All') {
            filteredBySchool = filteredBySchool.filter(activity => activity.school === selectedSch.value)
        }
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