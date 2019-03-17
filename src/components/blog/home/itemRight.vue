<template>
  <div class="right-item">
    <item-tags></item-tags>
    <item-commtop></item-commtop>
    <item-log></item-log>
  </div>
</template>
<style lang="scss" scoped>
.right-item {
  padding-left: 10px;
  box-sizing: border-box;
}
</style>

<script>
import itemTags from "./item_article_right_taglist";
import itemCommtop from "./item_article_right_comment";
import itemLog from "./item_article_right_update_log";
export default {
  components: {
    itemTags,
    itemCommtop,
    itemLog
  }
};
</script>

