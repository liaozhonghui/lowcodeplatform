import { each, head, isArray, keys, map, size } from 'lodash';
import * as moment from 'moment';

// moment format time
export const formatTime = time => moment(time).format('YYYY-MM-DD HH:mm:ss');


/**
 * json response handler
 * @param param0 { ctx, res, msg}
 * @return
 * {
 *  code: 0, // error code
 *  msg: '', // error msg
 *  data: any // resp data
 * }
 */
export const success = ({ ctx, res = null, msg = '请求成功' }: { ctx: any, res: any, msg: string; }) => {
  ctx.body = {
    code: 0,
    msg,
    data: res,
  };
  ctx.status = 200;
};

/**
 * Array(object) -> Array(Array(v))
 * data format :csv
 */
const csvFormat = (data) => {
  if (!isArray(data) || size(data) === 0) return data;
  const res: any[] = [];
  const header = keys(head(data));
  res.push(header);
  each(data, (o) => {
    res.push(map(header, key => o[key]));
  });
  return res;
};
export const format = (ctx, data) => {
  if (ctx.query && ctx.query.format == 'csv') return csvFormat(data);
  else return data;
};
