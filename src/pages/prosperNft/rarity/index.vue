<template>
  <a-card class="general-card" :bordered="false">
    <a-space direction="vertical" style="width: 80vw">
      <a-alert :title="$t('nft.prosper.rarity.title')">{{
        $t('nft.prosper.rarity.description')
      }}</a-alert>
      <a-input-search
        :style="{ width: '320px' }"
        :placeholder="$t('nft.prosper.rarity.placeholder')"
        search-button
        @search="doSearch"
      >
        <template #button-icon>
          <icon-search />
        </template>
        <template #button-default>
          {{ $t('nft.prosper.rarity.search') }}
        </template>
      </a-input-search>
      <div style="width: 100%">
        <a-row class="grid-demo">
          <a-col :span="24">
            <a-table
              :data="nftRarityList"
              :pagination="true"
              :split="false"
              :filter-icon-align-left="true"
              size="medium"
            >
              <template #columns>
                <a-table-column
                  :title="$t('nft.prosper.rarity.rank')"
                  data-index="rank"
                  :width="90"
                  fixed="left"
                  :sortable="{
                    sortDirections: ['ascend', 'descend'],
                  }"
                >
                </a-table-column>
                <a-table-column
                  :title="$t('nft.prosper.rarity.score')"
                  data-index="score"
                  :width="80"
                  fixed="left"
                  :filterable="scoreFilter"
                >
                </a-table-column>
                <a-table-column
                  :title="$t('nft.prosper.rarity.tokenId')"
                  data-index="tokenId"
                  :width="120"
                  fixed="left"
                  :sortable="{
                    sortDirections: ['ascend', 'descend'],
                  }"
                >
                  <template #cell="{ record }">
                    <a-button type="text" @click="openWeb(record.tokenId)">{{
                      record.tokenId
                    }}</a-button>
                  </template>
                </a-table-column>
                <a-table-column
                  :title="$t('nft.prosper.rarity.image')"
                  data-index="image"
                  fixed="left"
                  :width="100"
                >
                  <template #cell="{ record }">
                    <a-image width="80" :src="ipfsImage(record.image)" />
                  </template>
                </a-table-column>
                <a-table-column
                  :title="$t('nft.prosper.rarity.attr1')"
                  data-index="attr1"
                >
                  <template #cell="{ record }">
                    {{ record.attributes[0].value }}
                  </template>
                </a-table-column>
                <a-table-column
                  :title="$t('nft.prosper.rarity.attr2')"
                  data-index="attr2"
                >
                  <template #cell="{ record }">
                    {{ record.attributes[1].value }}
                  </template>
                </a-table-column>
                <a-table-column
                  :title="$t('nft.prosper.rarity.attr3')"
                  data-index="attr3"
                >
                  <template #cell="{ record }">
                    {{ record.attributes[2].value }}
                  </template>
                </a-table-column>
                <a-table-column
                  :title="$t('nft.prosper.rarity.attr4')"
                  data-index="attr4"
                >
                  <template #cell="{ record }">
                    {{ record.attributes[3].value }}
                  </template>
                </a-table-column>
                <a-table-column
                  :title="$t('nft.prosper.rarity.attr5')"
                  data-index="attr5"
                >
                  <template #cell="{ record }">
                    {{ record.attributes[4].value }}
                  </template>
                </a-table-column>
                <a-table-column
                  :title="$t('nft.prosper.rarity.attr6')"
                  data-index="attr6"
                >
                  <template #cell="{ record }">
                    {{ record.attributes[5].value }}
                  </template>
                </a-table-column>
                <a-table-column
                  :title="$t('nft.prosper.rarity.attr7')"
                  data-index="attr7"
                >
                  <template #cell="{ record }">
                    {{ record.attributes[6].value }}
                  </template>
                </a-table-column>
                <a-table-column
                  :title="$t('nft.prosper.rarity.attr8')"
                  data-index="attr8"
                >
                  <template #cell="{ record }">
                    {{ record.attributes[7].value }}
                  </template>
                </a-table-column>
              </template>
            </a-table>
          </a-col>
        </a-row>
      </div>
    </a-space>
  </a-card>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useProsperNftState } from '@/store';

export default defineComponent({
  setup(props) {
    const nftStore = useProsperNftState();
    const rankFilter = ref({
      filters: [
        {
          text: '< 10',
          value: '10',
        },
        {
          text: '< 50',
          value: '50',
        },
        {
          text: '< 500',
          value: '500',
        },
        {
          text: '< 1000',
          value: '1000',
        },
      ],
      filter: (value: any, record: any) => record.rank < value,
      multiple: false,
    });
    const scoreFilter = ref({
      filters: [
        {
          text: '> 100',
          value: '100',
        },
        {
          text: '> 80',
          value: '80',
        },
        {
          text: '> 50',
          value: '50',
        },
        {
          text: '> 30',
          value: '30',
        },
      ],
      filter: (value: any, record: any) => record.score > value,
      multiple: false,
    });
    const nftRarityList = ref(nftStore.prosperNftRarityRank);
    const ipfsImage = (ipfs: string) => {
      if (ipfs) {
        return `https://knowhere.mypinata.cloud/${ipfs?.replace('://', '/')}`;
      }
      return '';
    };

    const openWeb = (tokenId: string) => {
      window.open(
        `https://knowhere.art/nft/terra1qd2djwhrc9prwztsf6t6necs9f5scdwksvs6ad/${tokenId}`,
        '_blank'
      );
    };

    const doSearch = (value: any) => {
      if (value) {
        const nft = nftStore.prosperNftRarityRank.find((v: any) => {
          return v.tokenId === Number(value);
        });
        if (nft) {
          nftRarityList.value = [nft];
        } else {
          nftRarityList.value = [];
        }
      } else {
        nftRarityList.value = nftStore.prosperNftRarityRank;
      }
    };

    return {
      doSearch,
      openWeb,
      nftRarityList,
      rankFilter,
      scoreFilter,
      ipfsImage,
      nftStore,
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
