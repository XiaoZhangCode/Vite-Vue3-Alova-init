import dayjs from "dayjs";

const DATE_TIME_FORMAT = "YYYY-MM-DD HH:mm:ss";
const DATE_FORMAT = "YYYY-MM-DD";

export function formatToDateTime(
  date?: dayjs.ConfigType,
  format: string = DATE_TIME_FORMAT,
): string {
  return dayjs(date).format(format);
}

export function formatToDate(
  date?: dayjs.ConfigType,
  format: string = DATE_FORMAT,
): string {
  return dayjs(date).format(format);
}

export function beginOfDay(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

export function endOfDay(date: Date): Date {
  return new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    23,
    59,
    59,
    999,
  );
}

export function betweenDay(
  date1: dayjs.ConfigType,
  date2: dayjs.ConfigType,
): number {
  date1 = convertDate(date1);
  date2 = convertDate(date2);
  // 计算差值
  return Math.floor((date2.getTime() - date1.getTime()) / (24 * 3600 * 1000));
}

export function formatDate(date: dayjs.ConfigType, fmt: string): string {
  date = convertDate(date);
  const o = {
    "M+": date.getMonth() + 1, // 月份
    "d+": date.getDate(), // 日
    "H+": date.getHours(), // 小时
    "m+": date.getMinutes(), // 分
    "s+": date.getSeconds(), // 秒
    "q+": Math.floor((date.getMonth() + 3) / 3), // 季度
    S: date.getMilliseconds(), // 毫秒
  };
  if (/(y+)/.test(fmt)) {
    // 年份
    fmt = fmt.replace(
      RegExp.$1,
      `${date.getFullYear()}`.substr(4 - RegExp.$1.length),
    );
  }
  for (const k in o) {
    if (new RegExp(`(${k})`).test(fmt))
      fmt = fmt.replace(
        RegExp.$1,
        // @ts-ignore

        RegExp.$1.length === 1 ? o[k] : `00${o[k]}`.substr(`${o[k]}`.length),
      );
  }
  return fmt;
}

export function addTime(date: dayjs.ConfigType, time: number): Date {
  date = convertDate(date);
  return new Date(date.getTime() + time);
}

export function convertDate(date: dayjs.ConfigType): Date {
  if (typeof date === "string") return new Date(date);

  return date as Date;
}

/**
 * 日期格式化
 * @param date 日期
 * @param block 格式化字符串
 */
export function dateFormat(
  date: dayjs.ConfigType | string,
  block?: string,
): string {
  if (!date) return "";

  let format = block || "yyyy-MM-dd";
  date = new Date(date as any);
  const map = {
    M: date.getMonth() + 1, // 月份
    d: date.getDate(), // 日
    h: date.getHours(), // 小时
    m: date.getMinutes(), // 分
    s: date.getSeconds(), // 秒
    q: Math.floor((date.getMonth() + 3) / 3), // 季度
    S: date.getMilliseconds(), // 毫秒
  };
  format = format.replace(/([yMdhmsqS])+/g, (all, t) => {
    // @ts-ignore
    let v = map[t];
    if (v !== undefined) {
      if (all.length > 1) {
        v = `0${v}`;
        v = v.substr(v.length - 2);
      }
      return v;
    } else if (t === "y") {
      return date
        .getFullYear()
        .toString()
        .substr(4 - all.length);
    }
    return all;
  });
  return format;
}

/**
 * 将毫秒，转换成时间字符串。例如说，xx 分钟
 *
 * @param ms 毫秒
 * @returns {string} 字符串
 */
export function getDate(ms: number): string {
  const day = Math.floor(ms / (24 * 60 * 60 * 1000));
  const hour = Math.floor(ms / (60 * 60 * 1000) - day * 24);
  const minute = Math.floor(ms / (60 * 1000) - day * 24 * 60 - hour * 60);
  const second = Math.floor(
    ms / 1000 - day * 24 * 60 * 60 - hour * 60 * 60 - minute * 60,
  );
  if (day > 0) return `${day}天${hour}小时${minute}分钟`;

  if (hour > 0) return `${hour}小时${minute}分钟`;

  if (minute > 0) return `${minute}分钟`;

  if (second > 0) return `${second}秒`;
  else return `${0}秒`;
}

export const dateUtil = dayjs;
