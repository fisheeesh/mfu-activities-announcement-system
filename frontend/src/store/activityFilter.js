import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useActivityFilterStore = defineStore('activityFilter', () => {
    const searchQuery = ref('');
    /**
     * * We set 'All' as defualt cus we dun want All as a part of activities' school
     * * All for only show all the activites in our API has
     */
    const selectedSch = ref('All');
    const selectedCate = ref('All');

    return { searchQuery, selectedSch , selectedCate };
});