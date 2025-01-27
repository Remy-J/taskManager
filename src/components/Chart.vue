<template>
    <div class="w-full h-[400px]">
        <v-chart class="w-full h-full" :option="chartOption" autoresize />
    </div>
</template>

<script setup lang="ts">
/**
 * Chart component using ECharts
 * @component
 * @description A flexible chart component that can display data in different formats (pie, bar, line)
 * 
 * @example
 * ```vue
 * <Chart 
 *   type="bar"
 *   :data="[{ name: 'Category 1', value: 10 }]"
 *   title="My Chart"
 * />
 * ```
 */
import { computed } from 'vue'
import VChart from 'vue-echarts'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { PieChart, BarChart, LineChart } from 'echarts/charts'
import {
    TitleComponent,
    TooltipComponent,
    LegendComponent,
    GridComponent
} from 'echarts/components'

use([
    CanvasRenderer,
    PieChart,
    BarChart,
    LineChart,
    TitleComponent,
    TooltipComponent,
    LegendComponent,
    GridComponent
])

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
 * @property {('bar'|'line'|'pie')} [type='bar'] - Type of chart to display
 * @property {ChartData[]} data - Data to display in the chart
 * @property {string} [title] - Optional chart title
 */
const props = defineProps({
    type: {
        type: String,
        default: 'bar',
        validator: (value: string) => ['bar', 'line', 'pie'].includes(value)
    },
    data: {
        type: Array as () => ChartData[],
        required: true
    },
    title: {
        type: String,
    }
})

const chartOption = computed(() => {
    const baseOption = {
        title: {
            text: props.title,
            left: 'center'
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            orient: 'horizontal',
            bottom: 10
        }
    }

    if (props.type === 'pie') {
        return {
            ...baseOption,
            tooltip: {
                trigger: 'item'
            },
            series: [{
                type: 'pie',
                radius: '50%',
                data: props.data
            }]
        }
    }

    return {
        ...baseOption,
        xAxis: {
            type: 'category',
            data: props.data.map(item => item.name)
        },
        yAxis: {
            type: 'value',
            minInterval: 1,
            axisLabel: {
                formatter: '{value}'
            }
        },
        series: [{
            type: props.type,
            data: props.data.map(item => item.value)
        }]
    }
})
</script>