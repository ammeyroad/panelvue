<template>
  <AprBaseLayout>
    <router-view></router-view>
  </AprBaseLayout>
</template>

<script>
import AprBaseLayout from "@/shared/layouts/apr-base-layout/AprBaseLayout";

export default {
  name: "Users",
  components: { AprBaseLayout },
};
</script>
