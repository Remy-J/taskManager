<template>
    <div ref="chartContainer"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import Highcharts from 'highcharts'

/**
 * @typedef {Object} ChartData
 * @property {string} name - Label for the data point
 * @property {number} value - Numeric value for the data point
 */
interface ChartData {
    name: string;
    value: number;
}

/**
 * @type {Object} Props
 * @property {('column'|'line'|'pie')} [type='column'] - Type of chart to display
 * @property {ChartData[]} data - Data to display in the chart
 * @property {string} [title] - Optional chart title
 */

const props = defineProps({
    type: {
        type: String,
        default: 'column',
        validator: (value: string) => ['column', 'bar', 'line', 'pie'].includes(value)
    },
    data: {
        type: Array as () => ChartData[],
        required: true
    },
    title: {
        type: String,
    }
})

const chartContainer = ref<HTMLElement | null>(null)
let chart: Highcharts.Chart | null = null

function getChartOptions(): Highcharts.Options {
    const baseOption: Highcharts.Options = {
        chart: {
            type: props.type as any,
            renderTo: chartContainer.value,
            height: '100%'
        },
        accessibility: {
            enabled: false
        },
        title: {
            text: props.title,
            style: {
                fontSize: '16px',
                fontWeight: 'bold',
                color: '#1e293b'
            }
        },
        credits: {
            enabled: false
        },
        colors: ['#6366f1', '#8b5cf6', '#a855f7', '#d946ef'],
        tooltip: {
            borderRadius: 8,
            backgroundColor: 'rgba(255, 255, 255, 0.96)',
            borderColor: '#e2e8f0',
            shadow: true
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                borderRadius: 4,
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>: {point.percentage:.1f} %'
                }
            },
            column: {
                borderRadius: 4,
                dataLabels: {
                    enabled: true,
                    style: {
                        fontWeight: 'normal',
                        textOutline: '0'
                    }
                }
            },
            series: {
                animation: {
                    duration: 1000
                }
            }
        }
    }

    if (props.type === 'pie') {
        return {
            ...baseOption,
            series: [{
                type: 'pie',
                name: props.title,
                data: props.data.map(item => ({
                    name: item.name,
                    y: item.value
                }))
            }]
        }
    }

    return {
        ...baseOption,
        xAxis: {
            categories: props.data.map(item => item.name),
            labels: {
                style: {
                    color: '#475569'
                },
                rotation: -45
            },
            crosshair: true
        },
        yAxis: {
            title: {
                text: null
            },
            min: 0,
            minInterval: 1,
            labels: {
                style: {
                    color: '#475569'
                }
            },
            gridLineColor: '#e2e8f0',
            gridLineDashStyle: 'Dash'
        },
        series: [{
            type: props.type as 'column' | 'line',
            name: props.title,
            data: props.data.map(item => item.value)
        }]
    }
}

function createChart() {
    if (!chartContainer.value) return
    chart = new Highcharts.Chart(getChartOptions())
}

function updateChart() {
    if (!chart) return
    chart.update(getChartOptions(), true, true)
}

onMounted(() => {
    createChart()
})

watch(() => props.data, () => {
    updateChart()
}, { deep: true })

watch(() => props.type, () => {
    updateChart()
})
</script>

