import store from "@/store";

import { DEFAULT_ROLE } from "@/app/users/users.constants";

const { userRoleIs, hasAccessToBank } = store.getters;

export const canViewBank = () => true;

export const canViewAllBanks = () => true;

export const canCreateBank = () => userRoleIs(DEFAULT_ROLE.SUPERADMIN);

export const canEditBank = bankId =>
  hasAccessToBank(bankId) || userRoleIs(DEFAULT_ROLE.SUPERADMIN);
