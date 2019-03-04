<template>

</template>
<script>
export default {
  beforeCreate() {
    this.$router.replace({
      path: "/blog",
      name: "blog"
    });
  }
};
</script>
