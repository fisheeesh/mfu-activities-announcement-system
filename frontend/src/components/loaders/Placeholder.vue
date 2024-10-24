<template>
    <div v-for="i in loops" :key="i">
        <div class="card mb-3 ps-2 w-100 border-0 shadow-sm">
            <div class="card-body">
                <h2 class="card-title placeholder-glow">
                    <span class="placeholder col-5"></span>
                </h2>
                <p class="d-flex gap-2 card-text placeholder-glow">
                    <span class="placeholder col-2"></span>
                    <span class="placeholder col-2"></span>
                </p>
            </div>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue';

export default {
    setup(){
        let loops = ref([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])

        return { loops }
    }
}
</script>

<style></style>