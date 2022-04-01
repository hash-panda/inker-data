<template>
  <a-spin :loading="loading" style="width: 100%">
    <a-card
      class="general-card"
      :bordered="false"
      :body-style="{ padding: '20px' }"
    >
      <a-row justify="space-between">
        <a-col
          v-for="(item, idx) in renderData"
          :key="idx"
          :span="6"
          style="
            display: flex;
            align-content: space-around;
            flex-wrap: wrap;
            flex-direction: column;
          "
        >
          <a-statistic
            :title="item.title"
            :value="item.value"
            show-group-separator
            :value-from="0"
            :precision="item.precision"
            animation
          >
            <template #prefix>
              <span
                class="statistic-prefix"
                :style="{ background: item.prefix.background }"
              >
                <component
                  :is="item.prefix.icon"
                  :style="{ color: item.prefix.iconColor }"
                />
              </span>
            </template>
          </a-statistic>
        </a-col>
      </a-row>
    </a-card>
  </a-spin>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import useLoading from '@/hooks/loading';
import useThemes from '@/hooks/themes';
import { useNftState } from '@/store';

export default defineComponent({
  setup() {
    const nftState = useNftState();
    const { t } = useI18n();
    const { loading } = useLoading(false);

    const { isDark } = useThemes();

    const renderData = computed(() => {
      return [
        {
          title: t('nft.holder.dataOverview.nftTotal'),
          value: nftState.totalNft,
          precision: 0,
          prefix: {
            icon: '',
            background: isDark.value ? '#3F385E' : '#F5E8FF',
            iconColor: isDark.value ? '#8558D3' : '#722ED1',
          },
        },
        {
          title: t('nft.holder.dataOverview.nftHolders'),
          // value: nftState.nftHolderAnalysis?.length ?? 0,
          value: 0,
          precision: 0,
          prefix: {
            icon: '',
            background: isDark.value ? '#354276' : '#E8F3FF',
            iconColor: isDark.value ? '#4A7FF7' : '#165DFF',
          },
        },
        {
          title: t('nft.holder.dataOverview.nftTransaction'),
          value: 0,
          precision: 2,
          prefix: {
            icon: '',
            background: isDark.value ? '#593E2F' : '#FFE4BA',
            iconColor: isDark.value ? '#F29A43' : '#F77234',
          },
        },
      ];
    });

    return {
      loading,
      renderData,
    };
  },
});
</script>

<style scoped lang="less">
:deep(.arco-statistic) {
  .arco-statistic-title {
    color: rgb(var(--gray-10));
    font-weight: bold;
  }
  .arco-statistic-value {
    display: flex;
    align-items: center;
  }
}
.statistic-prefix {
  display: inline-block;
  width: 32px;
  height: 32px;
  margin-right: 8px;
  color: var(--color-white);
  font-size: 16px;
  line-height: 32px;
  text-align: center;
  vertical-align: middle;
  border-radius: 6px;
}
</style>
