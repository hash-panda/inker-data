/**
 * 除法函数，用来得到精确的除法结果
 * @param arg1
 * @param arg2
 * @returns
 */
export function accDiv(arg1: number, arg2: number) {
  let t1 = 0;
  let t2 = 0;
  let r1 = 0;
  let r2 = 0;
  try {
    t1 = arg1.toString().split('.')[1].length;
  } catch (e) {
    console.log(e);
  }
  try {
    t2 = arg2.toString().split('.')[1].length;
  } catch (e) {
    console.log(e);
  }
  r1 = Number(arg1.toString().replace('.', ''));
  r2 = Number(arg2.toString().replace('.', ''));
  return (r1 / r2) * 10 ** (t2 - t1);
}

/**
 * 乘法函数，用来得到精确的乘法结果
 * @param arg1
 * @param arg2
 * @returns
 */
export function accMul(arg1: number, arg2: number) {
  let m = 0;
  const s1 = arg1.toString();
  const s2 = arg2.toString();
  try {
    m += s1.split('.')[1].length;
  } catch (e) {
    console.log(e);
  }
  try {
    m += s2.split('.')[1].length;
  } catch (e) {
    console.log(e);
  }
  return (Number(s1.replace('.', '')) * Number(s2.replace('.', ''))) / 10 ** m;
}

/**
 * 加法函数，用来得到精确的加法结果
 * @param arg1
 * @param arg2
 * @returns
 */
export function accAdd(arg1: number, arg2: number) {
  let r1 = 0;
  let r2 = 0;
  let m = 0;
  try {
    r1 = arg1.toString().split('.')[1].length;
  } catch (e) {
    r1 = 0;
  }
  try {
    r2 = arg2.toString().split('.')[1].length;
  } catch (e) {
    r2 = 0;
  }
  m = 10 ** Math.max(r1, r2);
  return (arg1 * m + arg2 * m) / m;
}

/**
 * 减法函数，用来得到精确的减法结果
 * @param arg1
 * @param arg2
 * @returns
 */
export function accSubtr(arg1: number, arg2: number) {
  let r1 = 0;
  let r2 = 0;
  let m = 0;
  let n = 0;
  try {
    r1 = arg1.toString().split('.')[1].length;
  } catch (e) {
    r1 = 0;
  }
  try {
    r2 = arg2.toString().split('.')[1].length;
  } catch (e) {
    r2 = 0;
  }
  m = 10 ** Math.max(r1, r2);
  // 动态控制精度长度
  n = r1 >= r2 ? r1 : r2;
  return ((arg1 * m - arg2 * m) / m).toFixed(n);
}

/**
 * 保留小数点几位数, 自动补零, 四舍五入
 * @param num: 数值
 * @param digit: 小数点后位数
 * @returns string
 */
export function myFixed(num: string, digit: number): string {
  if (Object.is(parseFloat(num), NaN)) {
    console.log(`传入的值：${num}不是一个数字`);
    return '0';
  }
  const numFloat = parseFloat(num);
  return (
    Math.round((numFloat + Number.EPSILON) * 10 ** digit) /
    10 ** digit
  ).toFixed(digit);
}
