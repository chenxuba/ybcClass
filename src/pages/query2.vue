<template>
  <div class="query2" ref="warp" v-height>
    <div class="warp">
      <goHome></goHome>
      <form action>
        <h2 style="text-align: center;">
          <img src="../../static/img/ybc.png" alt class="ybc" />
          <!---->
        </h2>
        <div class="form_title">
          <h2>
            <i>
              <img src="../../static/img/searchHead.png" alt />
            </i>
            <span>人才数据库</span>
            <!---->
          </h2>
        </div>
        <div class="style_input">
          <div class="input_style">
            <span>
              <img src="../../static/img/zsInput.png" alt />
            </span>
            <input type="text" placeholder="请输入证书编号或姓名（必填）" v-model="content" />
          </div>
          <div class="input_style input_style_none">
            <input type="button" value="查询" @click="query" />
          </div>
          <ul>
            <li>注意:</li>
            <li>1.查询证书需经权属人同意。</li>
            <li>2.证书查询结果不得用于违背权属人意愿之用途。</li>
            <li>3.咨询电话：021-80392253</li>
            <li>
              欢迎您提供宝贵建议！
              <span @click="tel">意见反馈</span>
            </li>
          </ul>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import { Toast } from "vant";
export default {
  data() {
    return {};
  },
  methods: {
    //请求查询证书
    ...mapActions(["getZbook"]),
    query() {
      if (this.content == "") {
        this.$message.error("请输入证书编号");
      } else {
        //异步获取证书信息，触发查询
        this.getZbook();
        const toast = Toast.loading({
          duration: 0, // 持续展示 toast
          forbidClick: true,
          message: "正在查询中..."
        });
        //跳转到证书详情页面
        setTimeout(() => {
          this.$router.push("/ZbookResult");
        }, 1000);
      }
    },
    tel() {
      window.location.href = "tel://021-80392253";
    }
  },
  computed: {
    content: {
      get() {
        return this.$store.state.content;
      },
      set(content) {
        //触发vuex中的 setContent 方法，content作为参数传过去
        this.$store.commit("setContent", content);
      }
    },
    ...mapState(["Zbook"])
  }
};
</script>

<style scoped>
.query2 {
  width: 100%;
  height: 100%;
  background: url("../../static/img/mobile.jpg") no-repeat center;
  background-size: 100% 100%;
  padding-top: 40px;
}
.query2 .warp {
  width: 90%;
  height: 95%;
  background: #fff;
  margin: 0 auto;
  border-radius: 0 80px 0 80px;
  opacity: 0.6;
}
form {
  font-size: 28px;
}
.form_title h2 {
  text-align: center;
  border-bottom: 0.04rem solid #023f7e;
  padding-bottom: 0.266667rem;
}
.form_title h2 i {
  display: inline-block;
  height: 0.906667rem;
}
.form_title h2 i img {
  margin-right: 0.106667rem;
  display: block;
  width: 0.986667rem;
  height: 0.906667rem;
  margin-top: 0.266667rem;
}
.form_title h2 span {
  font-size: 0.48rem;
  height: 0.906667rem;
  line-height: 0.906667rem;
  color: #023f7e;
  font-weight: 700;
  display: inline-block;
}
.form_title h2 {
  text-align: center;
  border-bottom: 0.04rem solid #023f7e;
  padding-bottom: 0.266667rem;
}
.style_input {
  margin-top: 0.733333rem;
  width: 7.773333rem;
  padding: 0 0 0 40px;
}
.style_input .input_style {
  border: 0.026667rem solid #023f7e;
  overflow: hidden;
  margin-bottom: 0.666667rem;
  display: flex;
}
.style_input .input_style span {
  display: inline-block;
  overflow: hidden;
  height: 1.026667rem;
}
.style_input .input_style span img {
  width: 0.786667rem;
  height: 0.72rem;
  margin: 12px 0 0 10px;
}
.style_input .input_style input[type="text"] {
  border: none;
  text-indent: 15px;
  margin-top: 10px;
  width: 100%;
}
.style_input .input_style_none {
  border: none;
}
.style_input .input_style input[type="button"] {
  outline: 0;
  width: 100%;
  height: 80px;
  font-size: 0.48rem;
  word-spacing: 0.053333rem;
  background: #f3992f;
  color: #fff;
  font-weight: 700;
  border: none;
  border-radius: 40px;
}
.style_input ul li {
  font-size: 0.32rem;
  color: #000;
  margin: 0.4rem 0;
}
.style_input ul li span {
  height: 0.746667rem;
  line-height: 0.746667rem;
  background: #f08200;
  color: #fff;
  cursor: pointer;
  padding: 0.08rem;
}

img.ybc {
  width: 350px;
  margin-left: 100px;
}
.img_warp img {
  width: 100%;
}
</style>