<template>
  <a-spin :loading="loading">
    <template #icon>
      <icon-sync />
    </template>
    <a-tabs position="top" style="margin: 20px">
      <a-tab-pane key="1" :title="$t('menu.nft.list')">
        <a-row
          style="
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            margin: 10px;
          "
          ><a-pagination
            hide-on-single-page
            :total="nftState.totalNft"
            simple
            show-total
            size="large"
            :page-size="50"
            @change="onCurrentPageChange"
        /></a-row>
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
            :total="nftState.totalNft"
            simple
            show-total
            size="large"
            :page-size="50"
            @change="onCurrentPageChange"
        /></a-row>
      </a-tab-pane>
      <a-tab-pane key="2" :title="$t('menu.nft.holder')">
        <Holder />
      </a-tab-pane>
    </a-tabs>
  </a-spin>
</template>

<script lang="ts">
import { queryNftList, queryTigerNftsFromKnowhere } from '@/api/nft';
import { ref, defineComponent, computed, watch } from 'vue';
import useLoading from '@/hooks/loading';
import { useNftState } from '@/store';
import NftCard from '../components/nft-card.vue';
import Holder from '../holder/index.vue';

export default defineComponent({
  components: {
    NftCard,
    Holder,
  },
  setup() {
    const { loading, setLoading } = useLoading(true);
    const nftState = useNftState();
    const gas = ref(50);
    const currentPageIndex = ref(1);
    const nftList = ref([] as any);
    const currentPageNfts = computed(() => {
      return nftState.nftList[currentPageIndex.value - 1];
    });

    const fetchTigerNfts = async () => {
      // 10分钟间隔：600000
      if (Date.now() - nftState.lastUpdateTime < 600000 * 3) {
        setLoading(false);
        return;
      }
      nftState.resetNftList();
      try {
        const ntfs = await queryTigerNftsFromKnowhere();
        const nftList = [] as any;
        ntfs.data.nodes.forEach((item: any, index: number) => {
          const page = Math.floor(index / 50);
          if (!nftList[page]) {
            nftList[page] = [];
          }
          nftList[page].push(item);
        });
        nftState.setNftList(nftList);
        nftState.setLastUpdateTime();
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    };

    fetchTigerNfts();

    const onCurrentPageChange = (page: number) => {
      currentPageIndex.value = page;
    };
    return {
      onCurrentPageChange,
      currentPageNfts,
      loading,
      nftState,
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
