<template>
  <a-spin :loading="loading" style="width: 100%">
    <a-col :span="24" class="panel">
      <a-row style="padding-top: 16px">
        <a-col
          v-for="item in dataPanel"
          :key="item.key"
          class="panel-col"
          :span="item.span"
        >
          <a-space>
            <a-avatar :size="54" class="col-avatar">
              <img alt="avatar" :src="item.icon" />
            </a-avatar>
            <a-statistic
              :value="item.value"
              :precision="item.precision"
              :value-from="0"
              animation
              show-group-separator
            >
              <template #title>
                {{ item.title }}
                <a-tooltip
                  v-if="item.tips"
                  :content="item.tips"
                  background-color="#722ED1"
                  ><icon-info-circle :style="{ color: '#722ED1' }"
                /></a-tooltip>
              </template>
              <template #suffix>
                <span class="unit">{{ item.suffix }}</span>
              </template>
            </a-statistic>
          </a-space>
        </a-col>
      </a-row>
      <a-divider class="panel-border" />
    </a-col>
    <a-col :span="24" class="panel">
      <a-row>
        <a-col class="panel-col" :span="14">
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
          <a-divider class="panel-border" />
        </a-col>
        <a-col class="panel-col" :span="10">
          <a-space direction="vertical" size="large" fill>
            <Chart height="200px" :option="chartOption" /> </a-space
        ></a-col>
      </a-row>
      <a-divider class="panel-border" />
    </a-col>
  </a-spin>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import useLoading from '@/hooks/loading';
import { useI18n } from 'vue-i18n';
import { queryStrategy } from '@/api/winners';
import { getActualAmount, getAmount } from '@/utils';
import { usePartyState } from '@/store';
import amountIcon from '@/assets/images/amount-icon.png';
import totalAmountIcon from '@/assets/images/total-amount-icon.png';
import dayjs from 'dayjs';
import useChartOption from '@/hooks/chart-option';
import { accDiv, myFixed } from '@/utils/amount';

