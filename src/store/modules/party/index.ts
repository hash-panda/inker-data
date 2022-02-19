import { defineStore, acceptHMRUpdate } from 'pinia';
import { queryPartyList, Party, PartyMemberDeposit } from '@/api/party';

export const usePartyState = defineStore('partyState', {
  state: () => {
    return {
      parties: [] as Party[],
      partyCount: 0,
      partyMemberCount: 0,
      partyTotalDeposit: 0,
      partyDeposits: [] as PartyMemberDeposit[],
      isNeedCheck: true,
    };
  },
  getters: {},
  actions: {
    async getPartyInfo(startAfter: number | null) {
      if (this.isNeedCheck) {
        const partyRes = await queryPartyList(startAfter);
        const tempParties = partyRes.data.result.parties;

        if (tempParties.length > 0) {
          this.parties = [...this.parties, ...tempParties];
          this.getPartyInfo(tempParties[tempParties.length - 1].info.id);
        } else {
          this.partyCount = this.parties.length ?? 0;
          let partyTotalDeposit = 0;
          let partyMemberCount = 0;
          let partyDeposits: PartyMemberDeposit[] = [];
          this.parties.forEach((v) => {
            partyMemberCount += v.current_member;
            partyTotalDeposit += Number(v.total_deposit) / 1e6;
            partyDeposits = [...partyDeposits, ...v.deposits];
          });
          this.partyMemberCount = partyMemberCount;
          this.partyTotalDeposit = partyTotalDeposit;
          this.partyDeposits = partyDeposits;
          this.isNeedCheck = false;
        }
      }
    },
    checkAccountDepositInParty(address: string) {
      return this.partyDeposits.find((e) => e.address === address);
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(usePartyState, import.meta.hot));
}
