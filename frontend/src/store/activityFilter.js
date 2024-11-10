import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useActivityFilterStore = defineStore('activityFilter', () => {
    const searchQuery = ref('');
    const selectedSch = ref('All');

    return { searchQuery, selectedSch };
});