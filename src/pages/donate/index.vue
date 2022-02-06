<template>
  <div class="container">
    <div class="panel">
      <a-row>
        <a-col :offset="6" :span="12">
          <a-space direction="vertical">
            <a-typography>
              <a-typography-title :heading="3">
                {{ $t('menu.donate') }}
              </a-typography-title>
              <a-divider />
              <a-typography-paragraph>
                {{ $t('donate.graph') }}
              </a-typography-paragraph>
              <a-typography-title :heading="5">
                Terra Wallet Address
              </a-typography-title>
              <a-typography-paragraph type="primary" copyable>
                terra1waxjvmkyu8rr6qk55ahw6kz9hrmyx5evyld6ra
              </a-typography-paragraph>
            </a-typography>
            <a-button type="outline" @click="gotoTerraStation"
              >Open Terra Station</a-button
            >
            <a-image width="200" :src="terraAddressQrCode" />
          </a-space>
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import terraAddressQrCode from '@/assets/images/terra-address.png';
import { gotoTerraStation } from '@/utils';

export default defineComponent({
  setup() {
    return {
      gotoTerraStation,
      terraAddressQrCode,
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
