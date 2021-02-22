import { AUTH_TYPE } from "./users.constants";
import store from "@/store";

import useApiInvoker from "@/shared/services/api-invoker.service";

export function getUserAuthApiUrl(userId, authType) {
  let longAuthType;
  switch (authType) {
    case AUTH_TYPE.EMAIL:
      longAuthType = "email";
      break;
    case AUTH_TYPE.PHONE1:
      longAuthType = "phone_no1";
      break;
    case AUTH_TYPE.PHONE2:
      longAuthType = "phone_no2";
      break;
    default:
      throw new Error(`Unknown authType ${authType}!`);
  }

  return `/users/${userId}/auths/${longAuthType}`;
}

export function getUserRoleApiUrl(userId, bankId) {
  return `/users/${userId}/auths/${bankId}`;
}

export function checkAuthIdAvailable(authId, authType, targetUserId = null) {
  const data = {};
  if (authType === AUTH_TYPE.EMAIL) {
    data.email = authId;
  } else {
    data.phone_no = authId;
  }
  if (targetUserId !== null) {
    data.user = targetUserId;
  }

  const { apiInvoker } = useApiInvoker({
    headers: store.getters.apiAuthHeader,
  });
  const url =
    authType === AUTH_TYPE.EMAIL ? "/auth/email-check" : "/auth/phone-check";

  return apiInvoker.post(url, data).then(res => res.data);
}
