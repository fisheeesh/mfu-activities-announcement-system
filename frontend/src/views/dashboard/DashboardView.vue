<template>
  <section class="dashboard">
    <div v-if="loading" class="text-center mt-6 py-7">
      <ScaleLoader :color="'#BA1E23'" />
    </div>
    <div v-else v class="container">
      <div class="row">
        <div class="col-12 d-flex flex-column justify-content-center align-items-center mt-6">
          <div class="image-container">
            <img src="../../assets/images/dashboard_placeholder.png" class="img-fluid" alt="">
          </div>
          <div class="text-container">
            <h2 class="fw-bold fst-italic">We will implement the dashboard soon</h2>
          </div>
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
