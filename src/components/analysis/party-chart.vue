<template>
  <a-spin :loading="loading" style="width: 100%">
    <a-card
      class="general-card"
      :header-style="{ paddingBottom: 0 }"
      :title="$t('analysis.chart.partyChart.title')"
    >
      <a-space direction="vertical" size="large" fill>
        <Chart height="800px" :option="chartOption" />
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
      analysisState.getAnalysisPartyInfo();
    });

    watch(
      () => analysisState.analysisParty,
      (newVal) => {
        setLoading(false);
      }
    );

    const analysisParty = computed(() => {
      return {
        createTimeList: analysisState.analysisParty.map(function (item) {
          return item.create;
        }),
        partyTotalAmountList: analysisState.analysisParty.map(function (item) {
          return item.partyTotalAmount;
        }),
        partyPlayersCountList: analysisState.analysisParty.map(function (item) {
          return item.partyPlayersCount;
        }),
        partyCountList: analysisState.analysisParty.map(function (item) {
          return item.partyCount;
        }),
      };
    });
    console.log(analysisState.analysisParty);

    const { chartOption } = useChartOption((isDark) => {
      return {
        visualMap: [
          {
            show: false,
            type: 'continuous',
            seriesIndex: 0,
            color: ['#722ED1', '#D91AD9'],
            min: 0,
            max: 500000,
          },
          {
            show: false,
            type: 'continuous',
            seriesIndex: 1,
            color: ['#722ED1', '#D91AD9'],
            min: 0,
            max: 150,
          },
          {
            show: false,
            type: 'continuous',
            seriesIndex: 2,
            color: ['#722ED1', '#D91AD9'],
            min: 0,
            max: 1500,
          },
        ],
        title: [
          {
            top: '0%',
            left: 'center',
            text: t(
              'analysis.chart.partyChart.chartTitle.partyTotalAmountTrends'
            ),
          },
          {
            top: '35%',
            left: 'center',
            text: t('analysis.chart.partyChart.chartTitle.partyCountTrends'),
          },
          {
            top: '70%',
            left: 'center',
            text: t('analysis.chart.partyChart.chartTitle.partyMemberTrends'),
          },
        ],
        tooltip: { trigger: 'axis' },
        xAxis: [
          {
            data: analysisParty.value?.createTimeList,
          },
          {
            data: analysisParty.value?.createTimeList,
            gridIndex: 1,
          },
          {
            data: analysisParty.value?.createTimeList,
            gridIndex: 2,
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
          {
            gridIndex: 1,
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
            gridIndex: 2,
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
            bottom: '70%',
          },
          {
            top: '40%',
            bottom: '36%',
          },
          {
            top: '75%',
            bottom: '5%',
          },
        ],
        series: [
          {
            name: t('analysis.chart.partyChart.chartName.partyTotalAmount'),
            type: 'line',
            showSymbol: false,
            areaStyle: {},
            data: analysisParty.value?.partyTotalAmountList,
          },
          {
            name: t('analysis.chart.partyChart.chartName.partyCount'),
            type: 'line',
            showSymbol: false,
            areaStyle: {},
            data: analysisParty.value?.partyCountList,
            xAxisIndex: 1,
            yAxisIndex: 1,
          },
          {
            name: t('analysis.chart.partyChart.chartName.partyMember'),
            type: 'line',
            showSymbol: false,
            areaStyle: {},
            data: analysisParty.value?.partyPlayersCountList,
            xAxisIndex: 2,
            yAxisIndex: 2,
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
