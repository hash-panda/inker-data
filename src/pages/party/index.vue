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
        <div><party-info /> </div>
      </a-space>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { usePartyState } from '@/store/modules/party';
import PartyInfo from './components/party-info.vue';
import DataOverview from './components/data-overview.vue';

export default defineComponent({
  components: {
    PartyInfo,
    DataOverview,
  },
  setup() {
    const partyState = usePartyState();
    partyState.getPartyInfo();
    return {};
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
