import Swal from "sweetalert2";

import CustomerCard from "@/app/customer/components/CustomerCard";
import LoanApplicationView from "../components/LoanApplicationView";

import handleServiceError from "@/shared/services/error-handler";
import useApiInvoker from "@/shared/services/api-invoker.service";

const EMPTY_LOAN_APPLICATION = {
  id: "",
  status: "X",
  customer: {
    full_name: "",
    work_address: null,
    personal_address: null,
  },
  details: {},
  source_of_income: "",
  loan_amount: 0,
  loan_purpose: "",
  work_address: null,
  personal_address: null,
  created_at: new Date().toISOString(),
  documents: [],
};

export default {
  name: "AccountApplicationDetail",
  components: { CustomerCard, LoanApplicationView },

  metaInfo: {
    title: "Pengajuan Pinjaman",
  },

  props: {
    id: {
      type: String,
      required: true,
    },
    bankId: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      loading: false,
      application: EMPTY_LOAN_APPLICATION,
    };
  },

  mounted() {
    this.fetchAccountApplication();
  },

  methods: {
    fetchAccountApplication() {
      const url = `/banks/${this.bankId}/loan-apps/${this.id}`;
      const apiAuthHeader = this.$store.getters.apiAuthHeader;
      const { apiInvoker } = useApiInvoker({ headers: apiAuthHeader });
      const vm = this;
      vm.loading = true;
      apiInvoker
        .get(url)
        .then(res => {
          vm.loading = false;
          vm.application = res.data;
        })
        .catch(err => {
          vm.loading = false;
          const errors = handleServiceError(err);
          Swal.fire(
            "Gagal Mendapatkan Detail Pengajuan!",
            errors.message,
            errors.level,
          );
        });
    },
  },
};
