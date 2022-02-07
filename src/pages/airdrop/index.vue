<template>
  <div class="container">
    <div class="panel">
      <a-row>
        <a-col :offset="6" :span="12">
          <a-space direction="vertical">
            <a-typography>
              <a-typography-title :heading="3">
                {{ $t('menu.airdrop') }}
              </a-typography-title>
              <a-divider />
              <a-typography-paragraph>
                {{ $t('airdrop.graph') }}
              </a-typography-paragraph>
            </a-typography>
            <a-button type="outline" @click="gotoInkProtocolDocs"
              >Open Ink-Protocol Docs</a-button
            >
            <a-image width="600" :src="airdropInfo" />
            <a-image width="600" :src="miniDeposit" />
          </a-space>
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import airdropInfo from '@/assets/images/airdrop-info.png';
import miniDeposit from '@/assets/images/mini-deposit.png';
import { gotoInkProtocolDocs } from '@/utils';

export default defineComponent({
  setup() {
    return {
      gotoInkProtocolDocs,
      airdropInfo,
      miniDeposit,
    };
  },
});
</script>

<style lang="less" scoped>
.container {
  background-color: var(--color-fill-2);
  padding: 16px 20px;
  display: flex;
}

.panel {
  background-color: var(--color-bg-2);
  border-radius: 4px;
  width: 100%;
  padding: 16px 20px 36px 20px;
  overflow: auto;
}
</style>
