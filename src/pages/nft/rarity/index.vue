<template>
  <a-card class="general-card" :bordered="false">
    <a-space direction="vertical" style="width:80vw">
      <a-alert :title="$t('nft.tiger.rarity.title')">{{ $t('nft.tiger.rarity.description') }}</a-alert>
      <a-input-search
        :style="{ width: '320px' }"
        :placeholder="$t('nft.tiger.rarity.placeholder')"
        search-button
        @search="doSearch"
      >
        <template #button-icon>
          <icon-search />
        </template>
        <template #button-default>
          {{ $t('nft.tiger.rarity.search') }}
        </template>
      </a-input-search>
      <div style="width:100%">
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
            :title="$t('nft.tiger.rarity.rank')"
            data-index="rank"
            :width="90"
            fixed="left"
            :sortable="{
              sortDirections: ['ascend', 'descend'],
            }"
          >
          </a-table-column>
          <a-table-column
            :title="$t('nft.tiger.rarity.score')"
            data-index="score"
            :width="80"
            fixed="left"
            :filterable="scoreFilter"
          >
          </a-table-column>
          <a-table-column
            :title="$t('nft.tiger.rarity.tokenId')"
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
            :title="$t('nft.tiger.rarity.image')"
            data-index="image"
            fixed="left"
            :width="100"
          >
            <template #cell="{ record }">
              <a-image width="80" :src="ipfsImage(record.image)" />
            </template>
          </a-table-column>
          <a-table-column
            :title="$t('nft.tiger.rarity.attr1')"
            data-index="attr1"
          >
            <template #cell="{ record }">
              {{ record.attributes[0].value }}
            </template>
          </a-table-column>
          <a-table-column
            :title="$t('nft.tiger.rarity.attr2')"
            data-index="attr2"
          >
            <template #cell="{ record }">
              {{ record.attributes[1].value }}
            </template>
          </a-table-column>
          <a-table-column
            :title="$t('nft.tiger.rarity.attr3')"
            data-index="attr3"
          >
            <template #cell="{ record }">
              {{ record.attributes[2].value }}
            </template>
          </a-table-column>
          <a-table-column
            :title="$t('nft.tiger.rarity.attr4')"
            data-index="attr4"
          >
            <template #cell="{ record }">
              {{ record.attributes[3].value }}
            </template>
          </a-table-column>
          <a-table-column
            :title="$t('nft.tiger.rarity.attr5')"
            data-index="attr5"
          >
            <template #cell="{ record }">
              {{ record.attributes[4].value }}
            </template>
          </a-table-column>
          <a-table-column
            :title="$t('nft.tiger.rarity.attr6')"
            data-index="attr6"
          >
            <template #cell="{ record }">
              {{ record.attributes[5].value }}
            </template>
          </a-table-column>
          <a-table-column
            :title="$t('nft.tiger.rarity.attr7')"
            data-index="attr7"
          >
            <template #cell="{ record }">
              {{ record.attributes[6].value }}
            </template>
          </a-table-column>
          <!-- <a-table-column
          :title="$t('nft.tiger.rarity.attributes')"
          data-index="attributes"
        >
        <template #cell="{ record }">
              <a-descriptions
              :data="record?.attributes"
              :column="7"
              layout="vertical"
              bordered
            >
              <template #label="{ data }">
                {{ data.trait_type }}
              </template>
              <template #value="{ data }">{{ data.value }}</template>
            </a-descriptions>
          </template>
        </a-table-column> -->
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
import { useNftState } from '@/store';

