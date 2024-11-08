<template>
    <div class="card border-0 rounded-4" :style="{ 'background-color': color }">
        <div class="card-body">
            <div class="card-content d-flex flex-column pt-2">
                <h6 class="fw-bold">{{ title }}</h6>
                <span class="fw-bold fs-4">{{ total }}</span>
            </div>
        </div>
    </div>
</template>

<script setup>
import { defineProps } from 'vue';

defineProps({
    color: {
        type: String,
        default: 'bg-light',
        required: true
    },
    title : {
        type: String,
        default: 'N/A',
        required: true
    },
    total : {
        type: Number,
        default: 0,
        required: true
    }
})
</script>

<style></style>