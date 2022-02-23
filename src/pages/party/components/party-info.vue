<template>
  <a-card class="general-card" :bordered="false">
    <template #title>
      {{ $t('party.partyInfo') }} ({{ parties?.length ?? 0 }})
    </template>
    <a-table
      :data="parties"
      :pagination="false"
      :split="false"
      :loading="loading"
    >
      <template #columns>
        <a-table-column title="" data-index="key">
          <template #cell="{ rowIndex }">
            {{ rowIndex + 1 }}
          </template>
        </a-table-column>
        <a-table-column
          :title="$t('party.partyInfo.partyName')"
          data-index="info.name"
        >
        </a-table-column>
        <a-table-column
          :title="$t('party.partyInfo.createDate')"
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
          :title="$t('party.partyInfo.deposit')"
          data-index="total_deposit"
          :sortable="{ sortDirections: ['ascend', 'descend'] }"
        >
        </a-table-column>
        <a-table-column
          :title="$t('party.partyInfo.members')"
          data-index="current_member"
        >
          <template #cell="{ record }">
            {{ record.current_member }} / {{ record.max_member }}
          </template>
        </a-table-column>
        <a-table-column
          :title="$t('party.partyInfo.partyLeaderAddress')"
          data-index="info.leader"
        >
          <template #cell="{ record }">
            <a-typography-paragraph copyable :copy-text="record.info.leader">
              {{ encodeAddress(record.info.leader) }}
            </a-typography-paragraph>
          </template>
        </a-table-column>
        <a-table-column
          :title="$t('party.partyInfo.publicOrPrivite')"
          data-index="info.is_public"
        >
          <template #cell="{ record }">
            <a-tag v-if="record.info.is_public" color="green">{{
              $t('party.partyInfo.publicOrPrivite.tag.public')
            }}</a-tag>
            <a-tag v-else color="red">{{
              $t('party.partyInfo.publicOrPrivite.tag.private')
            }}</a-tag>
          </template>
        </a-table-column>
        <a-table-column title="">
          <template #cell="{ record }">
            <a-button type="outline" @click="openRecordInfo(record.info.id)">{{
              $t('party.partyInfo.btn.detail')
            }}</a-button>
          </template>
        </a-table-column>
      </template>
    </a-table>
    <!-- 团队存款详情 -->
    <a-modal width="auto" v-model:visible="visible" :footer="false">
      <template #title>{{ $t('party.partyInfo.modal.title') }}</template>
      <a-table
        :data="currentPartyDeposits"
        :pagination="false"
        :split="false"
        :loading="loading"
        :scroll="{ x: '50vw', y: '60vh' }"
      >
        <template #columns>
          <a-table-column title="" data-index="key" width="100">
            <template #cell="{ rowIndex }">
              {{ rowIndex + 1 }}
            </template>
          </a-table-column>
          <a-table-column
            :title="$t('party.partyInfo.modal.address')"
            data-index="address"
            width="300"
          >
            <template #cell="{ record }">
              <a-typography-paragraph copyable :copy-text="record.address">
                {{ encodeAddress(record.address) }}
              </a-typography-paragraph>
            </template>
          </a-table-column>
          <a-table-column
            :title="$t('party.partyInfo.modal.deposit')"
            data-index="amount"
            :sortable="{ sortDirections: ['ascend', 'descend'] }"
          >
          </a-table-column>
          <a-table-column
            :title="$t('party.partyInfo.modal.lastDepositTime')"
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
    const { loading, setLoading } = useLoading(true);
    const parties = computed(() => {
      setLoading(false);
      return partyState.parties.map((v: Party) => {
        return { ...v, total_deposit: getActualAmount(v.total_deposit) };
      });
    });
    const openRecordInfo = (id: number) => {
      setLoading(true);
      visible.value = true;
      if (id >= 0) {
        currentPartyDeposits.value = parties.value
          .find((v) => v.info.id === id)
          ?.deposits?.map((v) => {
            return { ...v, amount: getActualAmount(v.amount) };
          });
      }
      setLoading(false);
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
