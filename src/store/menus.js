import _cloneDeep from "lodash/cloneDeep";
import PAGES from "@/shared/constants/page.constant";

export default function getMenus(state) {
  const pages = _cloneDeep(PAGES);
  const user = state.user;
  if (user.is_admin) {
    pages.push({
      name: "Pengguna",
      link: "/users",
    });
  }

  return pages;
}
