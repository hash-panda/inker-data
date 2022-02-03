import axios from 'axios';

export interface WinnerQueryMsg {
  winners: {
    sid: number;
    round: number;
  };
}

export interface Winners {
  icon?: string;
  address: string;
  award: {
    amount: string;
    info: any;
    deposit_snapshot: string;
    is_claimed: boolean;
  };
}

export interface WinnerRes {
  height: string;
  result: {
    total_blacklist_snapshot: any;
    total_deposit_snapshot: any;
    winners: Winners[];
  };
}

export interface StrategyRes {
  height: string;
  result: {
    address: string;
    total_deposit: any;
    round_period: number;
    end_round_time: number;
    round: number;
  };
}

export function queryWinnerList(round: number) {
  const queryMsg: WinnerQueryMsg = {
    winners: {
      sid: 0,
      round,
    },
  };
  const encodeQueryMsg = JSON.stringify(queryMsg);
  const requestParams = {
    params: {
      query_msg: encodeQueryMsg,
    },
  };
  return axios.get<WinnerRes>(
    'https://lcd.terra.dev/wasm/contracts/terra1nlsfl8djet3z70xu2cj7s9dn7kzyzzfz5z2sd9/store',
    requestParams
  );
}

export function queryStrategy() {
  const queryMsg = {
    strategy: {
      sid: 0,
    },
  };
  const encodeQueryMsg = JSON.stringify(queryMsg);
  const requestParams = {
    params: {
      query_msg: encodeQueryMsg,
    },
  };
  return axios.get<StrategyRes>(
    'https://fcd.terra.dev/wasm/contracts/terra1nlsfl8djet3z70xu2cj7s9dn7kzyzzfz5z2sd9/store',
    requestParams
  );
}

export interface CurrentWinnerAwards {
  amount: string;
  info: {
    native_token: {
      denom: string;
    };
  };
}

export interface CurrentAwardRes {
  height: string;
  result: {
    total_award: {
      amount: string;
      info: any;
    };
    winner_awards: CurrentWinnerAwards[];
  };
}

export function queryCurrentAward(block: number) {
  const queryMsg = {
    award: {
      sid: 0,
      block,
    },
  };
  const encodeQueryMsg = JSON.stringify(queryMsg);
  const requestParams = {
    params: {
      query_msg: encodeQueryMsg,
    },
  };
  return axios.get<CurrentAwardRes>(
    'https://lcd.terra.dev/wasm/contracts/terra1nlsfl8djet3z70xu2cj7s9dn7kzyzzfz5z2sd9/store',
    requestParams
  );
}

export interface EpochStateRes {
  height: string;
  result: {
    deposit_rate: string;
    last_executed_height: number;
    prev_aterra_supply: string;
    prev_exchange_rate: string;
    prev_interest_buffer: string;
  };
}

export function queryEpochState() {
  const queryMsg = {
    epoch_state: {},
  };
  const encodeQueryMsg = JSON.stringify(queryMsg);
  const requestParams = {
    params: {
      query_msg: encodeQueryMsg,
    },
  };
  return axios.get<EpochStateRes>(
    'https://lcd.terra.dev/wasm/contracts/terra1nlsfl8djet3z70xu2cj7s9dn7kzyzzfz5z2sd9/store',
    requestParams
  );
}
