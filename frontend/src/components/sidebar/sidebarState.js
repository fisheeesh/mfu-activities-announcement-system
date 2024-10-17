import { computed, ref } from "vue";

export const collapsed = ref(false)

export const toggleSidebar = () => collapsed.value = !collapsed.value

export const SIDE_BAR_WIDTH = 285

export const SIDE_BAR_WIDTH_COLLAPSED = 70

export const sidebarWidth = computed(() => `${ collapsed.value ? SIDE_BAR_WIDTH_COLLAPSED : SIDE_BAR_WIDTH}px`)