<template>
  <a-spin :loading="loading" style="width: 100%">
    <a-card
      class="general-card"
      :header-style="{ paddingBottom: 0 }"
      :title="$t('analysis.chart.totalDepositChart.title')"
    >
      <a-space direction="vertical" size="large" fill>
        <Chart height="280px" :option="chartOption" />
      </a-space>
    </a-card>
  </a-spin>
</template>

<script lang="ts">
import { defineComponent, onMounted, watch, computed } from 'vue';
import useLoading from '@/hooks/loading';
import { useI18n } from 'vue-i18n';
import useChartOption from '@/hooks/chart-option';
import { useAnalysisState } from '@/store';

export default defineComponent({
  setup() {
    const { t } = useI18n();
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
            top: '5%',
            bottom: '13%',
          },
        ],
        series: [
          {
            name: t('analysis.chart.totalDepositChart.name.playersCount'),
            type: 'line',
            showSymbol: false,
            areaStyle: {},
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
