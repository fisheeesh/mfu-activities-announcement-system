<template>
  <section class="dashboard">
    <div v-if="loading" class="text-center mt-5 py-7">
      <ScaleLoader :color="'#BA1E23'" />
    </div>
    <div v-else v class="container">
      <div class="row">
        <div class="col-12 d-flex flex-column justify-content-center align-items-center mt-6">
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import ScaleLoader from 'vue-spinner/src/ScaleLoader.vue';

let loading = ref(true)

onMounted(() => setTimeout(() => loading.value = false, 1000))

</script>
