import { defineStore, acceptHMRUpdate } from 'pinia';
import { ProfileInfoState } from './types';

export const useProfileInfoState = defineStore('profileInfoState', {
  state: (): ProfileInfoState => ({
    totalDeposit: 0,
    totalAwards: 0,
    awardCount: 0,
    accountCount: 0,
  }),
  getters: {},
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
