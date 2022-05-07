import { defineStore, acceptHMRUpdate } from 'pinia';
import { tigerNftList } from './tigerNftList';
import { tigerNftRarity } from './tigerNftRarity';

export const useNftState = defineStore('nftState', {
  state: () => {
    return {
      tigerNftList: [],
      // tigerNftRarityRank: [],
      tigerNftRarityRank: tigerNftRarity,
      // tigerNftRarityRank: import.meta.env.MODE === 'development' ? [] : tigerNftRarity,
    };
  },
  getters: {
    totalNft(state) {
      return state.tigerNftList.length;
    },
    tigerNftPagenationList(state) {
      const nftList = [] as any;
      state.tigerNftList.forEach((item: any, index: number) => {
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
  import.meta.hot.accept(acceptHMRUpdate(useNftState, import.meta.hot));
}
