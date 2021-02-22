import he from "he";
import _isEqual from "lodash/isEqual";

import { EMPTY_ADDRESS } from "../constants/address.constant";

export const greetingGender = gender => (gender === "F" ? "Ibu" : "Bapak");
export const gender = gender => (gender === "F" ? "Wanita" : "Pria");
export const address = address => {
  if (address === null || address === undefined) {
    return "N/A";
  }

  if (address instanceof String) {
    return address;
  }

  if (_isEqual(address, EMPTY_ADDRESS)) {
    return "N/A";
  }

  let addressStr = `<p>${he.encode(address.line1)}`;
  if (address.line2) {
    addressStr += `<br/>${he.encode(address.line2)}`;
  }
  if (address.line3) {
    addressStr += `<br/>${he.encode(address.line3)}`;
  }
  addressStr += `<br/>${he.encode(address.desa_kelurahan)}, ${he.encode(
    address.kecamatan,
  )}`;
  addressStr += `<br/>${he.encode(address.kabupaten_kota)}, ${he.encode(
    address.province,
  )}`;
  addressStr += `<br/>${he.encode(address.postcode)}</p>`;

  return addressStr;
};

export default { gender, greetingGender, address };
