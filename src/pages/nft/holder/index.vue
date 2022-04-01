<template>
  <div class="container">
    <div class="left-side">
      <a-space direction="vertical" size="large" fill>
        <a-card
          class="general-card"
          :header-style="{ paddingBottom: '0' }"
          :body-style="{ padding: '30px' }"
        >
          <a-row>
            <a-col :flex="1">
              <data-overview />
            </a-col>
          </a-row>
        </a-card>
        <div>
          <!-- <nft-holder-info :nft-holders="nftState.nftHolderAnalysis" /> -->
        </div>
      </a-space>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent, computed, watch } from 'vue';
import useLoading from '@/hooks/loading';
import { useNftState } from '@/store';
// import NftHolderInfo from './components/nft-holder-info.vue';
import DataOverview from './components/data-overview.vue';

export default defineComponent({
  components: {
    // NftHolderInfo,
    DataOverview,
  },
  setup() {
    const { loading, setLoading } = useLoading(true);
    const nftState = useNftState();

    return {
      loading,
      nftState,
    };
  },
});
</script>

<style scoped lang="less">
.container {
  background-color: var(--color-fill-2);
  padding: 16px 20px;
  display: flex;
}

.select-profile {
  width: '100%';
  background: var(--color-bg-2);
}
.left-side {
  flex: 1;
  overflow: auto;
}

.panel {
  background-color: var(--color-bg-2);
  border-radius: 4px;
  overflow: auto;
}
</style>
