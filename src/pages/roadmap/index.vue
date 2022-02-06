<template>
  <div class="container">
    <div class="panel">
      <a-row>
        <a-col :offset="6" :span="12">
          <a-space direction="vertical">
            <a-typography>
              <a-typography-title :heading="3">
                {{ $t('menu.roadmap') }}
              </a-typography-title>
              <a-divider />
              <a-typography-title :heading="6" delete>
                <a-checkbox :default-checked="true" disabled></a-checkbox>
                {{ $t('roadmap.graph1') }}
              </a-typography-title>
              <a-typography-title :heading="6" delete>
                <a-checkbox :default-checked="true" disabled></a-checkbox>
                {{ $t('roadmap.graph2') }}
              </a-typography-title>
              <a-typography-title :heading="6" delete>
                <a-checkbox :default-checked="true" disabled></a-checkbox>
                {{ $t('roadmap.graph3') }}
              </a-typography-title>
              <a-typography-title :heading="6">
                <a-checkbox :default-checked="false" disabled></a-checkbox>
                {{ $t('roadmap.graph4') }}
              </a-typography-title>
              <a-typography-title :heading="6">
                <a-checkbox :default-checked="false" disabled></a-checkbox>
                {{ $t('roadmap.graph5') }}
              </a-typography-title>
              <a-typography-title :heading="6">
                <a-checkbox :default-checked="false" disabled></a-checkbox>
                {{ $t('roadmap.graph6') }}
              </a-typography-title>
            </a-typography>
          </a-space>
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({});
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
