import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useActivityFilterStore = defineStore('activityFilter', () => {
    const searchQuery = ref('');
    const selectedSch = ref('All');
    const selectedCate = ref('All');

    return { searchQuery, selectedSch , selectedCate };
});