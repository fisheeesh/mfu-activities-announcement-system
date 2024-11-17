<template>
    <div>
        <!-- Upcoming Activities -->
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
                                <div v-for="(activity, index) in searchActivities" :key="index" :data-index="index">
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
import getActivities from '@/composables/controller/getActivities';
import { useActivityFilterStore } from '@/store/activityFilter';

let { error, activities, load } = getActivities();
let loading = ref(true);

const store = useActivityFilterStore();

const searchQuery = computed(() => store.searchQuery);
const selectedSch = computed(() => store.selectedSch);
const selectedCate = computed(() => store.selectedCate)

load().then(() => loading.value = false);

let filteredActivities = computed(() => activities.value.filter(activity => activity.type === 'upcoming'));

let searchActivities = computed(() => {
    /**
     * ! If there's no search query, no selected school and no selected category, return all filtered activities
     */
    if (!searchQuery.value && !selectedSch.value && !selectedCate.value) {
        return filteredActivities.value;
    }

    /**
     * ! If user selected a school, that is not 'All' and there's no search query, return filtered activities by school
     * ! We set All as a default option for user to see all activities from all schools by ingoring 
     * ! school property of activities
     * * If user selected 'All', below condition will be false and filteredBySchool will be remain as filteredActivities
     */
    let filteredBySchool = filteredActivities.value;
    if (selectedSch.value && selectedSch.value !== 'All') {
        filteredBySchool = filteredBySchool.filter(activity => activity.school === selectedSch.value);
        if(selectedCate.value && selectedCate.value !== 'All') {
            filteredBySchool = filteredBySchool.filter(activity => activity.category === selectedCate.value);
        }
    }

    if(selectedCate.value && selectedCate.value !== 'All'){
        filteredBySchool = filteredBySchool.filter(activity => activity.category === selectedCate.value)
        if(selectedSch.value && selectedSch.value !== 'All') {
            filteredBySchool = filteredBySchool.filter(activity => activity.school === selectedSch.value)
        }
    }

    /**
     * ! Then filter activities from recent filteredBySchool by search query
     */
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
