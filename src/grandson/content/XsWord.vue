<template>
  <div class="XxCouser">
    <div class="main">
      <ul>
        <li class="detail-li" v-for="(item,index) in XsWord.data" :key="index">
          <div class="img-div">
            <img
              v-lazy="item.pic"
            />
          </div>
          <div class="contents">
            <p class="title">{{item.title}}</p>
            <span
              class="txt fl mr5 aaa"
              style="font-size: 12px; line-height: 1rem; color: rgb(136, 136, 136);"
            >{{item.name}}</span>
            <span class="fl mr5"></span>
            <span
              class="txt fl"
              style="font-size: 12px; line-height: 1rem; color: rgb(136, 136, 136);"
            >{{item.read_num}}浏览</span>
            <div class="text-bottom">
              <div class="text-left" style="height: 19px;">
                <!-- <span
                  class="status bg-green"
                  style="width: 50px; text-align: center; color: rgb(255, 255, 255); border-radius: 2px; box-sizing: border-box; padding: 1px 5px; font-size: 12px;"
                >进行中</span>-->
                <span
                  class="status bg-gray"
                  style="width: 50px; text-align: center; color: #22bff4; border-radius: 2px; box-sizing: border-box; padding: 1px 2px; font-size: 12px; "
                >{{item.published_time}}</span>
              </div>
              <div class="join">
                <!---->
                <div class="text-right fs-red txt-green" v-if="item.needpay == 0">免费</div>
                <div class="text-right fs-red txt-green" v-if="item.needpay == 2">学员</div>
                <div class="text-right fs-red txt-green" v-if="item.needpay == 3">付费</div>
                <div class="text-right fs-red txt-green" v-if="item.needpay == 4">密码</div>
                <!---->
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: ["XsWord"]
};
</script>

<style scoped>
p {
  margin: 0;
}
.main ul .detail-li {
  padding: 30px;
  border-bottom: 1px solid #ebedf0;
  box-sizing: border-box;
  font-size: 24px;
  display: flex;
}
.main ul .detail-li .img-div {
  display: inline-block;
  vertical-align: middle;
  width: 270px;
  margin-right: 20px;
  height: 152px;
  border-radius: 8px;
  position: relative;
}
.main ul .detail-li .img-div img {
  width: 100%;
  height: 100%;
  border-radius: 6px;
  object-fit: cover;
}
img {
  border: 0;
  max-width: 100%;
}
.main ul .detail-li .contents {
  display: inline-block;
  vertical-align: middle;
  width: calc(100% - 290px);
  height: 165px;
}
.main ul .detail-li .contents .title {
  font-size: 28px;
  color: #333;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  line-height: 40px;
  border: none;
}
.mr5 {
  margin-right: 5px;
}
.mr5::before {
  display: inline-block;
  content: "";
  width: 2px;
  height: 11%;
  background: #888;
}
span.aaa:before {
  display: none;
}
.main ul .detail-li .contents .text-bottom {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  font-size: 0;
  width: 100%;
  box-sizing: border-box;
}
.main ul .detail-li .contents .text-bottom .text-left {
  flex: 1;
  width: 50%;
}
.bg-gray {
  background-color: #fff;
}
.bg-green {
  background-color: #1ad473;
}
.main ul .detail-li .contents .text-bottom .text-right.fs-red {
  color: #ff6161;
  text-align: right;
}
.main ul .detail-li .contents .text-bottom .text-right {
  font-size: 25px;
}
.txt-orange {
    color: #eda32a !important;
}
.txt-green {
    color: #1ad473 !important;
}
</style>