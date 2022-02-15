import { defineStore, acceptHMRUpdate } from 'pinia';
import { AccountInfoState } from './types';

export const useAccountInfoState = defineStore('accountInfoState', {
  state: (): AccountInfoState => ({
    totalDeposit: 0,
    totalAwards: 0,
    awardCount: 0,
    accountCount: 0,
  }),
  getters: {},
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
