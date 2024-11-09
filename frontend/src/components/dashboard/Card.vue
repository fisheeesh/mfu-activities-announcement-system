<template>
    <router-link :to="to">
        <div class="card border-0 rounded-4" :style="{ 'background-color': color }">
            <div class="card-body">
                <div class="card-content d-flex flex-column pt-2">
                    <h6 class="fw-bold">{{ title }}</h6>
                    <span class="fw-bold fs-4">{{ total }}</span>
                </div>
            </div>
        </div>
    </router-link>
</template>

<script setup>
import { defineProps } from 'vue';

defineProps({
    to :{ 
        type: String,
        default: '#',
        required: true
    },
    color: {
        type: String,
        default: 'bg-light',
        required: true
    },
    title: {
        type: String,
        default: 'N/A',
        required: true
    },
    total: {
        type: Number,
        default: 0,
        required: true
    }
})
</script>

<style scoped>
a{
    text-decoration: none !important;
}
.card:hover {
    cursor: pointer;
    transform: scale(1.03);
    transition: transform 0.3s ease-in-out;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.1) !important;
}
</style>