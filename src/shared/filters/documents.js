export function documentType(t) {
  switch (t) {
    case "LG":
      return "Jaminan";
    case "PP":
      return "Foto Pribadi";
    case "ID":
      return "Kartu Identitas";
    case "O":
      return "Lain-lain";
    default:
      return "Tidak Diketahui";
  }
}

export default { documentType };
