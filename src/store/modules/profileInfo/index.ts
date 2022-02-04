import { defineStore } from 'pinia';
import { ProfileInfoState } from './types';

export const useProfileInfoState = defineStore('profileInfoState', {
  state: (): ProfileInfoState => ({
    totalDeposit: undefined,
    totalAwards: undefined,
    awardCount: undefined,
    accountCount: undefined,
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
