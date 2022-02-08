<template>
  <a-layout-footer class="footer"
    >INKer Data

    <a-button type="text" @click="openTelegram"
      >Telegram</a-button
    ></a-layout-footer
  >
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  setup() {
    const openTelegram = () => {
      window.open('https://t.me/+0t3Wsaa3F1IyZTE9', '_blank');
    };
    return {
      openTelegram,
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
