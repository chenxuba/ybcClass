<template>
  <div>
    <div class="contbox">
      <div class="cont flex">
        <div class="cont-left">账号</div>
        <div class="cont-left zhanghao">o15864646628 </div>
      </div>
      <div class="cont">
        <div class="cont-left">旧密码</div>
        <input type="password" placeholder="请输入旧密码" class="cont-right" />
      </div>
      <div class="cont">
        <div class="cont-left">新密码</div>
        <input type="password" placeholder="请输入新密码" class="cont-right" />
      </div>
      <div class="cont">
        <div class="cont-left">确认新密码</div>
        <input type="password" placeholder="请再次输入新密码" class="cont-right" />
      </div>
    </div>
    <button class="queding">确定</button>
    <p class="forgetPwd" @click="forgetPwd">忘记密码</p>
    <goBack></goBack>
  </div>
</template>

<script>
export default {
    methods: {
        forgetPwd() {
            this.$router.push("/forgetPwd")
        }
    },
};
</script>

<style scoped>
.contbox {
  width: 100%;
  background: #fff;
}
.cont {
  width: 90%;
  height: 100px;
  line-height: 100px;
  margin: 0 auto;
  border-bottom: 2px solid #e1e1e1;
  overflow: hidden;
}
.cont-left {
  float: left;
  margin-right: 10%;
  font-size: 30px;
  color: #333;
}
input {
  -webkit-appearance: none;
  border-radius: 0;
  border: none;
}
.cont-right {
  float: right;
  font-size: 30px;
  color: #777;
  text-align: right;
}
.queding {
  width: 80%;
  height: 80px;
  color: #fff;
  border-radius: 40px;
  margin: 270px 10% 0;
  font-size: 30px;
  background: #5dd6c7;
  border: none;
}

.flex{
    display: flex;
    justify-content: space-between;
}
.zhanghao{
    margin-right: 0;
}
.forgetPwd{
    font-size: 26px;
    color: rgb(42, 214, 245);
    text-align: center;
    line-height: 100px;
}
</style>