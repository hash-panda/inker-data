<template>
  <a-card class="general-card" :bordered="false">
    <template #title>
      {{ $t('nft.holder.info') }} ({{ nftHolders?.length ?? 0 }})
    </template>
    <a-table
      :data="nftHolders"
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
        <a-table-column :title="$t('nft.holder.owner')" data-index="owner">
          <template #cell="{ record }">
            <a-typography-paragraph copyable :copy-text="record.owner">
              {{ encodeAddress(record.owner) }}
            </a-typography-paragraph>
          </template>
        </a-table-column>
        <a-table-column :title="$t('nft.holder.nftCount')" data-index="count">
        </a-table-column>
        <a-table-column title="">
          <template #cell="{ record }">
            <a-button type="outline" @click="openRecordInfo(record.owner)">{{
              $t('party.partyInfo.btn.detail')
            }}</a-button>
          </template>
        </a-table-column>
      </template>
    </a-table>
    <a-modal v-model:visible="visible" width="auto" :footer="false">
      <template #title>NFT Details</template>
      <a-row
        :gutter="[12, 12]"
        style="width: 80vw; height: 80vh; overflow-y: auto"
      >
        <a-col v-for="(item, index) in currentHolders" :key="index" :span="6">
          <NftCard :item="item" />
        </a-col>
      </a-row>
    </a-modal>
  </a-card>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import useLoading from '@/hooks/loading';
import { encodeAddress } from '@/utils';
import NftCard from '../../components/nft-card.vue';

export default defineComponent({
  components: { NftCard },
  props: {
    nftHolders: {
      type: Array as any,
    },
  },
  setup(props) {
    const { loading, setLoading } = useLoading(false);
    const currentHolders = ref<any>();
    const visible = ref(false);
    const openRecordInfo = (owner: number) => {
      setLoading(true);
      visible.value = true;
      if (owner) {
        currentHolders.value = props.nftHolders.find(
          (v: any) => v.owner === owner
        )?.nft;
      }
      setLoading(false);
    };
    return {
      currentHolders,
      loading,
      visible,
      encodeAddress,
      openRecordInfo,
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
