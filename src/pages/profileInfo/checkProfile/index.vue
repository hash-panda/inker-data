<template>
  <div class="container">
    <div class="left-side">
      <a-space direction="vertical" size="large" fill>
        <a-row>
          <a-col :span="16"></a-col>
          <a-col :span="8">
            <a-card>
              <a-row :gutter="3">
                <a-col :span="12"
                  ><a-select
                    :default-value="profileStore.currentProfileKey"
                    class="select-profile"
                    size="large"
                    :bordered="true"
                    allow-clear
                    :placeholder="$t('profileInfo.checkProfile.placeholder')"
                    @change="setCurrentProfile"
                  >
                    <a-option
                      v-for="item in profileStore.profiles"
                      :key="item.key"
                      :value="item.key"
                      >{{ item.name }}</a-option
                    >
                  </a-select></a-col
                >
                <a-col :span="12"
                  ><div style="text-align: center">
                    <a-button type="primary" @click="openProfile">{{
                      $t('profileInfo.checkProfile.manageProfile')
                    }}</a-button>
                  </div></a-col
                >
              </a-row>
            </a-card>
          </a-col>
        </a-row>
        <a-card
          class="general-card"
          :header-style="{ paddingBottom: '0' }"
          :body-style="{ padding: '30px' }"
        >
          <a-row>
            <a-col :flex="1">
              <DataOverview :checkProfile="true" />
            </a-col>
          </a-row>
        </a-card>
        <div>
          <nft-prosper-peacock-airdrop
            :accounts="profileStore.currentProfile?.address ?? []"
            :checkProfile="true"
          />
        </div>
        <div
          ><award-info
            :accounts="profileStore.currentProfile?.address ?? []"
            :checkProfile="true"
          />
        </div>
        <div
          ><account-info
            :accounts="profileStore.currentProfile?.address ?? []"
            :checkProfile="true"
          />
        </div>
        <div
          ><cyoi-info
            :accounts="profileStore.currentProfile?.address ?? []"
            :checkProfile="true"
          />
        </div>
        <div
          ><party-deposit-info
            :accounts="profileStore.currentProfile?.address ?? []"
            :checkProfile="true"
          />
        </div>
        <div>
          <nft-airdrop
            :accounts="profileStore.currentProfile?.address ?? []"
            :checkProfile="true"
          />
        </div>
      </a-space>
    </div>
  </div>
</template>

<script lang="ts">
import { useProfileStore } from '@/store';
import { defineComponent, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import AccountInfo from '../components/account-info.vue';
import PartyDepositInfo from '../components/party-deposit-info.vue';
import AwardInfo from '../components/award-info.vue';
import CyoiInfo from '../components/cyoi-info.vue';
import DataOverview from '../components/data-overview.vue';
import NftAirdrop from '../components/nft-airdrop.vue';
import NftProsperPeacockAirdrop from '../components/prosper-peacock-nft-airdrop.vue';

export default defineComponent({
  components: {
    AccountInfo,
    PartyDepositInfo,
    AwardInfo,
    DataOverview,
    NftAirdrop,
    NftProsperPeacockAirdrop,
    CyoiInfo,
  },
  setup() {
    const router = useRouter();
    const profileStore = useProfileStore();
    const accounts = ref([]);
    const openProfile = () => {
      router.push({
        name: 'profile',
      });
    };
    const setCurrentProfile = (key: number) => {
      profileStore.setCurrentProfileKey(key);
    };
    return {
      profileStore,
      accounts,
      openProfile,
      setCurrentProfile,
    };
  },
});
</script>

<style scoped lang="less">
.container {
  background-color: var(--color-fill-2);
  padding: 16px 20px;
  display: flex;
}

.select-profile {
  width: '100%';
  background: var(--color-bg-2);
}
.left-side {
  flex: 1;
  overflow: auto;
}

.panel {
  background-color: var(--color-bg-2);
  border-radius: 4px;
  overflow: auto;
}
</style>
