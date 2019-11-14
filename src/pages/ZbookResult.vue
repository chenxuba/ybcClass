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
            <input type="text" :placeholder="content" :disabled="true" />
          </div>
          <div class="img_wrap" v-for="(item,index) in Zbook.data" :key="index">
            <img v-lazy="item.certificate_img" alt v-if="Zbook.code == 1" />
          </div>
          <p class="text" v-if="Zbook.code == -1">暂时未查到{{content}}的相关信息</p>
          <div class="input_style input_style_none">
            <input type="button" value="返回" @click="goPro" />
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {};
  },
  methods: {
    goPro() {
      this.$router.go(-1);
      this.$store.state.content = ""
    },
    tel() {
      window.location.href = "tel://021-80392253";
    },
    
  },
  computed: {
    ...mapState(["Zbook"]),
    ...mapState(["content"])
  }
};
</script>

<style scoped>
.query2 {
  width: 100%;
  height: 100%;
  background: url("../../static/img/mobile.jpg") no-repeat center;
  background-size: 100% 100%;
  padding-top: 30px;
}
.query2 .warp {
  width: 90%;
  height: 90%;
  background: #fff;
  margin: 0px auto;
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
img.ybc {
  width: 350px;
  margin-left: 100px;
}
.img_wrap img {
  width: 100%;
}
.img_wrap {
  margin-bottom: 50px;
}
.text {
  text-align: center;
  margin: 50px 0;
  color: #666;
}
</style>