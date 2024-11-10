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
import getActivities from '@/composables/controller/getActivities';
import { Chart } from 'chart.js/auto';
import { onMounted, watchEffect } from 'vue';

// Load activities and check when the data is available
const { error, activities, load } = getActivities();

// Fetch activities data when the component is mounted
onMounted(() => {
    load(); // Ensure that activities are fetched when the component mounts
});

// Use a watchEffect to react to the activities change
watchEffect(() => {
    if (activities.value.length > 0) {
        // Map data to get the number of activities per school
        const activityCounts = [
            'School of Agro Industry',
            'School of Anti-aging Regenerative Medicine',
            'School of Cosmetic Science',
            'School of Dentistry',
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
        ];

        // Initialize a count for each school (assuming activities.value is an array of activity objects)
        const activityData = activityCounts.map(school => {
            // Filter activities for each school and count them
            const schoolActivities = activities.value.filter(activity => activity.school === school);
            return schoolActivities.length;  // Number of activities for this school
        });

        // Proceed to render the chart
        const ctx = document.getElementById('myCharrt');
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: activityCounts,  // Use the school names as labels
                datasets: [{
                    data: activityData,  // Use the number of activities per school
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
                        max: 10,  // Set a fixed maximum value for the y-axis
                        stepSize: 2,  // Step size for y-axis ticks (0, 2, 4, 6, 8, 10)
                        grid: {
                            display: true
                        },
                        ticks: {
                            display: true,
                            stepSize: 2,  // Ensure y-axis increments by 2
                            maxTicksLimit: 6  // Ensure there are no too many ticks
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
});
</script>

<style scoped>
.chartCanvas {
    width: 100%;
    height: 600px;
}
</style>