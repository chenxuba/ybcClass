<template>
  <div>
    <van-row class="box-warp" v-if="word.word">
      <van-col span="24" class="hot_warp">
        <van-row type="flex" justify="space-between" class="warp1">
          <van-col span="6" class="title">{{word.title}}</van-col>
          <van-col span="6" class="more" @click="goWordModuleDeatil">更多</van-col>
        </van-row>
      </van-col>
      <van-row class="msg_warp" v-for="(item,index) in word.word" :key="index" @click="goDetail(item.id)">
        <van-col span="9">
          <div class="img_warp">
            <img v-lazy="item.pic" alt />
          </div>
        </van-col>
        <van-col span="15" class="right">
          <div class="top">{{item.title}}</div>
          <div class="top2">
            <span id="about_text">{{item.abstract}}</span>
          </div>
          <div class="bottom">
            <van-row>
              <van-col span="8">
                <span class="scan">{{item.name}}</span>
              </van-col>
              <van-col span="10" class="scan_warp">
                <span class="scan">浏览({{parseInt(baseValue2)+parseInt(item.read_num)}})</span>
              </van-col>
              <van-col span="6" class="good_warp">
                <span class="beautiful">
                  <van-icon name="good-job" class="icon" />
                  <span class="number">({{parseInt(num)+parseInt(item.like_num)}})</span>
                </span>
              </van-col>
            </van-row>
          </div>
        </van-col>
      </van-row>
    </van-row>
    <img src="../../../static/img/sholist.svg" v-else />
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      baseUrl: "https://yibaikang001.oss-cn-shanghai.aliyuncs.com/",
      baseValue1: "500",
      baseValue2: "800",
      baseUrl: "https://yibaikang001.oss-cn-shanghai.aliyuncs.com/",
      num: 0
    };
  },
  computed: {
    ...mapState(["word"])
  },
  methods: {
    //随机点赞数
    getRandomInt(min, max) {
      return (this.num = Math.floor(Math.random() * (max - min + 1)) + min);
    },
    goWordModuleDeatil(){
      this.$router.push({
        path:'/wordModuleDeatil',
        query:{
          type:'3',
          label_id:'24'
        }
      });
    },
    goDetail(id){
      // console.log(id)
      this.$router.push("/wordDetail/"+id)
    }
  },
  mounted() {
    this.getRandomInt(100, 200);
  }
};
</script>

<style scoped>
.box-warp {
  padding: 20px 25px 0 25px;
}
.hot_warp {
  background: #fff;
  font-weight: normal;
  box-sizing: border-box;
  margin-bottom: 30px;
}
.warp1 .title {
  text-align: left;
  position: relative;
  padding-left: 20px;
  box-sizing: border-box;
  font-size: 28px;
  color:#333;
}
.warp1 .title::after {
  content: "";
  position: absolute;
  z-index: 0;
  top: 0px;
  left: 5px;
  width: 6px;
  height: 90%;
  background: orange;
}
.warp1 .more {
  text-align: right;
  font-size: 26px;
  color: #aaa;
}
.box-warp .msg_warp {
  margin-bottom: 30px;
}
.box-warp .msg_warp:last-child {
  margin-bottom: 0;
}
.box-warp .msg_warp .img_warp {
  width: 250px;
  height: 150px;
  border-radius: 10px;
}
.box-warp .msg_warp .img_warp img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 10px;
}
.box-warp .msg_warp .right .top {
  font-size: 28px;
  line-height: 45px;
  color: #333;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
}
.box-warp .msg_warp .right .top2 {
  font-size: 24px;
  line-height: 35px;
  height: 65px;
  overflow: hidden;
}
.box-warp .msg_warp .right .top2 span {
  display: inline-block;
  transform: scale(0.8);
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  margin-left: -45px;
}

.box-warp .msg_warp .right .center {
  font-size: 28px;
  color: #adadad;
  line-height: 40px;
}
.box-warp .msg_warp .right .bottom {
  font-size: 24px;
  margin: 10px 0;
}
.box-warp .msg_warp .right .bottom .scan {
  width: 100%;
  display: inline-block;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: #adadad;
  padding-top: 3px;
}
.box-warp .msg_warp .right .bottom .beautiful {
  width: 100%;
  display: inline-block;
  color: #adadad;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.box-warp .msg_warp .right .bottom .beautiful .icon {
  position: relative;
  top: 2px;
  margin-right: 5px;
  /* color: orange; */
}
.box-warp .msg_warp .right .bottom .scan_warp {
  text-align: right;
}
.box-warp .msg_warp .right .bottom .good_warp {
  text-align: right;
}
#about_text{
  color: #999;
}
</style>