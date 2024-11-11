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
import { onMounted, watchEffect, defineProps } from 'vue';

const props = defineProps({
    activities: {
        type: Array,
        required: true
    }
})

// Use a watchEffect to react to the activities change
onMounted(() => {
    watchEffect(() => {
        if (props.activities.length > 0) {
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


            const activityData = activityCounts.map(school => {
                const schoolActivities = props.activities.filter(activity => activity.school === school);
                return schoolActivities.length;
            });

            const ctx = document.getElementById('myCharrt');
            new Chart(ctx, {
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
})
</script>

<style scoped>
.chartCanvas {
    width: 100%;
    height: 600px;
}
</style>