<template>
  <div class="container">
    <div class="left-side">
      <a-space direction="vertical" size="large" fill>
        <a-card
          class="general-card"
          :header-style="{ paddingBottom: '0' }"
          :body-style="{ padding: '30px' }"
        >
          <a-row>
            <a-col :flex="1">
              <data-overview :info="overview" />
            </a-col>
          </a-row>
        </a-card>
        <div><party-info :party-info="partyInfo" /> </div>
      </a-space>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { queryPartyList, PartyRes } from '@/api/party';
import PartyInfo from './components/party-info.vue';
import DataOverview from './components/data-overview.vue';

export default defineComponent({
  components: {
    PartyInfo,
    DataOverview,
  },
  setup() {
    const partyInfo = ref<PartyRes>();
    const overview = ref({
      partyMemberCount: 0,
      partyCount: 0,
      partyTotalDeposit: 0,
    });
    const fetchPartyData = async () => {
      try {
        const partyRes = await queryPartyList();
        partyInfo.value = partyRes.data;
        overview.value.partyCount = partyRes.data.result.parties.length ?? 0;
        partyRes.data.result.parties.forEach((v) => {
          overview.value.partyMemberCount += v.current_member;
          overview.value.partyTotalDeposit += Number(v.total_deposit) / 1e6;
        });
      } catch (e) {
        // print error
        /* eslint-disable no-console */
        console.log(e);
      }
    };
    fetchPartyData();
    return {
      partyInfo,
      overview,
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
