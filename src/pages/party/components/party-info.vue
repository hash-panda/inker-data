<template>
  <a-card class="general-card" :bordered="false">
    <template #title>
      {{ $t('party.partyInfo') }}({{ parties?.length ?? 0 }})
    </template>
    <a-table
      :data="parties"
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
        <a-table-column title="团队名称" data-index="info.name">
        </a-table-column>
        <a-table-column
          title="创建时间"
          data-index="info.create_date"
          :sortable="{ sortDirections: ['ascend', 'descend'] }"
        >
          <template #cell="{ record }">
            {{
              dayjs
                .unix(record.info.creation_date)
                .format('YYYY-MM-DD HH:mm:ss')
            }}
          </template>
        </a-table-column>
        <a-table-column
          title="存款金额"
          data-index="total_deposit"
          :sortable="{ sortDirections: ['ascend', 'descend'] }"
        >
        </a-table-column>
        <a-table-column title="当前人数" data-index="current_member">
          <template #cell="{ record }">
            {{ record.current_member }}
          </template>
        </a-table-column>
        <a-table-column title="最大人数" data-index="max_member">
          <template #cell="{ record }">
            {{ record.max_member }}
          </template>
        </a-table-column>
        <a-table-column title="队长地址" data-index="info.leader">
        </a-table-column>
        <a-table-column title="是否公开" data-index="info.is_public">
          <template #cell="{ record }">
            {{ record.info.is_public ? '公开' : '私有' }}
          </template>
        </a-table-column>
        <!-- <a-table-column
          :title="$t('winners.historyWinners.deposit')"
          data-index="amount"
        >
        </a-table-column> -->
      </template>
    </a-table>
  </a-card>
</template>

<script lang="ts">
import { defineComponent, computed, PropType } from 'vue';
import useLoading from '@/hooks/loading';
import { getActualAmount } from '@/utils';
import { Party, PartyRes } from '@/api/party';
import dayjs from 'dayjs';

export default defineComponent({
  props: {
    partyInfo: {
      type: Object as PropType<PartyRes>,
    },
  },
  setup(props) {
    const { loading } = useLoading(false);
    const parties = computed(() => {
      return props?.partyInfo?.result?.parties.map((v: Party) => {
        return { ...v, total_deposit: getActualAmount(v.total_deposit) };
      });
    });
    return {
      loading,
      parties,
      dayjs,
      getActualAmount,
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
