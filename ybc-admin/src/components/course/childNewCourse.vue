<template>
  <div class="videoLive">
    <el-form :model="ruleForm" ref="ruleForm" label-width="120px" class="demo-ruleForm">
      <!-- 标题 -->
      <el-form-item label="标题" prop="title">
        <el-input
          v-model="ruleForm.title"
          class="input-title"
          style="width:400px"
          placeholder="请输入视频标题"
        ></el-input>
      </el-form-item>
      <!-- 封面 -->
      <el-form-item label="封面" prop="pic">
        <el-upload
          class="upload-demo"
          drag
          action="#"
          :auto-upload="false"
          :on-change="getFile"
          :show-file-list="false"
        >
          <i class="el-icon-upload" v-if="ruleForm.imgUrl == ''"></i>
          <div class="el-upload__text" v-if="ruleForm.imgUrl==''">
            将文件拖到此处，或
            <em>点击上传</em>
          </div>
          <div class="el-upload__text" v-else>
            <img :src="ruleForm.imgUrl" alt class="img" width="100%" height="100%" />
          </div>
          <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      </el-form-item>
      <!-- 收费方式 -->
      <el-form-item label="收费方式" required>
        <el-radio-group v-model="ruleForm.radio_fufei">
          <el-radio :label="1">
            付费
            <span v-if="ruleForm.radio_fufei == 1">
              <input type="text" placeholder="请输入金额" v-model="ruleForm.price" /> 元
            </span>
          </el-radio>
          <el-radio :label="2">学员</el-radio>
          <el-radio :label="3">公开</el-radio>
        </el-radio-group>
      </el-form-item>
      <!-- 类型，分类 -->
      <el-form-item label="类型" required>
        <el-cascader v-model="ruleForm.leixing" :options="menuLabel" @change="handleChange"></el-cascader>
        <span class="span">此选项关系到直播所在的分类，请认真填写</span>
      </el-form-item>
      <!-- 上架设置，是否立即发布 -->
      <el-form-item label="上架设置" required>
        <el-radio-group v-model="ruleForm.shangJiaSet">
          <el-radio :label="1">立即发布</el-radio>
          <el-radio :label="2">
            定时发布
            <span v-if="ruleForm.shangJiaSet == 2">
              <el-date-picker
                v-model="ruleForm.dingShiTime"
                type="datetime"
                placeholder="选择日期时间"
                format="yyyy-MM-dd HH:mm:ss"
                value-format="yyyy-MM-dd HH:mm:ss"
                :picker-options="pickerOptions"
              ></el-date-picker>
            </span>
          </el-radio>
        </el-radio-group>
      </el-form-item>
      <!-- 简介 -->
      <el-form-item label="简介" required prop="content">
        <div class="Editor" style="padding-right:60%;">
          <Editor ref="froalaEditor" @on-change="changeContent" v-model="ruleForm.content"></Editor>
        </div>
      </el-form-item>
      <!-- 确定，取消 -->
      <el-form-item>
        <el-button type="primary" @click="submitForm()">立即创建</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import Editor from "../editor";
import { reqReleaseClassHour } from "../../api";
export default {
  props:["ruleForm","menuLabel"],
  data() {
    return {
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7;
        },
        selectableRange: `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()} - 23:59:59`
      },
    };
  },
  methods: {
    async submitForm() {
      const res = await reqReleaseClassHour(
        "3",
        this.ruleForm.res_id,
        this.ruleForm.title,
        this.ruleForm.date,
        this.ruleForm.imgUrl,
        this.ruleForm.videoUrl,
        "",
        this.ruleForm.content,
        this.ruleForm.leixing1,
        this.ruleForm.leixing2,
        this.ruleForm.radio_fufei,
        this.ruleForm.price,
        this.ruleForm.password,
        this.ruleForm.radio_isShikan,
        this.ruleForm.shikanTime,
        "1", //开启课时页
        this.ruleForm.yinSiSet,
        "0", //不关联售卖
        "1", //强制竖屏
        this.ruleForm.shangJiaSet,
        this.ruleForm.dingShiTime
      );
      console.log(res);

      if (res.code == 1) {
        this.$message({
          message: "课时发布成功",
          type: "success"
        });
        (this.ruleForm.res_id = ""),
          (this.ruleForm.title = ""),
          (this.ruleForm.date = ""),
          (this.ruleForm.imgUrl = ""),
          (this.ruleForm.videoUrl = ""),
          this.$refs.froalaEditor.setHtml(""),
          (this.ruleForm.leixing1 = ""),
          (this.ruleForm.leixing2 = ""),
          (this.ruleForm.radio_fufei = 1),
          (this.ruleForm.price = ""),
          (this.ruleForm.password = ""),
          (this.ruleForm.radio_isShikan = 0),
          (this.ruleForm.shikanTime = ""),
          (this.ruleForm.yinSiSet = "0"),
          (this.ruleForm.shangJiaSet = 1),
          (this.ruleForm.dingShiTime = new Date());
        this.ruleForm.leixing = [];
        // 发布后触发自定义事件shuaxinList，父组件childNewClass
        this.$emit("shuaxinList");
      } else if (res.code == -995 || res.code == -998) {
        this.$message.error(res.msg);
      }
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    changeContent(html) {
      console.log(html);
      this.ruleForm.content = html;
      this.$refs.froalaEditor.setHtml(html);
    },
    getFile(file) {
      this.getBase64(file.raw).then(res => {
        console.log(res);
        this.ruleForm.imgUrl = res;
      });
    },
    getBase64(file) {
      return new Promise(function(resolve, reject) {
        let reader = new FileReader();
        let imgResult = "";
        reader.readAsDataURL(file);
        reader.onload = function() {
          imgResult = reader.result;
        };
        reader.onerror = function(error) {
          reject(error);
        };
        reader.onloadend = function() {
          resolve(imgResult);
        };
      });
    },
    handleChange(value) {
      console.log(value);
      this.leixing = ["190", "191"];
      this.ruleForm.leixing1 = value[0];
      this.ruleForm.leixing2 = value[1];
    },
    // 清空编辑器的内容
    clearContent() {
      this.$refs.froalaEditor.setHtml("");
    },
    // 触发父组件coursea的自定义方法event1
    submitForm(){
      this.$emit("event1")
    }
  },
  components: {
    Editor
  },
  watch: {}
};
</script>

<style scoped>
.span {
  font-size: 12px;
  color: #9e9e9e;
  display: inline-block;
  vertical-align: middle;
  margin-left: 10px;
}
</style>