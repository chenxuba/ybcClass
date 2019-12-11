<template>
  <div class="newword">
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
      <el-form-item label="封面" prop="pic" required>
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

      <!-- 类型，分类 -->
      <el-form-item label="类型" required>
        <el-cascader v-model="ruleForm.leixing" :options="menuLabel" @change="handleChange"></el-cascader>
        <span class="span">此选项关系到直播所在的分类，请认真填写</span>
      </el-form-item>

      <!-- 收费方式 -->
      <el-form-item label="收费方式" required>
        <el-radio-group v-model="ruleForm.radio_fufei">
          <el-radio :label="3">
            付费
            <span v-if="ruleForm.radio_fufei == 3">
              <input type="text" placeholder="请输入金额0.1~99999" v-model="ruleForm.price" /> 元
            </span>
          </el-radio>
          <el-radio :label="2">学员</el-radio>
          <el-radio :label="0">公开</el-radio>
          <el-radio :label="4">
            密码设置
            <span v-if="ruleForm.radio_fufei == 4">
              <input
                type="password"
                maxlength="6"
                placeholder="请输入密码，仅支持6位数字"
                style="width:200px"
                v-model="ruleForm.password"
              />
            </span>
          </el-radio>
        </el-radio-group>
      </el-form-item>

      <!-- 是否需要试看 -->
      <el-form-item
        label="是否需要试看"
        required
        v-if="ruleForm.radio_fufei == 2 || ruleForm.radio_fufei == 3 || ruleForm.radio_fufei == 4"
      >
        <el-radio-group v-model="ruleForm.radio_isShikan">
          <el-radio :label="1">不需要</el-radio>
          <el-radio :label="2">需要</el-radio>
        </el-radio-group>
      </el-form-item>

      <!-- 试看内容 -->
      <el-form-item label="试看内容" required prop="content" v-if="ruleForm.radio_isShikan == 2">
        <div class="Editor" style="padding-right:60%;">
          <Editor
            ref="froalaEditorshikan"
            @on-change="changeContentShiKan"
            v-model="ruleForm.shikancontent"
          ></Editor>
        </div>
      </el-form-item>
      <!-- 正文 -->
      <el-form-item label="正文" required prop="content">
        <div class="Editor" style="padding-right:60%;">
          <Editor ref="froalaEditor" @on-change="changeContent" v-model="ruleForm.content"></Editor>
        </div>
      </el-form-item>

      <!-- 关联售卖 -->
      <el-form-item>
        <el-checkbox v-model="ruleForm.associate_sell" true-label="1" false-label="0">
          <span style="vertical-align: middle;">关联售卖</span>
          <span style="margin-left:20px;" v-show="ruleForm.associate_sell == '1'">
            <span v-if="ruleForm.associate_sell == 1">
              <el-select v-model="ruleForm.course_id" placeholder="请选择">
                <el-option
                  v-for="item in course_data"
                  :key="item.id"
                  :label="item.title"
                  :value="item.id"
                ></el-option>
              </el-select>
            </span>
          </span>
          <span class="span">该商品放入课程中售卖</span>
        </el-checkbox>
      </el-form-item>

      <!-- 上架设置，是否立即发布 -->
      <el-form-item label="上架设置" required>
        <el-radio-group v-model="ruleForm.shangJiaSet">
          <el-radio :label="0">立即发布</el-radio>
          <el-radio :label="1">
            定时发布
            <span v-if="ruleForm.shangJiaSet == 1">
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

      <!-- 发表按钮组 -->
      <el-form-item>
        <span style="margin-bottom: 40px;display: inline-block;">
          <el-button type="primary" @click="newWord">确认发表</el-button>
          <el-button type="success">存为草稿</el-button>
          <el-button type="warning">预览</el-button>
          <el-button type="danger">取消</el-button>
        </span>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import Editor from "../../components/editor";
export default {
  props: ["ruleForm", "menuLabel", "course_data"],
  data() {
    return {
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7;
        },
        selectableRange: `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()} - 23:59:59`
      }
    };
  },
  methods: {
    handleChange(value) {
      console.log(value);
      this.ruleForm.leixing1 = value[0];
      this.ruleForm.leixing2 = value[1];
    },
    changeContent(html) {
      console.log(html);
      this.ruleForm.content = html;
      this.$refs.froalaEditor.setHtml(html);
    },
    // 清空编辑器的内容
    clearContent() {
      this.$refs.froalaEditor.setHtml("");
    },
    changeContentShiKan(html) {
      this.ruleForm.shikancontent = html;
      this.$refs.froalaEditorshikan.setHtml(html);
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
    // 发布软文
    newWord() {
      this.$emit("newWord");
    }
  },
  components: {
    Editor
  },
  watch: {
    "ruleForm.associate_sell"() {
      if (this.ruleForm.associate_sell == "0") {
        this.ruleForm.course_id = "";
      }
    }
  }
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