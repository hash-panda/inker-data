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
          :span="4"
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
            <template #suffix>
              <span class="unit">ust</span>
            </template>
            <!-- <template #prefix>
              <span
                class="statistic-prefix"
                :style="{ background: item.prefix.background }"
              >
                <component
                  :is="item.prefix.icon"
                  :style="{ color: item.prefix.iconColor }"
                />
              </span>
            </template> -->
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
import { useProfileInfoState } from '@/store';
import { useAccountInfoState } from '@/store';

export default defineComponent({
  props: {
    checkProfile: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const { t } = useI18n();
    const { loading } = useLoading(false);
    const profileInfoState = useProfileInfoState();
    const accountInfoState = useAccountInfoState();

    const { isDark } = useThemes();

    const renderData = computed(() => {
      /* eslint-disable no-console */
      console.log(
        'data-overview profileInfoState.totalDeposit',
        props.checkProfile ? profileInfoState.total : accountInfoState.total
      );
      return [
        {
          title: t('profileInfo.dataOverview.totalDeposit'),
          value: props.checkProfile
            ? profileInfoState.total
            : accountInfoState.total,
          precision: 2,
          // prefix: {
          //   icon: 'icon-fire',
          //   background: isDark.value ? '#593E2F' : '#FFE4BA',
          //   iconColor: isDark.value ? '#F29A43' : '#F77234',
          // },
        },
        {
          title: t('profileInfo.dataOverview.accountDeposit'),
          value: props.checkProfile
            ? profileInfoState.totalDeposit
            : accountInfoState.totalDeposit,
          precision: 2,
          // prefix: {
          //   icon: 'icon-fire',
          //   background: isDark.value ? '#593E2F' : '#FFE4BA',
          //   iconColor: isDark.value ? '#F29A43' : '#F77234',
          // },
        },
        {
          title: t('profileInfo.dataOverview.totalDepositInParty'),
          value: props.checkProfile
            ? profileInfoState.totalDepositInParty
            : accountInfoState.totalDepositInParty,
          precision: 2,
          // prefix: {
          //   icon: 'icon-fire',
          //   background: isDark.value ? '#593E2F' : '#FFE4BA',
          //   iconColor: isDark.value ? '#F29A43' : '#F77234',
          // },
        },
         {
          title: t('profileInfo.dataOverview.accountCyoiDeposit'),
          value: props.checkProfile
            ? profileInfoState.totalCyoiDeposit
            : accountInfoState.totalCyoiDeposit,
          precision: 2,
          // prefix: {
          //   icon: 'icon-fire',
          //   background: isDark.value ? '#593E2F' : '#FFE4BA',
          //   iconColor: isDark.value ? '#F29A43' : '#F77234',
          // },
        },
        {
          title: t('profileInfo.dataOverview.totalAwards'),
          value: props.checkProfile
            ? profileInfoState.totalAwards
            : accountInfoState.totalAwards,
          precision: 2,
          // prefix: {
          //   icon: 'icon-gift',
          //   background: isDark.value ? '#3D5A62' : '#E8FFFB',
          //   iconColor: isDark.value ? '#6ED1CE' : '#33D1C9',
          // },
        },
        // {
        //   title: t('profileInfo.dataOverview.awardCount'),
        //   value: props.checkProfile
        //     ? profileInfoState.awardCount
        //     : accountInfoState.awardCount,
        //   precision: 0,
        //   // prefix: {
        //   //   icon: 'icon-heart',
        //   //   background: isDark.value ? '#354276' : '#E8F3FF',
        //   //   iconColor: isDark.value ? '#4A7FF7' : '#165DFF',
        //   // },
        // },
        // {
        //   title: t('profileInfo.dataOverview.depositInPartyCount'),
        //   value: props.checkProfile
        //     ? profileInfoState.depositInPartyCount
        //     : accountInfoState.depositInPartyCount,
        //   precision: 0,
        //   // prefix: {
        //   //   icon: 'icon-heart',
        //   //   background: isDark.value ? '#354276' : '#E8F3FF',
        //   //   iconColor: isDark.value ? '#4A7FF7' : '#165DFF',
        //   // },
        // },
        // {
        //   title: t('profileInfo.dataOverview.accountCount'),
        //   value: props.checkProfile
        //     ? profileInfoState.accountCount
        //     : accountInfoState.accountCount,
        //   precision: 0,
        //   // prefix: {
        //   //   icon: 'icon-user',
        //   //   background: isDark.value ? '#3F385E' : '#F5E8FF',
        //   //   iconColor: isDark.value ? '#8558D3' : '#722ED1',
        //   // },
        // },
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

.unit {
  margin-left: 8px;
  color: rgb(var(--gray-8));
  font-size: 12px;
}
</style>
