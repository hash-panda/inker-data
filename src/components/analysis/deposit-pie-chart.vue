<template>
  <a-spin :loading="loading" style="width: 100%">
    <a-card
      class="general-card"
      :header-style="{ paddingBottom: 0 }"
      title="组队信息"
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
            dimension: 0,
            color: ['#722ED1', '#D91AD9'],
            min: 0,
            max: 120,
          },
        ],
        title: [
          {
            top: '0%',
            left: 'center',
            text: '组队总存款金额趋势',
          },
          {
            top: '35%',
            left: 'center',
            text: '组队总数趋势',
          },
          {
            top: '70%',
            left: 'center',
            text: '组队参与人数趋势',
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
            name: '组队总存款金额(ust)',
            type: 'line',
            showSymbol: false,
            data: analysisParty.value?.partyTotalAmountList,
          },
          {
            name: '组队总数',
            type: 'line',
            showSymbol: false,
            data: analysisParty.value?.partyCountList,
            xAxisIndex: 1,
            yAxisIndex: 1,
          },
          {
            name: '组队参与人数',
            type: 'line',
            showSymbol: false,
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
