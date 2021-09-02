import * as crypto from 'crypto';
import { floor, isNil, reduce } from 'lodash';
import moment = require('moment');

/**
 * password encode
 */
export const pswdEncode = (password: string) => {
  const concatKey = str => `talefun${str}.com`;
  const hashcode = crypto.createHmac('sha256', concatKey(password)).digest('hex');

  return hashcode;
};

/**
 * string hash code
 */
export const hashCode = (str: string): string => {
  let number = reduce(str, (tmp, v) => {
    tmp += String.prototype.charCodeAt.call(v, 0);
    return tmp;
  }, 0);
  const alphabets = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let result = '',
    i = 0;

  while (number !== 0) {
    [number, i] = [floor(number / 36), number % 36];
    result += alphabets[i];
  }
  return result || alphabets[0];
};

/**
 * date format to month YYYYMM
 */
export const formatMonth = (str: string | Date) => {
  if (isNil(str)) return str;
  const res = moment(str).format('YYYYMM');
  return parseInt(res);
};
