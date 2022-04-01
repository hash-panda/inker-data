<template>
  <div class="container">
    <div class="panel">
        <a-image width="500" :src="rarity" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import rarity from '@/assets/images/Rarity.png'
export default defineComponent({
  setup() {
    
    return {
      rarity
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
