<template>
  <a-spin :loading="loading" style="width: 100%">
    <a-col :span="24" class="panel">
      <a-row :gutter="20" :style="{ marginBottom: '20px' }">
        <a-col :span="8" :offset="8">
          <a-space
            direction="vertical"
            style="display: flex; align-items: center"
          >
            <a-image width="80" :src="currentPrize1.icon" />
            <a-statistic
              title=""
              :value="currentPrize1.amount"
              show-group-separator
              :precision="2"
              animation
              :style="{ color: '#ef1f8d' }"
              ><template #suffix>
                <span class="unit">ust</span>
              </template></a-statistic
            >
            <!-- <a-typography-text bold type="primary" style="font-size: 24px">
              {{ currentPrize1.amount }} ust
            </a-typography-text> -->
          </a-space>
        </a-col>
      </a-row>
      <a-row :gutter="20" :style="{ marginBottom: '20px' }">
        <a-col :span="4"> </a-col>
        <a-col v-for="(item, index) in currentPrize2" :key="index" :span="4">
          <a-space
            direction="vertical"
            style="display: flex; align-items: center"
          >
            <a-image width="40" :src="item.icon" />
            <a-statistic
              title=""
              :value="item.amount"
              show-group-separator
              :precision="2"
              animation
              :style="{ color: '#f45d59' }"
            >
              <template #suffix>
                <span class="unit">ust</span>
              </template>
            </a-statistic>
            <!-- <a-typography-text type="primary" style="font-size: 18px">
              {{ item.amount }} ust
            </a-typography-text> -->
          </a-space>
        </a-col>
      </a-row>
    </a-col>
    <a-divider class="panel-border" />
    <a-col :span="24" class="panel">
      <a-row>
        <a-col class="panel-col" :span="6">
          <a-space>
            <a-statistic :title="$t('winners.currentRound')" :value="round">
              <template #prefix>
                <span class="unit"># </span>
              </template>
            </a-statistic>
          </a-space>
        </a-col>
        <a-col class="panel-col" :span="6">
          <a-space>
            <a-statistic
              :title="$t('winners.currentTotalPrizeAmount')"
              :value="currentTotalPrizeAmount"
              show-group-separator
              :precision="2"
              animation
            >
              <template #suffix>
                <span class="unit">ust</span>
              </template>
            </a-statistic>
          </a-space>
        </a-col>
        <a-col class="panel-col" :span="6">
          <a-space>
            <a-statistic
              :title="$t('winners.totalDeposit')"
              :value="totalDeposit"
              show-group-separator
              :precision="2"
              animation
            >
              <template #suffix>
                <span class="unit">ust</span>
              </template>
            </a-statistic>
          </a-space>
        </a-col>
        <a-col class="panel-col" :span="6">
          <a-space>
            <a-statistic
              :title="$t('winners.endRoundTime')"
              :value="endRoundTime"
              format="YYYY-MM-DD HH:mm"
            >
            </a-statistic>
          </a-space>
        </a-col>
      </a-row>
      <a-divider class="panel-border" />
    </a-col>
  </a-spin>
</template>

<script lang="ts">
import { defineComponent, ref, watch, toRef } from 'vue';
import useLoading from '@/hooks/loading';
import currentFirstIcon from '@/assets/images/currentFirst.png';
import currentSecondIcon from '@/assets/images/currentSecond.png';
import { formatAmount, getActualAmount } from '@/utils';
import { queryCurrentAward } from '@/api/winners';

export default defineComponent({
  props: {
    height: {
      type: Number,
    },
    endRoundTime: {
      type: Date,
      default: new Date(),
    },
    round: {
      type: Number,
      default: 0,
    },
    totalDeposit: {
      type: Number,
      default: 0,
    },
  },
  setup(props) {
    const { loading, setLoading } = useLoading();
    const height = toRef(props, 'height');
    const totalDeposit = toRef(props, 'totalDeposit');
    const currentTotalPrizeAmount = ref(0);
    const currentPrize1 = ref({ icon: currentFirstIcon, amount: 0 });
    const currentPrize2 = ref();

    const fetchData = async (block: number) => {
      try {
        setLoading(true);
        const currentAwardRes = await queryCurrentAward(block);
        currentTotalPrizeAmount.value = (totalDeposit.value * 7 * 0.2055) / 365;
        const totalAward = currentAwardRes.data?.result?.total_award.amount;
        const winnerAwards = currentAwardRes.data?.result?.winner_awards;
        const winnerAward1 = winnerAwards[0].amount;
        const convertActualAwardAmount = (amount: string) => {
          return (
            (currentTotalPrizeAmount.value * getActualAmount(amount)) /
            getActualAmount(totalAward)
          );
        };
        const currentPrize2List = winnerAwards.splice(1);
        currentPrize1.value.amount = convertActualAwardAmount(winnerAward1);
        currentPrize2.value = currentPrize2List.map((item, index) => {
          return {
            icon: currentSecondIcon,
            amount: convertActualAwardAmount(item.amount),
          };
        });
        console.log('currentPrize2', currentPrize2.value);
      } catch (e) {
        // catch err
      } finally {
        setLoading(false);
      }
    };
    watch(height, (height) => {
      if (height) fetchData(height);
    });
    return {
      loading,
      currentTotalPrizeAmount,
      currentPrize1,
      currentPrize2,
      formatAmount,
    };
  },
});
</script>

<style lang="less" scoped>
:deep(.arco-statistic) {
  .arco-statistic-title {
    color: rgb(var(--gray-10));
    // font-weight: bold;
  }
  .arco-statistic-value {
    display: flex;
    align-items: center;
    color: rgb(var(--color-text-1));
    font-weight: normal;
  }
}
.arco-col.panel {
  margin-bottom: 0;
  padding: 16px 20px 0 20px;
}
.panel-col {
  padding-left: 43px;
  border-right: 1px solid rgb(var(--gray-2));
  &:first-child {
    padding-left: 23px;
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
  font-size: 14px;
}
</style>
