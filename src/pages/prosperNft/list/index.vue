<template>
  <a-spin :loading="loading">
    <template #icon>
      <icon-sync />
    </template>
    <a-tabs position="top" style="margin: 20px">
      <a-tab-pane key="2" :title="$t('menu.prosper.nft.holder')">
        <Rarity />
      </a-tab-pane>
      <a-tab-pane key="3" :title="$t('menu.prosper.nft.rarity.info')">
        <RarityInfo />
      </a-tab-pane>
    </a-tabs>
  </a-spin>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import useLoading from '@/hooks/loading';
import Rarity from '../rarity/index.vue';
import RarityInfo from '../rarityInfo/index.vue';

export default defineComponent({
  components: {
    Rarity,
    RarityInfo,
  },
  setup() {
    const { loading, setLoading } = useLoading(false);
    return {
      loading,
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
