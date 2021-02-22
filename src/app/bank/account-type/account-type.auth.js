import store from "@/store";

const hasAccessToBank = store.getters.hasAccessToBank;

export const canViewAll = bankId => hasAccessToBank(bankId);

export const canCreate = bankId => hasAccessToBank(bankId);

export const canEdit = bankId => hasAccessToBank(bankId);

export default {
  create: canCreate,
  edit: canEdit,
  viewAll: canViewAll,
};
