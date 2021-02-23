<template>
  <AprBaseLayout>
    <router-view></router-view>
  </AprBaseLayout>
</template>

<script>
import AprBaseLayout from "@/shared/layouts/apr-base-layout/AprBaseLayout";

export default {
  name: "pelatihanlist",
  components: { AprBaseLayout },
};
</script>
