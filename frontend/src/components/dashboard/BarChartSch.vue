<template>
    <div class="card border-0 shadow-sm rounded-4 bg-light">
        <h5 class="fw-bold ms-4 mt-4">Number of Activities by Schools</h5>
        <div class="card-body">
            <div class="card-content px-4">
                <canvas id="myCharrt" class="chartCanvas"></canvas>
            </div>
        </div>
    </div>
</template>

<script setup>
import { Chart } from 'chart.js/auto';
import { onMounted, watch, defineProps, ref } from 'vue';

const props = defineProps({
    activities: {
        type: Array,
        required: true
    }
})

// Track the current chart instance
let chartInstance = ref(null);

const createChart = () => {
    // Clear the previous chart instance if it exists
    if (chartInstance.value) {
        chartInstance.value.destroy();
    }

    const activityCounts = [
        'School of Agro Industry',
        'School of Applied Digital Technology',
        'School of Cosmetic Science',
        'School of Dentistry',
        'School of Health Science',
        'School of Laws',
        'School of Liberal Arts',
        'School of Management',
        'School of Medicine',
        'School of Nursing',
        'School of Sinology',
        'School of Public Health',
    ];

    const activityData = activityCounts.map(school => {
        const schoolActivities = props.activities.filter(activity => activity.school === school);
        return schoolActivities.length;
    });

    const ctx = document.getElementById('myCharrt');
    chartInstance.value = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: activityCounts,
            datasets: [{
                data: activityData,
                backgroundColor: '#FC9893',
                borderRadius: 5,
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 10,
                    stepSize: 2,
                    grid: {
                        display: true
                    },
                    ticks: {
                        display: true,
                        stepSize: 2,
                        maxTicksLimit: 6
                    },
                    border: {
                        display: false
                    }
                },
                x: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        display: true,
                        autoSkip: false,
                        maxRotation: 90,
                        minRotation: 90
                    },
                    border: {
                        display: false
                    }
                }
            },
            elements: {
                bar: {
                    categoryPercentage: 0.6,
                    barPercentage: 0.7
                }
            }
        },
    });
}

watch(() => props.activities, () => {
    if (props.activities.length > 0) {
        createChart();
    }
}, { immediate: true });

onMounted(() => {
    if (props.activities.length > 0) {
        createChart();
    }
});
</script>

<style scoped>
.chartCanvas {
    width: 100%;
    height: 600px;
}
</style>