import { accAdd } from '@/utils/amount';
import { defineStore, acceptHMRUpdate } from 'pinia';
import { ProfileInfoState } from './types';

export const useProfileInfoState = defineStore('profileInfoState', {
  state: (): ProfileInfoState => ({
    totalCyoiDeposit: 0,
    totalDeposit: 0,
    totalAwards: 0,
    awardCount: 0,
    accountCount: 0,
    totalDepositInParty: 0,
    depositInPartyCount: 0,
  }),
  getters: {
    total(state) {
      return accAdd(accAdd(state.totalDepositInParty ?? 0, state.totalDeposit ?? 0), state.totalCyoiDeposit ?? 0);
    },
  },
  actions: {
    // Set information
    setInfo(partial: Partial<ProfileInfoState>) {
      this.$patch(partial);
    },

    // Reset information
    resetInfo() {
      this.$reset();
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useProfileInfoState, import.meta.hot));
}
