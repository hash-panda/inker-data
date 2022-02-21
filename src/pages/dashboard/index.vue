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
import PlayersChart from '@/components/analysis/players-chart.vue';
import TotalDepositChart from '@/components/analysis/total-deposit-chart.vue';
import PartyChart from '@/components/analysis/party-chart.vue';
// import PartyDepositChart from '@/components/analysis/party-deposit-chart.vue';
import DataPanel from './components/data-panel.vue';
import ContentChart from './components/content-chart.vue';

export default defineComponent({
  components: {
    DataPanel,
    ContentChart,
    PartyChart,
    PlayersChart,
    TotalDepositChart,
    // PartyDepositChart,
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
      let amount1Sum = 0;
      const amount1: number[] = [];
      let amount2Sum = 0;
      const amount2: number[] = [];
      let amount3Sum = 0;
      const amount3: number[] = [];
      let amount4Sum = 0;
      const amount4: number[] = [];
      let amount5Sum = 0;
      const amount5: number[] = [];
      let amount6Sum = 0;
      const amount6: number[] = [];
      let amount7Sum = 0;
      const amount7: number[] = [];
      let amount8Sum = 0;
      const amount8: number[] = [];

      allPlayer.forEach((item, index) => {
        if (index !== allPlayer.length - 1) {
          if (item.amount < 11) {
            amount1.push(item.amount);
            amount1Sum += item.amount;
          } else if (item.amount >= 11 && item.amount < 50) {
            amount2.push(item.amount);
            amount2Sum += item.amount;
          } else if (item.amount >= 50 && item.amount < 100) {
            amount3.push(item.amount);
            amount3Sum += item.amount;
          } else if (item.amount >= 100 && item.amount < 200) {
            amount4.push(item.amount);
            amount4Sum += item.amount;
          } else if (item.amount >= 200 && item.amount < 500) {
            amount5.push(item.amount);
            amount5Sum += item.amount;
          } else if (item.amount >= 500 && item.amount < 1000) {
            amount6.push(item.amount);
            amount6Sum += item.amount;
          } else if (item.amount >= 1000 && item.amount < 5000) {
            amount7.push(item.amount);
            amount7Sum += item.amount;
          } else {
            amount8.push(item.amount);
            amount8Sum += item.amount;
          }
        }
      });
      const x = [
        '< 11',
        '[11, 50)',
        '[50, 100)',
        '[100, 200)',
        '[200, 500)',
        '[500, 1000)',
        '[1000, 5000)',
        '>= 5000',
      ];
      const amounts = [
        amount1Sum.toFixed(2),
        amount2Sum.toFixed(2),
        amount3Sum.toFixed(2),
        amount4Sum.toFixed(2),
        amount5Sum.toFixed(2),
        amount6Sum.toFixed(2),
        amount7Sum.toFixed(2),
        amount8Sum.toFixed(2),
      ];
      const count = [
        amount1.length,
        amount2.length,
        amount3.length,
        amount4.length,
        amount5.length,
        amount6.length,
        amount7.length,
        amount8.length,
      ];
      // console.log(players.)
      effectivePlayers.value = allPlayer.length - amount1.length;
      chart1.value = { x, amounts, count };
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
          blackAmount.value += getActualAmount(
            depositInfo.data?.result?.asset?.amount
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
