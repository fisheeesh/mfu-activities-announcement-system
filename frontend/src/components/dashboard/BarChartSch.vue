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
import { onMounted } from 'vue';

onMounted(() => {
    const ctx = document.getElementById('myCharrt');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: [
                'School of Agro Industry',
                'School of Anti-aging Regenerative Medicine',
                'School of Cosmetic Science', 'School of Dentistry',
                'School of Health Science',
                'School of Applied Digital Technology',
                'School of Integrated Medicine',
                'School of Laws',
                'School of Liberal Arts',
                'School of Management',
                'School of Medicine',
                'School of Nursing',
                'School of Science',
                'School of Sinology',
                'School of Social Innovation'
            ],
            datasets: [{
                data: [5.6, 9.4, 7.1, 4.3, 5.9, 7.9, 5.7, 9.3, 5.4, 7.6, 4, 6, 5.5, 4.9, 5.2],
                backgroundColor: [
                    '#FC9893',
                    '#FC9893',
                    '#FC9893',
                    '#FC9893',
                    '#FC9893',
                    '#FC9893',
                    '#FC9893',
                    '#FC9893',
                    '#FC9893',
                    '#FC9893',
                    '#FC9893',
                    '#FC9893',
                    '#FC9893',
                    '#FC9893',
                ],
                borderRadius: 5, // Set border-radius for rounded corners
            }]
        },
        options: {
            responsive: true, // Make the chart responsive
            maintainAspectRatio: false, // Allow chart to resize based on container size
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
                        maxRotation: 90, // Rotate labels to 90 degrees
                        minRotation: 90  // Set the minimum rotation to 90 degrees
                    },
                    border: {
                        display: false // Remove the x-axis line
                    }
                }
            },
            elements: {
                bar: {
                    categoryPercentage: 0.6, // Control the space between bars (less than 1 for more space)
                    barPercentage: 0.7 // Control the width of the bars (less than 1 for thinner bars)
                }
            }
        },
    });
})
</script>

<style scoped>
.chartCanvas {
    width: 100%;
    height: 600px;
    /* Set a fixed height or use a responsive approach */
}
</style>