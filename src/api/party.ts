import axios from 'axios';

export interface PartyMemberDeposit {
  address: string;
  amount: string | number;
  last_deposit_time: number;
}

export interface Party {
  current_member: number;
  deposits: PartyMemberDeposit[];
  info: {
    creation_date: number;
    id: number;
    img_url: string | null;
    is_public: boolean;
    is_vacant: boolean;
    leader: string;
    minimum_deposit: string;
    name: string;
    party_addr: string;
    social_url: string;
    strategy_id: number;
  };
  max_member: number;
  total_deposit: string;
}

export interface PartyRes {
  height: string;
  result: {
    parties: Party[];
  };
}

export function queryPartyList(startAfter: number | null) {
  const queryMsg = {
    parties_with_deposits: {
      start_after: startAfter,
      limit: 50,
      is_ascending: true,
    },
  };
  const encodeQueryMsg = JSON.stringify(queryMsg);
  const requestParams = {
    params: {
      query_msg: encodeQueryMsg,
    },
  };
  return axios.get<PartyRes>(
    'https://lcd.terra.dev/wasm/contracts/terra1p4y54kfdn9uhvh62rjvgz3sydceuw9s6c65aef/store',
    requestParams
  );
}
