<template>
  <Navbar/>
  <section class="dashboard">
    <div v-if="loading" class="text-center mt-5 py-7">
      <ScaleLoader :color="'#BA1E23'" />
    </div>
    <div v-else v class="container">
      <!-- <div class="container"> -->
      <!-- OverView Row -->
      <div class="row mt-3 mb-3">
        <div class="col-12 d-flex justify-content-between align-items-center">
          <h4 class="fw-bold">Overview</h4>
          <div class="dropdown">
            <button class="btn btn-light border border-1 dropdown-toggle" type="button" data-bs-toggle="dropdown"
              aria-expanded="false">
              2567/1
            </button>
            <ul class="dropdown-menu">
              <li><span class="dropdown-item" href="#">Action</span></li>
              <li><span class="dropdown-item" href="#">Another action</span></li>
              <li><span class="dropdown-item" href="#">Something else here</span></li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Second Row -->
      <div class="row mt-1 mb-4">
        <div class="col-lg-2 mb-4">
          <div class="vstack gap-2">
            <Card to="/admin/upcoming" :total="upcoming.length" :color="'#ECECFD'" title="Upcoming" />
            <Card to="/admin/ongoing" :total="ongoing.length" :color="'#E6FFD1'" title="Ongoing" />
            <Card to="/admin/history" :total="completed.length" :color="'#FFEFEF'" title="Completed" />
          </div>
        </div>
        <div class="col-lg-4 mb-4">
          <DoughnutChart />
        </div>
        <div class="col-lg-6">
          <BarChartCate />
        </div>
      </div>

      <!-- Third Row -->
      <div class="row">
        <div class="col-12">
          <BarChartSch />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import BarChartCate from '@/components/dashboard/BarChartCate.vue';
import BarChartSch from '@/components/dashboard/BarChartSch.vue';
import Card from '@/components/dashboard/Card.vue';
import DoughnutChart from '@/components/dashboard/DoughnutChart.vue';
import Navbar from '@/components/navbar/Navbar.vue';
import getActivities from '@/composables/controller/getActivities';
import { computed, onMounted, ref } from 'vue';
import ScaleLoader from 'vue-spinner/src/ScaleLoader.vue';

let loading = ref(true)

onMounted(() => setTimeout(() => loading.value = false, 1000))

const { error, activities, load } = getActivities()

load()

const upcoming = computed(() => activities.value.filter(activity => activity.type === 'upcoming'))
const ongoing = computed(() => activities.value.filter(activity => activity.type === 'ongoing'))
const completed = computed(() => activities.value.filter(activity => activity.type === 'completed'))

console.log(activities.length)



</script>
