<template>
  <div class="update-log-box">
    <h2 class="title">
      更新日志
      <small>
        <a href="/blog/log">More</a>
      </small>
    </h2>
    <ul class="log-list">
      <li class="log-list-item" v-for="item in logList" :key="item.id">
        <div class="u-time">
          <i class="iconfont bottom icon-time"></i>:
          <span>{{item.create_time}}</span>
        </div>
        <div class="u-cnt">
          更新内容:
          <span>{{item.log_content}}</span>
        </div>
      </li>
      <li class="log-end">...</li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      logList: []
    };
  },
  methods: {
    getUpdateLogList() {
      let that = this;
      that.$axios
        .get("https://www.yansk.cn/blog/log/getlist?limit=3")
        .then(({ data }) => {
          if (data.status !== 1 || data.data.logList.length === 0) return;
          let list = data.data.logList;
          that.logList = list;
        });
    }
  },
  created() {
    this.getUpdateLogList();
  }
};
</script>

