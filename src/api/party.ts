import axios from 'axios';
import { resolve } from 'path';

export interface PartyMemberDeposit {
  address: string;
  amount: string | number;
  last_deposit_time: number;
  partyName?: string;
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

// export function queryPartyList(startAfter: number | null) {
//   const queryMsg = {
//     parties_with_deposits: {
//       start_after: startAfter,
//       limit: 50,
//       is_ascending: true,
//     },
//   };
//   const encodeQueryMsg = JSON.stringify(queryMsg);
//   const requestParams = {
//     params: {
//       query_msg: encodeQueryMsg,
//     },
//   };
//   return axios.get<PartyRes>(
//     'https://lcd.terra.dev/wasm/contracts/terra1p4y54kfdn9uhvh62rjvgz3sydceuw9s6c65aef/store',
//     requestParams
//   );
// }

export function queryPartyList() {
  const query = `query getParties {  p1: wasm {    contractQuery(      contractAddress: "terra1p4y54kfdn9uhvh62rjvgz3sydceuw9s6c65aef"      query: {parties_with_deposits: {limit: 100, start_after: null}}    )    __typename  }  p2: wasm {    contractQuery(      contractAddress: "terra1p4y54kfdn9uhvh62rjvgz3sydceuw9s6c65aef"      query: {parties_with_deposits: {limit: 100, start_after: 99}}    )    __typename  }  p3: wasm {    contractQuery(      contractAddress: "terra1p4y54kfdn9uhvh62rjvgz3sydceuw9s6c65aef"      query: {parties_with_deposits: {limit: 100, start_after: 199}}    )    __typename  }  p4: wasm {    contractQuery(      contractAddress: "terra1p4y54kfdn9uhvh62rjvgz3sydceuw9s6c65aef"      query: {parties_with_deposits: {limit: 100, start_after: 299}}    )    __typename  }}`;

  //   operationName: "getParties"
  // query: "query getParties {\n  p1: wasm {\n    contractQuery(\n      contractAddress: \"terra1p4y54kfdn9uhvh62rjvgz3sydceuw9s6c65aef\"\n      query: {parties_with_deposits: {limit: 100, start_after: null}}\n    )\n    __typename\n  }\n  p2: wasm {\n    contractQuery(\n      contractAddress: \"terra1p4y54kfdn9uhvh62rjvgz3sydceuw9s6c65aef\"\n      query: {parties_with_deposits: {limit: 100, start_after: 99}}\n    )\n    __typename\n  }\n  p3: wasm {\n    contractQuery(\n      contractAddress: \"terra1p4y54kfdn9uhvh62rjvgz3sydceuw9s6c65aef\"\n      query: {parties_with_deposits: {limit: 100, start_after: 199}}\n    )\n    __typename\n  }\n  p4: wasm {\n    contractQuery(\n      contractAddress: \"terra1p4y54kfdn9uhvh62rjvgz3sydceuw9s6c65aef\"\n      query: {parties_with_deposits: {limit: 100, start_after: 299}}\n    )\n    __typename\n  }\n}"
  // variables: {}
  const requestParams = {
    operationName: 'getParties',
    query,
    variables: {},
  };
  return new Promise((resolve, reject) => {
    axios
      .post<any>(
        'https://hive-graph-main-l2fq3pp6va-as.a.run.app/graphql',
        requestParams
      )
      .then((res) => {
        const result = res.data.data;
        const parties = Object.values(result).flatMap(
          (v: any) => v.contractQuery.parties
        );
        resolve(parties);
      })
      .catch((err) => {
        reject(err);
      });
  });
}
