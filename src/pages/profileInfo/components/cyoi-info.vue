<template>
  <a-card class="general-card" :bordered="false">
    <template #title>
      {{ $t('profileInfo.cyoiInfo') }} ({{ accountInfo?.length ?? 0 }})
    </template>
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
          <template #cell="{ record }">
            <a-typography-paragraph copyable :copy-text="record.address">
              {{ encodeAddress(record.address) }}
            </a-typography-paragraph>
          </template>
        </a-table-column>
        <a-table-column
          :title="$t('winners.historyWinners.deposit')"
          data-index="total"
        >
        </a-table-column>
        <a-table-column
          title="Game Pool(ust)"
          data-index="core"
        >
        </a-table-column>
        <a-table-column
          title="Interest Pool(ust)"
          data-index="initialUst"
        >
        </a-table-column>
      </template>
    </a-table>
  </a-card>
</template>

<script lang="ts">
import { defineComponent, watch, ref } from 'vue';
import useLoading from '@/hooks/loading';
import { queryCyoiInfo } from '@/api/profile-info';
import { formatAmount, getActualAmount, encodeAddress } from '@/utils';
import {
  usePartyState,
  useProfileInfoState,
  useAccountInfoState,
} from '@/store';

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
    const totalCyoiDeposit = ref(0);
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
        const accountInfoRes = await queryCyoiInfo(address.trim());
        const handleAccountInfo = {
          total: formatAmount(accountInfoRes.data?.result?.info?.total??0),
          initialUst: formatAmount(accountInfoRes.data?.result?.info?.initial_ust??0),
          core: formatAmount(accountInfoRes.data?.result?.info?.core??0),
          address,
        };
        totalCyoiDeposit.value += getActualAmount(
          accountInfoRes.data?.result?.info?.total??0
        );
        setProfileInfoState({
          totalCyoiDeposit: totalCyoiDeposit.value,
        });
        accountInfo.value.push(handleAccountInfo);
      } catch (e) {
        setLoading(false);
      }
    };

    const reset = () => {
      accountInfo.value = [];
      totalCyoiDeposit.value = 0;
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
          accountCyoiCount: newVal.length,
          totalCyoiDeposit: totalCyoiDeposit.value,
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
