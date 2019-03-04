<template>
  <div class="wrapper">
    <item-hottop></item-hottop>
    <item-classify></item-classify>
    <item-weather></item-weather>
    <item-article></item-article>
  </div>
</template>
<style lang="scss">
h2 {
  font-size: 0.35rem;
}
</style>

<script>
import TopItem from "./topitem";
import Classify from "./classify";
import Weather from "./weather";
import secArticle from "./sectionArticle";
export default {
  components: {
    "item-hottop": TopItem,
    "item-classify": Classify,
    "item-weather": Weather,
    "item-article": secArticle
  }
};
</script>

