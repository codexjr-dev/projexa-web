<template>
  <div class="chart-container">
    <canvas ref="chartCanvas"></canvas>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { Chart, registerables } from 'chart.js'
Chart.register(...registerables)

const props = defineProps(['labels', 'datasets'])

const chartCanvas = ref(null)
let chartInstance = null

function renderChart() {
  if (!chartCanvas.value) return
  if (chartInstance) chartInstance.destroy()

  chartInstance = new Chart(chartCanvas.value, {
    type: 'bar',
    data: {
      labels: props.labels,
      datasets: props.datasets
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { position: 'top' },
        title: { display: true, text: 'Acompanhamento financeiro' }
      },
      scales: { y: { beginAtZero: true } }
    }
  })
}

onMounted(() => renderChart())

watch([() => props.labels, () => props.data], () => renderChart(), { deep: true })
</script>

<style scoped>
.chart-container {
  width: 100%;
  max-width: 900px;
  height: 500px;
  margin: 30px auto;
}
</style>
