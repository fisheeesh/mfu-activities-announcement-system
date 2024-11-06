<template>
    <h1>Test</h1>
    <div v-for="(activity, index) in state.activities" :key="index">
        <p>DocId - {{ activity.documentId }}</p>
        <p>Title - {{ activity.title }}</p>
        <p class="description">Description - {{ activity.description }}</p>
        <p>Location - {{ activity.location }}</p>
        <p>School - {{ activity.school }}</p>
        <!-- Formatted date and time fields -->
        <p>Date - {{ formatDate(activity.date) }}</p>
        <p>Start Time - {{ formatTime(activity.start_time) }}</p>
        <p>End Time - {{ formatTime(activity.end_time) }}</p>
        <p>Type - {{ activity.type }}</p>
        <hr><br>
    </div>
</template>

<script setup>
import axios from 'axios';
import { onMounted, reactive } from 'vue';
import { format } from 'date-fns';

const state = reactive({
    activities: []
});

onMounted(async () => {
    let res = await axios.get('http://localhost:1337/api/activities');
    console.log(res.data.data);
    state.activities = res.data.data;
});

// Helper function to format date
const formatDate = (dateStr) => {
    return format(new Date(dateStr), 'MMM dd, yyyy');
}

// Helper function to format time
const formatTime = (timeStr) => {
    const time = new Date(`1970-01-01T${timeStr}`); // Parse time as date object
    return format(time, 'h:mm a');
}
</script>

<style></style>