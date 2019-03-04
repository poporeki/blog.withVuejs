<template>
  <transition enter-active-class="animated flipInX">
    <ul class="navbar" v-if='isShow'>
      <li v-for="(item,idx) in navlist" :key='idx'>
        <a :href='"/blog/articlelist?by[type_id]="+item._id'>{{item.type_name}}</a>
      </li>
    </ul>
  </transition>
</template>

<script>
export default {
  data() {
    return {
      isShow: false,
      navlist: []
    };
  },
  methods:{
    getNavbar(){
      let that=this;
      this.$axios
      .get('https://www.yansk.cn/api/v1/gethomenavbar')
      .then(({data})=>{
        this.navlist=data.data;
      })
    }
  },
  created(){
    this.getNavbar();
  },
  mounted() {
    this.isShow = true;
  }
};
</script>

