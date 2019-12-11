<template>
  <div class="word">
    <el-tabs v-model="activeName" type="card">
      <el-tab-pane label="软文" name="first">
        <span slot="label" @click="tabClick">
          <i class="el-icon-document"></i> 软文
        </span>
        <wordList
          :article_list="article_list"
          :count="count"
          @handleCurrentChange="handleCurrentChange"
          @search="search"
          @handldelete="handldelete"
          @SeeDeleteRiZhi="SeeDeleteRiZhi"
          :rizhiMsg="rizhiMsg"
          @handledit="handledit"
        ></wordList>
      </el-tab-pane>
      <el-tab-pane label="新建软文" name="second">
        <span slot="label">
          <i class="el-icon-edit-outline"></i>
          {{tabsName}}
        </span>
        <childNewWord
          :ruleForm="ruleForm"
          :menuLabel="menuLabel"
          :course_data="course_data"
          @newWord="newWord"
          ref="childNewWord"
        ></childNewWord>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import wordList from "../components/word/wordList";
import childNewWord from "../components/word/childNewWord";
import {
  reqWordList,
  reqDeleteWord,
  reqSeeDeleteRiZhi,
  reqHoursCourseList,
  reqMenuLabel,
  reqNewWord,
  reqEditWord
} from "../api";
export default {
  data() {
    return {
      activeName: "first",
      tabsName: "新建软文",
      article_list: [], //软文列表
      count: 0,
      rizhiMsg: "", //操作日志信息
      ruleForm: {
        title: "", //标题
        imgUrl: "", //封面
        leixing: [], //分类
        leixing1: "", //类型1
        leixing2: "", //类型2
        radio_fufei: 0, //收费方式，默认公开
        price: "", //收费金额
        password: "", //密码
        radio_isShikan: 1, //是否设置试看，默认不需要
        shikancontent: "", //试看内容
        content: "", //正文
        associate_sell: "0", //关联售卖，默认不关联
        course_id: "", //关联的课程ID
        shangJiaSet: 0, //是否定时发布，默认不定时
        dingShiTime: "", //定时发布时间
        id: "" //软文id，修改的时候用
      },
      menuLabel: [], //分类列表
      course_data: [] //课程列表
    };
  },
  methods: {
    // 获取软文列表
    async getWordList() {
      const res = await reqWordList();
      console.log(res);
      if (res.code == 1) {
        this.article_list = res.data.article_list;
        this.count = Number(res.data.count);
      }
    },
    async handleCurrentChange(val) {
      const res = await reqWordList("", val);
      if (res.code == 1) {
        this.article_list = res.data.article_list;
      }
    },
    // 搜索
    async search(searchVal) {
      const res = await reqWordList(searchVal, "");
      if (res.code == 1) {
        this.article_list = res.data.article_list;
        this.count = Number(res.data.count);
      }
    },
    // 删除
    async handldelete(id) {
      const res = await reqDeleteWord(id);
      console.log(res);
      if (res.code == 1) {
        this.$message({
          message: "删除成功～",
          type: "success"
        });
        this.getWordList();
      }
    },
    // 查看日志
    async SeeDeleteRiZhi(id) {
      const res = await reqSeeDeleteRiZhi(id);
      console.log(res);
      if (res.code == 1) {
        this.rizhiMsg = res.data;
      }
    },
    // 获取资源分类列表
    async getmenuLabel() {
      const res = await reqMenuLabel("2");
      if (res.code == 1) {
        this.menuLabel = res.data;
      }
    },
    // 获取课程和打卡学堂列表
    async getHoursCourseList() {
      const res = await reqHoursCourseList();
      if (res.code == 1) {
        this.course_data = res.data.course_data;
      }
    },
    // 发布软文
    async newWord() {
      console.log(this.ruleForm.course_id);
      if (this.ruleForm.associate_sell == 1 && this.ruleForm.course_id == "") {
        this.$message.error("请选择关联的课程");
      } else {
        const res = await reqNewWord(
          this.ruleForm.title, //标题
          this.ruleForm.imgUrl, //封面图
          this.ruleForm.leixing1, //类型1
          this.ruleForm.leixing2, //类型2
          this.ruleForm.radio_fufei, //收费方式
          this.ruleForm.price, //收费金额
          this.ruleForm.password, //密码
          this.ruleForm.radio_isShikan, //是否试看
          this.ruleForm.shikancontent, //试看内容
          this.ruleForm.content, //正文
          this.ruleForm.course_id, //关联课程ID
          this.ruleForm.shangJiaSet, //是否定时发布
          this.ruleForm.dingShiTime, //定时发布时间
          this.ruleForm.id
        );
        console.log(res);
        if (res.code == 1) {
          this.$message({
            message: "发布成功",
            type: "success"
          });
          this.activeName = "first";
          this.getWordList();
          this.ruleForm = {
            title: "", //标题
            imgUrl: "", //封面
            leixing: [], //分类
            leixing1: "", //类型1
            leixing2: "", //类型2
            radio_fufei: 0, //收费方式，默认公开
            price: "", //收费金额
            password: "", //密码
            radio_isShikan: 1, //是否设置试看，默认不需要
            shikancontent: "", //试看内容
            content: "", //正文
            associate_sell: "0", //关联售卖，默认不关联
            course_id: "", //关联的课程ID
            shangJiaSet: 0, //是否定时发布，默认不定时
            dingShiTime: "", //定时发布时间
            id: ""
          };
          this.$refs.childNewWord.clearContent();
        } else {
          this.$message.error(res.msg);
        }
      }
    },
    // 修改软文
    async handledit(id) {
      const res = await reqEditWord(id);
      if (res.code == 1) {
        this.activeName = "second";
        this.tabsName = "编辑软文";
        this.ruleForm = {
          title: res.data.title, //标题
          imgUrl: res.data.pic, //封面
          leixing: [res.data.label1, res.data.label2], //分类
          leixing1: res.data.label1, //类型1
          leixing2: res.data.label2, //类型2
          radio_fufei: Number(res.data.needpay), //收费方式，默认公开
          price: res.data.price, //收费金额
          password: res.data.password, //密码
          radio_isShikan: Number(res.data.try_see), //是否设置试看，默认不需要
          shikancontent: res.data.try_content, //试看内容
          content: res.data.content, //正文
          associate_sell: res.data.column_id == "" ? "0" : "1", //关联售卖，默认不关联
          course_id: res.data.column_id, //关联的课程ID
          shangJiaSet: Number(res.data.is_timing), //是否定时发布，默认不定时
          dingShiTime: res.data.published_time, //定时发布时间
          id: res.data.id
        };
        this.$refs.childNewWord.changeContent(res.data.content);
        this.course_data = res.data.course_data;
      }
    },
    // 点击软文tab决定是否退出编辑模式
    tabClick() {
      if (this.tabsName == "编辑软文") {
        this.$confirm(
          "是否要暂时保存内容，确定后编辑的内容会暂时保存!",
          "提示",
          {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          }
        )
          .then(() => {
            this.$notify({
              title: "成功",
              message: "编辑的内容已经暂时保存～",
              type: "success",
              position: "top-left"
            });
          })
          .catch(() => {
            this.tabsName = "新建软文";
            this.ruleForm = {
              title: "", //标题
              imgUrl: "", //封面
              leixing: [], //分类
              leixing1: "", //类型1
              leixing2: "", //类型2
              radio_fufei: 0, //收费方式，默认公开
              price: "", //收费金额
              password: "", //密码
              radio_isShikan: 1, //是否设置试看，默认不需要
              shikancontent: "", //试看内容
              content: "", //正文
              associate_sell: "0", //关联售卖，默认不关联
              course_id: "", //关联的课程ID
              shangJiaSet: 0, //是否定时发布，默认不定时
              dingShiTime: "" //定时发布时间
            };
          });
      }
      // 点击课程tabs让相关课tabs消失
      this.showXiangguanke = false;
    }
  },
  mounted() {
    this.getWordList();
    this.getmenuLabel();
    this.getHoursCourseList();
    if (this.$route.query.activeName != undefined) {
      this.activeName = this.$route.query.activeName;
    }
  },
  components: {
    wordList,
    childNewWord
  }
};
</script>

<style scoped>
</style>