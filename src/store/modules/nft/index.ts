import { defineStore, acceptHMRUpdate } from 'pinia';
import { tigerNftList } from './tigerNftList';
import { tigerNftRarity } from './tigerNftRarity';

export const useNftState = defineStore('nftState', {
  state: () => {
    return {
      tigerNftList: [],
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
    // tigerNftRarityRankPagenationList(state) {
    //   const nftList = [] as any;
    //   state.tigerNftRarityRank.forEach((item: any, index: number) => {
    //     const page = Math.floor(index / 50);
    //     if (!nftList[page]) {
    //       nftList[page] = [];
    //     }
    //     nftList[page].push(item);
    //   });
    //   return nftList;
    // },
  },
  actions: {},
  // persist: {
  //   enabled: true,
  //   strategies: [
  //     {
  //       key: 'inker_tiger_nft_list',
  //       storage: sessionStorage,
  //       paths: ['tigerNftList'],
  //     },
  //     {
  //       key: 'inker_tiger_nft_rank_list',
  //       storage: sessionStorage,
  //       paths: ['tigerNftRarityRank'],
  //     }
  //   ],
  // },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useNftState, import.meta.hot));
}
