import { DEFAULT_ROLE, BANK_ROLE } from "./users.constants";

export function defaultRole(v) {
  switch (v) {
    case DEFAULT_ROLE.SUPERADMIN:
      return "Superadmin";
    case DEFAULT_ROLE.ADMIN:
      return "Admin";
    case DEFAULT_ROLE.BANK_OFFICER:
      return "Petugas Bank";
    case DEFAULT_ROLE.CUSTOMER:
      return "Nasabah";
    default:
      return "UNKNOWN";
  }
}

export function bankRole(v) {
  switch (v) {
    case BANK_ROLE.BANK_MANAGER:
      return "Manajer Bank";
    case BANK_ROLE.ACCOUNT_OFFICER:
      return "Account Officer";
    case BANK_ROLE.CUSTOMER:
      return "Nasabah";
    default:
      return "UNKNOWN";
  }
}
