<template>
  <div>
    <p>{{num}}</p>
    <a href="javascript:void(0);" @click="onReset">点击</a>
    <!-- <one-item v-for="sec in sectionDatas" :key='sec.id' :secname="sec.sectionName"></one-item> -->
    <one-item :secname='num'></one-item>
  </div>
</template>
<script>
import oneItem from "./oneitem";
export default {
  data() {
    return {
      num: 0,
      sectionDatas: [
        {
          sectionName: "推荐",
          requestUrl: "http://****************",
          more: "*************************"
        },
        {
          sectionName: "推荐2",
          requestUrl: "http://****************",
          more: "*************************"
        },
        {
          sectionName: "推荐3",
          requestUrl: "http://****************",
          more: "*************************"
        },
        {
          sectionName: "推荐4",
          requestUrl: "http://****************",
          more: "*************************"
        },
        {
          sectionName: "推荐5",
          requestUrl: "http://****************",
          more: "*************************"
        },
        {
          sectionName: "推荐6",
          requestUrl: "http://****************",
          more: "*************************"
        },
        {
          sectionName: "推荐7",
          requestUrl: "http://****************",
          more: "*************************"
        }
      ],
      json1: [
        { firstName: "a", lastName: "1" },
        { firstName: "b", lastName: "2" },
        { firstName: "c", lastName: "3" }
      ],
      json2: [
        { firstName: "d", lastName: "4" },
        { firstName: "e", lastName: "5" }
      ]
    };
  },
  components: {
    oneItem
  },
  methods: {
    addNum() {
      const that = this;
      setTimeout(() => {
        that.num++;
        that.addNum();
      }, 100);
    },
    onReset() {
      let number = this.getNum();
      this.getFineViedos(number);
    },
    getNum() {
      return this.num < 16 ? (this.num += 4) : (this.num = 0);
    }/* ,
    bianli(Jone, Jtwo) {
      let target = JSON.parse(Jone);
      let that=this;
      target.map(value => {
        that.$set(that.json1, that.json1.length, value);
      });
    } */
  },
  mounted() {
    this.addNum();
  }
};
</script>

