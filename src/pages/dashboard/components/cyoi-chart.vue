<template>
  <a-spin :loading="loading" style="width: 100%">
    <a-card
      class="general-card"
      :header-style="{ paddingBottom: 0 }"
      :body-style="{
        paddingTop: '20px',
      }"
      :title="$t('dashboard.cyoiTitle')"
    >
      <a-row>
        <a-col class="panel-col" :span="18">
          <a-space direction="vertical" size="large" fill>
            <Chart height="400px" :option="chartOption" />
          </a-space>
        </a-col>
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
                    >
                      <icon-info-circle :style="{ color: '#722ED1' }" />
                    </a-tooltip>
                  </template>
                  <template #suffix>
                    <span class="unit">{{ v.suffix }}</span>
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
import { queryCyoiList } from '@/api/cyoi';
import useLoading from '@/hooks/loading';
import { useI18n } from 'vue-i18n';
import amountIcon from '@/assets/images/amount-icon.png';
import totalAmountIcon from '@/assets/images/total-amount-icon.png';
import useChartOption from '@/hooks/chart-option';
import { getActualAmount, getAmount } from '@/utils';
import { accAdd } from '@/utils/amount';

export default defineComponent({
  setup() {
    const { loading, setLoading } = useLoading(true);
    const { t } = useI18n();
    const chartData = ref<any>({ x: [], amounts: [], sum: [] });
    const totalCyoiDeposit = ref(0);
    const totalAccount = ref(0);

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
            max: 1000,
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

    const convertChartsData = (info: any) => {
      // -----
      // const partyInfoAddress = partyState.getPartyInfoAddress;
      const resultGroup = info.reduce((prev: any, current: any) => {
        const setGroupInfo = (key: any) => {
          if (!prev[key]) {
            prev[key] = {
              sum: 0,
              count: 0,
            };
          }
          prev[key].sum = getAmount(accAdd(prev[key].sum, current.amount));
          prev[key].count += 1;
        };
        // if (!partyInfoAddress.includes(current.address)) {
        if (current.amount < 100) {
          setGroupInfo('< 100');
        } else if (current.amount >= 100 && current.amount < 500) {
          setGroupInfo('[100, 500)');
        } else if (current.amount >= 500 && current.amount < 1000) {
          setGroupInfo('[500, 1000)');
        } else {
          setGroupInfo('>= 1000');
        }
        // }
        return prev;
      }, {});

      chartData.value = {
        x: Object.keys(resultGroup),
        amounts: Object.values(resultGroup).map((v: any) => v.sum),
        count: Object.values(resultGroup).map((v: any) => v.count),
      };
      totalCyoiDeposit.value = chartData.value.amounts.reduce(
        (prev: any, current: any) => {
          return getAmount(accAdd(prev, current));
        }
      );
      totalAccount.value = chartData.value.count.reduce(
        (prev: any, current: any) => {
          return getAmount(accAdd(prev, current));
        }
      );

      setLoading(false);
    };

    const amountDataPanel = computed(() => {
      return [
        {
          key: 'row1',
          col: [
            {
              key: 1,
              span: 24,
              icon: amountIcon,
              title: t('dashboard.cyoiChart.totalCyoiDeposit'),
              value: totalCyoiDeposit.value,
              precision: 2,
              suffix: 'ust',
              tips: '',
            },
            {
              key: 2,
              span: 24,
              icon: totalAmountIcon,
              title: t('dashboard.cyoiChart.totalAccount'),
              value: totalAccount.value,
              precision: 0,
              suffix: 'players',
              tips: '',
            },
          ],
        },
      ];
    });

    const fetchData = async () => {
      try {
        const cyoiRes = await queryCyoiList();
        const cyoiList = cyoiRes.data?.result?.vaults;
        const handleCyoiList = cyoiList.map((v: any) => {
          return {
            address: v.address,
            amount: accAdd(
              getActualAmount(v.initial_anchor),
              getActualAmount(v.initial_core)
            ),
          };
        });
        const sortHandleCyoiList = handleCyoiList.sort((a: any, b: any) => {
          return a.amount - b.amount;
        });
        convertChartsData(sortHandleCyoiList);
      } catch (e) {
        /* eslint-disable no-console */
        console.log('dashboard err', e);
      }
    };

    fetchData();

    return {
      loading,
      chartOption,
      amountDataPanel,
    };
  },
});
</script>

<style scoped lang="less">
.arco-col.panel {
  margin-bottom: 0;
  padding: 16px 20px 5px 20px;
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
