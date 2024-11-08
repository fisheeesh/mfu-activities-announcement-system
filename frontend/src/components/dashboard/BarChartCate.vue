<template>
    <div class="card border-0 shadow-sm rounded-4 bg-light">
        <h5 class="fw-bold ms-4 mt-4">Number of Activities by Categories</h5>
        <div class="card-body d-flex flex-column justify-content-center align-items-center">
            <canvas id="myChartt" class="chartCanvas"></canvas>
        </div>
    </div>
</template>

<script setup>
import { Chart } from 'chart.js/auto';
import { onMounted } from 'vue';

onMounted(() => {
    const ctx = document.getElementById('myChartt');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['University', 'School', 'Major', 'Free'],
            datasets: [{
                data: [6.5, 9.5, 7.1, 10],
                backgroundColor: [
                    '#95A4FB',
                    '#BAECBD',
                    '#FEC002',
                    '#B1E2FE'
                ],
                borderRadius: 5, // Set border-radius for rounded corners
                barThickness: 50 // Adjust the bar width
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
                    grid: {
                        display: true // Show y-axis gridlines
                    },
                    ticks: {
                        display: true, // Display y-axis ticks
                        stepSize: 2,   // Set the step size for y-axis ticks (0, 2, 4, 6, 8, 10)
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
        },
    });
})


</script>

<style scoped>
.chartCanvas {
    height: 237px !important;
}
</style>