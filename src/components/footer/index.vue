<template>
  <a-layout-footer class="footer"
    >INKer Data

    <a-button type="text" @click="openTelegram">Telegram</a-button>
    <a-button type="text" @click="openWeibo">geekDAO@Weibo</a-button>
    <a-button type="text" @click="openTwitter">geekdao.eth@Twitter</a-button>
  </a-layout-footer>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  setup() {
    const openTelegram = () => {
      window.open('https://t.me/+0t3Wsaa3F1IyZTE9', '_blank');
    };
    const openTwitter = () => {
      window.open('https://twitter.com/mr7s1990', '_blank');
    };
    const openWeibo = () => {
      window.open('https://weibo.com/u/7565123862', '_blank');
    };
    return {
      openTelegram,
      openTwitter,
      openWeibo,
    };
  },
});
</script>

<style lang="less" scoped>
.footer {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  color: var(--color-text-2);
  text-align: center;
}
</style>
