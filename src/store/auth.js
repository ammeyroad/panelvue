import _isEmpty from "lodash/isEmpty";

import { EMPTY_USER } from "@/app/users/users.constants";

export const EMPTY_ROLE = {
  bank_id: null,
  role: null,
  bank: {
    id: null,
    name: "",
  },
};

export const EMPTY_API_TOKEN = {
  token: "",
  expiresAt: "",
  authId: "",
};

const USER_KEY = "user";
export function getStoredUser() {
  let storedUser = sessionStorage.getItem(USER_KEY);
  if (storedUser === null) {
    storedUser = EMPTY_USER;
  } else {
    storedUser = JSON.parse(storedUser);
  }
  return storedUser;
}

export function setStoredUser(user) {
  if (user.id !== null) {
    sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  } else {
    sessionStorage.removeItem(USER_KEY);
  }
}

const SELECTED_BANK_KEY = "bank";
export function getStoredBank() {
  let storedSelectedBank = sessionStorage.getItem(SELECTED_BANK_KEY);
  if (storedSelectedBank === null) {
    storedSelectedBank = null;
  } else {
    storedSelectedBank = Number.parseInt(storedSelectedBank);
  }
  return storedSelectedBank;
}

export function setStoredBank(bank) {
  if (bank !== null) {
    sessionStorage.setItem(SELECTED_BANK_KEY, bank);
  } else {
    sessionStorage.removeItem(SELECTED_BANK_KEY);
  }
}

const API_TOKEN_KEY = "apiToken";
export function getStoredApiToken() {
  let storedToken = sessionStorage.getItem(API_TOKEN_KEY);
  if (storedToken === null) {
    storedToken = EMPTY_API_TOKEN;
  } else {
    storedToken = JSON.parse(storedToken);
  }
  return storedToken;
}

export function setStoredApiToken(token) {
  if (!_isEmpty(token.token)) {
    sessionStorage.setItem(API_TOKEN_KEY, JSON.stringify(token));
  } else {
    sessionStorage.removeItem(API_TOKEN_KEY);
  }
}
