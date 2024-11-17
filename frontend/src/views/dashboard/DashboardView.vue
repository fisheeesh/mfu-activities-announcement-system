<template>
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
            <button id="dropdownBtn" class="btn btn-light border border-1 dropdown-toggle" type="button"
              data-bs-toggle="dropdown" aria-expanded="false">
              2567/1
            </button>
            <ul class="dropdown-menu">
              <li style="cursor: pointer;" v-for="(semester, index) in semesters" :key="index"><span @click="filteredSemester(semester)"
                  class="dropdown-item" href="#">{{ semester }}</span></li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Second Row -->
      <div class="row mt-1 mb-4">
        <div class="col-lg-2 mb-4">
          <div v-if="currentSemester === '2567/1'" class="vstack gap-2">
            <Card to="/admin/upcoming" :total="firstUpcoming.length" :color="'#DEDFFD'" title="Upcoming" />
            <Card to="/admin/ongoing" :total="firstOngoing.length" :color="'#CCFFB5'" title="Ongoing" />
            <Card to="/admin/history" :total="firstCompleted.length" :color="'#FFC5C2'" title="Completed" />
          </div>
          <div v-else class="vstack gap-2">
            <Card to="/admin/upcoming" :total="secondUpcoming.length" :color="'#DEDFFD'" title="Upcoming" />
            <Card to="/admin/ongoing" :total="secondOngoing.length" :color="'#CCFFB5'" title="Ongoing" />
            <Card to="/admin/history" :total="secondCompleted.length" :color="'#FFC5C2'" title="Completed" />
          </div>
        </div>
        <div class="col-lg-4 mb-4">
          <div v-if="currentSemester === '2567/1'">
            <DoughnutChart :activities="firstSemester" />
          </div>
          <div v-else>
            <DoughnutChart :activities="secondSemester" />
          </div>
        </div>
        <div class="col-lg-6">
          <div v-if="currentSemester === '2567/1'">
            <BarChartCate :activities="firstSemester" />
          </div>
          <div v-else>
            <BarChartCate :activities="secondSemester" />
          </div>
        </div>
      </div>

      <!-- Third Row -->
      <div class="row">
        <div class="col-12">
          <div v-if="currentSemester === '2567/1'">
            <BarChartSch :activities="firstSemester" />
          </div>
          <div v-else>
            <BarChartSch :activities="secondSemester" />
          </div>
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
import getActivities from '@/composables/controller/getActivities';
import { isBefore, isAfter } from 'date-fns';
import { computed, onMounted, ref, watch } from 'vue';
import ScaleLoader from 'vue-spinner/src/ScaleLoader.vue';

let loading = ref(true)

const { error, activities, load } = getActivities()

const firstSemester = ref([])
const secondSemester = ref([])
const currentSemester = ref('2567/1')

const semesters = ref(['2567/1', '2567/2'])

onMounted(() => {
  setTimeout(() => loading.value = false, 1200)
  load()
})

watch(activities, () => {
  firstSemester.value = activities.value.filter(activity =>
    isAfter(new Date(activity.date), new Date("2024-08-05")) &&
    isBefore(new Date(activity.date), new Date("2024-12-20"))
  )
  secondSemester.value = activities.value.filter(activity =>
    !(isAfter(new Date(activity.date), new Date("2024-08-05")) &&
      isBefore(new Date(activity.date), new Date("2024-12-20")))
  )
})

const filteredSemester = (semester) => {
  currentSemester.value = semester
  document.getElementById('dropdownBtn').textContent = semester;
  console.log(currentSemester.value)
}

const firstUpcoming = computed(() => firstSemester.value.filter(activity => activity.type === 'upcoming'))
const firstOngoing = computed(() => firstSemester.value.filter(activity => activity.type === 'ongoing'))
const firstCompleted = computed(() => firstSemester.value.filter(activity => activity.type === 'completed'))

const secondUpcoming = computed(() => secondSemester.value.filter(activity => activity.type === 'upcoming'))
const secondOngoing = computed(() => secondSemester.value.filter(activity => activity.type === 'ongoing'))
const secondCompleted = computed(() => secondSemester.value.filter(activity => activity.type === 'completed'))
</script>
