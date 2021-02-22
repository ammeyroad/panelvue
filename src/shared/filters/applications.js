import { STATUS } from "../constants/applications.constant";

export function status(v) {
  switch (v) {
    case STATUS.RECEIVED:
      return "Diterima";
    case STATUS.REVIEW:
      return "Dalam Peninjauan";
    case STATUS.DOCUMENT_REQUIRED:
      return "Dokumen Kurang";
    case STATUS.REJECTED:
      return "Ditolak";
    case STATUS.ACCEPTED:
      return "Disetujui";
    case STATUS.CANCELED:
      return "Dibatalkan";
  }
}

export default { status };
