<template>
  <!-- <a-spin :loading="loading" style="width: 100%"> -->
  <a-card class="general-card" :bordered="false">
    <template #title>
      {{ $t('profileInfo.awardInfo') }} ({{
        accountAwardsInfo?.length ?? 0
      }})</template
    >

    <a-table
      :data="accountAwardsInfo"
      :pagination="false"
      :split="false"
      :loading="loading"
    >
      <template #columns>
        <a-table-column title="Index" data-index="key">
          <template #cell="{ rowIndex }">
            {{ rowIndex + 1 }}
          </template>
        </a-table-column>
        <a-table-column
          :title="$t('winners.historyWinners.address')"
          data-index="winner.address"
        >
          <template #cell="{ record }">
            <a-typography-paragraph copyable :copy-text="record.winner.address">
              {{ encodeAddress(record.winner.address) }}
            </a-typography-paragraph>
          </template>
        </a-table-column>
        <a-table-column
          :title="$t('profileInfo.awardInfo.round')"
          data-index="round"
        >
          <template #cell="{ record }">
            <span class="round-icon">#{{ record.round }}</span>
          </template>
        </a-table-column>
        <a-table-column
          :title="$t('winners.historyWinners.prize')"
          data-index="awardAmount"
        >
          <template #cell="{ record }">
            {{ formatAmount(record.winner.award.amount) }}
            <!-- {{ getCoin(record.winner.award.info.native_token.denom) }} -->
          </template>
        </a-table-column>
        <a-table-column
          :title="$t('winners.historyWinners.deposit')"
          data-index="winner.deposit_snapshot"
        >
          <template #cell="{ record }">
            {{ formatAmount(record.winner.deposit_snapshot) }}
          </template>
        </a-table-column>
        <a-table-column
          :title="$t('winners.historyWinners.isClaimed')"
          data-index="winner.is_claimed"
        >
          <template #cell="{ record }">
            <a-tag
              v-if="record.winner.is_claimed"
              size="small"
              color="purple"
              >{{ $t('winners.historyWinners.claimed') }}</a-tag
            >
            <span v-else>
              <a-space>
                <a-tag size="small" color="#8C36E7">{{
                  $t('winners.historyWinners.notClaimed')
                }}</a-tag>
                <span
                  ><a-tooltip :content="$t('profileInfo.awardInfo.gotoClaim')"
                    ><icon-tag
                      stroke-width="2"
                      @click="gotoInkProtocol" /></a-tooltip
                ></span>
              </a-space>
            </span>
          </template>
        </a-table-column>
        <a-table-column
          :title="$t('profileInfo.dataOverview.totalDeposit')"
          data-index="total_deposit_snapshot.amount"
        >
          <template #cell="{ record }">
            {{ formatAmount(record.total_deposit_snapshot.amount) }}
          </template>
        </a-table-column>
      </template>
    </a-table>
  </a-card>
  <!-- </a-spin> -->
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';
import useLoading from '@/hooks/loading';
import { queryPlayerAwards } from '@/api/profile-info';
import {
  formatAmount,
  getCoin,
  gotoInkProtocol,
  getActualAmount,
  encodeAddress,
} from '@/utils';
import { useProfileInfoState } from '@/store';
import { useAccountInfoState } from '@/store';

export default defineComponent({
  props: {
    accounts: {
      type: Array,
      default: [] as string[],
    },
    checkProfile: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const { loading, setLoading } = useLoading(false);
    const accountAwardsInfo = ref([] as any);
    const profileInfoState = useProfileInfoState();
    const accountInfoState = useAccountInfoState();
    const totalAwards = ref(0);
    const setProfileInfoState = (info: any) => {
      if (props.checkProfile) {
        profileInfoState.setInfo(info);
      } else {
        accountInfoState.setInfo(info);
      }
    };
    const fetchData = async (address: string) => {
      try {
        const playerAwardsRes = await queryPlayerAwards(address.trim());
        accountAwardsInfo.value = [
          ...accountAwardsInfo.value,
          ...playerAwardsRes?.data?.result?.player_awards,
        ];
      } catch (e) {
        setLoading(false);
      }
    };
    const reset = () => {
      accountAwardsInfo.value = [];
      totalAwards.value = 0;
    };
    watch(
      () => props.accounts,
      (newVal) => {
        setLoading(true);
        reset();
        newVal.forEach((item) => {
          fetchData(item as string);
        });
        setLoading(false);
      },
      {
        immediate: true,
      }
    );
    watch(
      () => accountAwardsInfo.value,
      () => {
        let total = 0;
        accountAwardsInfo.value.forEach((item: any) => {
          total += getActualAmount(item.winner.award.amount);
        });
        setProfileInfoState({
          totalAwards: total,
          awardCount: accountAwardsInfo.value.length,
        });
      },
      {
        immediate: true,
      }
    );
    return {
      loading,
      accountAwardsInfo,
      formatAmount,
      getCoin,
      gotoInkProtocol,
      encodeAddress,
    };
  },
});
</script>

<style scoped lang="less">
.general-card {
  min-height: 188px;
}
.round-icon {
  color: rgb(var(--primary-6));
}
:deep(.arco-table-tr) {
  height: 44px;
  .arco-typography {
    margin-bottom: 0;
  }
}
.increases-cell {
  display: flex;
  align-items: center;
  span {
    margin-right: 4px;
  }
}
</style>
