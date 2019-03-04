<template>
  <transition enter-active-class="animated flipInX">
    <ul class="navbar" v-if='isShow'>
      <li v-for="(item,idx) in navlist" :key='idx'>
        <a :href="item.href">{{item.name}}</a>
      </li>
    </ul>
  </transition>
</template>

<script>
export default {
  data() {
    return {
      isShow: false,
      navlist: [
        { name: "首页", href: "/blog" },
        {
          name: "Web前端",
          href: "/blog/articlelist?by[type_id]=5b16cd78bbe59122b43bf2c1"
        },
        {
          name: "服务端",
          href: "/blog/articlelist?by[type_id]=5b198d59be1c73036d50c176"
        },
        {
          name: "数据库",
          href: "/blog/articlelist?by[type_id]=5b16ce950100982448b19d55"
        },
        { name: "个人简历", href: "/iresume" }
      ]
    };
  },
  mounted() {
    this.isShow = true;
  }
};
</script>

