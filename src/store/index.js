import Vue from "vue";
import Vuex from "vuex";

import {
  UPDATE_USER,
  UPDATE_SELECTED_BANK,
  UPDATE_API_TOKEN,
  UPDATE_PASSWORD_MODAL,
} from "./mutation-types";

import { EMPTY_USER } from "@/app/users/users.constants";

import getMenus from "./menus";
import {
  getStoredUser,
  setStoredUser,
  getStoredApiToken,
  setStoredApiToken,
  getStoredBank,
  setStoredBank,
  EMPTY_ROLE,
  EMPTY_API_TOKEN,
} from "./auth";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    user: getStoredUser(),
    bank: getStoredBank(),
    apiToken: getStoredApiToken(),
    updatePasswordModal: false,
  },
  getters: {
    currentUser: state => state.user,
    userBanks: state =>
      state.user.roles.map(role => ({
        text: role.bank.name,
        value: role.bank.id,
      })),
    selectedBank(state) {
      const role =
        state.user.roles.find(bankRole => bankRole.bank_id === state.bank) ||
        EMPTY_ROLE;
      return {
        bank: role.bank,
        role: role.role,
      };
    },

    menus: getMenus,
    isLoggedIn(state) {
      return state.user.id !== null;
    },

    userRoleIs: state => role => state.user.default_role === role,

    hasAccessToBank: state => bankId => {
      return (
        state.user.roles.filter(userRole => userRole.bank_id === bankId)
          .length > 0
      );
    },

    apiAuthHeader(state) {
      return {
        Authorization:
          state.apiToken.token !== "" ? `Bearer ${state.apiToken.token}` : null,
      };
    },
  },
  mutations: {
    [UPDATE_USER](state, newUser) {
      state.user = newUser;
    },
    [UPDATE_SELECTED_BANK](state, newBankId) {
      state.bank = Number.parseInt(newBankId);
    },
    [UPDATE_API_TOKEN](state, newToken) {
      state.apiToken = newToken;
    },
    [UPDATE_PASSWORD_MODAL](state, isOpen) {
      state.updatePasswordModal = isOpen;
    },
  },
  actions: {
    logout({ dispatch }) {
      dispatch("updateUser", EMPTY_USER);
      dispatch("updateApiToken", { token: EMPTY_API_TOKEN, persist: true });
    },

    updateUser({ state, commit, dispatch }, newUser) {
      setStoredUser(newUser);

      if (newUser.roles.length > 0) {
        const currentBank = newUser.roles.find(
          role => role.bank.id === state.bank,
        ); // this is the ID
        if (!currentBank) {
          dispatch("updateSelectedBank", newUser.roles[0].bank.id);
        }
      } else {
        dispatch("updateSelectedBank", null);
      }

      commit(UPDATE_USER, newUser);
    },

    addBankToCurrentUser({ state, commit }, { bank, role }) {
      const currentUser = state.user;
      const newBankRole = {
        bank_id: bank.id,
        role,
        bank: {
          id: bank.id,
          name: bank.name,
        },
      };
      const currentBankWithIdIdx = currentUser.roles.findIndex(
        b => b.bank_id === bank.id,
      );
      if (currentBankWithIdIdx !== -1) {
        currentUser.roles[currentBankWithIdIdx] = newBankRole;
      } else {
        currentUser.roles.push(newBankRole);
      }
      commit(UPDATE_USER, currentUser);
    },

    updateSelectedBank({ commit }, newBankId) {
      setStoredBank(newBankId);
      commit(UPDATE_SELECTED_BANK, newBankId);
    },

    updateApiToken({ commit }, payload) {
      const persist = payload.persist || false;
      if (persist) {
        setStoredApiToken(payload.token);
      }
      commit(UPDATE_API_TOKEN, payload.token);
    },

    updatePasswordModal({ commit }, isOpen) {
      commit(UPDATE_PASSWORD_MODAL, isOpen);
    },
  },
  modules: {},
});

export default store;
