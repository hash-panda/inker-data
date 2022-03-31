<template>
  <a-card class="general-card" :bordered="false">
    <template #title>
      {{ $t('profileInfo.party.depositInfo') }} ({{ partyInfo?.length ?? 0 }})
    </template>
    <a-table
      :data="partyInfo"
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
          data-index="address"
        >
          <template #cell="{ record }">
            <a-typography-paragraph copyable :copy-text="record.address">
              {{ encodeAddress(record.address) }}
            </a-typography-paragraph>
          </template>
        </a-table-column>
        <a-table-column
          :title="$t('winners.historyWinners.deposit')"
          data-index="amount"
        >
          <template #cell="{ record }">
            {{ formatAmount(record.amount) }}
          </template>
        </a-table-column>
        <a-table-column
          :title="$t('party.partyInfo.partyName')"
          data-index="partyName"
        >
        </a-table-column>
      </template>
    </a-table>
  </a-card>
</template>

<script lang="ts">
import { defineComponent, watch, ref } from 'vue';
import useLoading from '@/hooks/loading';
import { formatAmount, getActualAmount, encodeAddress } from '@/utils';
import {
  usePartyState,
  useProfileInfoState,
  useAccountInfoState,
} from '@/store';
import { accAdd } from '@/utils/amount';

export default defineComponent({
  props: {
    accounts: {
      type: Array,
      default: [] as string[],
    },
    // 只有当 check profile 和 check account 使用的 store 不同
    checkProfile: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const { loading, setLoading } = useLoading(false);
    const partyInfo = ref([] as any);
    const partyState = usePartyState();
    const totalDepositInParty = ref(0);
    const profileInfoState = useProfileInfoState();
    const accountInfoState = useAccountInfoState();

    const setProfileInfoState = (info: any) => {
      if (props.checkProfile) {
        profileInfoState.setInfo(info);
      } else {
        accountInfoState.setInfo(info);
      }
    };

    const fetchData = async (address: string, index: number) => {
      try {
        await partyState.getPartyInfo();
        const deposit = partyState.checkAccountDepositInParty(address);
        if (deposit.length > 0) {
          partyInfo.value = [...partyInfo.value, ...deposit];
          const currentDepositAmount = deposit.reduce(
            (prev: any, next: any) => {
              return accAdd(prev, getActualAmount(next.amount));
            },
            0
          );
          totalDepositInParty.value += currentDepositAmount;
          setProfileInfoState({
            totalDepositInParty: totalDepositInParty.value,
          });
        }
      } catch (e) {
        setLoading(false);
      }
    };

    const reset = () => {
      partyInfo.value = [];
      totalDepositInParty.value = 0;
    };
    watch(
      () => props.accounts,
      (newVal) => {
        setLoading(true);
        reset();
        newVal.forEach((item, index) => {
          fetchData(item as string, index);
        });
        setLoading(false);
      },
      {
        immediate: true,
      }
    );
    watch(
      () => partyInfo.value,
      () => {
        setProfileInfoState({
          depositInPartyCount: partyInfo.value.length,
        });
      },
      {
        immediate: true,
      }
    );
    return {
      loading,
      partyInfo,
      getActualAmount,
      formatAmount,
      encodeAddress,
    };
  },
});
</script>

<style scoped lang="less">
.general-card {
  min-height: 188px;
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
