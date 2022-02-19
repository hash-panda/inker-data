<template>
  <a-spin :loading="loading" style="width: 100%">
    <a-card
      class="general-card"
      :header-style="{ paddingBottom: 0 }"
      title="存款总金额趋势"
    >
      <a-space direction="vertical" size="large" fill>
        <Chart height="300px" :option="chartOption" />
      </a-space>
    </a-card>
  </a-spin>
</template>

<script lang="ts">
import { defineComponent, onMounted, watch, computed } from 'vue';
import useLoading from '@/hooks/loading';
import { Chart1 } from '@/api/dashboard';
import useChartOption from '@/hooks/chart-option';
import { useAnalysisState } from '@/store';

export default defineComponent({
  setup() {
    const { loading, setLoading } = useLoading(true);
    const analysisState = useAnalysisState();
    // const xAxis = ref<number[]>([]);
    // const chartsData = ref<number[]>([]);

    onMounted(() => {
      analysisState.getAnalysisTotalDepositInfo();
    });

    watch(
      () => analysisState.analysisTotalDeposit,
      (newVal) => {
        setLoading(false);
      }
    );

    const analysisTotalDeposit = computed(() => {
      return {
        createTimeList: analysisState.analysisTotalDeposit.map(function (item) {
          return item.create;
        }),
        amountList: analysisState.analysisTotalDeposit.map(function (item) {
          return item.amount;
        }),
      };
    });

    const { chartOption } = useChartOption((isDark) => {
      return {
        visualMap: [
          {
            show: false,
            type: 'continuous',
            seriesIndex: 0,
            color: ['#722ED1', '#D91AD9'],
            min: 0,
            max: 100000,
          },
        ],
        tooltip: { trigger: 'axis' },
        xAxis: [
          {
            data: analysisTotalDeposit.value?.createTimeList,
          },
        ],
        yAxis: [
          {
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
        grid: [
          {
            bottom: '10%',
          },
          {
            top: '1%',
          },
        ],
        series: [
          {
            name: '存款总金额(ust)',
            type: 'line',
            showSymbol: false,
            data: analysisTotalDeposit.value?.amountList,
          },
        ],
      };
    });

    return {
      loading,
      chartOption,
    };
  },
});
</script>

<style scoped lang="less"></style>
