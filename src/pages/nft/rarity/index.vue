<template>
  <a-card class="general-card" :bordered="false">
    <a-table
      :data="nftStore.tigerNftRarityRankPagenationList"
      :pagination="true"
      :split="false"
    >
      <template #columns>
        <a-table-column :title="$t('nft.tiger.rarity.rank')" data-index="rank">
        </a-table-column>
        <a-table-column
          :title="$t('nft.tiger.rarity.tokenId')"
          data-index="tokenId"
        >
        </a-table-column>
        <a-table-column
          :title="$t('nft.tiger.rarity.image')"
          data-index="image"
        >
        <template #cell="{ record }">
        <a-image
    width="100"
    :src="ipfsImage(record.image)"
  />
          </template>
        </a-table-column>
        <a-table-column
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
        </a-table-column>
        <a-table-column
          :title="$t('nft.tiger.rarity.score')"
          data-index="score"
        >
        </a-table-column>
      </template>
    </a-table>
  </a-card>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import {useNftState} from '@/store'

export default defineComponent({
  
  setup(props) {
      const nftStore = useNftState();
    const tigerNftRarityList = ref([
{
    score: 63.232,
    tokenId: "2064",
    name: "Terra Tiger 2064",
    image: "ipfs://QmWC49S8vKJ7qn3yYA9H8vdkWxF326PCaH8hT9pjXeJ1HE",
    attributes: [
      {
        trait_type: "1 BACKGROUND",
        value: "BROWN",
      },
      {
        trait_type: "2 WEAPONS",
        value: "WEAPON",
      },
      {
        trait_type: "3 SKINTONE",
        value: "BROWN",
      },
      {
        trait_type: "4 CLOTHES",
        value: "MONK",
      },
      {
        trait_type: "5 FACE ATTRIBUTES",
        value: "NOSE RING",
      },
      {
        trait_type: "6 HEADWEAR",
        value: "HAT",
      },
      {
        trait_type: "7 HANDS",
        value: "NONE",
      },
    ],
  },
  {
    score: 62.5,
    tokenId: "2249",
    name: "Terra Tiger 2249",
    image: "ipfs://QmcmTvgaSCQd3ysg8UGkwraLhNvUwsfXacNsisj2oJr9Qb",
    attributes: [
      {
        trait_type: "1 BACKGROUND",
        value: "BROWN",
      },
      {
        trait_type: "2 WEAPONS",
        value: "BLANK",
      },
      {
        trait_type: "3 SKINTONE",
        value: "BROWN",
      },
      {
        trait_type: "4 CLOTHES",
        value: "ARMOR",
      },
      {
        trait_type: "5 FACE ATTRIBUTES",
        value: "GUN GLASSES",
      },
      {
        trait_type: "6 HEADWEAR",
        value: "HAT",
      },
      {
        trait_type: "7 HANDS",
        value: "NONE",
      },
    ],
  },
  {
    score: 62.499,
    tokenId: "2408",
    name: "Terra Tiger 2408",
    image: "ipfs://QmbVMjzG6f8hRW1MZoJbbvX8bDUZUF7tTmn6QbShTL79NA",
    attributes: [
      {
        trait_type: "1 BACKGROUND",
        value: "BROWN",
      },
      {
        trait_type: "2 WEAPONS",
        value: "WEAPON",
      },
      {
        trait_type: "3 SKINTONE",
        value: "BLUE",
      },
      {
        trait_type: "4 CLOTHES",
        value: "MONK",
      },
      {
        trait_type: "5 FACE ATTRIBUTES",
        value: "GUN GLASSES",
      },
      {
        trait_type: "6 HEADWEAR",
        value: "HAT",
      },
      {
        trait_type: "7 HANDS",
        value: "HANDS2",
      },
    ],
  },
  {
    score: 59.314,
    tokenId: "2270",
    name: "Terra Tiger 2270",
    image: "ipfs://Qmazkkcat9vnx8e7RSJ7uAJKFmmV3HoeryuibVQjnAGmVu",
    attributes: [
      {
        trait_type: "1 BACKGROUND",
        value: "RED",
      },
      {
        trait_type: "2 WEAPONS",
        value: "BLANK",
      },
      {
        trait_type: "3 SKINTONE",
        value: "BROWN",
      },
      {
        trait_type: "4 CLOTHES",
        value: "MONK",
      },
      {
        trait_type: "5 FACE ATTRIBUTES",
        value: "NOSE RING",
      },
      {
        trait_type: "6 HEADWEAR",
        value: "HAT",
      },
      {
        trait_type: "7 HANDS",
        value: "HANDS2",
      },
    ],
  },
  {
    score: 58.831,
    tokenId: "2948",
    name: "Terra Tiger 2948",
    image: "ipfs://QmUKGiJBTWm6AsNP7JbRa8mZ1Dsvssbwsz68BsGZPHxFFZ",
    attributes: [
      {
        trait_type: "1 BACKGROUND",
        value: "BLUE",
      },
      {
        trait_type: "2 WEAPONS",
        value: "WEAPON",
      },
      {
        trait_type: "3 SKINTONE",
        value: "ORANGE",
      },
      {
        trait_type: "4 CLOTHES",
        value: "MONK",
      },
      {
        trait_type: "5 FACE ATTRIBUTES",
        value: "BLOODY EYES",
      },
      {
        trait_type: "6 HEADWEAR",
        value: "HAT",
      },
      {
        trait_type: "7 HANDS",
        value: "HANDS2",
      },
    ],
  },
  {
    score: 58.46,
    tokenId: "1642",
    name: "Terra Tiger 1642",
    image: "ipfs://QmdpFq7g3L6wAJW4NpuCEHEWgi5ruSaErbNwmvYmVJuoCk",
    attributes: [
      {
        trait_type: "1 BACKGROUND",
        value: "BROWN",
      },
      {
        trait_type: "2 WEAPONS",
        value: "WEAPON",
      },
      {
        trait_type: "3 SKINTONE",
        value: "BLUE",
      },
      {
        trait_type: "4 CLOTHES",
        value: "ARMOR",
      },
      {
        trait_type: "5 FACE ATTRIBUTES",
        value: "GUN GLASSES",
      },
      {
        trait_type: "6 HEADWEAR",
        value: "NONE",
      },
      {
        trait_type: "7 HANDS",
        value: "HANDS2",
      },
    ],
  },
  {
    score: 58.194,
    tokenId: "358",
    name: "Terra Tiger 358",
    image: "ipfs://QmbX4AhEhtMo9vpLX29AEhXtfqFxWGtNyHWcUMj7mBj5U6",
    attributes: [
      {
        trait_type: "1 BACKGROUND",
        value: "BLUE",
      },
      {
        trait_type: "2 WEAPONS",
        value: "BLANK",
      },
      {
        trait_type: "3 SKINTONE",
        value: "BROWN",
      },
      {
        trait_type: "4 CLOTHES",
        value: "ROBE",
      },
      {
        trait_type: "5 FACE ATTRIBUTES",
        value: "BLOODY EYES",
      },
      {
        trait_type: "6 HEADWEAR",
        value: "HAT",
      },
      {
        trait_type: "7 HANDS",
        value: "NONE",
      },
    ],
  },
  {
    score: 57.727,
    tokenId: "1811",
    name: "Terra Tiger 1811",
    image: "ipfs://QmQkhQcerP8vnpvpekTEygxrpo9zcys3jA9a1D6MG5qxFi",
    attributes: [
      {
        trait_type: "1 BACKGROUND",
        value: "BROWN",
      },
      {
        trait_type: "2 WEAPONS",
        value: "WEAPON",
      },
      {
        trait_type: "3 SKINTONE",
        value: "BROWN",
      },
      {
        trait_type: "4 CLOTHES",
        value: "SHIRT",
      },
      {
        trait_type: "5 FACE ATTRIBUTES",
        value: "NOSE RING",
      },
      {
        trait_type: "6 HEADWEAR",
        value: "HAT",
      },
      {
        trait_type: "7 HANDS",
        value: "HANDS2",
      },
    ],
  },
  {
    score: 57.513,
    tokenId: "1543",
    name: "Terra Tiger 1543",
    image: "ipfs://QmYdXqSq1yFyvBEsjnP72zP8n8D9LkKADrucxwsKXNAMgc",
    attributes: [
      {
        trait_type: "1 BACKGROUND",
        value: "RED",
      },
      {
        trait_type: "2 WEAPONS",
        value: "BLANK",
      },
      {
        trait_type: "3 SKINTONE",
        value: "BROWN",
      },
      {
        trait_type: "4 CLOTHES",
        value: "SLEEVELESS",
      },
      {
        trait_type: "5 FACE ATTRIBUTES",
        value: "BLOODY EYES",
      },
      {
        trait_type: "6 HEADWEAR",
        value: "HAT",
      },
      {
        trait_type: "7 HANDS",
        value: "NONE",
      },
    ],
  },
  {
    score: 57.354,
    tokenId: "2031",
    name: "Terra Tiger 2031",
    image: "ipfs://QmTStWXiodQNxwKuTiVved2RKkxMQUs3Mz8xnKfsBJVtR4",
    attributes: [
      {
        trait_type: "1 BACKGROUND",
        value: "BLUE",
      },
      {
        trait_type: "2 WEAPONS",
        value: "BLANK",
      },
      {
        trait_type: "3 SKINTONE",
        value: "BLUE",
      },
      {
        trait_type: "4 CLOTHES",
        value: "MONK",
      },
      {
        trait_type: "5 FACE ATTRIBUTES",
        value: "BLOODY EYES",
      },
      {
        trait_type: "6 HEADWEAR",
        value: "HAT",
      },
      {
        trait_type: "7 HANDS",
        value: "HANDS",
      },
    ],
  },
  {
    score: 56.899,
    tokenId: "2210",
    name: "Terra Tiger 2210",
    image: "ipfs://QmagFp4BF5CNE5FFPZRkHB5Ufv5jScCDkXoHmkES4XTswZ",
    attributes: [
      {
        trait_type: "1 BACKGROUND",
        value: "BLUE",
      },
      {
        trait_type: "2 WEAPONS",
        value: "WEAPON",
      },
      {
        trait_type: "3 SKINTONE",
        value: "BROWN",
      },
      {
        trait_type: "4 CLOTHES",
        value: "MONK",
      },
      {
        trait_type: "5 FACE ATTRIBUTES",
        value: "GUN GLASSES",
      },
      {
        trait_type: "6 HEADWEAR",
        value: "NONE",
      },
      {
        trait_type: "7 HANDS",
        value: "HANDS",
      },
    ],
  },
  {
    score: 56.593,
    tokenId: "1870",
    name: "Terra Tiger 1870",
    image: "ipfs://QmP5bSKF9Xga6fC78psHHCbcSdNCMUWw8pvpM929CuDhCJ",
    attributes: [
      {
        trait_type: "1 BACKGROUND",
        value: "RED",
      },
      {
        trait_type: "2 WEAPONS",
        value: "WEAPON",
      },
      {
        trait_type: "3 SKINTONE",
        value: "BROWN",
      },
      {
        trait_type: "4 CLOTHES",
        value: "ARMOR",
      },
      {
        trait_type: "5 FACE ATTRIBUTES",
        value: "GUN GLASSES",
      },
      {
        trait_type: "6 HEADWEAR",
        value: "NONE",
      },
      {
        trait_type: "7 HANDS",
        value: "HANDS2",
      },
    ],
  },
  {
    score: 56.484,
    tokenId: "1401",
    name: "Terra Tiger 1401",
    image: "ipfs://QmWQHVXnfSKJLdfoJRVk86WBvyGqMxy2aJzuY97e2bo9as",
    attributes: [
      {
        trait_type: "1 BACKGROUND",
        value: "GREEN",
      },
      {
        trait_type: "2 WEAPONS",
        value: "WEAPON",
      },
      {
        trait_type: "3 SKINTONE",
        value: "BROWN",
      },
      {
        trait_type: "4 CLOTHES",
        value: "ROBE",
      },
      {
        trait_type: "5 FACE ATTRIBUTES",
        value: "BLOODY EYES",
      },
      {
        trait_type: "6 HEADWEAR",
        value: "NONE",
      },
      {
        trait_type: "7 HANDS",
        value: "HANDS",
      },
    ],
  },
  {
    score: 56.303,
    tokenId: "283",
    name: "Terra Tiger 283",
    image: "ipfs://QmYrhPNgPuvF988kiP8AasMDKib8oscABU7Hmk1ATj2mnG",
    attributes: [
      {
        trait_type: "1 BACKGROUND",
        value: "RED",
      },
      {
        trait_type: "2 WEAPONS",
        value: "BLANK",
      },
      {
        trait_type: "3 SKINTONE",
        value: "BROWN",
      },
      {
        trait_type: "4 CLOTHES",
        value: "MONK",
      },
      {
        trait_type: "5 FACE ATTRIBUTES",
        value: "GUN GLASSES",
      },
      {
        trait_type: "6 HEADWEAR",
        value: "NONE",
      },
      {
        trait_type: "7 HANDS",
        value: "HANDS",
      },
    ],
  },
  {
    score: 55.982,
    tokenId: "39",
    name: "Terra Tiger 39",
    image: "ipfs://QmVcR4xYr1TM4fQQyfKurVAhLL2YmQQuXPoBHYhidyNXc9",
    attributes: [
      {
        trait_type: "1 BACKGROUND",
        value: "BROWN",
      },
      {
        trait_type: "2 WEAPONS",
        value: "WEAPON",
      },
      {
        trait_type: "3 SKINTONE",
        value: "ORANGE",
      },
      {
        trait_type: "4 CLOTHES",
        value: "ARMOR",
      },
      {
        trait_type: "5 FACE ATTRIBUTES",
        value: "BLOODY EYES",
      },
      {
        trait_type: "6 HEADWEAR",
        value: "NONE",
      },
      {
        trait_type: "7 HANDS",
        value: "HANDS",
      },
    ],
  },
  {
    score: 55.729,
    tokenId: "433",
    name: "Terra Tiger 433",
    image: "ipfs://QmPS7J3ompGpuo6NEQiWRaNo7gkxBrRa5oTapsGorAtMNg",
    attributes: [
      {
        trait_type: "1 BACKGROUND",
        value: "BROWN",
      },
      {
        trait_type: "2 WEAPONS",
        value: "BLANK",
      },
      {
        trait_type: "3 SKINTONE",
        value: "ORANGE",
      },
      {
        trait_type: "4 CLOTHES",
        value: "ARMOR",
      },
      {
        trait_type: "5 FACE ATTRIBUTES",
        value: "BLOODY EYES",
      },
      {
        trait_type: "6 HEADWEAR",
        value: "HAT",
      },
      {
        trait_type: "7 HANDS",
        value: "HANDS",
      },
    ],
  },
    ])

    const ipfsImage = (ipfs: string) => {
      if (ipfs) {
        return `https://knowhere.mypinata.cloud/${ipfs?.replace('://', '/')}`;
      }
      return '';
    };

    return {
      tigerNftRarityList,
      ipfsImage,
      nftStore
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
