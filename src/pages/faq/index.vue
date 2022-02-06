<template>
  <div class="container">
    <div class="panel">
      <a-row>
        <a-col :offset="6" :span="12">
          <a-space direction="vertical" :size="10">
            <a-typography>
              <a-typography-title :heading="3">
                {{ $t('menu.faq') }}
              </a-typography-title>
              <a-divider />
              <a-typography-title :heading="5">
                {{ $t('faq.title1') }}
              </a-typography-title>
              <a-typography-paragraph>
                {{ $t('faq.graph1') }}
              </a-typography-paragraph>
              <a-typography-title :heading="5">
                {{ $t('faq.title2') }}
              </a-typography-title>
              <a-typography-paragraph>
                {{ $t('faq.graph2') }}
              </a-typography-paragraph>
              <a-typography-paragraph> </a-typography-paragraph>
              <a-typography-title :heading="5">
                {{ $t('faq.title3') }}
              </a-typography-title>
              <a-typography-paragraph>
                {{ $t('faq.graph3') }}
              </a-typography-paragraph>
              <a-typography-title :heading="5">
                {{ $t('faq.title4') }}
              </a-typography-title>
              <a-typography-paragraph>
                {{ $t('faq.graph4') }}
                <a-button type="text" @click="gotoBugReport"
                  >Bug Report <template #icon> <icon-bug /> </template
                ></a-button>
              </a-typography-paragraph>
              <a-typography-title :heading="5">
                {{ $t('faq.title5') }}
              </a-typography-title>
              <a-typography-paragraph>
                {{ $t('faq.graph5') }}
                <a-button type="text" @click="gotoSuggestion"
                  >Please Add <template #icon> <icon-edit /> </template
                ></a-button>
              </a-typography-paragraph>
            </a-typography>
          </a-space>
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  setup() {
    const gotoBugReport = () => {
      window.open(
        'https://docs.google.com/forms/d/e/1FAIpQLSdYsVh63lKUgC5oIdNj5ZphE_RMFQF3pO_PYAivgFuc4zz-6w/viewform',
        '_blank'
      );
    };
    const gotoSuggestion = () => {
      window.open(
        'https://docs.google.com/forms/d/e/1FAIpQLSc6I6_Ol4TKFdO-7sDuaqZ0ztJV2FQA9DT1mzYFJZQ_nZsoWw/viewform',
        '_blank'
      );
    };
    return {
      gotoBugReport,
      gotoSuggestion,
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
