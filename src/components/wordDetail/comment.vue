<template>
  <div>
    <div v-for="(item,index) in comment" :key="index">
      <div class="eva-details">
        <img
          v-lazy="item.headimgurl || 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1574075278193&di=d1822ff490f96b93d750b6f314bb3010&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201606%2F09%2F20160609174345_5n8FJ.thumb.224_0.jpeg'"
          class="eva-head"
        />
        <div class="eva-inside">
          <div class="eva-info">
            <p class="eva-name">{{item.name || '游客'}}</p>
            <!---->
            <div>
              <img src="https://kf.ybc365.com/train/Public/train/user/article/img/like.png" />1
            </div>
          </div>
          <div class="eva-content">
            <pre class="word_pre">{{item.content}}</pre>
          </div>
          <div class="eva-menu">
            <div style="width:40%;display:inline-block;" class="eva-time">{{item.time}}</div>
            <div class="delete_comm" v-if="item.member_id == my_member_id" @click="deleteComment(item)">删除</div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="comment == ''" class="commentNull">暂无评论</div>
  </div>
</template>

<script>
export default {
  props: ["comment","my_member_id"],
  methods: {
    deleteComment(item){
      this.$emit("event", item)
    }
  }
};
</script>

<style scoped>
.eva-details {
  margin: 30px 30px 0 30px;
  display: flex;
  border-bottom: 1px solid #eee;
  padding-bottom: 20px;
  position: relative;
}
.eva-details .eva-head {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  flex-shrink: 0;
}
.eva-inside {
  margin-left: 20px;
  width: 100%;
}
.eva-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.eva-name {
  font-size: 26px;
  color: #888;
}
.eva-info div {
  color: #999;
  font-size: 30px;
  display: flex;
  align-items: center;
}
.eva-info img {
  width: 28px;
  margin-right: 10px;
  vertical-align: middle;
}
.eva-content {
  font-size: 26px;
  color: #333;
  word-break: break-all;
}
.word_pre {
  white-space: pre-wrap;
  word-wrap: break-word;
  margin: 10px 0 20px 0;
}
.eva-menu {
  overflow: hidden;
  line-height: 40px;
  display: flex;
  justify-content: space-between;
}
.eva-time {
  font-size: 26px;
  color: #a1a1a1;
}
.delete_comm {
  width: 20%;
  display: inline-block;
  font-size: 26px;
  text-align: right;
  color: #333;
}
.commentNull{
  text-align: center;
  font-size: 30px;
  color: #333;
  margin-bottom: 30px;
}
</style>