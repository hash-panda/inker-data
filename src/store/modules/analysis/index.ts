import { defineStore, acceptHMRUpdate } from 'pinia';
import {
  queryInkPartyInfo,
  queryInkPlayers,
  queryInkTotalDeposit,
} from '@/api/analysis';
import dayjs from 'dayjs';
import {
  AnalysisPartyInfo,
  AnalysisPartyDisplay,
  AnalysisTotalDepositInfo,
  AnalysisTotalDepositDisplay,
  AnalysisPlayersDisplay,
  AnalysisPlayersInfo,
} from './types';

export const useAnalysisState = defineStore('analysisState', {
  state: () => {
    return {
      analysisParty: [] as AnalysisPartyDisplay[],
      analysisTotalDeposit: [] as AnalysisTotalDepositDisplay[],
      analysisPlayers: [] as AnalysisPlayersDisplay[],
    };
  },
  getters: {},
  actions: {
    async getAnalysisPartyInfo() {
      const partyInfo = await queryInkPartyInfo();
      const sortPartyInfo = partyInfo.data.sort(
        (a: AnalysisPartyInfo, b: AnalysisPartyInfo) => a.create - b.create
      );
      this.analysisParty = sortPartyInfo.map((v: AnalysisPartyInfo) => {
        return {
          partyCount: v.partyCount,
          create: dayjs(v.create).format('YYYY-MM-DD'),
          partyTotalAmount: v.partyTotalAmount.toFixed(0),
          partyPlayersCount: v.partyPlayersCount,
        };
      });
    },
    async getAnalysisTotalDepositInfo() {
      const totalDepositInfo = await queryInkTotalDeposit();
      const sortInfo = totalDepositInfo.data.sort(
        (a: AnalysisTotalDepositInfo, b: AnalysisTotalDepositInfo) =>
          a.create - b.create
      );
      this.analysisTotalDeposit = sortInfo.map(
        (v: AnalysisTotalDepositInfo) => {
          return {
            create: dayjs(v.create).format('YYYY-MM-DD'),
            amount: v.amount.toFixed(0),
            denom: v.denom,
          };
        }
      );
    },
    async getAnalysisPlayersInfo() {
      const playersInfo = await queryInkPlayers();
      const sortInfo = playersInfo.data.sort(
        (a: AnalysisPlayersInfo, b: AnalysisPlayersInfo) => a.create - b.create
      );
      this.analysisPlayers = sortInfo.map((v: AnalysisPlayersInfo) => {
        return {
          players: v.players,
          create: dayjs(v.create).format('YYYY-MM-DD'),
        };
      });
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAnalysisState, import.meta.hot));
}
