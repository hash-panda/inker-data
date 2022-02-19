<template>
  <a-spin :loading="loading" style="width: 100%">
    <a-card
      class="general-card"
      :header-style="{ paddingBottom: '0' }"
      :body-style="{ padding: '17px 20px 21px 20px' }"
    >
      <template #title>
        {{ $t('winners.history') }}
      </template>
      <a-space direction="vertical" :size="10" fill>
        <a-radio-group
          v-model:model-value="round"
          type="button"
          @change="roundChange"
        >
          <a-radio
            v-for="item in totalRound"
            :key="totalRound - item + 1"
            :value="totalRound - item + 1"
          >
            #{{ totalRound - item + 1 }}
          </a-radio>
        </a-radio-group>
        <a-divider style="margin-top: 0" />
        <a-descriptions :data="baseInfo" title="" align="left" column="4" />
        <a-table
          :data="winners"
          :pagination="false"
          :bordered="false"
          :split="false"
        >
          <template #columns>
            <a-table-column
              :title="$t('winners.historyWinners.rank')"
              data-index="index"
            >
              <template #cell="{ record }">
                <a-image width="30" :src="record.icon" />
              </template>
            </a-table-column>
            <a-table-column
              :title="$t('winners.historyWinners.address')"
              data-index="address"
            >
              <template #cell="{ record }">
                <a-typography-paragraph copyable :copy-text="record.address">
                  {{ encodeAddress(record.address) }}
                </a-typography-paragraph>
              </template>
            </a-table-column>
            <a-table-column
              :title="$t('winners.historyWinners.prize')"
              data-index="award.amount"
            >
              <template #cell="{ record }">
                <span>{{ formatAmount(record.award.amount) }}</span>
              </template>
            </a-table-column>
            <a-table-column
              :title="$t('winners.historyWinners.deposit')"
              data-index="deposit_snapshot"
            >
              <template #cell="{ record }">
                <span>{{ formatAmount(record.deposit_snapshot) }}</span>
              </template>
            </a-table-column>
            <a-table-column
              :title="$t('winners.historyWinners.isClaimed')"
              data-index="is_claimed"
            >
              <template #cell="{ record }">
                <a-tag v-if="record.is_claimed" size="small" color="purple">{{
                  $t('winners.historyWinners.claimed')
                }}</a-tag>
                <a-tag v-else size="small" color="#8C36E7">{{
                  $t('winners.historyWinners.notClaimed')
                }}</a-tag>
              </template>
            </a-table-column>
          </template>
        </a-table>
      </a-space>
    </a-card>
  </a-spin>
</template>

<script lang="ts">
import { defineComponent, ref, toRef, watch } from 'vue';
import useLoading from '@/hooks/loading';
import { useI18n } from 'vue-i18n';
import { queryWinnerList, WinnerRes, Winners } from '@/api/winners';
import { formatAmount, encodeAddress } from '@/utils';
import first from '@/assets/images/currentFirst.png';
import second from '@/assets/images/currentSecond.png';

export default defineComponent({
  props: {
    totalRound: {
      type: Number,
      default: 0,
    },
  },
  setup(props) {
    const { loading, setLoading } = useLoading();
    const { t } = useI18n();
    const round = ref(0);
    const totalRound = toRef(props, 'totalRound');
    const baseInfo = ref({});
    const renderList = ref<WinnerRes>();
    const winners = ref<Winners[]>();

    const fetchWinnersData = async (round: number) => {
      try {
        setLoading(true);
        const winnerRes = await queryWinnerList(round);
        baseInfo.value = [
          {
            label: t('winners.historyWinners.totalDepositSnapshot'),
            value: `${formatAmount(
              winnerRes.data?.result?.total_deposit_snapshot?.amount
            )}`,
          },
        ];
        const winnerList = winnerRes.data?.result?.winners;
        winners.value = winnerList.map((item, index) => {
          if (index === 0) {
            item.icon = first;
          } else {
            item.icon = second;
          }
          return item;
        });
        // console.log(winners.value);
      } catch (err) {
        // you can report use errorHandler or other
      } finally {
        setLoading(false);
      }
    };
    watch(totalRound, (totalRound) => {
      /* eslint-disable no-console */
      console.log(totalRound);
      if (totalRound > 0) {
        round.value = totalRound;
        fetchWinnersData(totalRound);
      }
    });
    const roundChange = (round: number) => {
      fetchWinnersData(round);
    };
    return {
      baseInfo,
      round,
      winners,
      roundChange,
      loading,
      renderList,
      formatAmount,
      encodeAddress,
    };
  },
});
</script>

<style scoped lang="less">
.general-card {
  min-height: 388px;
}
:deep(.arco-table-tr) {
  height: 44px;
  .arco-typography {
    margin-bottom: 0;
  }
}
</style>
