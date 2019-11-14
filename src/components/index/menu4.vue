<template>
  <div class="menu4">
    <div class="list">
      <ul>
        <van-swipe @change="onChange">
          <van-swipe-item>
            <van-row class="menu_4" type="flex" justify="center">
              <van-col
                span="6"
                v-for="(item,index) in list1"
                :key="index"
                @click="goToDetail(item)"
              >
                <img width="100%" height="auto" :src="item.img" />
                <span class="menu_title">{{item.title}}</span>
              </van-col>
            </van-row>
          </van-swipe-item>
          <van-swipe-item>
            <van-row class="menu_4" type="flex" justify="center">
              <van-col
                span="6"
                v-for="(item,index) in list2"
                :key="index"
                @click="goToDetail(item)"
              >
                <img width="100%" height="auto" :src="item.img" />
                <span class="menu_title">{{item.title}}</span>
              </van-col>
            </van-row>
          </van-swipe-item>
          <div class="custom-indicator" slot="indicator">{{ current + 1 }}/{{list3.length / 4}}</div>
        </van-swipe>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      baseUrl: "https://yibaikang001.oss-cn-shanghai.aliyuncs.com/",
      current: 0
    };
  },
  computed: {
    ...mapState(["menu4"]),
    list1() {
      return (this.menu4.menu && this.menu4.menu.slice(0, 4)) || [];
    },
    list2() {
      return (this.menu4.menu && this.menu4.menu.slice(4)) || [];
    },
    list3() {
      return (this.menu4.menu && this.menu4.menu.slice(0, 8)) || [];
    }
  },
  methods: {
    goToDetail(item) {
      // console.log(item)
      this.$router.push({
        path: "/module/" + item.link,
        query: {
          title: item.title
        }
      });
    },
    onChange(index) {
      this.current = index;
    }
  }
};
</script>

<style scoped>
.menu_4 {
  text-align: center;
  color: #333;
  font-size: 26px;
  background: #fff;
  height: 180px;
}

.menu_4 img {
  height: 129px;
}
.custom-indicator {
  text-align: center;
  font-size: 24px;
  color: #333;
}
</style>