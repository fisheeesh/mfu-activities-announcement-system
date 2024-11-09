<template>
    <div>
        <!-- Upcoming Activities -->
        <Navbar @search="handleSearch" />
        <section class="activities">
            <div class="container">
                <div class="row">
                    <div class="col-12">
                        <div v-if="error">{{ error }}</div>
                        <div v-if="loading" class="mt-2">
                            <Placeholder></Placeholder>
                            <CreateButton />
                        </div>
                        <div v-else>
                            <CreateButton />
                            <div v-if="searchActivities.length === 0" class="mt-8 fs-4 text-center fw-bolder">
                                No Activity(s) yet
                            </div>
                            <div v-else>
                                <!-- <TransitionGroup tag="div" :css="false" @before-enter="onBeforeEnter" @enter="onEnter"
                                    @leave="onLeave"> -->
                                <div v-for="(activity, index) in searchActivities" :key="index"
                                    :data-index="index">
                                    <SingleActivity @updated="handleUpdate" :isEditable="true"
                                        @deleteActivity="handleDelete" :activity="activity"></SingleActivity>
                                </div>
                                <!-- </TransitionGroup> -->
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import Placeholder from '@/components/loaders/Placeholder.vue';
import SingleActivity from '@/components/activity/SingleActivity.vue';
import CreateButton from '@/components/navbar/CreateButton.vue';
import Navbar from '@/components/navbar/Navbar.vue';
import gsap from 'gsap';
import getActivities from '@/composables/controller/getActivities';

let { error, activities, load } = getActivities();
let loading = ref(true);

const searchQuery = ref('');
const selectedSch = ref('');

const handleSearch = (query, sch) => {
    searchQuery.value = query;
    selectedSch.value = sch;
};

load().then(() => loading.value = false);

let filteredActivities = computed(() => activities.value.filter(activity => activity.type === 'upcoming'));

let searchActivities = computed(() => {
    // If there's no search query and no selected school, return all filtered activities
    if (!searchQuery.value && !selectedSch.value) {
        return filteredActivities.value;
    }

    // Filter by school first if one is selected
    let filteredBySchool = filteredActivities.value;
    if (selectedSch.value && selectedSch.value !== 'All') {
        filteredBySchool = filteredBySchool.filter(activity => activity.school === selectedSch.value);
    }

    // Then filter by search query
    return filteredBySchool.filter(activity => activity.title.toLowerCase().includes(searchQuery.value.toLowerCase()));
});

let handleDelete = (id) => {
    activities.value = activities.value.filter(activity => activity.documentId !== id);
};

let handleUpdate = (id, type) => {
    let findedActivity = activities.value.find(activity => activity.documentId === id);
    findedActivity.type = type;
};

</script>

<style scoped></style>
