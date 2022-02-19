import axios from 'axios';

export function queryInkPartyInfo() {
  return axios.get(
    'https://vercel-serverless-geekdao.vercel.app/api/queryInkPartyInfo'
  );
}

export function queryInkPlayers() {
  return axios.get(
    'https://vercel-serverless-geekdao.vercel.app/api/queryInkPlayers'
  );
}

export function queryInkTotalDeposit() {
  return axios.get(
    'https://vercel-serverless-geekdao.vercel.app/api/queryInkTotalDeposit'
  );
}
