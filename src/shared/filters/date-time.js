import isString from "lodash/isString";

import parseISO from "date-fns/parseISO";
import format from "date-fns/format";
import { id } from "date-fns/locale";

export const date = v => {
  if (!isString(v)) {
    return "-";
  }
  return format(parseISO(v), "dd MMM yyyy", { locale: id });
};

export const dateTime = v => {
  if (!isString(v)) {
    return "-";
  }
  return format(parseISO(v), "dd MMM yyyy HH:mm:ss", { locale: id });
};
