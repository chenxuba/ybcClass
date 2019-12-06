<template>
  <div class="xiangguanCourse">
    <div class="article_head">
      <div class="art_head_div">
        <img
          class="article_img"
          src="https://yibaikang001.oss-cn-shanghai.aliyuncs.com/user/471/15567635709558081107.jpg"
          alt
        />
      </div>
      <div class="article_msg">
        <h1>经典成语故事</h1>
        <p>总期数：4</p>
        <p>状态：完结</p>
        <p>收费方式：学员</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["seleteCourse"]
};
</script>

<style scoped>
.article_head {
    width: 83%;
    margin: 10px auto 0px auto;
    background: rgba(242, 242, 242, 1);
    font-size: 14px;
    padding: 10px 10px;
    display: -webkit-box;
    /* height: 170px; */
}
.art_head_div {
    margin-right: 40px;
}
.article_img {
    width: 205px;
    height: 128px;
}
.article_msg {
    width: 410px;
    height: 100%;
}
.article_msg h1 {
    font-size: 20px;
    margin-top: 13px;
}
.article_msg p {
    margin: 14px 0px;
}

</style>