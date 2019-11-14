<template>
  <div class="bdingteacher" v-height>
    <div class="box">
        <div class="number">
            <h1>账号</h1>
            <input type="text" placeholder="请输入账号">
        </div>
         <div class="number">
            <h1>密码</h1>
            <input type="text" placeholder="请输入密码" class="input">
            <van-icon name="browsing-history-o" class="pwd_icon"/>
        </div>
        <van-button type="primary" size="large" color="linear-gradient(to right, #4bb0ff, #98d7cc)" round class="btn">确定</van-button>
    </div>
    <goBack></goBack>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.bdingteacher {
  width: 100%;
}
.bdingteacher .box {
  width: 80%;
  height: 700px;
  margin: 30% auto;
  background: url("../../static/img/bding.png") no-repeat center;
  background-size: 100% 100%;
  padding: 0 80px;
  box-sizing: border-box;
}
.bdingteacher .box .number h1{
    font-size: 40px;
    color: #FFF;
    padding: 80px 0 0 0;
}
.bdingteacher .box .number input{
    width: 100%;
    height: 50px;
    background:transparent;
    border: none;
    box-sizing: border-box;
    font-size: 28px;
    border-bottom: 2px solid #f6f6f6;
    padding-bottom: 40px;
    padding-top: 30px;
    color: #fff;
}
.bdingteacher .box .number input::placeholder{
    color: #f6f6f6;
}
.bdingteacher .box .number{
    position: relative;
}
.bdingteacher .box .number  .pwd_icon{
    color: #fff;
    font-size: 30px;
    font-weight: bold;
    position:absolute;
    bottom: 25px;
    right: 20px;
}
.bdingteacher .box .btn{
    margin-top: 80px;
}
</style>