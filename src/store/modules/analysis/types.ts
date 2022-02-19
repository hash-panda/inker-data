export interface AnalysisPartyInfo {
  _id: string;
  partyCount: number;
  create: number;
  partyTotalAmount: number;
  partyPlayersCount: number;
}

export interface AnalysisPartyDisplay {
  partyCount: number;
  create: string;
  partyTotalAmount: number;
  partyPlayersCount: number;
}

export interface AnalysisPlayersInfo {
  _id: string;
  players: number;
  create: number;
}

export interface AnalysisPlayersDisplay {
  players: number;
  create: string;
}

export interface AnalysisTotalDepositInfo {
  _id: string;
  amount: number;
  denom: string;
  create: number;
}

export interface AnalysisTotalDepositDisplay {
  amount: number;
  denom: string;
  create: string;
}
