<template>
  <a-spin :loading="loading" style="width: 100%">
    <a-card :title="$t('dashboard.prizeInfo.title')" class="general-card">
      <a-row>
        <a-col class="panel-col" :span="18">
          <a-space direction="vertical" size="large" fill>
            <Chart height="250px" :option="chartOption" /> </a-space
        ></a-col>
        <a-col class="panel-col" :span="6">
          <a-row
            v-for="item in amountDataPanel"
            :key="item.key"
            style="padding-top: 16px"
          >
            <a-col
              v-for="v in item.col"
              :key="v.key"
              class="panel-col"
              :span="v.span"
            >
              <a-space>
                <a-avatar :size="54" class="col-avatar">
                  <img alt="avatar" :src="v.icon" />
                </a-avatar>
                <a-statistic
                  :value="v.value"
                  :precision="v.precision"
                  :value-from="0"
                  animation
                  show-group-separator
                >
                  <template #title>
                    {{ v.title }}
                    <a-tooltip
                      v-if="v.tips"
                      :content="v.tips"
                      background-color="#722ED1"
                      ><icon-info-circle :style="{ color: '#722ED1' }"
                    /></a-tooltip>
                  </template>
                  <template #suffix>
                    <span class="unit">ust</span>
                  </template>
                </a-statistic>
              </a-space>
            </a-col>
          </a-row>
        </a-col>
      </a-row>
    </a-card>
  </a-spin>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import useLoading from '@/hooks/loading';
import { useI18n } from 'vue-i18n';
import amountIcon from '@/assets/images/amount-icon.png';
import totalAmountIcon from '@/assets/images/total-amount-icon.png';
import useChartOption from '@/hooks/chart-option';
import { useWinnersState } from '@/store';
import { queryStrategy } from '@/api/winners';
import { getActualAmount } from '@/utils';

export default defineComponent({
  setup() {
    const { loading, setLoading } = useLoading(false);
    const winnersState = useWinnersState();
    const { t } = useI18n();

    const fetchData = async () => {
      const strategy = await queryStrategy();
      winnersState.getCurrentPrizeAmount(
        getActualAmount(strategy.data.result.total_deposit.amount)
      );
      const currentRound = strategy.data.result.round;
      winnersState.getWinnersInfo(1, currentRound);
    };
    fetchData();

    const chartInfo = computed(() => {
      return {
        x: winnersState.prizes.map(function (item) {
          return item.round;
        }),
        y: winnersState.prizes.map(function (item) {
          return item.prize;
        }),
      };
    });

    const totalPrizeAmount = computed(() => {
      return chartInfo.value.y.reduce((prev, next) => {
        return prev + next;
      }, 0);
    });

    const amountDataPanel = computed(() => {
      return [
        {
          key: 'row1',
          col: [
            {
              key: 1,
              span: 24,
              icon: amountIcon,
              title: t('dashboard.prizeInfo.currentPrizeAmount'),
              value: winnersState.currentTotalPrizeAmount,
              precision: 2,
              suffix: 'ust',
              tips: '',
            },
            {
              key: 2,
              span: 24,
              icon: totalAmountIcon,
              title: t('dashboard.prizeInfo.totalPrizeAmount'),
              value: totalPrizeAmount.value,
              precision: 2,
              suffix: 'ust',
              tips: '',
            },
          ],
        },
      ];
    });

    const { chartOption } = useChartOption(() => {
      return {
        color: ['#D91AD9'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
          },
        },
        grid: {
          top: '3%',
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true,
        },
        xAxis: [
          {
            type: 'category',
            data: chartInfo.value.x,
            axisTick: {
              alignWithLabel: true,
            },
          },
        ],
        yAxis: [
          {
            type: 'value',
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
            name: t('dashboard.prizeInfo.name'),
            type: 'bar',
            barWidth: '60%',
            data: chartInfo.value.y,
          },
        ],
      } as any;
    });

    return {
      totalPrizeAmount,
      amountDataPanel,
      amountIcon,
      totalAmountIcon,
      loading,
      chartOption,
    };
  },
});
</script>

<style lang="less" scoped>
.arco-col.panel {
  margin-bottom: 0;
  padding: 16px 20px 5px 20px;
}
.panel-col {
  //   border-right: 1px solid rgb(var(--gray-2));
  border: none;
  &:first-child {
    // padding-top: 16px;
  }
  &:last-child {
    padding-top: 16px;
  }
}
.col-avatar {
  margin-right: 12px;
  background-color: var(--color-fill-2);
}
.up-icon {
  color: rgb(var(--red-6));
}
.unit {
  margin-left: 8px;
  color: rgb(var(--gray-8));
  font-size: 12px;
}
</style>
