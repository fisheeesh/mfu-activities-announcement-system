<template>
    <h1>Test</h1>

</template>

<script setup>
import { onMounted } from 'vue';
import { format, isSameDay, isBefore, isAfter, parse } from 'date-fns';

onMounted(() => {
    const current = new Date();
    const activityDate = new Date('2024-11-07');
    const startTime = parse('21:50:00.000'.substring(0, 4), 'HH:mm', activityDate);
    const endTime = parse('22:00:00.000'.substring(0, 4), 'HH:mm', activityDate);

    if (isSameDay(current, activityDate)) {
        if (isBefore(current, startTime)) {
            console.log('Same day - upcoming')

        } else if (isAfter(current, startTime) && isBefore(current, endTime)) {
            console.log('Same day - ongoing')
        } else if (isAfter(current, endTime)) {
            console.log('Same day - completed')
        }
    }
    else if (isBefore(current, activityDate)) {
        console.log('Not the same day - upcoming')
    }
    else {
        console.log('Not the same day - completed')
    }

})

</script>

<style></style>