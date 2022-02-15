<template>
  <a-card class="general-card" :bordered="false">
    <template #title> {{ $t('profileInfo.depositInfo') }} </template>
    <a-table
      :data="accountInfo"
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
        </a-table-column>
        <a-table-column
          :title="$t('winners.historyWinners.deposit')"
          data-index="amount"
        >
        </a-table-column>
      </template>
    </a-table>
  </a-card>
</template>

<script lang="ts">
import { defineComponent, watch, ref } from 'vue';
import useLoading from '@/hooks/loading';
import { queryDepositInfo } from '@/api/profile-info';
import { formatAmount, getActualAmount, getCoin } from '@/utils';
import { useProfileInfoState } from '@/store';
import { useAccountInfoState } from '@/store';

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
    const accountInfo = ref([] as any);
    const totalDeposit = ref(0);
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
        const accountInfoRes = await queryDepositInfo(address.trim());
        const handleAccountInfo = {
          key: index + 1,
          amount: formatAmount(accountInfoRes.data?.result?.asset?.amount),
          denom: getCoin(
            accountInfoRes.data?.result?.asset?.info?.native_token?.denom
          ),
          address,
        };
        totalDeposit.value += getActualAmount(
          accountInfoRes.data?.result?.asset?.amount
        );
        setProfileInfoState({
          totalDeposit: totalDeposit.value,
        });
        accountInfo.value.push(handleAccountInfo);
      } catch (e) {
        setLoading(false);
      }
    };
    const reset = () => {
      accountInfo.value = [];
      totalDeposit.value = 0;
    };
    watch(
      () => props.accounts,
      (newVal) => {
        setLoading(true);
        reset();
        newVal.forEach((item, index) => {
          fetchData(item as string, index);
        });
        setProfileInfoState({
          accountCount: newVal.length,
          totalDeposit: totalDeposit.value,
        });
        setLoading(false);
      },
      {
        immediate: true,
      }
    );
    return {
      loading,
      accountInfo,
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
