import { defineStore, acceptHMRUpdate } from 'pinia';
import { queryPartyList, Party, PartyMemberDeposit } from '@/api/party';
import dayjs from 'dayjs';

export const usePartyState = defineStore('partyState', {
  state: () => {
    return {
      parties: [] as Party[],
      partyCount: 0,
      partyMemberCount: 0,
      partyTotalDeposit: 0,
      partyDeposits: [] as PartyMemberDeposit[],
      isNeedCheck: true,
      partyAnalysis: [],
      nameContainer: [],
    };
  },
  getters: {
    getPartyInfoAddress(state) {
      return state.parties.map((v) => {
        return v.info.party_addr;
      });
    },
  },
  actions: {
    async getPartyInfo() {
      if (this.isNeedCheck) {
        const parties = await queryPartyList();
        this.parties = parties as any;
        this.partyCount = this.parties.length ?? 0;
        let partyTotalDeposit = 0;
        let partyMemberCount = 0;
        let partyDeposits: PartyMemberDeposit[] = [];
        this.parties.forEach((v) => {
          partyMemberCount += v.current_member;
          partyTotalDeposit += Number(v.total_deposit) / 1e6;
          const deposits = v.deposits.map((item) => {
            return {
              partyName: v.info.name,
              ...item,
            };
          });
          partyDeposits = [...partyDeposits, ...deposits];
        });
        this.partyMemberCount = partyMemberCount;
        this.partyTotalDeposit = partyTotalDeposit;
        this.partyDeposits = partyDeposits;

        this.isNeedCheck = false;
      }
    },
    checkAccountDepositInParty(address: string) {
      const result = [] as any;
      this.partyDeposits.forEach((v) => {
        if (v.address === address) {
          result.push(v);
        }
      });
      console.log('party store check result', result);
      return result;
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(usePartyState, import.meta.hot));
}
