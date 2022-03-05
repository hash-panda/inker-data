<template>
  <a-spin :loading="loading">
    <template #icon>
      <icon-sync />
    </template>
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
        <a-col v-for="(item, index) in currentPageNfts" :key="index" span="6">
          <a-card :style="{ width: '100%' }">
            <template #actions>
              <!-- <span class="icon-hover"> <IconThumbUp /> </span> -->
              <!-- <span class="icon-hover"> <IconShareInternal /> </span> -->
              <span class="icon-hover" @click="openKnowhereWeb">
                <icon-link /> knowhere.art
              </span>
              <span
                ><a-tooltip background-color="var(--color-bg-1)">
                  <template #content>
                    <a-descriptions
                      :data="item.info?.extension?.attributes"
                      title="Attributes"
                      :column="2"
                      layout="vertical"
                      bordered
                    >
                      <template #label="{ data }">
                        {{ data.trait_type }}
                      </template>
                      <template #value="{ data }">{{ data.value }}</template>
                    </a-descriptions>
                  </template>
                  <a-button>属性</a-button>
                </a-tooltip></span
              >
            </template>
            <template #cover>
              <a-image
                :src="ipfsImage(item.info?.extension?.image)"
                width="100%"
                footer-position="outer"
                :preview-visible="visible"
                @preview-visible-change="
                  () => {
                    visible = false;
                  }
                "
              >
              </a-image>
            </template>
            <a-card-meta>
              <template #title>
                <div style="color: rgb(var(--primary-6))">
                  {{ item.info?.extension?.name }}
                </div>
              </template>
              <template #description>
                <a-typography-paragraph
                  copyable
                  :copy-text="item.access?.owner"
                >
                  {{ encodeAddress(item.access?.owner) }}
                </a-typography-paragraph>
              </template>
            </a-card-meta>
          </a-card>
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
  </a-spin>
</template>

<script lang="ts">
import { queryNftList } from '@/api/nft';
import { ref, defineComponent, computed, watch } from 'vue';
import useLoading from '@/hooks/loading';
import { useNftState } from '@/store';
import { encodeAddress } from '@/utils';

export default defineComponent({
  setup() {
    const { loading, setLoading } = useLoading(true);
    const nftState = useNftState();
    const visible = ref(false);
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
      if (Date.now() - nftState.lastUpdateTime < 600000) {
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
                console.log(
                  'end.value - start.value === nftState.totalNft',
                  nftState.endNftToken - nftState.startNftToken,
                  nftState.totalNft,
                  nftState.endNftToken - nftState.startNftToken ===
                    nftState.totalNft
                );
                if (
                  nftState.endNftToken - nftState.startNftToken ===
                  nftState.totalNft
                ) {
                  nftState.setLastUpdateTime();
                }
              }
            });
          }, index * 3000);
        });
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();

    const ipfsImage = (ipfs: string) => {
      return `https://knowhere.mypinata.cloud/ipfs/${ipfs.slice(7)}`;
    };

    const onCurrentPageChange = (page: number) => {
      currentPageIndex.value = page;
    };

    const openKnowhereWeb = () => {
      window.open(
        'https://knowhere.art/collection/terra14f5y8j5udr48a3prakm3j8st96u3rczuqtlc55',
        '_blank'
      );
    };

    return {
      openKnowhereWeb,
      onCurrentPageChange,
      encodeAddress,
      currentPageNfts,
      ipfsImage,
      loading,
      visible,
      nftList,
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