export default defineComponent({
  setup(props) {
    const nftStore = useNftState();
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
          text: '> 60',
          value: '60',
        },
        {
          text: '> 50',
          value: '50',
        },
        {
          text: '> 40',
          value: '40',
        },
        {
          text: '> 30',
          value: '30',
        },
      ],
      filter: (value: any, record: any) => record.score > value,
      multiple: false,
    });
    const tigerNftRarityList = ref([
      {
        score: 64.395,
        tokenId: '1384',
        name: 'Terra Tiger 1384',
        image: 'ipfs://QmYuFa4XLcpiqjDCiSpb1KCJS56vvX3e1nxy2Dn9qBjMJa',
        attributes: [
          {
            trait_type: '1 BACKGROUND',
            value: 'BROWN',
          },
          {
            trait_type: '2 WEAPONS',
            value: 'BLANK',
          },
          {
            trait_type: '3 SKINTONE',
            value: 'ORANGE',
          },
          {
            trait_type: '4 CLOTHES',
            value: 'MONK',
          },
          {
            trait_type: '5 FACE ATTRIBUTES',
            value: 'BLOODY EYES',
          },
          {
            trait_type: '6 HEADWEAR',
            value: 'HAT',
          },
          {
            trait_type: '7 HANDS',
            value: 'NONE',
          },
        ],
        rank: 5,
      },
      {
        score: 63.232,
        tokenId: '2064',
        name: 'Terra Tiger 2064',
        image: 'ipfs://QmWC49S8vKJ7qn3yYA9H8vdkWxF326PCaH8hT9pjXeJ1HE',
        attributes: [
          {
            trait_type: '1 BACKGROUND',
            value: 'BROWN',
          },
          {
            trait_type: '2 WEAPONS',
            value: 'WEAPON',
          },
          {
            trait_type: '3 SKINTONE',
            value: 'BROWN',
          },
          {
            trait_type: '4 CLOTHES',
            value: 'MONK',
          },
          {
            trait_type: '5 FACE ATTRIBUTES',
            value: 'NOSE RING',
          },
          {
            trait_type: '6 HEADWEAR',
            value: 'HAT',
          },
          {
            trait_type: '7 HANDS',
            value: 'NONE',
          },
        ],
        rank: 6,
      },
      {
        score: 62.5,
        tokenId: '2249',
        name: 'Terra Tiger 2249',
        image: 'ipfs://QmcmTvgaSCQd3ysg8UGkwraLhNvUwsfXacNsisj2oJr9Qb',
        attributes: [
          {
            trait_type: '1 BACKGROUND',
            value: 'BROWN',
          },
          {
            trait_type: '2 WEAPONS',
            value: 'BLANK',
          },
          {
            trait_type: '3 SKINTONE',
            value: 'BROWN',
          },
          {
            trait_type: '4 CLOTHES',
            value: 'ARMOR',
          },
          {
            trait_type: '5 FACE ATTRIBUTES',
            value: 'GUN GLASSES',
          },
          {
            trait_type: '6 HEADWEAR',
            value: 'HAT',
          },
          {
            trait_type: '7 HANDS',
            value: 'NONE',
          },
        ],
        rank: 7,
      },
      {
        score: 62.499,
        tokenId: '2408',
        name: 'Terra Tiger 2408',
        image: 'ipfs://QmbVMjzG6f8hRW1MZoJbbvX8bDUZUF7tTmn6QbShTL79NA',
        attributes: [
          {
            trait_type: '1 BACKGROUND',
            value: 'BROWN',
          },
          {
            trait_type: '2 WEAPONS',
            value: 'WEAPON',
          },
          {
            trait_type: '3 SKINTONE',
            value: 'BLUE',
          },
          {
            trait_type: '4 CLOTHES',
            value: 'MONK',
          },
          {
            trait_type: '5 FACE ATTRIBUTES',
            value: 'GUN GLASSES',
          },
          {
            trait_type: '6 HEADWEAR',
            value: 'HAT',
          },
          {
            trait_type: '7 HANDS',
            value: 'HANDS2',
          },
        ],
        rank: 8,
      },
      {
        score: 59.314,
        tokenId: '2270',
        name: 'Terra Tiger 2270',
        image: 'ipfs://Qmazkkcat9vnx8e7RSJ7uAJKFmmV3HoeryuibVQjnAGmVu',
        attributes: [
          {
            trait_type: '1 BACKGROUND',
            value: 'RED',
          },
          {
            trait_type: '2 WEAPONS',
            value: 'BLANK',
          },
          {
            trait_type: '3 SKINTONE',
            value: 'BROWN',
          },
          {
            trait_type: '4 CLOTHES',
            value: 'MONK',
          },
          {
            trait_type: '5 FACE ATTRIBUTES',
            value: 'NOSE RING',
          },
          {
            trait_type: '6 HEADWEAR',
            value: 'HAT',
          },
          {
            trait_type: '7 HANDS',
            value: 'HANDS2',
          },
        ],
        rank: 9,
      },
      {
        score: 58.831,
        tokenId: '2948',
        name: 'Terra Tiger 2948',
        image: 'ipfs://QmUKGiJBTWm6AsNP7JbRa8mZ1Dsvssbwsz68BsGZPHxFFZ',
        attributes: [
          {
            trait_type: '1 BACKGROUND',
            value: 'BLUE',
          },
          {
            trait_type: '2 WEAPONS',
            value: 'WEAPON',
          },
          {
            trait_type: '3 SKINTONE',
            value: 'ORANGE',
          },
          {
            trait_type: '4 CLOTHES',
            value: 'MONK',
          },
          {
            trait_type: '5 FACE ATTRIBUTES',
            value: 'BLOODY EYES',
          },
          {
            trait_type: '6 HEADWEAR',
            value: 'HAT',
          },
          {
            trait_type: '7 HANDS',
            value: 'HANDS2',
          },
        ],
        rank: 10,
      },
      {
        score: 58.46,
        tokenId: '1642',
        name: 'Terra Tiger 1642',
        image: 'ipfs://QmdpFq7g3L6wAJW4NpuCEHEWgi5ruSaErbNwmvYmVJuoCk',
        attributes: [
          {
            trait_type: '1 BACKGROUND',
            value: 'BROWN',
          },
          {
            trait_type: '2 WEAPONS',
            value: 'WEAPON',
          },
          {
            trait_type: '3 SKINTONE',
            value: 'BLUE',
          },
          {
            trait_type: '4 CLOTHES',
            value: 'ARMOR',
          },
          {
            trait_type: '5 FACE ATTRIBUTES',
            value: 'GUN GLASSES',
          },
          {
            trait_type: '6 HEADWEAR',
            value: 'NONE',
          },
          {
            trait_type: '7 HANDS',
            value: 'HANDS2',
          },
        ],
        rank: 11,
      },
      {
        score: 58.194,
        tokenId: '358',
        name: 'Terra Tiger 358',
        image: 'ipfs://QmbX4AhEhtMo9vpLX29AEhXtfqFxWGtNyHWcUMj7mBj5U6',
        attributes: [
          {
            trait_type: '1 BACKGROUND',
            value: 'BLUE',
          },
          {
            trait_type: '2 WEAPONS',
            value: 'BLANK',
          },
          {
            trait_type: '3 SKINTONE',
            value: 'BROWN',
          },
          {
            trait_type: '4 CLOTHES',
            value: 'ROBE',
          },
          {
            trait_type: '5 FACE ATTRIBUTES',
            value: 'BLOODY EYES',
          },
          {
            trait_type: '6 HEADWEAR',
            value: 'HAT',
          },
          {
            trait_type: '7 HANDS',
            value: 'NONE',
          },
        ],
        rank: 12,
      },
      {
        score: 57.727,
        tokenId: '1811',
        name: 'Terra Tiger 1811',
        image: 'ipfs://QmQkhQcerP8vnpvpekTEygxrpo9zcys3jA9a1D6MG5qxFi',
        attributes: [
          {
            trait_type: '1 BACKGROUND',
            value: 'BROWN',
          },
          {
            trait_type: '2 WEAPONS',
            value: 'WEAPON',
          },
          {
            trait_type: '3 SKINTONE',
            value: 'BROWN',
          },
          {
            trait_type: '4 CLOTHES',
            value: 'SHIRT',
          },
          {
            trait_type: '5 FACE ATTRIBUTES',
            value: 'NOSE RING',
          },
          {
            trait_type: '6 HEADWEAR',
            value: 'HAT',
          },
          {
            trait_type: '7 HANDS',
            value: 'HANDS2',
          },
        ],
        rank: 123,
      },
      {
        score: 57.513,
        tokenId: '1543',
        name: 'Terra Tiger 1543',
        image: 'ipfs://QmYdXqSq1yFyvBEsjnP72zP8n8D9LkKADrucxwsKXNAMgc',
        attributes: [
          {
            trait_type: '1 BACKGROUND',
            value: 'RED',
          },
          {
            trait_type: '2 WEAPONS',
            value: 'BLANK',
          },
          {
            trait_type: '3 SKINTONE',
            value: 'BROWN',
          },
          {
            trait_type: '4 CLOTHES',
            value: 'SLEEVELESS',
          },
          {
            trait_type: '5 FACE ATTRIBUTES',
            value: 'BLOODY EYES',
          },
          {
            trait_type: '6 HEADWEAR',
            value: 'HAT',
          },
          {
            trait_type: '7 HANDS',
            value: 'NONE',
          },
        ],
        rank: 1004,
      },
    ]);
    const nftRarityList = ref(nftStore.tigerNftRarityRank);
    const ipfsImage = (ipfs: string) => {
      if (ipfs) {
        return `https://knowhere.mypinata.cloud/${ipfs?.replace('://', '/')}`;
      }
      return '';
    };

    const openWeb = (tokenId: string) => {
      window.open(
        `https://knowhere.art/nft/terra14f5y8j5udr48a3prakm3j8st96u3rczuqtlc55/${tokenId}`,
        '_blank'
      );
    };

    const doSearch = (value: any) => {
      if (value) {
        const nft = nftStore.tigerNftRarityRank.find((v: any) => {
          return v.tokenId === Number(value);
        });
        if (nft) {
          nftRarityList.value = [nft]
        } else {
          nftRarityList.value = []
        }
      } else {
        nftRarityList.value = nftStore.tigerNftRarityRank;
      }
    };

    return {
      doSearch,
      openWeb,
      nftRarityList,
      rankFilter,
      scoreFilter,
      tigerNftRarityList,
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
