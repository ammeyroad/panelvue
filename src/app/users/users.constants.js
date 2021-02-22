export const DEFAULT_ROLE = {
  SUPERADMIN: 0,
  CUSTOMER: 1,
  BANK_OFFICER: 2,
  ADMIN: 3,
};

export const BANK_ROLE = {
  CUSTOMER: 1,
  ACCOUNT_OFFICER: 2,
  BANK_MANAGER: 4,
};

export const AUTH_TYPE = {
  PHONE1: "P1",
  PHONE2: "P2",
  EMAIL: "E",
};

export const EMPTY_USER = {
  id: null,
  full_name: "",
  roles: [],
  is_admin: false,
};
