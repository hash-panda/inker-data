/**
 * 金额(精度)计算--加法
 * @global
 * @function
 * @alias 工具类-加法 accurateAdd
 * @param {String|Number} a 加数
 * @param {String|Number} b 加数
 * @returns {Number}
 */
export function accurateAdd(a, b) {
  // 加法计算
  let c, d, e;
  try {
    c = a.toString().split('.')[1].length;
  } catch (f) {
    c = 0;
  }
  try {
    d = b.toString().split('.')[1].length;
  } catch (f) {
    d = 0;
  }
  e = Math.pow(10, Math.max(c, d));
  return (accurateMul(a, e) + accurateMul(b, e)) / e;
}

/**
 * 金额(精度)计算--减法
 * @global
 * @function
 * @alias 工具类-减法 accurateSub
 * @param {String|Number} a 被减数
 * @param {String|Number} b 减数
 * @returns {Number}
 */
export function accurateSub(a, b) {
  // 减法计算
  let c, d, e;
  try {
    c = a.toString().split('.')[1].length;
  } catch (f) {
    c = 0;
  }
  try {
    d = b.toString().split('.')[1].length;
  } catch (f) {
    d = 0;
  }
  e = Math.pow(10, Math.max(c, d));
  return (accurateMul(a, e) - accurateMul(b, e)) / e;
}

/**
 * 金额(精度)计算--乘法
 * @global
 * @function
 * @alias 工具类-乘法 accurateMul
 * @param {String|Number} a 因数
 * @param {String|Number} b 因数
 * @returns {Number}
 */
export function accurateMul(a, b) {
  // 乘法计算
  let c = 0;
  let d = a.toString();
  let e = b.toString();
  try {
    c += d.split('.')[1].length;
  } catch (f) {}
  try {
    c += e.split('.')[1].length;
  } catch (f) {}
  return (
    (Number(d.replace('.', '')) * Number(e.replace('.', ''))) / Math.pow(10, c)
  );
}

/**
 * 金额(精度)计算--除法
 * @global
 * @function
 * @alias 工具类-除法 accurateDiv
 * @param {String|Number} a 被除数
 * @param {String|Number} b 除数
 * @returns {Number}
 */
export function accurateDiv(a, b) {
  // 除法计算
  let c;
  let d;
  let e = 0;
  let f = 0;
  try {
    e = a.toString().split('.')[1].length;
  } catch (g) {}
  try {
    f = b.toString().split('.')[1].length;
  } catch (g) {}
  c = Number(a.toString().replace('.', ''));
  d = Number(b.toString().replace('.', ''));
  return accurateMul(c / d, Math.pow(10, f - e));
}
