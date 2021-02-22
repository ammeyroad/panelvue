<template>
  <div class="box is-shadowless AccountApplicationDetail-sidebar">
    <div class="mb-4">
      <p class="heading">Nama</p>
      <p class="title is-size-6">{{ customer.full_name }}</p>
    </div>

    <div class="mb-4">
      <p class="heading">No. Identitas</p>
      <p class="title is-size-6">{{ customer.identity_no }}</p>
    </div>

    <div class="mb-4">
      <p class="heading">Tanggal Lahir</p>
      <p class="title is-size-6">{{ date(customer.date_of_birth) }}</p>
    </div>

    <div class="mb-4">
      <p class="heading">Alamat Tempat Tinggal</p>
      <p
        class="title is-size-6"
        v-html="address(customer.personal_address)"
      ></p>
    </div>

    <div class="mb-4">
      <p class="heading">Alamat Tempat Kerja</p>
      <p class="title is-size-6" v-html="address(customer.work_address)"></p>
    </div>

    <div class="mb-4">
      <p class="heading">Jenis Kelamin</p>
      <p class="title is-size-6">{{ gender(customer.gender) }}</p>
    </div>

    <div class="mb-4">
      <p class="heading">No. Telp.</p>
      <p class="title is-size-6">{{ phoneDisplay }}</p>
    </div>

    <div>
      <p class="heading">Email</p>
      <p class="title is-size-6">{{ nullable(customer.email) }}</p>
    </div>
  </div>
</template>

<script>
import { date } from "@/shared/filters/date-time";
import { gender, address } from "@/shared/filters/customers";
import { nullable } from "@/shared/filters/utils";

export default {
  name: "CustomerView",
  props: {
    customer: {
      type: Object,
      default() {
        return {
          full_name: "",
          identity_no: "",
          date_of_birth: "2020-10-05",
          gender: "F",
          personal_address: null,
          work_address: null,
          phone_no1: "",
          phone_no2: null,
          email: null,
        };
      },
    },
  },

  computed: {
    phoneDisplay() {
      let disp = this.customer.phone_no1;
      if (this.customer.phone_no2) {
        disp += ` | ${this.customer.phone_no2}`;
      }

      return disp;
    },
  },

  methods: {
    nullable,
    gender,
    address,
    date,
  },
};
</script>
