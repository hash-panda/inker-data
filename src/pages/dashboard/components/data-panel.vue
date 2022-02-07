<template>
  <a-col :span="24" class="panel">
    <a-row>
      <a-col class="panel-col" :span="5">
        <a-space>
          <a-avatar :size="54" class="col-avatar">
            <img
              alt="avatar"
              src="//p3-armor.byteimg.com/tos-cn-i-49unhts6dw/288b89194e657603ff40db39e8072640.svg~tplv-49unhts6dw-image.image"
            />
          </a-avatar>
          <a-statistic
            :title="$t('dashboard.playersCount')"
            :value="playersCount"
            :precision="0"
            :value-from="0"
            animation
            show-group-separator
          >
          </a-statistic>
        </a-space>
      </a-col>
      <a-col class="panel-col" :span="6">
        <a-space>
          <a-avatar :size="54" class="col-avatar">
            <img
              alt="avatar"
              src="//p3-armor.byteimg.com/tos-cn-i-49unhts6dw/fdc66b07224cdf18843c6076c2587eb5.svg~tplv-49unhts6dw-image.image"
            />
          </a-avatar>
          <a-statistic
            :value="effectivePlayers"
            :value-from="0"
            animation
            show-group-separator
          >
            <template #title>
              {{ $t('dashboard.dataPanel.effectivePlayers') }}
              <a-tooltip
                :content="$t('dashboard.dataPanel.effectivePlayers.tips')"
                background-color="#722ED1"
                ><icon-info-circle
              /></a-tooltip>
            </template>
          </a-statistic>
        </a-space>
      </a-col>
      <a-col class="panel-col" :span="7">
        <a-space>
          <a-avatar :size="54" class="col-avatar">
            <img
              alt="avatar"
              src="//p3-armor.byteimg.com/tos-cn-i-49unhts6dw/77d74c9a245adeae1ec7fb5d4539738d.svg~tplv-49unhts6dw-image.image"
            />
          </a-avatar>
          <a-statistic
            :title="$t('winners.totalDeposit')"
            :value="totalDeposit"
            :precision="2"
            :value-from="0"
            animation
            show-group-separator
          >
            <template #suffix>
              <span class="unit">ust</span>
            </template>
          </a-statistic>
        </a-space>
      </a-col>
      <a-col class="panel-col" :span="6">
        <a-space>
          <a-avatar :size="54" class="col-avatar">
            <img
              alt="avatar"
              src="//p3-armor.byteimg.com/tos-cn-i-49unhts6dw/c8b36e26d2b9bb5dbf9b74dd6d7345af.svg~tplv-49unhts6dw-image.image"
            />
          </a-avatar>
          <a-statistic
            :value="averageDepositAmount"
            :precision="2"
            :value-from="0"
            animation
            show-group-separator
          >
            <template #title>
              {{ $t('dashboard.dataPanel.averageDepositAmount') }}
              <a-tooltip
                :content="$t('dashboard.dataPanel.averageDepositAmount.tips')"
                background-color="#722ED1"
                ><icon-info-circle
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
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import { queryStrategy } from '@/api/winners';
import { getActualAmount } from '@/utils';
import dayjs from 'dayjs';

export default defineComponent({
  props: {
    playersCount: {
      type: Number,
      default: 0,
    },
    effectivePlayers: {
      type: Number,
      default: 0,
    },
    blackAmount: {
      type: Number,
      default: 0,
    },
  },
  setup(props) {
    const lastRound = ref(0);
    const height = ref(0);
    const endRoundTime = ref(new Date());
    const totalDeposit = ref(0);
    const currentRound = ref(0);
    const averageDepositAmount = computed(() => {
      return Number(
        (
          (totalDeposit.value - props.blackAmount) /
          props.effectivePlayers
        ).toFixed(2)
      );
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
        console.log(e);
      }
    };
    fetchStrategyData();
    return {
      averageDepositAmount,
      lastRound,
      currentRound,
      endRoundTime,
      totalDeposit,
      height,
    };
  },
});
</script>

<style lang="less" scoped>
.arco-col.panel {
  margin-bottom: 0;
  padding: 16px 20px 0 20px;
}
.panel-col {
  padding-left: 43px;
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
