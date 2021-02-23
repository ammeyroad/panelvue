<template>
  <AprBaseLayout>
    <router-view></router-view>
  </AprBaseLayout>
</template>

<script>
import AprBaseLayout from "@/shared/layouts/apr-base-layout/AprBaseLayout.vue";

export default {
  name: "Bank",
  components: {
    AprBaseLayout,
  },
};

</script>