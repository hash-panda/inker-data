<template>
  <div class="container">
    <!-- <UserInfoHeader /> -->
    <div class="content">
      <div class="content-left">
        <a-space direction="vertical" :size="16" fill>
          <MyProfile />
        </a-space>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useI18n } from 'vue-i18n';
import UserInfoHeader from './components/user-info-header.vue';
import MyProfile from './components/my-profile.vue';

export default defineComponent({
  components: {
    // UserInfoHeader,
    MyProfile,
  },
});
</script>

<style scoped lang="less">
.container {
  padding: 20px;
}

.content {
  display: flex;
  margin-top: 12px;

  &-left {
    flex: 1;
    overflow: hidden;
    // background-color: var(--color-bg-2);

    :deep(.arco-tabs-nav-tab) {
      margin-left: 16px;
    }
  }

  &-right {
    width: 332px;
  }

  .tab-pane-wrapper {
    padding: 0 16px 16px 16px;
  }
}
</style>
