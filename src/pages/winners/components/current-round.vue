<template>
  <a-spin :loading="loading" style="width: 100%">
    <a-col :span="24" class="panel">
      <a-grid :cols="5" :col-gap="12" :row-gap="16">
        <a-grid-item v-for="(item, index) in sortPrize" :key="index"
          ><a-space
            direction="vertical"
            style="display: flex; align-items: center"
          >
            <a-image :width="item.width" :src="item.icon" />
            <a-statistic
              title=""
              :value="item.amount"
              show-group-separator
              :precision="2"
              animation
              :style="item.style"
            >
              <template #suffix>
                <span class="unit">ust</span>
              </template>
            </a-statistic>
            <!-- <a-typography-text type="primary" style="font-size: 18px">
              {{ item.amount }} ust
            </a-typography-text> -->
          </a-space></a-grid-item
        >
      </a-grid>
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
// import gold from '@/assets/images/gold.png';
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
    const currentPrize1 = ref({
      icon: currentFirstIcon,
      amount: 0,
      style: { color: '#ef1f8d' },
      width: '80',
    });
    const currentPrize2 = ref();
    const sortPrize = ref();

    const fetchData = async (block: number) => {
      try {
        setLoading(true);
        const currentAwardRes = await queryCurrentAward(block);
        currentTotalPrizeAmount.value =
          (totalDeposit.value * 7 * 0.2055) / 365 / 2;
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
        sortPrize.value = currentPrize2List.map((item) => {
          return {
            span: 4,
            // offset: index ===0 ? 6
            style: { color: '#f45d59' },
            width: 40,
            icon: currentSecondIcon,
            amount: convertActualAwardAmount(item.amount),
          };
        });
        sortPrize.value.splice(2, 0, currentPrize1.value);
        /* eslint-disable no-console */
        console.log('sortPrize', sortPrize.value, sortPrize.value);
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
      sortPrize,
    };
  },
});
</script>

<style lang="less" scoped>
:deep(.arco-statistic) {
  .arco-statistic-title {
    // color: rgb(var(--gray-10));
    // font-weight: bold;
  }
  .arco-statistic-value {
    display: flex;
    align-items: center;
    color: rgb(var(--color-text-3));
    font-weight: normal;
  }
}
:deep(.arco-grid-item) {
  align-self: end;
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
