<template>
  <a-spin :loading="loading" style="width: 100%">
    <a-card
      class="general-card"
      :header-style="{ paddingBottom: 0 }"
      :body-style="{
        paddingTop: '20px',
      }"
      :title="$t('dashboard.chartTitle')"
    >
      <a-space direction="vertical" size="large" fill>
        <a-alert>{{ $t('dashboard.tips') }}</a-alert>
        <Chart height="400px" :option="chartOption" />
      </a-space>
    </a-card>
  </a-spin>
</template>

<script lang="ts">
import { defineComponent, toRef, watch } from 'vue';
import useLoading from '@/hooks/loading';
import { Chart1 } from '@/api/dashboard';
import useChartOption from '@/hooks/chart-option';

export default defineComponent({
  props: {
    chartData: {
      type: Object,
      default: {} as Chart1,
    },
  },
  setup(props) {
    const { loading, setLoading } = useLoading(true);
    const chartData = toRef(props, 'chartData');
    // const xAxis = ref<number[]>([]);
    // const chartsData = ref<number[]>([]);

    const { chartOption } = useChartOption(() => {
      return {
        color: ['#722ED1', '#D91AD9'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            crossStyle: {
              color: '#999',
            },
          },
        },
        legend: {
          data: ['Deposit(ust)', 'Players'],
          textStyle: { color: '#8D4EDA' },
        },
        xAxis: [
          {
            type: 'category',
            data: chartData.value.x,
            axisPointer: {
              type: 'shadow',
            },
          },
        ],
        yAxis: [
          {
            type: 'value',
            name: 'Deposit(ust)',
            min: 0,
            max: 500000,
            axisLabel: {
              formatter: '{value}',
            },
            splitLine: {
              show: true,
              lineStyle: {
                type: 'dashed',
                opacity: 0.3,
                color: '#ccc',
              },
            },
          },
          {
            type: 'value',
            name: 'Players',
            min: 0,
            max: 5000,
            axisLabel: {
              formatter: '{value}',
            },
            splitLine: {
              show: true,
              lineStyle: {
                type: 'dashed',
                opacity: 0.3,
                color: '#ccc',
              },
            },
          },
        ],
        series: [
          {
            name: 'Deposit(ust)',
            type: 'bar',

            data: chartData.value.amounts,
          },
          {
            name: 'Players',
            type: 'bar',
            yAxisIndex: 1,
            data: chartData.value.count,
          },
        ],
      };
    });

    watch(
      () => props.chartData,
      (newVal) => {
        /* eslint-disable no-console */
        console.log('current value', newVal);
        setLoading(false);
      }
    );

    return {
      loading,
      chartOption,
    };
  },
});
</script>

<style scoped lang="less"></style>
