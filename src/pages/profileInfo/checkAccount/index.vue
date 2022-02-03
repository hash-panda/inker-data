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
            <a-col :flex="3"></a-col>
            <a-col :flex="6">
              <a-input-search
                :style="{ width: '100%' }"
                placeholder="Please enter account..."
                button-text="Search"
                size="large"
                search-button
              />
            </a-col>
            <a-col :flex="3"></a-col>
          </a-row>
        </a-card>
        <div class="panel"><award-info /> </div>
        <div class="panel"><account-info /> </div>
      </a-space>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import AccountInfo from '../components/account-info.vue';
import AwardInfo from '../components/award-info.vue';

export default defineComponent({
  components: {
    AccountInfo,
    AwardInfo,
  },
  setup() {
    //
  },
});
</script>

<style scoped lang="less">
.container {
  background-color: var(--color-fill-2);
  padding: 16px 20px;
  display: flex;
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
:deep(.panel-border) {
  margin-bottom: 0;
  border-bottom: 1px solid rgb(var(--gray-2));
}
</style>
