<template>
  <a-card class="general-card" :bordered="false">
    <template #title>
      {{ $t('nftAirdrop.title') }} ({{ nftAirdropInfo?.length ?? 0 }})
    </template>
    <template #extra>
      <a-button type="primary" @click="checkEligible">{{
        $t('nftAirdrop.checkEligible')
      }}</a-button>
    </template>
    <a-table
      :data="nftAirdropInfo"
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
        <a-table-column :title="$t('nftAirdrop.address')" data-index="address">
          <template #cell="{ record }">
            <a-typography-paragraph copyable :copy-text="record.address">
              {{ encodeAddress(record.address) }}
            </a-typography-paragraph>
          </template>
        </a-table-column>
        <a-table-column
          :title="$t('nftAirdrop.isAirdropNft')"
          data-index="isAirdropNft"
        >
          <template #cell="{ record }">
          <div v-if="record.isAirdropNft">
          <a-space>
            <a-tag size="small" color="purple">{{
              $t('nftAirdrop.eligible')
            }}</a-tag>
            <a-button type="outline" size="mini" @click="openWeb(record.address)"> {{ $t('nftAirdrop.openWeb') }}</a-button>
          </a-space>
          </div>
            
            <a-tag v-else size="small">{{
              $t('nftAirdrop.notEligible')
            }}</a-tag>
          </template>
        </a-table-column>
      </template>
    </a-table>
  </a-card>
</template>

<script lang="ts">
import { defineComponent, watch, ref, computed } from 'vue';
import useLoading from '@/hooks/loading';
import { encodeAddress } from '@/utils';
import { nftAirdrop } from '@/utils/check-nft';

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
    const nftAirdropInfo = ref([] as any);

    const fetchData = async (address: string, index: number) => {
      try {
        const isAirdropNft = nftAirdrop.findIndex((v) => v === address) >= 0;
        nftAirdropInfo.value.push({ address, isAirdropNft });
      } catch (e) {
        setLoading(false);
      }
    };

    const reset = () => {
      nftAirdropInfo.value = [];
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

    const checkEligible = () => {
      window.open(
        'https://docs.google.com/spreadsheets/d/1ffqrjKQRpw1cjTqOX_KvMYLKASWhMv4fnUEsOpRg9IQ/edit#gid=0',
        '_blank'
      );
    };

    const openWeb = (address: string) => {
      window.open(
        `https://knowhere.art/profile/${address}`,
        '_blank'
      );
      
    }

    return {
      loading,
      nftAirdropInfo,
      openWeb,
      encodeAddress,
      checkEligible,
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
