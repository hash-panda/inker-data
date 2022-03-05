import { number } from 'echarts/core';
import { defineStore, acceptHMRUpdate } from 'pinia';

export const useNftState = defineStore('nftState', {
  state: () => {
    return {
      nftList: [] as any,
      lastUpdateTime: 0,
      startNftToken: 2501,
      endNftToken: 3000,
    };
  },
  getters: {
    totalNft(state) {
      return state.nftList?.flat().length;
    },
    isNftLoaded(state) {
      return (
        state.endNftToken - state.startNftToken + 1 ===
        state.nftList?.flat().length
      );
    },
  },
  actions: {
    setNftList(nfts: any) {
      this.nftList.push(nfts);
    },
    resetNftList() {
      this.nftList = [];
    },
    setLastUpdateTime() {
      this.lastUpdateTime = Date.now();
    },
  },
  persist: {
    enabled: true,
    strategies: [
      {
        key: 'inker_nft_list',
        storage: localStorage,
        paths: ['nftList'],
      },
      {
        key: 'inker_nft_lastUpdateTime',
        storage: localStorage,
        paths: ['lastUpdateTime'],
      },
    ],
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useNftState, import.meta.hot));
}
