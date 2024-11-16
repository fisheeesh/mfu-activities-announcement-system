<template>
    <div class="card border-0 shadow-sm rounded-4 bg-light">
        <h5 class="fw-bold ms-4 mt-4">Activity Category</h5>
        <div class="card-body d-flex justify-content-center align-items-center" style="padding: 44px 15px">
            <div class="chart-container">
                <canvas id="myChart" class="chartCanvas"></canvas>
            </div>
            <div class="legend-container ms-3 d-flex">
                <!-- Labels List -->
                <ul id="chartLabels" class="chart-legend chart-labels"></ul>
                <!-- Percentages List -->
                <ul id="chartPercentages" class="chart-legend chart-percentages ms-3"></ul>
            </div>
        </div>
    </div>
</template>

<script setup>
import { Chart } from 'chart.js/auto';
import { onMounted, watch, ref } from 'vue';

const props = defineProps({
    activities: Array,
});

const chartData = ref(null);

const prepareChartData = () => {
    const labels = ['University', 'School', 'Major', 'Other'];
    const data = [
        props.activities.filter(activity => activity.category === 'University').length,
        props.activities.filter(activity => activity.category === 'School').length,
        props.activities.filter(activity => activity.category === 'Major').length,
        props.activities.filter(activity => activity.category === 'Other').length,
    ];

    return {
        labels: labels,
        datasets: [{
            label: 'Activity Type',
            data: data,
            backgroundColor: [
                '#A8C5D9',
                '#1F1F20',
                '#A1E2CB',
                '#B1E2FE',
            ],
            hoverOffset: 4,
            borderRadius: 5
        }]
    };
};

onMounted(() => {
    const ctx = document.getElementById('myChart').getContext('2d');
    chartData.value = prepareChartData();

    new Chart(ctx, {
        type: 'doughnut',
        data: chartData.value,
        options: {
            plugins: {
                legend: {
                    display: false,
                },
                tooltip: {
                    callbacks: {
                        label: (tooltipItem) => {
                            const dataset = tooltipItem.dataset;
                            const total = dataset.data.reduce((a, b) => a + b, 0);
                            const currentValue = dataset.data[tooltipItem.dataIndex];
                            const percentage = ((currentValue / total) * 100).toFixed(2);
                            return `${tooltipItem.label}: ${percentage}%`;
                        }
                    }
                }
            }
        }
    });

    // Custom Legends with Separate Labels and Percentages
    const labelsContainer = document.getElementById('chartLabels');
    const percentagesContainer = document.getElementById('chartPercentages');
    const totalData = chartData.value.datasets[0].data.reduce((a, b) => a + b, 0);

    chartData.value.labels.forEach((label, index) => {
        const percentage = ((chartData.value.datasets[0].data[index] / totalData) * 100).toFixed(1);

        // Create label item
        const labelItem = document.createElement('li');
        labelItem.innerHTML = `
      <i class="fas fa-circle me-2" style="color: ${chartData.value.datasets[0].backgroundColor[index]}; font-size: 8px;"></i>
      ${label}
    `;
        labelsContainer.appendChild(labelItem);

        // Create percentage item
        const percentageItem = document.createElement('li');
        percentageItem.textContent = `${percentage}%`;
        percentagesContainer.appendChild(percentageItem);
    });
});

// Watch for changes to activities and update chart
watch(() => props.activities, () => {
    chartData.value = prepareChartData();
}, { immediate: true });

</script>

<style scoped>
.chartCanvas {
    width: 180px !important;
    height: 180px !important;
}

.chart-legend {
    list-style: none;
    padding: 0;
    margin: 0;
}

.chart-labels,
.chart-percentages {
    display: flex;
    flex-direction: column;
}

.chart-labels li,
.chart-percentages li {
    margin-bottom: 8px;
    font-size: 12px !important;
}

@media (min-width: 992px) and (max-width: 1200px) {
    .chartCanvas {
        width: 100px !important;
        height: 100px !important;
    }

    .chart-labels li,
    .chart-percentages li {
        margin-bottom: 4px !important;
        font-size: 6px !important;
    }

    .card-body {
        display: flex !important;
        flex-direction: column !important;
        align-items: center;
        padding: 27px 20px !important;
    }

    .legend-container {
        margin-top: 20px !important;
    }
}

@media (min-width: 1201px) and (max-width: 1400px) {
    .chartCanvas {
        width: 150px !important;
        height: 150px !important;
    }

    .chart-labels li,
    .chart-percentages li {
        font-size: 6px !important;
    }

    .card-body {
        padding: 59.7px 10px !important;
    }
}
</style>