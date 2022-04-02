<template>
  <div>
    <a-card class="general-card" :bordered="false">
        <a-image width="500" :src="rarity" />
    </a-card>
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
.general-card {
  min-height: 188px;
  width: 80vw;
}
</style>
