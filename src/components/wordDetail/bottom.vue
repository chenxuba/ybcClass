<template>
  <div>
    <!-- 底部 -->
    <div class="bottom">
      <van-row>
        <van-col span="15">
          <div class="input_warp">
            <form action="javascript:void(0)">
              <input
                type="text"
                placeholder="下一个神评论就是你..."
                class="input"
                v-model="msgValue"
                @blur="fixScroll"
              />
            </form>
          </div>
        </van-col>
        <van-col span="3" class="liwu ppt" @click="printMsg">
          <span class="print">发送</span>
        </van-col>
        <van-col span="3" class="zan">
          <span class="fenxiang">
            <van-icon name="like" class="icon" />
          </span>
        </van-col>
        <van-col span="3" class="liwu">
          <span>
            <van-icon name="http://qiniu.ybc365.com/%E6%94%B6%20%E8%97%8F.png" class="icon" />
          </span>
        </van-col>
      </van-row>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      msgValue: ""
    };
  },
  methods: {
    /* 使文本框出现在视野内 */
    fixScroll() {
      let u = navigator.userAgent;
      let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
      if (isiOS) {
        window.scrollTo(0, 0);
      }
    },
    //发送信息
    printMsg() {
      alert(this.msgValue)
    }
  }
};
</script>

<style scoped>
.bottom {
  width: 100%;
}
/* 底部样式 */
.bottom {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: #ffffff;
  color: #333;
}
.bottom .zan {
  display: inline-block;
  margin-top: 5px;
}
.bottom .zan .icon {
  font-size: 45px;
  color: red;
  position: relative;
  top: 0px;
  left: 3px;
}
.bottom .zan span {
  display: inline-block;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  text-align: center;
  position: relative;
  line-height: 60px;
}
.bottom .liwu {
  position: relative;
  top: 5px;
}
.bottom .liwu.ppt {
  top: -5px;
}
.bottom .liwu span {
  display: inline-block;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  text-align: center;
  line-height: 60px;
}
.bottom .liwu .icon {
  font-size: 40px;
  color: #fff;
  position: relative;
  top: -2px;
}
.bottom .input {
  color: #333;
  font-size: 30px;
  border: none;
  width: 100%;
  border-radius: 50px;
  background-color: #0000000d;
  padding: 8px 0 8px 30px;
  box-sizing: border-box;
  letter-spacing: 2px;
  position: relative;
  top: -5px;
  font-size: 30px;
}
.bottom .input::-webkit-input-placeholder {
  color: #5dd6c7;
  font-size: 24px;
  line-height: normal;
}
.bottom .input::-moz-placeholder {
  color: #5dd6c7;
  font-size: 24px;
  line-height: normal;
}
.bottom .input::-ms-input-placeholde {
  color: #5dd6c7;
  font-size: 24px;
  line-height: normal;
}
.bottom .input_warp {
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}
/* 聊天框 */
.wrapper {
  overflow: hidden;
  height: 27%;
  width: 80%;
  /* background: red; */
  position: absolute;
  bottom: 10%;
  left: 25px;
}
.wrapper ul {
  padding-bottom: 60px;
}
.wrapper ul li {
  list-style: none;
  line-height: 50px;
  width: 100%;
  word-break: break-all;
  font-size: 30px;
  color: #fff;
  margin-bottom: 10px;
}

.wrapper ul li >>> span.login_name {
  color: #fbe700 !important;
  font-weight: bold;
  font-size: 32px;
  font-family: "Courier New", Courier, monospace;
}
.wrapper ul li >>> span.login_name .content {
  color: #fff;
}
.wrapper ul li >>> .icon {
  color: red;
  vertical-align: middle;
  margin-left: 5px;
  
}
.wrapper ul li >>> img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  vertical-align: middle;
}
.dashang {
  color: #fc7d5e;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}
.print {
  font-size: 30px;
  color: #5dd6c7;
}
</style>