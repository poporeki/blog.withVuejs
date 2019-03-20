<template>
  <div class="like-box">
      <a href="javascript:void(0);" @click="requestLike" :class="{'btn-article-like':true,'liked':isLiked}">
        <span class='like-number'>{{likesCount}}</span>
        <span class="iconfont icon-like"></span>
      </a>
    </div>
</template>

<style lang="scss" scoped>
.like-box {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10vh 0 0 0;

    .btn-article-like {
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      position: relative;
      width: 20vw;
      height: 20vw;
      max-height: 100px;
      max-width: 100px;
      border-radius: 50%;
      background-color: #4cc37e;
      box-shadow: 0 0 1px #000;
      transition: transform .3s ease, background-color .3s ease, box-shadow .5s ease;
      font-family: 'Architects Daughter',
        cursive;

      .like-number {
        font-size: 1rem;
      }

      .loading-ani {
        border-radius: 50%;
      }

      &:hover {
        background-color: #59e995;
        box-shadow: 0 0 20px #38915a;
        
      }
    }

    .liked {
      background-color: #cc8851;
      box-shadow: 0 0 20px #cc8851;

      &:hover {
        background-color: #cc8851;
      }

      .iconfont {

        color: rgb(255, 81, 0);
      }
    }

    .iconfont {
      display: inline-block;
      color: rgb(100, 100, 100);
      transition: transform 1s ease, color .3s ease;
    }

  }
</style>

<script>
export default {
  props:['arcid','likesTotal','userIsLiked'],
  data(){
    return{
      likesCount:this.likesTotal,
      isLiked:this.userIsLiked?true:false,
      class:this.userIsLiked?'btn-article-like liked':'btn-article-like'
    }
  },
  methods:{
    requestLike(){
      let that=this;

      that.$axios
        .post("http://localhost:3000/api/v1/article/like",{
        arcid: that.arcid,
        isGlobalLoading: false,
      })
      .then(({data})=>{
        that.isLiked=data&&data.data&&data.data.isLiked?true:false;
        if(data.msg!==undefined){
          that.likesCount=data.msg;
        }
      })
    }
  }
}
</script>


