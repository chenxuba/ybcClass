<template>
  <div class="myDingYue">
    <van-button type="warning" @click="change">点击发送</van-button>
    <ul>
      <li v-for="(item,index) in list" :key="index" v-html="item" ref="liwu" id="li"></li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: []
    };
  },
  methods: {
    change() {
      let html = `<div
      class="liwu animated bounceInLeft"
    >我是礼物</div>`;
      this.list.push(html);
    }
  },
  watch: {
    list() {
      if (this.list.length >= 5) {
        this.$refs.liwu.forEach(item => {
          console.log(item);
          item.classList = "bounceOutRight animated";
          setTimeout(() => {
            item.style.display = "none";
          }, 3000);
        });
      }else if(this.list.length == 1){
        setTimeout(() => {
        this.list= []
        }, 5000);
        // console.log(this.list.length);
        
      }
    }
  }
};
</script>

<style scoped>
.liwu {
  width: 200px;
  font-size: 26px;
  border: 1px solid red;
  margin-top: 200px;
  padding: 5px 20px;
  text-align: center;
}
</style>