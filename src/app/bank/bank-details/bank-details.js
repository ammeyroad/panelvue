import { onMounted, reactive, ref } from "@vue/composition-api";
import { useGetters } from "vuex-composition-helpers";
import Swal from "sweetalert2";

import handleServiceError from "@/shared/services/error-handler";
import useApiInvoker from "@/shared/services/api-invoker.service";

import { date } from "@/shared/filters/date-time";

import DepositoInterestRates from "@/shared/components/interest-rates/DepositoInterestRates";
import TabunganInterestRates from "@/shared/components/interest-rates/TabunganInterestRates";

import { canEdit as canEditBranch } from "../bank-branch/bank-branch.auth";
import BankBranchListTable from "../bank-branch/bank-branch-list/components/BankBranchListTable.vue";

export default {
  name: "BankDetail",
  components: {
    DepositoInterestRates,
    TabunganInterestRates,
    BankBranchListTable,
  },

  metaInfo() {
    return {
      title: this.bank.name === "" ? "Bank" : this.bank.name,
    };
  },

  props: {
    id: {
      type: [String, Number],
      required: true,
    },
  },

  filters: {
    date: date,
  },

  setup(props) {
    const bank = reactive({
      logoUrl: null,
      name: "",
      description: "",
      descriptionShort: "",
      accountTypes: [],
      branches: [],
      createdAt: null,
    });
    const isBusy = ref(false);

    const { apiAuthHeader } = useGetters(["apiAuthHeader"]);
    const { apiInvoker } = useApiInvoker({ headers: apiAuthHeader.value });

    onMounted(() => {
      const url = `/banks/${props.id}`;
      isBusy.value = true;
      apiInvoker
        .get(url)
        .then(res => {
          isBusy.value = false;
          const fetchedBank = res.data.data;
          bank.name = fetchedBank.name;
          bank.description = fetchedBank.description;
          bank.descriptionShort = fetchedBank.description_short;
          bank.logoUrl = fetchedBank.logo_url;
          bank.accountTypes = fetchedBank.account_types;
          bank.branches = fetchedBank.branches;
        })
        .catch(err => {
          isBusy.value = false;
          const errors = handleServiceError(err);
          Swal.fire(
            "Gagal Mendapatkan Data Bank!",
            errors.message,
            errors.level,
          );
          console.error(err);
        });
    });

    return {
      bank,
      isBusy,
      canEditBranch: canEditBranch(props.id),
    };
  },
};