export default defineComponent({
  props: {
    playersCount: {
      type: Number,
      default: 0,
    },
    personalPlayers: {
      type: Number,
      default: 0,
    },
    blackAmount: {
      type: Number,
      default: 0,
    },
    num2500: {
      type: Number,
      default: 0,
    },
  },
  setup(props) {
    const { loading, setLoading } = useLoading(true);
    const partyState = usePartyState();
    const lastRound = ref(0);
    const height = ref(0);
    const endRoundTime = ref(new Date());
    const totalDeposit = ref(0);
    const currentRound = ref(0);
    const { t } = useI18n();

    const playerAverageDepositAmount = computed(() => {
      return Number(
        getAmount(
          (totalDeposit.value - props.blackAmount) / props.personalPlayers
        )
      );
    });
    const playerAccountDeposit = computed(() => {
      return Number(
        totalDeposit.value - props.blackAmount - partyState.partyTotalDeposit
      );
    });
    const averageDepositAmount = computed(() => {
      return getAmount(accDiv(totalDeposit.value, props.playersCount));
    });
    const dataPanel = computed(() => {
      return [
        {
          key: 1,
          span: 6,
          icon: '//p3-armor.byteimg.com/tos-cn-i-49unhts6dw/288b89194e657603ff40db39e8072640.svg~tplv-49unhts6dw-image.image',
          title: t('dashboard.playersCount'),
          tips: t('dashboard.playersCount.tips'),
          suffix: '',
          value: props.playersCount,
          precision: 0,
        },
        {
          key: 2,
          span: 6,
          icon: '//p3-armor.byteimg.com/tos-cn-i-49unhts6dw/c8b36e26d2b9bb5dbf9b74dd6d7345af.svg~tplv-49unhts6dw-image.image',
          title: t('dashboard.dataPanel.averageDepositAmount'),
          tips: t('dashboard.dataPanel.averageDepositAmount.tips'),
          suffix: 'ust',
          value: averageDepositAmount.value,
          precision: 2,
        },
        {
          key: 3,
          span: 6,
          icon: '//p3-armor.byteimg.com/tos-cn-i-49unhts6dw/fdc66b07224cdf18843c6076c2587eb5.svg~tplv-49unhts6dw-image.image',
          title: t('dashboard.dataPanel.personalPlayers'),
          tips: t('dashboard.dataPanel.personalPlayers.tips'),
          suffix: '',
          value: props.personalPlayers,
          precision: 0,
        },
        // {
        //   key: 4,
        //   span: 6,
        //   icon: '//p3-armor.byteimg.com/tos-cn-i-49unhts6dw/c8b36e26d2b9bb5dbf9b74dd6d7345af.svg~tplv-49unhts6dw-image.image',
        //   title: t('dashboard.dataPanel.num2500'),
        //   tips: t('dashboard.dataPanel.num2500.tips'),
        //   suffix: 'ust',
        //   value: props.num2500,
        //   precision: 2,
        // },
      ];
    });
    const amountDataPanel = computed(() => {
      return [
        {
          key: 'row1',
          col: [
            {
              key: 1,
              span: 12,
              icon: totalAmountIcon,
              title: t('winners.totalDeposit'),
              tips: t('dashboard.dataPanel.totalDeposit.tips'),
              value: totalDeposit.value,
              precision: 2,
              suffix: 'ust',
            },
            {
              key: 2,
              span: 12,
              icon: amountIcon,
              title: t('dashboard.dataPanel.blackAmount'),
              value: props.blackAmount,
              precision: 2,
              suffix: 'ust',
              tips: '',
            },
          ],
        },
        {
          key: 'row2',
          col: [
            {
              key: 3,
              span: 12,
              icon: amountIcon,
              title: t('dashboard.dataPanel.playerAccountDeposit'),
              value: playerAccountDeposit.value,
              precision: 2,
              suffix: 'ust',
              tips: t('dashboard.dataPanel.playerAccountDeposit.tips'),
            },
            {
              key: 4,
              span: 12,
              icon: amountIcon,
              title: t('dashboard.dataPanel.partyDeposit'),
              value: partyState.partyTotalDeposit,
              precision: 2,
              suffix: 'ust',
              tips: '',
            },
          ],
        },
      ];
    });
    const fetchStrategyData = async () => {
      try {
        const strategyRes = await queryStrategy();
        height.value = Number(strategyRes.data?.height);
        currentRound.value = strategyRes.data?.result?.round;
        lastRound.value = currentRound.value - 1;
        totalDeposit.value = getActualAmount(
          strategyRes.data?.result?.total_deposit?.amount
        );
        endRoundTime.value = dayjs
          .unix(strategyRes.data?.result?.end_round_time)
          .toDate();
      } catch (e) {
        // print error
        /* eslint-disable no-console */
        console.log(e);
      } finally {
        setLoading(false);
      }
    };
    fetchStrategyData();

    const { chartOption } = useChartOption(() => {
      return {
        color: ['#722ED1', '#D91AD9', '#7799fb'],
        series: [
          {
            type: 'pie',
            radius: [20, 90],
            itemStyle: {
              borderRadius: 5,
            },
            label: {
              formatter: '{b}\n\n({d}%)',
              fontFamily: 'Arial',
              overflow: 'break',
              color: '#777777',
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '12',
                fontWeight: 'bold',
              },
            },
            data: [
              {
                value: Number(props.blackAmount).toFixed(2),
                name: t('dashboard.dataPanel.blackAmount'),
              },
              {
                value: Number(playerAccountDeposit.value).toFixed(2),
                name: t('dashboard.dataPanel.playerAccountDeposit'),
              },

              {
                value: Number(partyState.partyTotalDeposit).toFixed(2),
                name: t('dashboard.dataPanel.partyDeposit'),
              },
            ],
          },
        ],
      } as any;
    });

    return {
      dataPanel,
      amountDataPanel,
      averageDepositAmount,
      playerAverageDepositAmount,
      playerAccountDeposit,
      lastRound,
      currentRound,
      endRoundTime,
      height,
      amountIcon,
      totalAmountIcon,
      partyState,
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
  padding-left: 20px;
  border-right: 1px solid rgb(var(--gray-2));
  &:first-child {
    padding-left: 0;
  }
  &:last-child {
    border-right: none;
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
