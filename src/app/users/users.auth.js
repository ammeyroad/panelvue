import store from "@/store";

import { DEFAULT_ROLE } from "./users.constants";

const currentUser = store.getters.currentUser;

export const canDelete = () => currentUser.is_super_admin;
export const canCreate = () => currentUser.is_admin;
export const canEdit = user => {
  if (!user) {
    return currentUser.is_admin;
  }

  if (user.default_role === DEFAULT_ROLE.SUPERADMIN) {
    return currentUser.is_super_admin;
  }
  return currentUser.is_admin;
};
export const canViewAll = () => currentUser.is_admin;
export const canView = () => currentUser.is_admin;

export default {
  create: canCreate,
  edit: canEdit,
  viewAll: canViewAll,
  view: canView,
};
