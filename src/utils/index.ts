export function getActualAmount(amount: string | number) {
  return Number(amount) / 1e6;
}

export function formatAmount(amount: string | number) {
  const str = `${getActualAmount(amount)}`;
  const intSum = str
    .substring(0, str.indexOf('.'))
    .replace(/\B(?=(?:\d{3})+$)/g, ',');
  const dot = str.substring(str.length, str.indexOf('.'));
  const ret = intSum + dot;
  return ret;
}

export function getCoin(coin: string) {
  let actualCoin = '';
  if (coin === 'uusd') {
    actualCoin = 'ust';
  }
  return actualCoin;
}

export function gotoInkProtocol() {
  window.open('https://app.inkprotocol.finance/', '_blank');
}
