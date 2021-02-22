import _isUndefined from "lodash/isUndefined";
import _isNull from "lodash/isNull";

export const yesNo = s => (s === true ? "Ya" : "Tidak");
export const nullable = s => (_isNull(s) || _isUndefined(s) ? "-" : s);
export const currency = s => {
  if (_isNull(s) || _isUndefined(s)) {
    return "-";
  }
  const num = Number.parseInt(s);
  if (Number.isNaN(num)) {
    return "-";
  }

  return "IDR " + num.toLocaleString("id-ID", { maximumFractionDigits: 2 });
};

export default { yesNo, nullable, currency };
