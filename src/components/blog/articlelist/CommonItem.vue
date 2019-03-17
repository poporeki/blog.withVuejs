<template>
  <ul class="article-list" @scroll="scrolls" ref="ulArclist">
    <transition enter-active-class="animated flipInX">
      <li v-if="isInit&&(!arcList||arcList.length===0)">没有相关内容</li>
    </transition>

    <li v-for="(arc,idx) in arcList" class="article-list-item" :key="idx">
      <a :href="'/blog/article/'+ arc.artid">
        <div class="lt">
          <div class="top">
            <div class="title">
              <h4>{{arc.title}}</h4>
            </div>
            <div class="time">{{arc.create_time}}</div>
          </div>
          <div class="thumbnail">{{arc.source}}</div>
        </div>
      </a>
    </li>
    <li v-if="isOver" style="text-align:center;">--THE END--</li>
    <transition enter-active-class="animated fadeInDown" leave-active-class="animated flipOutX">
      <li v-if="isResuestError" @click="this.getNewData">拉取数据失败，点击重试</li>
    </transition>
    <li v-if="!isResuestError&&this.isRequest">
      <div class="loading-ani-articlelist"></div>
    </li>
  </ul>
</template>

<style lang="scss">
.loading-ani-articlelist {
  position: relative;
  padding: 10px;

  &:after,
  &:before {
    content: "";
    position: absolute;
    width: 10px;
    height: 10px;
    top: 50%;
    margin-top: -5px;
    animation-duration: 2s;
    animation-fill-mode: both;
    animation-name: loadAni;
    animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
    animation-iteration-count: infinite;
    z-index: 1000;
  }

  &:after {
    left: 45%;
    margin-left: -5px;
    background-color: #60bb46;
    box-shadow: 0 0 5px #82b674;
  }

  &:before {
    left: 55%;
    margin-left: -5px;
    background-color: rgb(196, 34, 134);
    box-shadow: 0 0 5px rgb(194, 101, 158);
    animation-delay: 0.2s;
  }

  @keyframes loadAni {
    0% {
      border-radius: 0;
      opacity: 1;
      transform: scale(0);
    }

    50% {
      border-radius: 50%;
      opacity: 1;
      transform: scale(1);
    }

    100% {
      border-radius: 50%;
      opacity: 0;
      transform: scale(2);
    }
  }
}

ul.article-list {
  color: #fff;
  background-color: rgba(0, 0, 0, 0.74);
  padding: 10px 0;
  perspective: 1200px;

  a {
    color: #fff;
  }

  > .article-list-item {
    margin-bottom: 20px;
    border-bottom: 1px solid rgb(41, 41, 41);
    padding: 0 10px;
    padding-bottom: 20px;
    background-color: #000;
    transition: transform 0.2s ease;
    transform-origin: bottom center;
    animation: flipXIn 1s forwards;
    perspective: 1200px;

    &:last-child {
      margin-bottom: 0;
    }

    &:hover,
    &:active {
      > a {
        transform: translateX(5px);
      }
    }

    > a {
      display: flex;
      justify-content: space-between;
      transition: transform 0.3s ease;
    }

    .lt {
      width: 100%;
    }

    .lt {
      position: relative;
      display: flex;
      flex-direction: column;

      .top {
        display: flex;
        flex-direction: row;
        justify-content: space-between;

        .time {
          align-self: center;
          color: rgb(172, 172, 172);
        }

        .title {
          border-left: 5px solid #60bb46;
          padding: 0 5px;
          background-color: #000;
          border-top-right-radius: 2px;
          border-bottom-right-radius: 2px;
        }
      }

      .thumbnail {
        color: rgb(189, 189, 189);
        padding-top: 10px;
      }
    }

    .thumbnail {
      &:after {
        content: "...";
      }
    }
  }
}
</style>

<script>
export default {
  data() {
    return {
      page: 1,
      isInit: false,
      isResuestError: false,
      limit: 10,
      isOver: false,
      isScroll: false,
      isRequest: false,
      typename: "",
      arcList: [],
      menus: this.$route.params.path
    };
  },
  props: ["requestUrl"],
  methods: {
    listenerScroll() {
      window.addEventListener("scroll", this.scrolls);
    },
    scrolls() {
      if (this.isOver) return;
      let ref = this.$refs;
      let listScrollTop = ref.ulArclist.offsetTop;
      let scrollHeight = ref.ulArclist.clientHeight;
      let offsetHeight = document.documentElement.scrollTop;
      let sTop = document.documentElement.offsetHeight;
      let RemainingHeight = scrollHeight + listScrollTop;
      if (
        RemainingHeight - (offsetHeight + sTop) < 100 &&
        this.isScroll === false
      ) {
        this.isScroll = true;
        this.getNewData();
      }
    },
    getNewData() {
      const that = this;
      if (!this.requestUrl) return;
      this.isResuestError = false;
      this.isRequest = true;
      this.$axios
        .get(this.requestUrl, {
          params: { page: this.page, limit: this.limit, isGlobalLoading: false }
        })
        .then(({ data }) => {
          that.isRequest = false;
          let datas = data.data;
          if (data.status === 0||data.status===false) {
            that.isOver = true;
            return;
          }
          that.isScroll = false;
          let list = datas.arclist;
          if (!list) return;
          list.map(value => {
            that.$set(that.arcList, that.arcList.length, value);
          });
          that.page++;
        })
        .catch(err => {
          that.isResuestError = true;
          that.isScroll = false;
        });
    },
    getArticlelistData() {
      const that = this;
      this.$axios.get(this.requestUrl).then(({ data }) => {
        let datas = data.data;
        if (data.status !== 1 || !datas) return;

        that.isInit = true;
        that.typename = datas.typename;
        that.arcList = datas.arclist;
        that.listenerScroll();
        that.page++;
      });
    }
  },

  created() {
    this.getArticlelistData();
  }
};
</script>

