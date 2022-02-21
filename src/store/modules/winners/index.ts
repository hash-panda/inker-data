import { defineStore, acceptHMRUpdate } from 'pinia';
import { queryCurrentAward, queryWinnerList } from '@/api/winners';
import { getActualAmount } from '@/utils';
import { accAdd } from '@/utils/amount';
import { Prize } from './types';

export const useWinnersState = defineStore('winnersState', {
  state: () => {
    return {
      prizes: [] as Prize[],
      isNeedCheck: true,
      currentTotalPrizeAmount: 0,
    };
  },
  getters: {},
  actions: {
    async getCurrentPrizeAmount(totalDeposit: number) {
      this.currentTotalPrizeAmount = (totalDeposit * 7 * 0.2055) / 365;
    },
    async getWinnersInfo(startRound: number, currentRound: number) {
      if (this.isNeedCheck) {
        // const strategy = await queryStrategy();
        // const currentRound = strategy.data.result.round;
        if (startRound === currentRound) {
          this.isNeedCheck = false;
        } else {
          const winners = await queryWinnerList(startRound);
          this.prizes.push({
            round: `Prize #${startRound}`,
            prize: Number(
              winners.data.result.winners
                .reduce((prev, next) => {
                  return accAdd(prev, getActualAmount(next.award.amount));
                }, 0)
                .toFixed(2)
            ),
            winners: winners.data.result.winners,
          });
          this.getWinnersInfo(startRound + 1, currentRound);
        }
      }
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useWinnersState, import.meta.hot));
}
