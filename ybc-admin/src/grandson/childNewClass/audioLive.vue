<template>
  <div class="videoLive">
    <el-form :model="ruleForm" ref="ruleForm" label-width="120px" class="demo-ruleForm">
      <!-- 标题 -->
      <el-form-item label="标题" prop="title" >
        <el-input
          v-model="ruleForm.title"
          class="input-title"
          style="width:400px"
          placeholder="请输入标题"
        ></el-input>
      </el-form-item>
      <!-- 开始时间 -->
      <el-form-item label="开始时间" required>
        <el-date-picker
          v-model="ruleForm.date"
          prop="date"
          type="datetime"
          placeholder="选择日期时间"
          format="yyyy-MM-dd HH:mm:ss "
          value-format="yyyy-MM-dd HH:mm:ss"
          :picker-options="pickerOptions"
        ></el-date-picker>
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
      <!-- 简介 -->
      <el-form-item label="简介" required prop="content">
        <div class="Editor" style="padding-right:60%;">
          <Editor ref="froalaEditor" @on-change="changeContent" v-model="ruleForm.content"></Editor>
        </div>
      </el-form-item>
      <!-- 关联售卖 -->
      <el-form-item>
        <el-checkbox v-model="ruleForm.associate_sell" true-label='1' false-label='0'>
          <span style="vertical-align: middle;">关联售卖</span>
          <span style="margin-left:20px;" v-show="ruleForm.associate_sell == '1'">
            <el-radio-group v-model="ruleForm.associate_type">
              <el-radio :label="99">
                课程
                <span v-if="ruleForm.associate_type == 99">
                  <el-select v-model="ruleForm.course_id" placeholder="请选择">
                    <el-option
                      v-for="item in course_data"
                      :key="item.id"
                      :label="item.title"
                      :value="item.id"
                    ></el-option>
                  </el-select>
                </span>
              </el-radio>
              <el-radio :label="100">
                打卡学堂
                <span v-if="ruleForm.associate_type == 100">
                  <el-select v-model="ruleForm.clockin_id" placeholder="请选择">
                    <el-option
                      v-for="item in clockin_school"
                      :key="item.id"
                      :label="item.title"
                      :value="item.id"
                    ></el-option>
                  </el-select>
                </span>
              </el-radio>
            </el-radio-group>
          </span>
          <span class="span">该商品放入课程/打卡学堂中售卖</span>
        </el-checkbox>
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
              <input type="text" placeholder="请输入金额" v-model="ruleForm.price" /> 元
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
      <el-form-item label="是否需要试看" required v-if="ruleForm.radio_fufei == 3">
        <el-radio-group v-model="ruleForm.radio_isShikan">
          <el-radio :label="0">不需要</el-radio>
          <el-radio :label="1">
            需要
            <span v-if="ruleForm.radio_isShikan == 1">
              <input type="text" placeholder="请输入试看时间" v-model="ruleForm.shikanTime" /> 元
            </span>
          </el-radio>
        </el-radio-group>
      </el-form-item>
      <!-- 隐私设置 -->
      <el-form-item label="隐私设置">
        <el-switch
          v-model="ruleForm.yinSiSet"
          active-color="#13ce66"
          inactive-color="#ccc"
          active-value="1"
          inactive-value="0"
        ></el-switch>
        <el-popover
          placement="top-start"
          width="400"
          trigger="hover"
          content="开启后，该直播、视频在平台、个人主页不可见，仅通过您分享链接可见，也不会自动推送给关注粉丝"
        >
          <i
            class="el-icon-warning-outline"
            slot="reference"
            style="font-size:15px;vertical-align: middle;"
          ></i>
        </el-popover>
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
                format="yyyy-MM-dd HH:mm:ss "
                value-format="yyyy-MM-dd HH:mm:ss"
                :picker-options="pickerOptions"
              ></el-date-picker>
            </span>
          </el-radio>
        </el-radio-group>
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
import Editor from "../../components/editor";
import { reqReleaseClassHour } from "../../api";
export default {
  props: ["menuLabel","ruleForm","clockin_school", "course_data"],
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
        "2",
        this.ruleForm.res_id,
        this.ruleForm.title,
        this.ruleForm.date,
        this.ruleForm.imgUrl,
        "",
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
        this.ruleForm.associate_sell, //是否关联售卖，默认不关联
        "1", //强制竖屏
        this.ruleForm.shangJiaSet,
        this.ruleForm.dingShiTime,
        this.ruleForm.associate_type,//关联售卖类型，是关联课程还是关联打卡学堂，99是课程，100是打卡学堂,默认关联课程
        this.ruleForm.course_id,//关联课程ID
        this.ruleForm.clockin_id//关联打卡学堂ID
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
          (this.ruleForm.radio_fufei = 2),
          (this.ruleForm.price = ""),
          (this.ruleForm.password = ""),
          (this.ruleForm.radio_isShikan = 0),
          (this.ruleForm.shikanTime = ""),
          (this.ruleForm.yinSiSet = "0"),
          (this.ruleForm.shangJiaSet = 1),
          (this.ruleForm.dingShiTime = new Date());
        this.ruleForm.leixing = [];
        (this.ruleForm.associate_sell = "0"), //是否关联售卖，默认不关联
          (this.ruleForm.associate_type = 99), //关联资源类型，是关联课程还是打卡学堂 99-课程 100-打卡学堂 默认关联课程
          (this.ruleForm.course_id = ""), //关联课程ID
          (this.ruleForm.clockin_id = ""); //关联打卡学堂ID
        this.$emit("audioLiveshuaxin");
      } else if (res.code == -995 || res.code == -998) {
        this.$message.error(res.msg);
      }else if(res.code == -1){
        this.$message.error(res.msg);
      }
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    changeContent(html) {
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
      this.ruleForm.leixing1 = value[0];
      this.ruleForm.leixing2 = value[1];
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
      this.videoUrl = "";
    },
    handleSuccess(file) {
      let str;
      str = file.link.split("com/");
      this.videoUrl = str[1];
      console.log(this.videoUrl);
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    // 清空编辑器的内容
    clearContent(){
      this.$refs.froalaEditor.setHtml("");
    }
  },
  components: {
    Editor
  },
  watch: {
    "ruleForm.associate_sell"() {
      console.log(this.ruleForm.associate_sell);
      if(this.ruleForm.associate_sell == '0'){
        this.ruleForm.associate_type = ''
        console.log(this.ruleForm.associate_type);
        this.ruleForm.course_id = "";
        this.ruleForm.clockin_id = ""
        
      }
    }
  },
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