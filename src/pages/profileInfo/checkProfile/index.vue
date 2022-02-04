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
                <a-option>abc</a-option>
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
        <div><award-info :accounts="accounts" :useStore="true" /> </div>
        <div><account-info :accounts="accounts" :useStore="true" /> </div>
      </a-space>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
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
    // test data
    const accounts = ref([
      'terra1xh2e6tmmnrdu6vy0kev62xvlrxmwz9mxr43n4a',
      'terra1kwppcxznvydujtpvfjnj8jx2pu7s43uwtvylm8',
      // 'terra1jqfjc7f3lwkywjp97w4c2ljfgwd879dcq8c4ks',
      // 'terra12f9g97jv2g8smn0qhnem5t5p0v6eaalx4q8agw',
      // 'terra1vw22kuvjdcppj9ah28r4tw7mm9chyzh2g7ly9n',
      // 'terra1dywpvspya60alrkhjg2rtlq8p6tst5c405a55f',
      // 'terra1xs8hc0drmesxv9jeh793fv5ncwuw0hrzuawc3d',
    ]);
    return {
      accounts,
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
