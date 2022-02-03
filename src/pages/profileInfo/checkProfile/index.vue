<template>
  <div class="container">
    <div class="left-side">
      <a-space direction="vertical" size="large" fill>
        <a-row>
          <a-col :span="20"></a-col>
          <a-col :span="4">
            <a-card>
              <a-select
                :default-value="'Beijing'"
                class="select-profile"
                size="large"
                :bordered="true"
                allow-clear
                placeholder="Please select profile ..."
              >
                <a-option>Beijing</a-option>
                <a-option>Shanghai7487482374823748</a-option>
                <template #footer>
                  <div style="padding: 6px 0; text-align: center">
                    <a-button type="primary">Manage Profile</a-button>
                  </div>
                </template>
              </a-select>
            </a-card>
          </a-col>
        </a-row>
        <a-card
          class="general-card"
          :header-style="{ paddingBottom: '0' }"
          :body-style="{ padding: '30px' }"
        >
          <a-row>
            <a-col :flex="1">
              <DataOverview />
            </a-col>
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
import DataOverview from '../components/data-overview.vue';

export default defineComponent({
  components: {
    AccountInfo,
    AwardInfo,
    DataOverview,
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
