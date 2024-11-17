<template>
    <div class="card border-0 shadow-sm rounded-4 bg-light">
        <h5 class="fw-bold ms-4 mt-4">Number of Activities by Categories</h5>
        <div class="card-body d-flex flex-column justify-content-center align-items-center">
            <canvas id="Chartt" class="chartCanvas"></canvas>
        </div>
    </div>
</template>

<script setup>
import { Chart } from 'chart.js/auto';
import { onMounted, defineProps, ref, watch, nextTick } from 'vue';

const props = defineProps({
    activities: {
        type: Array,
        required: true
    }
})

let chartInstance = ref(null);

const createChart = () => {
    if (chartInstance.value) {
        chartInstance.value.destroy();
    }

    const categoryCounts = ['University', 'Major', 'School', 'Other'];
    const categoryData = categoryCounts.map(category => {
        const categoryActivities = props.activities.filter(activity => activity.category === category);
        return categoryActivities.length;
    });

    nextTick(() => {
        const ctx = document.getElementById('Chartt');
        if (ctx) {
            chartInstance.value = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: categoryCounts,
                    datasets: [{
                        data: categoryData,
                        backgroundColor: [
                            '#95A4FB',
                            '#FC9893',
                            '#A6E0FE',
                            '#8EE193',
                        ],
                        borderRadius: 5,
                        barThickness: 50
                    }]
                },
                options: {
                    plugins: {
                        legend: {
                            display: false
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            min: 0,  // Set minimum value to 0
                            max: 10, // Set maximum value to 10
                            stepSize: 2, // Set step size to 2
                            grid: {
                                display: true // Show y-axis gridlines
                            },
                            ticks: {
                                display: true, // Display y-axis ticks
                                stepSize: 2,   // Set step size for y-axis ticks
                                min: 0,        // Ensure the ticks start at 0
                                max: 10,       // Ensure the ticks go up to 10
                                maxTicksLimit: 6 // Limit the number of ticks to 6
                            },
                            border: {
                                display: false // Remove the y-axis line
                            }
                        },
                        x: {
                            grid: {
                                display: false // Hide x-axis gridlines
                            },
                            ticks: {
                                display: true, // Ensure x-axis ticks (labels) are displayed
                                autoSkip: false, // Ensure all labels are shown without skipping
                            },
                            border: {
                                display: false // Remove the x-axis line
                            }
                        }
                    }
                }
            });
        }
    });
};

watch(() => props.activities, () => {
    if (props.activities.length > 0) {
        createChart();
    }
}, { immediate: true });

// onMounted(() => {
//     if (props.activities.length > 0) {
//         createChart();
//     }
// });
</script>

<style scoped>
.chartCanvas {
    height: 237.25px !important;
}
</style>