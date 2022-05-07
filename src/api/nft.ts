import axios from 'axios';

// https://fcd.terra.dev/wasm/contracts/terra14f5y8j5udr48a3prakm3j8st96u3rczuqtlc55/store?query_msg=%7B%22all_nft_info%22:%7B%22token_id%22:%222501%22%7D%7D
export function queryTokenIdByAddress(address: string) {
  const queryMsg = {
    tokens: {
      owner: address,
    },
  };
  const encodeQueryMsg = JSON.stringify(queryMsg);
  const requestParams = {
    params: {
      query_msg: encodeQueryMsg,
    },
  };
  return axios.get<any>(
    'https://fcd.terra.dev/wasm/contracts/terra14f5y8j5udr48a3prakm3j8st96u3rczuqtlc55/store',
    requestParams
  );
}

// https://fcd.terra.dev/wasm/contracts/terra14f5y8j5udr48a3prakm3j8st96u3rczuqtlc55/store?query_msg=%7B%22all_nft_info%22:%7B%22token_id%22:%222501%22%7D%7D
export function queryNftList(tokenId: string) {
  const queryMsg = {
    all_nft_info: {
      token_id: tokenId,
    },
  };
  const encodeQueryMsg = JSON.stringify(queryMsg);
  const requestParams = {
    params: {
      query_msg: encodeQueryMsg,
    },
  };
  return axios.get<any>(
    'https://fcd.terra.dev/wasm/contracts/terra14f5y8j5udr48a3prakm3j8st96u3rczuqtlc55/store',
    requestParams
  );
}

export function queryTigerNftsFromKnowhere() {
  const requestParams = {
    limit: 3000,
    offset: 0,
    saleStatuses: ['NotStarted', 'InProgress'],
    saleTypes: [],
    sortBy: 'Price',
    sortType: 'ASC',
    traits: [],
    query: '',
    nftContract: 'terra14f5y8j5udr48a3prakm3j8st96u3rczuqtlc55',
  };
  return axios.post<any>(
    'https://production-backend-v3.knowhere.art/nfts',
    requestParams
  );
}

export function queryProsperNftsFromKnowhere() {
  const requestParams = {
    limit: 3000,
    offset: 0,
    saleStatuses: ['NotStarted', 'InProgress'],
    saleTypes: [],
    sortBy: 'Price',
    sortType: 'ASC',
    traits: [],
    query: '',
    nftContract: 'terra1qd2djwhrc9prwztsf6t6necs9f5scdwksvs6ad',
  };
  return axios.post<any>(
    'https://production-backend-v3.knowhere.art/nfts',
    requestParams
  );
}
