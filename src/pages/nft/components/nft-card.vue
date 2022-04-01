<template>
  <a-card :style="{ width: '100%' }">
    <template #actions>
      <!-- <span class="icon-hover"> <IconThumbUp /> </span> -->
      <!-- <span class="icon-hover"> <IconShareInternal /> </span> -->
      <span class="icon-hover" @click="openKnowhereWeb(item?.tokenId)">
        <icon-link /> knowhere.art
      </span>
      <span
        ><a-tooltip background-color="var(--color-bg-1)">
          <template #content>
            <a-descriptions
              :data="item?.attributes"
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
          <a-button>{{ $t('nft.list.attribute') }}</a-button>
        </a-tooltip></span
      >
    </template>
    <template #cover>
      <a-image
        :src="ipfsImage(item?.image)"
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
          {{ item?.name }}
        </div>
      </template>
      <!-- <template #description>
        <a-typography-paragraph copyable :copy-text="item.access?.owner">
          {{ encodeAddress(item.sales?.[0]?.seller) }}
        </a-typography-paragraph>
      </template> -->
    </a-card-meta>
  </a-card>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { encodeAddress } from '@/utils';

export default defineComponent({
  props: {
    item: {
      type: Array as any,
    },
  },
  setup() {
    const visible = ref(false);
    const openKnowhereWeb = (tokenId: string | number) => {
      window.open(
        `https://knowhere.art/nft/terra14f5y8j5udr48a3prakm3j8st96u3rczuqtlc55/${tokenId}`,
        '_blank'
      );
    };

    const ipfsImage = (ipfs: string) => {
      if (ipfs) {
        return `https://knowhere.mypinata.cloud/${ipfs?.replace('://', '/')}`;
      }
      return '';
    };

    return {
      visible,
      encodeAddress,
      openKnowhereWeb,
      ipfsImage,
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
