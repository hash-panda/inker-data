<template>
  <a-spin :loading="loading">
    <template #icon>
      <icon-sync />
    </template>
    <a-tabs position="top" style="margin: 20px">
      
      <!-- <a-tab-pane key="1" :title="$t('menu.nft.list')">
        <div class="container">
          <a-row :gutter="[12, 12]" style="width: 100%">
            <a-col
              v-for="(item, index) in currentPageNfts"
              :key="index"
              :span="6"
            >
              <NftCard :item="item" />
            </a-col>
          </a-row>
        </div>
        <a-row
          style="
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
          "
          ><a-pagination
            :total="nf
            
            
            tState.totalNft"
            simple
            show-total
            size="large"
            :page-size="50"
            @change="onCurrentPageChange"
        /></a-row>
      </a-tab-pane> -->
      <a-tab-pane key="2" :title="$t('menu.nft.holder')">
        <!-- <Holder /> -->
        <Rarity />
      </a-tab-pane>
      <a-tab-pane key="3" :title="$t('menu.nft.rarity.info')">
        <RarityInfo />
      </a-tab-pane>
    </a-tabs>
  </a-spin>
</template>

<script lang="ts">
import { ref, defineComponent, computed } from 'vue';
import useLoading from '@/hooks/loading';
import { useNftState } from '@/store';
// import NftCard from '../components/nft-card.vue';
import Rarity from '../rarity/index.vue';
import RarityInfo from '../rarityInfo/index.vue';
// import Holder from '../holder/index.vue';

export default defineComponent({
  components: {
    // NftCard,
    Rarity,
    RarityInfo
    // Holder,
  },
  setup() {
    const { loading, setLoading } = useLoading(false);
    // const nftState = useNftState();
    // const currentPageIndex = ref(1);
    // const currentPageNfts = computed(() => {
    //   console.log('nftState.tigerNftPagenationList[currentPageIndex.value - 1]',nftState.tigerNftPagenationList[currentPageIndex.value - 1])
    //   return nftState.tigerNftPagenationList[currentPageIndex.value - 1];
    // });
    // const onCurrentPageChange = (page: number) => {
    //   currentPageIndex.value = page;
    // };
    return {
      // onCurrentPageChange,
      // currentPageNfts,
      loading,
      // nftState,
    };
  },
});
</script>

<style scoped lang="less">
.container {
  padding: 16px 20px;
  display: flex;
}

.panel {
  border-radius: 4px;
  width: 100%;
  padding: 16px 20px 36px 20px;
  overflow: auto;
}

.actions {
  display: flex;
  align-items: center;
  background-color: #ffffff;
}
.action {
  padding: 5px 4px;
  font-size: 14px;
  margin-left: 12px;
  border-radius: 2px;
  line-height: 1;
  cursor: pointer;
}
.action:first-child {
  margin-left: 0;
}

.action:hover {
  background: rgba(0, 0, 0, 0.5);
}
.actions-outer {
  .action {
    &:hover {
      color: #ffffff;
    }
  }
}
</style>
