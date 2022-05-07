import { defineStore, acceptHMRUpdate } from 'pinia';
import { prosperNftList } from './prosperNftList';
import { prosperNftRarityList } from './prosperNftRarity';

export const useProsperNftState = defineStore('prosperNftState', {
  state: () => {
    return {
      prosperNftList: [],
      // prosperNftRarityRank: [],
      prosperNftRarityRank: prosperNftRarityList,
    };
  },
  getters: {
    totalNft(state) {
      return state.prosperNftList.length;
    },
    prosperNftPagenationList(state) {
      const nftList = [] as any;
      state.prosperNftList.forEach((item: any, index: number) => {
        const page = Math.floor(index / 50);
        if (!nftList[page]) {
          nftList[page] = [];
        }
        nftList[page].push(item);
      });
      return nftList;
    },
  },
  actions: {},
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useProsperNftState, import.meta.hot));
}
