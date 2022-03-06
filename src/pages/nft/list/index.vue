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
import { queryNftList } from '@/api/nft';
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
    watch(
      () => nftState.isNftLoaded,
      () => {
        if (nftState.isNftLoaded) {
          nftState.setLastUpdateTime();
        }
      }
    );
    const fetchData = async () => {
      // 10分钟间隔：600000
      if (
        nftState.isNftLoaded &&
        Date.now() - nftState.lastUpdateTime < 600000 * 1
      ) {
        setLoading(false);
        return;
      }
      nftState.resetNftList();
      nftList.value = [];
      const queryList = [[]] as any;
      let index = -1;
      for (
        let i = nftState.startNftToken;
        i < nftState.endNftToken + 1;
        i += 1
      ) {
        if (i % gas.value === 1) {
          index += 1;
          queryList[index] = [];
        }
        queryList[index].push(queryNftList(String(i)));
      }
      try {
        queryList.forEach((element: any, index: any) => {
          setTimeout(() => {
            Promise.allSettled(element).then((v) => {
              const nftInfo = v
                .filter((item) => item.status === 'fulfilled')
                .map((t: any) => {
                  return t.value.data.result;
                });
              nftState.setNftList(nftInfo);
              if (index === queryList.length - 1) {
                setLoading(false);
                if (
                  nftState.endNftToken - nftState.startNftToken ===
                  nftState.totalNft
                ) {
                  nftState.setLastUpdateTime();
                }
              }
            });
          }, index * 2500);
        });
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();

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
