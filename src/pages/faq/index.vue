<template>
  <div class="container">
    <div class="panel">
      <a-row>
        <a-col :offset="6" :span="12">
          <a-space direction="vertical" :size="10">
            <a-typography>
              <a-typography-title :heading="3"> 常见问题 </a-typography-title>
              <a-divider />
              <a-typography-title :heading="5">
                这是官方的么？
              </a-typography-title>
              <a-typography-paragraph>
                这是 INKer 自发开发的，非官方的。
              </a-typography-paragraph>
              <a-typography-title :heading="5">
                这个网站主要是干什么的？
              </a-typography-title>
              <a-typography-paragraph>
                该网站是 INKer 自发开发的，针对 ink-protocol
                无损彩票协议的数据分析平台。
              </a-typography-paragraph>
              <a-typography-paragraph>
                在这里，你可以管理你的多个账户，可以查看目前 INKer 的投资情况。
              </a-typography-paragraph>
              <a-typography-title :heading="5">
                网站的 UI 可以再设计一下么？
              </a-typography-title>
              <a-typography-paragraph>
                如果你是 UI 设计人员，非常感谢你能给网站设计一套简约大方的 UI。
              </a-typography-paragraph>
              <a-typography-title :heading="5">
                发现了问题如何上报？
              </a-typography-title>
              <a-typography-paragraph>
                在这里登记你发现的问题。<a-button
                  type="text"
                  @click="gotoBugReport"
                  >Bug Report <template #icon> <icon-bug /> </template
                ></a-button>
              </a-typography-paragraph>
              <a-typography-title :heading="5">
                想让团队上新的功能，如何通知团队？
              </a-typography-title>
              <a-typography-paragraph>
                在这里上报你想要的功能。<a-button
                  type="text"
                  @click="gotoSuggestion"
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
