<template>
  <!-- 顶部问答专区介绍banner图 -->
  <div class="top_banner">
    <van-swipe
      :autoplay="5000"
      indicator-color="white"
      :height="100"
      :show-indicators="false"
      style="transform: translateX(0px);"
    >
      <van-swipe-item>
        <img
          src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1568786256950&di=72835dc9964f740081f5ae2c1a6a32e3&imgtype=0&src=http%3A%2F%2Fbpic.588ku.com%2Fback_pic%2F04%2F05%2F98%2F50580ed8188c4c1.jpg"
          alt
        />
      </van-swipe-item>
      <van-swipe-item>
        <img
          src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1568786257539&di=dd68296d33c2e37dd35bca9db086c4a0&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F012a97573e687b32f8757cb992cfae.png"
          alt
        />
      </van-swipe-item>
      <van-swipe-item>
        <img
          src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1568786257539&di=732d511f509ad314da42a93e3dd03177&imgtype=0&src=http%3A%2F%2Fphoto.16pic.com%2F00%2F58%2F33%2F16pic_5833689_b.jpg"
          alt
        />
      </van-swipe-item>
      <van-swipe-item>
        <img
          src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1568786313924&di=91a9f68aea1c29de10b7109967bbe5fd&imgtype=0&src=http%3A%2F%2Fku.90sjimg.com%2Fback_pic%2F05%2F17%2F59%2F3859bb85cd8bd2d.jpg"
          alt
        />
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
/* 顶部banner图 */
.top_banner {
  box-shadow: -1px 1px 17px #eee;
  box-sizing: border-box;
  /* background: red; */
  padding: 10px;
  height: 220px;
  border-radius: 15px;
}
.top_banner img {
  width: 100%;
  height: 100%;
  border-radius: 15px;
}
.van-swipe {
  border-radius: 15px;
}
</style>