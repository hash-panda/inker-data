<template>
  <div class="navbar">
    <div class="left-side">
      <a-space>
        <img alt="logo" width="30" :src="inkerLogo" />
        <a-typography-title
          :style="{ margin: 0, fontSize: '18px' }"
          :heading="5"
          type="primary"
        >
          INKer Data
        </a-typography-title>
      </a-space>
    </div>
    <ul class="right-side">
      <li>
        <a-tooltip :content="$t('settings.twitter')">
          <icon-twitter-circle-fill
            size="24"
            style="color: rgb(var(--primary-6))"
            @click="openTwitter"
        /></a-tooltip>
      </li>
      <li>
        <a-tooltip :content="$t('settings.weibo')"
          ><icon-weibo-circle-fill
            size="24"
            style="color: rgb(var(--primary-6))"
            @click="openWeibo"
        /></a-tooltip>
      </li>
      <li>
        <a-button type="text" @click="gotoInkProtocol">
          <template #icon>
            <icon-tags />
          </template>
          ink protocol
        </a-button>
      </li>
      <li>
        <a-tooltip :content="$t('settings.language')">
          <a-button
            class="nav-btn"
            type="outline"
            :shape="'circle'"
            @click="setDropDownVisible"
          >
            <template #icon>
              <icon-language />
            </template>
          </a-button>
        </a-tooltip>
        <a-dropdown trigger="click" @select="changeLocale">
          <div ref="triggerBtn" class="trigger-btn"></div>
          <template #content>
            <a-doption
              v-for="item in locales"
              :key="item.value"
              :value="item.value"
            >
              {{ item.label }}
            </a-doption>
          </template>
        </a-dropdown>
      </li>
      <li>
        <a-tooltip
          :content="
            theme === 'light'
              ? $t('settings.navbar.theme.toDark')
              : $t('settings.navbar.theme.toLight')
          "
        >
          <a-button
            class="nav-btn"
            type="outline"
            :shape="'circle'"
            @click="toggleTheme"
          >
            <template #icon>
              <icon-moon-fill v-if="theme === 'dark'" />
              <icon-sun-fill v-else />
            </template>
          </a-button>
        </a-tooltip>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue';
import { Message } from '@arco-design/web-vue';
import { useDark, useToggle } from '@vueuse/core';
import { useAppStore, useUserStore } from '@/store';
import { LOCALE_OPTIONS } from '@/locale';
import useLocale from '@/hooks/locale';
import useUser from '@/hooks/user';
import inkerLogo from '@/assets/images/inker-logo.png';
import { gotoInkProtocol } from '@/utils';
// import MessageBox from '../message-box/index.vue';

export default defineComponent({
  components: {
    // MessageBox,
  },
  setup() {
    const appStore = useAppStore();
    const userStore = useUserStore();
    const { logout } = useUser();
    const { changeLocale } = useLocale();
    const locales = [...LOCALE_OPTIONS];
    const avatar = computed(() => {
      return userStore.avatar;
    });
    const theme = computed(() => {
      return appStore.theme;
    });
    const isDark = useDark({
      selector: 'body',
      attribute: 'arco-theme',
      valueDark: 'dark',
      valueLight: 'light',
      storageKey: 'arco-theme',
      onChanged(dark: boolean) {
        // overridded default behavior
        appStore.toggleTheme(dark);
      },
    });
    const toggleTheme = useToggle(isDark);
    const setVisible = () => {
      appStore.updateSettings({ globalSettings: true });
    };
    const refBtn = ref();
    const triggerBtn = ref();
    const setPopoverVisible = () => {
      const event = new MouseEvent('click', {
        view: window,
        bubbles: true,
        cancelable: true,
      });
      refBtn.value.dispatchEvent(event);
    };
    const handleLogout = () => {
      logout();
    };
    const setDropDownVisible = () => {
      const event = new MouseEvent('click', {
        view: window,
        bubbles: true,
        cancelable: true,
      });
      triggerBtn.value.dispatchEvent(event);
    };
    const switchRoles = async () => {
      const res = await userStore.switchRoles();
      Message.success(res as string);
    };

    const openTwitter = () => {
      window.open('https://twitter.com/mr7s1990', '_blank');
    };
    const openWeibo = () => {
      window.open('https://weibo.com/u/7565123862', '_blank');
    };

    return {
      openTwitter,
      openWeibo,
      locales,
      theme,
      avatar,
      changeLocale,
      toggleTheme,
      setVisible,
      setPopoverVisible,
      refBtn,
      triggerBtn,
      handleLogout,
      setDropDownVisible,
      switchRoles,
      gotoInkProtocol,
      inkerLogo,
    };
  },
});
</script>

<style scoped lang="less">
.navbar {
  display: flex;
  justify-content: space-between;
  height: 100%;
  background-color: var(--color-bg-2);
  border-bottom: 1px solid var(--color-border);
}

.left-side {
  display: flex;
  align-items: center;
  padding-left: 20px;
}

.right-side {
  display: flex;
  padding-right: 20px;
  list-style: none;
  :deep(.locale-select) {
    border-radius: 20px;
  }
  li {
    display: flex;
    align-items: center;
    padding: 0 10px;
  }

  a {
    color: var(--color-text-1);
    text-decoration: none;
  }
  .nav-btn {
    border-color: rgb(var(--gray-2));
    color: rgb(var(--gray-8));
    font-size: 16px;
  }
  .trigger-btn,
  .ref-btn {
    position: absolute;
    bottom: 14px;
  }
  .trigger-btn {
    margin-left: 14px;
  }
}
</style>

<style lang="less">
.message-popover {
  .arco-popover-content {
    margin-top: 0;
  }
}
</style>
