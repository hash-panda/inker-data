import { accAdd, myFixed } from './amount';

export function getActualAmount(amount: string | number) {
  return Number(amount) / 1e6;
}

export function getAmount(amount: number) {
  return Number(myFixed(String(amount), 2));
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

export function gotoInkProtocolDocs() {
  window.open('https://docs.inkprotocol.finance/', '_blank');
}

export function gotoTerraStation() {
  window.open('https://station.terra.money/send?token=uusd', '_blank');
}

/*
 * cosmos1p2s0gv05xkm2ajrrku4xv2t9e64cvu4tn289zt 换为 cosmos1p2s0gv...n289zt
 */
export function encodeAddress(address: string) {
  let result = address ? address?.trim() ?? '' : '';
  if (result.trim() && result.length > 20) {
    result = `${address.substring(0, 13)}......${address.substring(
      address.length - 6
    )}`;
  }
  return result;
}

interface AddressAmount {
  address: string;
  amount: string;
}
interface AddressSumAmount {
  address: string;
  sum: number;
}

// party 存款金额 和 个人账户存款金额 合并统计
export function partyAndAccountAddressGroup(items: any): any {
  let result = [] as any;
  const resultGroup = {} as any;
  items.forEach((item: any) => {
    const key = item.address;
    if (!resultGroup[key]) {
      resultGroup[key] = {
        amount: Number(item.amount),
        address: key,
      };
    } else {
      resultGroup[key].amount = accAdd(
        resultGroup[key].amount,
        Number(item.amount)
      );
    }
  });
  const values = Object.values(resultGroup);
  result = values.sort((a: any, b: any) => b.amount - a.amount) as any;
  return result;
}
