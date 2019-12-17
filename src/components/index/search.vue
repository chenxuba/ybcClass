<template>
  <div class="search">
    <van-row class="search-row">
      <van-col span="21" >
        <form action="javascript:void 0" @click="showSearchInput">
          <van-search placeholder="请输入搜索关键词"  shape="round" disabled="true"/>
        </form>
      </van-col>
      <van-col span="3" class="msg-icon" >
        <van-icon name="comment-o" info="0" @click="goMsgList"/>
      </van-col>
    </van-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: ""
    };
  },
  methods: {
    showSearchInput(){
      this.$router.push('/search')
    },
    goMsgList(){
      this.$router.push("/msgList")
    }
  }
};
</script>

<style scoped>
.msg-icon {
  color: rgb(173, 171, 171);
  font-size: 50px;
  position: relative;
}
.van-search {
  padding-bottom: 10px;
  padding-right: 0;
  box-sizing: border-box;
}
.van-icon-comment-o {
  position: absolute;
  top: 1400%;
  left: 20%;
}
</style>