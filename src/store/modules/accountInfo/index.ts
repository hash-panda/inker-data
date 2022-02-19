import { accAdd } from '@/utils/amount';
import { defineStore, acceptHMRUpdate } from 'pinia';
import { AccountInfoState } from './types';

export const useAccountInfoState = defineStore('accountInfoState', {
  state: (): AccountInfoState => ({
    totalDeposit: 0,
    totalAwards: 0,
    awardCount: 0,
    accountCount: 0,
    totalDepositInParty: 0,
    depositInPartyCount: 0,
  }),
  getters: {
    total(state) {
      return accAdd(state.totalDepositInParty ?? 0, state.totalDeposit ?? 0);
    },
  },
  actions: {
    // Set information
    setInfo(partial: Partial<AccountInfoState>) {
      this.$patch(partial);
    },

    // Reset information
    resetInfo() {
      this.$reset();
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAccountInfoState, import.meta.hot));
}
