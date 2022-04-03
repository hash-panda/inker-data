import axios from 'axios';

export interface PlayerAwardsQueryMsg {
  player_awards: {
    sid: number;
    address: string;
    start_round: number;
    end_round: number;
  };
}

export interface AmountInfo {
  info: {
    native_token: {
      denom: string; // uusd
    };
  };
  amount: string;
}

interface PlayerAwardsWinner {
  winner: {
    award: AmountInfo;
    address: string;
    deposit_snapshot: string;
    is_claimed: boolean;
  };
  round: number;
  index: number;
  total_deposit_snapshot: AmountInfo;
  total_blacklist_snapshot: AmountInfo;
}

export interface PlayerAwardsRes {
  height: string;
  result: {
    player_awards: PlayerAwardsWinner[];
  };
}

export function queryPlayerAwards(address: string) {
  const queryMsg: PlayerAwardsQueryMsg = {
    player_awards: {
      sid: 0,
      start_round: 1,
      // TODO 需要使用当前 round 的值，会更好
      end_round: 10000,
      address,
    },
  };
  const encodeQueryMsg = JSON.stringify(queryMsg);
  const requestParams = {
    params: {
      query_msg: encodeQueryMsg,
    },
  };
  return axios.get<PlayerAwardsRes>(
    'https://lcd.terra.dev/wasm/contracts/terra1nlsfl8djet3z70xu2cj7s9dn7kzyzzfz5z2sd9/store',
    requestParams
  );
}

export interface DepositInfoRes {
  height: string;
  result: {
    asset: {
      info: {
        native_token: {
          denom: string; // uusd
        };
      };
      amount: string;
    };
  };
}

export function queryDepositInfo(address: string) {
  const queryMsg = {
    deposit_info: {
      sid: 0,
      address,
    },
  };
  const encodeQueryMsg = JSON.stringify(queryMsg);
  const requestParams = {
    params: {
      query_msg: encodeQueryMsg,
    },
  };
  return axios.get<DepositInfoRes>(
    'https://lcd.terra.dev/wasm/contracts/terra1nlsfl8djet3z70xu2cj7s9dn7kzyzzfz5z2sd9/store',
    requestParams
  );
}

export interface CyoiInfoRes {
  height: string;
  result: {
    is_created: boolean;
    vault_addr: string;
    info: {
      aust_rate: string;
      aust: string;
      current_ust: string;
      initial_ust: string;
      core: string;
      total: string;
    };
  };
}

export function queryCyoiInfo(address: string) {
  const queryMsg = {
    vault: {
      address,
    },
  };
  const encodeQueryMsg = JSON.stringify(queryMsg);
  const requestParams = {
    params: {
      query_msg: encodeQueryMsg,
    },
  };
  return axios.get<CyoiInfoRes>(
    'https://lcd.terra.dev/wasm/contracts/terra1v579mvp2xxw3st7glgaurfla5pxses0jdwedde/store',
    requestParams
  );
}
