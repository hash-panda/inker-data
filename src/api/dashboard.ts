import axios from 'axios';

export interface Player {
  address: string;
  amount: string;
}
export interface PlayersRes {
  height: string;
  result: {
    players: Player[];
  };
}

export interface Chart1 {
  addressIndex: number[];
  amounts: number[];
}

export function queryPlayers(startAddress: string | null) {
  const queryMsg = {
    players: {
      sid: 0,
      start_address: startAddress,
      end_address: null,
      limit: 1000,
    },
  };
  const encodeQueryMsg = JSON.stringify(queryMsg);
  const requestParams = {
    params: {
      query_msg: encodeQueryMsg,
    },
  };
  return axios.get<PlayersRes>(
    'https://lcd.terra.dev/wasm/contracts/terra1nlsfl8djet3z70xu2cj7s9dn7kzyzzfz5z2sd9/store',
    requestParams
  );
}

export interface BlacklistAddressRes {
  height: string;
  result: {
    addresses: string[];
  };
}

export function queryBlacklistAddress() {
  const queryMsg = {
    blacklist_addresses: {
      sid: 0,
    },
  };
  const encodeQueryMsg = JSON.stringify(queryMsg);
  const requestParams = {
    params: {
      query_msg: encodeQueryMsg,
    },
  };
  return axios.get<BlacklistAddressRes>(
    'https://lcd.terra.dev/wasm/contracts/terra1nlsfl8djet3z70xu2cj7s9dn7kzyzzfz5z2sd9/store',
    requestParams
  );
}
