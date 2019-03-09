<template>
<div class="o-arc-lkbox">
  <div class="arc-link-wrap prev" v-if="arcPrev">
    <span class="iconfont icon-leftarrows"></span>
    <a :href='"/blog/article/"+arcPrev._id'>
          上一篇:&nbsp;{{arcPrev.title}}
        </a>
  </div>

  <div class="arc-link-wrap next" v-if="arcNext">
    <span class="iconfont icon-rightarrows"></span>
    <a :href='"/blog/article/"+arcNext._id'>
          下一篇:&nbsp;{{arcNext.title}}</a>
  </div>
</div>
</template>

<style lang="scss">
.o-arc-lkbox {
  margin-top: 50px;

  .arc-link-wrap {
    color: #085e2c;
    padding: 5px 0;

    &,
    a {
      font-size: .26rem;
    }

    a {
      color: #d7d5d5;
      transition: color .3s ease;
    }

    .iconfont {
      display: inline-block;
      transition: transform .3s ease;
    }

    &:hover {
      a {
        text-decoration: underline;
        color: #fff;
      }

      &.prev {
        .iconfont {
          transform: translateX(-5px);
        }

      }

      &.next {
        .iconfont {
          transform: translateX(-5px);
        }
      }
    }

  }
}
</style>

<script>
export default {
  props: ["arcprev", "arcnext"],
  data() {
    return {
      arcPrev: this.arcprev,
      arcNext: this.arcnext
    }
  }
};
</script>
