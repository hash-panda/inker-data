<template>
  <a-spin :loading="loading" style="width: 100%">
    <a-card
      class="general-card"
      :header-style="{ paddingBottom: 0 }"
      title="队伍信息"
    >
      <a-space direction="vertical" size="large" fill>
        <Chart height="700px" :option="chartOption" />
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
            max: 3000000,
          },
          {
            show: false,
            type: 'continuous',
            seriesIndex: 1,
            dimension: 0,
            color: ['#722ED1', '#D91AD9'],
            min: 0,
            max: analysisParty.value?.createTimeList.length ?? 1 - 1,
          },
        ],
        title: [
          {
            left: 'center',
            text: '队伍总存款金额趋势',
          },
          {
            top: '55%',
            left: 'center',
            text: '队伍总数和参与人数趋势',
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
        ],
        grid: [
          {
            bottom: '60%',
          },
          {
            top: '60%',
          },
        ],
        series: [
          {
            name: '队伍总存款金额(ust)',
            type: 'line',
            showSymbol: false,
            data: analysisParty.value?.partyTotalAmountList,
          },
          {
            name: '队伍总数',
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
            xAxisIndex: 1,
            yAxisIndex: 1,
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
