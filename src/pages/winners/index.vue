<template>
  <div class="container">
    <div class="left-side">
      <div class="panel">
        <CurrentRound
          :height="height"
          :end-round-time="endRoundTime"
          :round="currentRound"
          :total-deposit="totalDeposit"
        />
      </div>
      <a-row style="margin-top: 16px">
        <a-col :flex="1" class="panel">
          <WinnersHistory :total-round="lastRound" />
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { queryStrategy } from '@/api/winners';
import { getActualAmount } from '@/utils';
import dayjs from 'dayjs';
import CurrentRound from './components/current-round.vue';
import WinnersHistory from './components/winners-history.vue';

export default defineComponent({
  components: {
    CurrentRound,
    WinnersHistory,
  },
  setup() {
    const lastRound = ref(0);
    const height = ref(0);
    const endRoundTime = ref(new Date());
    const totalDeposit = ref(0);
    const currentRound = ref(0);
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
      }
    };
    fetchStrategyData();
    return {
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
.container {
  background-color: var(--color-fill-2);
  padding: 16px 20px;
  display: flex;
}

.left-side {
  flex: 1;
  overflow: auto;
}

.panel {
  background-color: var(--color-bg-2);
  border-radius: 4px;
  overflow: auto;
}
:deep(.panel-border) {
  margin-bottom: 0;
  border-bottom: 1px solid rgb(var(--gray-2));
}
.moduler-wrap {
  border-radius: 4px;
  background-color: var(--color-bg-2);
  :deep(.text) {
    font-size: 12px;
    text-align: center;
    color: rgb(var(--gray-8));
  }

  :deep(.wrapper) {
    margin-bottom: 8px;
    text-align: center;
    cursor: pointer;

    &:last-child {
      .text {
        margin-bottom: 0;
      }
    }
    &:hover {
      .icon {
        color: rgb(var(--arcoblue-6));
        background-color: #e8f3ff;
      }
      .text {
        color: rgb(var(--arcoblue-6));
      }
    }
  }

  :deep(.icon) {
    display: inline-block;
    width: 32px;
    height: 32px;
    margin-bottom: 4px;
    color: rgb(var(--dark-gray-1));
    line-height: 32px;
    font-size: 16px;
    text-align: center;
    background-color: rgb(var(--gray-1));
    border-radius: 4px;
  }
}
</style>
