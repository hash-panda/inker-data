import { number } from 'echarts/core';
import { defineStore, acceptHMRUpdate } from 'pinia';

export const useNftState = defineStore('nftState', {
  state: () => {
    return {
      nftList: [] as any,
      nftOriginalList: [] as any,
      lastUpdateTime: 0,
    };
  },
  getters: {
    totalNft(state) {
      return state.nftList?.flat().length;
    },
    nftFlatList(state) {
      return state.nftList?.flat();
    },
    nftHolderAnalysis(state) {
      // nft 持有人统计
      const nftHolders = (items: any): any => {
        let result = [] as any;
        const resultGroup = {} as any;
        items.forEach((item: any) => {
          const key = item.sales?.[0]?.seller
            ? item.sales?.[0]?.seller
            : 'unknown';
          if (!resultGroup[key]) {
            resultGroup[key] = {
              count: 1,
              owner: key,
              nft: [item],
            };
          } else {
            resultGroup[key].count += 1;
            resultGroup[key].nft.push(item);
          }
        });
        const values = Object.values(resultGroup);
        result = values.sort((a: any, b: any) => b.count - a.count) as any;
        return result;
      };
      return nftHolders(state.nftList?.flat());
    },
  },
  actions: {
    setNftOriginalList(nfts: any) {
      this.nftOriginalList = nfts;
    },
    setNftList(nfts: any) {
      this.nftList = nfts;
    },
    resetNftList() {
      this.nftList = [];
      this.lastUpdateTime = 0;
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
