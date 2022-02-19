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
              dayjs.unix(record.info.creation_date).format('YYYY-MM-DD HH:mm')
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
          <template #cell="{ record }">
            <a-typography-paragraph copyable :copy-text="record.info.leader">
              {{ encodeAddress(record.info.leader) }}
            </a-typography-paragraph>
          </template>
        </a-table-column>
        <a-table-column title="是否公开" data-index="info.is_public">
          <template #cell="{ record }">
            <a-tag v-if="record.info.is_public" color="green">公开</a-tag>
            <a-tag v-else color="red">私有</a-tag>
          </template>
        </a-table-column>
        <a-table-column title="">
          <template #cell="{ rowIndex }">
            <a-button type="outline" @click="openRecordInfo(rowIndex)"
              >查看</a-button
            >
          </template>
        </a-table-column>
      </template>
    </a-table>
    <!-- 团队存款详情 -->
    <a-modal width="auto" v-model:visible="visible" :footer="false">
      <template #title>队伍存款详情</template>
      <a-table
        :data="currentPartyDeposits"
        :pagination="false"
        :split="false"
        :loading="loading"
        :scroll="{ x: '50vw', y: '60vh' }"
      >
        <template #columns>
          <a-table-column title="Index" data-index="key" width="100">
            <template #cell="{ rowIndex }">
              {{ rowIndex + 1 }}
            </template>
          </a-table-column>
          <a-table-column title="地址" data-index="address" width="300">
            <template #cell="{ record }">
              <a-typography-paragraph copyable :copy-text="record.address">
                {{ encodeAddress(record.address) }}
              </a-typography-paragraph>
            </template>
          </a-table-column>
          <a-table-column
            title="存款金额"
            data-index="amount"
            :sortable="{ sortDirections: ['ascend', 'descend'] }"
          >
          </a-table-column>
          <a-table-column
            title="上次存款时间"
            data-index="last_deposit_time"
            :sortable="{ sortDirections: ['ascend', 'descend'] }"
          >
            <template #cell="{ record }">
              {{
                dayjs.unix(record.last_deposit_time).format('YYYY-MM-DD HH:mm')
              }}
            </template>
          </a-table-column>
        </template>
      </a-table>
    </a-modal>
  </a-card>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue';
import useLoading from '@/hooks/loading';
import { getActualAmount, encodeAddress } from '@/utils';
import { Party, PartyMemberDeposit } from '@/api/party';
import dayjs from 'dayjs';
import { usePartyState } from '@/store/modules/party';

export default defineComponent({
  setup() {
    const partyState = usePartyState();
    const currentPartyDeposits = ref<PartyMemberDeposit[]>();
    const visible = ref(false);
    const { loading } = useLoading(false);
    const parties = computed(() => {
      return partyState.parties.map((v: Party) => {
        return { ...v, total_deposit: getActualAmount(v.total_deposit) };
      });
    });
    const openRecordInfo = (index: number) => {
      visible.value = true;
      if (index >= 0 && index < parties.value.length) {
        currentPartyDeposits.value = parties.value[index].deposits.map((v) => {
          return { ...v, amount: getActualAmount(v.amount) };
        });
      }
    };
    return {
      loading,
      parties,
      dayjs,
      visible,
      getActualAmount,
      openRecordInfo,
      currentPartyDeposits,
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
