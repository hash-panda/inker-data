<template>
  <div class="container">
    <div class="left-side">
      <a-space direction="vertical" fill>
        <div class="panel">
          <DataPanel
            :players-count="playersCount"
            :effective-players="effectivePlayers"
            :black-amount="blackAmount"
          />
        </div>
        <div class="panel">
          <PrizeInfo />
        </div>
        <div class="panel">
          <ContentChart :chart-data="chart1" />
        </div>
        <div><TotalDepositChart /></div>
        <div><PlayersChart /></div>
        <!-- <div class="panel">
          <PartyDepositChart :chart-data="chart1" />
        </div> -->
        <div><PartyChart /></div>
      </a-space>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { queryPlayers, Player, queryBlacklistAddress } from '@/api/dashboard';
import { queryDepositInfo } from '@/api/profile-info';
import { getActualAmount } from '@/utils';
import { accAdd } from '@/utils/amount';
import PlayersChart from '@/components/analysis/players-chart.vue';
import TotalDepositChart from '@/components/analysis/total-deposit-chart.vue';
import PartyChart from '@/components/analysis/party-chart.vue';
// import PartyDepositChart from '@/components/analysis/party-deposit-chart.vue';
import DataPanel from './components/data-panel.vue';
import ContentChart from './components/content-chart.vue';
import PrizeInfo from './components/prize-info.vue';

export default defineComponent({
  components: {
    DataPanel,
    ContentChart,
    PartyChart,
    PlayersChart,
    TotalDepositChart,
    PrizeInfo,
  },
  setup() {
    interface PlayerAmountNumber {
      address: string;
      amount: number;
    }

    const players = ref([] as Player[]);
    const playersCount = ref(0);
    const effectivePlayers = ref(0);
    const blacklistAddressCount = ref(0);
    // const averageDeposit = ref(0);
    const blackAmount = ref(0);
    const sortPlayers = ref([] as PlayerAmountNumber[]);
    const isGetAllPlayer = ref(false);
    const chart1 = ref({});
    const playersSortByAmount = (
      allPlayer: PlayerAmountNumber[]
    ): PlayerAmountNumber[] => {
      return allPlayer.sort((a, b) => {
        return a.amount - b.amount;
      });
    };
    const playersAmountConvertNumber = (
      allPlayer: Player[]
    ): PlayerAmountNumber[] => {
      return allPlayer.map((item) => {
        return {
          address: item.address,
          amount: getActualAmount(item.amount),
        };
      });
    };

    const playersConvertCharts1Data = (allPlayer: PlayerAmountNumber[]) => {
      // -----
      const resultGroup = allPlayer.reduce((prev: any, current) => {
        const setGroupInfo = (key: any) => {
          if (!prev[key]) {
            prev[key] = {
              sum: 0,
              count: 0,
            };
          }
          prev[key].sum = accAdd(prev[key].sum, current.amount);
          prev[key].count += 1;
        };
        if (current.amount < 11) {
          setGroupInfo('< 11');
        } else if (current.amount >= 11 && current.amount < 50) {
          setGroupInfo('[11, 50)');
        } else if (current.amount >= 50 && current.amount < 100) {
          setGroupInfo('[50, 100)');
        } else if (current.amount >= 100 && current.amount < 120) {
          setGroupInfo('[100, 120)');
        } else if (current.amount >= 120 && current.amount < 150) {
          setGroupInfo('[120, 150)');
        } else if (current.amount >= 150 && current.amount < 200) {
          setGroupInfo('[150, 200)');
        } else if (current.amount >= 200 && current.amount < 500) {
          setGroupInfo('[200, 500)');
        } else if (current.amount >= 500 && current.amount < 1000) {
          setGroupInfo('[500, 1000)');
        } else if (current.amount >= 1000 && current.amount < 5000) {
          setGroupInfo('[1000, 5000)');
        } else {
          setGroupInfo('>= 5000');
        }
        return prev;
      }, {});

      // ----

      // console.log(players.)
      effectivePlayers.value = allPlayer.length - resultGroup['< 11'].count;
      chart1.value = {
        x: Object.keys(resultGroup),
        amounts: Object.values(resultGroup).map((v: any) => v.sum),
        count: Object.values(resultGroup).map((v: any) => v.count),
      };
    };
    const convertPlayersData = (players: Player[]) => {
      const tempAmountNumber = playersAmountConvertNumber(players);
      sortPlayers.value = playersSortByAmount(tempAmountNumber);
      playersConvertCharts1Data(sortPlayers.value);
    };
    const fetchData = async (startAddress: string | null) => {
      try {
        const playersRes = await queryPlayers(startAddress);
        const tempPlayers = playersRes.data?.result?.players;
        if (
          tempPlayers.length === 1 &&
          tempPlayers[0]?.address === startAddress
        ) {
          isGetAllPlayer.value = true;
          playersCount.value = players.value.length;

          convertPlayersData(players.value);
          return;
        }
        // 第二次开始查询时 上次的最后一条和这次的第一条一样，需要去除
        if (startAddress) {
          tempPlayers.splice(0, 1);
        }
        players.value = [...players.value, ...tempPlayers];
        isGetAllPlayer.value = false;
        fetchData(tempPlayers[tempPlayers.length - 1].address);
      } catch (e) {
        /* eslint-disable no-console */
        console.log('dashboard err', e);
      }
    };

    fetchData(null);

    const fetchBlacklistAddressData = async () => {
      try {
        const blacklistAddress = await queryBlacklistAddress();
        blackAmount.value = 0;
        blacklistAddressCount.value =
          blacklistAddress.data?.result?.addresses.length;
        blacklistAddress.data?.result?.addresses.forEach(async (item) => {
          const depositInfo = await queryDepositInfo(item);
          blackAmount.value = accAdd(
            blackAmount.value,
            getActualAmount(depositInfo.data?.result?.asset?.amount)
          );
        });
      } catch (e) {
        /* eslint-disable no-console */
        console.log('fetchBlacklistAddressData err', e);
      }
    };
    fetchBlacklistAddressData();
    return {
      effectivePlayers,
      blackAmount,
      playersCount,
      chart1,
    };
  },
});
</script>

<style lang="less" scoped>
.container {
  background-color: var(--color-fill-2);
  padding: 16px 20px;
  padding-bottom: 0;
  display: flex;
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
:deep(.panel-border) {
  margin-bottom: 0;
  border-bottom: 1px solid rgb(var(--gray-2));
}
</style>
