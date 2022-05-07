<template>
  <div class="container">
    <div class="left-side">
      <a-space direction="vertical" size="large" fill>
        <a-card
          class="general-card"
          :header-style="{ paddingBottom: '0' }"
          :body-style="{ padding: '30px' }"
          :bordered="false"
        >
          <a-row>
            <a-col :flex="3"></a-col>
            <a-col :flex="6">
              <a-space direction="vertical" fill>
                <a-input-search
                  :style="{ width: '100%' }"
                  :placeholder="$t('profileInfo.searchPlaceholder')"
                  :button-text="$t('profileInfo.searchBtn')"
                  size="large"
                  :error="searchError"
                  allow-clear
                  :loading="loading"
                  search-button
                  @press-enter="pressEnterSearchAccount"
                  @search="searchAccount"
                />
                <a-alert closable>{{ $t('profileInfo.search.tips') }}</a-alert>
              </a-space>
            </a-col>
            <a-col :flex="3"></a-col>
          </a-row>
        </a-card>
        <a-card
          class="general-card"
          :header-style="{ paddingBottom: '0' }"
          :body-style="{ padding: '30px' }"
        >
          <a-row>
            <a-col :flex="1">
              <DataOverview :checkProfile="false" />
            </a-col>
          </a-row>
        </a-card>
        <a-card>
          <!-- <template #title>{{ searchedTerraAddress }} </template> -->
          <template #extra
            ><a-button type="text" @click="gotoFinder"
              >ET Finder</a-button
            ></template
          >
          <a-space direction="vertical" size="large" fill>
            <nft-prosper-peacock-airdrop
              :accounts="searchedTerraAddress"
              :checkProfile="false"
            />
            <award-info
              :accounts="searchedTerraAddress"
              :checkProfile="false"
            />
            <cyoi-info :accounts="searchedTerraAddress" :checkProfile="false" />
            <account-info
              :accounts="searchedTerraAddress"
              :checkProfile="false"
            />
            <party-deposit-info
              :accounts="searchedTerraAddress"
              :checkProfile="false"
            />
            <nft-airdrop
              :accounts="searchedTerraAddress"
              :checkProfile="false"
            />
          </a-space>
        </a-card>
      </a-space>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { Message } from '@arco-design/web-vue';
import useLoading from '@/hooks/loading';
import AccountInfo from '../components/account-info.vue';
import PartyDepositInfo from '../components/party-deposit-info.vue';
import AwardInfo from '../components/award-info.vue';
import DataOverview from '../components/data-overview.vue';
import NftAirdrop from '../components/nft-airdrop.vue';
import NftProsperPeacockAirdrop from '../components/prosper-peacock-nft-airdrop.vue';
import CyoiInfo from '../components/cyoi-info.vue';

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
    const { loading, setLoading } = useLoading(false);
    const searchedTerraAddress = ref([] as string[]);
    const searchError = ref(false);
    // test data
    const accounts = ref([]);
    const searchAddress = ref('');
    const setSearchAccount = () => {
      if (searchAddress.value && searchAddress.value.startsWith('terra1')) {
        let addresses = searchAddress.value.trim().split(',');
        addresses = addresses
          .filter((v) => {
            return v.trim();
          })
          .map((v) => v.trim());
        searchError.value = false;
        searchedTerraAddress.value = addresses;
      } else {
        Message.error({
          content: 'There is something wrong with your Terra Wallet Address!',
        });
        searchError.value = true;
      }
    };
    // test data assigned, after done dev, should remove the line
    searchedTerraAddress.value = accounts.value;
    const searchAccount = (account: string) => {
      setLoading(true);
      searchAddress.value = account;
      setSearchAccount();

      setLoading(false);
    };
    const pressEnterSearchAccount = (e: any) => {
      setLoading(true);
      // eslint-disable-next-line
      searchAddress.value = e.target._value;
      setSearchAccount();
      setLoading(false);
    };

    const gotoFinder = () => {
      let url = '';
      if (searchedTerraAddress.value[0]) {
        url = `https://finder.extraterrestrial.money/mainnet/address/${searchedTerraAddress.value[0]}`;
      } else {
        url = 'https://finder.extraterrestrial.money';
      }
      window.open(url, '_blank');
    };
    return {
      loading,
      searchAccount,
      searchedTerraAddress,
      pressEnterSearchAccount,
      gotoFinder,
      searchError,
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

.left-side {
  flex: 1;
  overflow: auto;
}

:deep(.panel-border) {
  margin-bottom: 0;
  border-bottom: 1px solid rgb(var(--gray-2));
}
</style>
