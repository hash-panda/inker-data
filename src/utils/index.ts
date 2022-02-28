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
  let result = address?.trim() ?? '';
  if (address.trim() && address.length > 20) {
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
export function partyAndAccountAddressGroup(
  items: AddressAmount[]
): AddressSumAmount[] {
  let result = [] as AddressSumAmount[];
  const resultGroup = {} as any;
  items.forEach((item) => {
    const key = item.address;
    if (!resultGroup[key]) {
      resultGroup[key] = {
        sum: item.amount,
        address: key,
      };
    } else {
      resultGroup[key].sum += item.amount;
      resultGroup[key].children.push(item);
    }
  });
  const values = Object.values(resultGroup);
  result = values.sort((a: any, b: any) => b.sum - a.sum) as AddressSumAmount[];
  return result;
}
