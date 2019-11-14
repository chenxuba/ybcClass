<template>
  <div class="openqa" v-height>
    <!-- 是否开通按钮 -->
    <div class="isOpen">
      <div class="left">
        <span>*</span>问答
      </div>
      <div class="right">
        <el-switch v-model="value" active-color="#5dd6c7" inactive-color="#d8d8d8" @change="change"></el-switch>
      </div>
    </div>
    <!-- 开关打开后显示此区域 -->
    <div class="isShow" v-if="value">
      <div class="box">
        <van-cell-group>
          <van-field v-model="tip" required clearable label="职位头衔" placeholder="请输入个人职位头衔" />
          <van-field
            v-model="cont"
            type="textarea"
            rows="1"
            autosize
            label="个人描述"
            right-icon="question-o"
            maxlength="150"
            placeholder="请输入个人描述,限50字符"
            required
            @click-right-icon="$toast('请填写个人擅长的技能简介和个人简介')"
          />
        </van-cell-group>
      </div>
      <div class="box">
        <van-cell-group>
          <van-field
            v-model="price"
            required
            type="number"
            clearable
            label="提问价格"
            placeholder="每次问价"
            class="line"
          >
            <van-button slot="button" size="small" disabled class="Y">元</van-button>
          </van-field>
          <van-field
            v-model="leixing"
            rows="1"
            autosize
            label="提问类型"
            right-icon="arrow"
            maxlength="50"
            required
            disabled
            type="text"
            @click="showPicker = true"
            class="leixing"
          />
        </van-cell-group>
      </div>
      <div class="box isOpen box2">
        <div class="left shiting">免费试听</div>
        <div class="right">
          <el-switch
            v-model="value2"
            active-color="#5dd6c7"
            inactive-color="#d8d8d8"
            @change="changeValue2"
          ></el-switch>
        </div>
      </div>
      <div class="box3">
        <van-cell-group>
          <van-field
            v-model="time"
            type="number"
            clearable
            label="试听时长"
            placeholder="试听时长"
            class="line"
            :disabled="disabled"
          >
            <van-button slot="button" size="small" disabled class="Y">秒</van-button>
          </van-field>
        </van-cell-group>
      </div>
    </div>
    <!-- 提交按钮 -->
    <div class="btn">
      <van-button type="primary" size="large" round color="#5dd6c7" @click="sumbit()">提交</van-button>
    </div>
    <!-- 类型列表 -->
    <van-action-sheet v-model="showPicker">
      <div class="jigoulist">
        <van-picker
          show-toolbar
          :columns="columnss"
          @cancel="showPicker = false"
          @confirm="onConfirm"
          class="picker"
        />
      </div>
    </van-action-sheet>
    <goBack></goBack>
  </div>
</template>

<script>
import { reqDazhuMsg, reqDazhuEdit } from "../api";
import { Toast } from "vant";
export default {
  data() {
    return {
      value: false, //是否开通问答
      Isopen_ask: "0", //0-关闭;1-开通
      value2: false, //是否试听
      cantry: 0, //是否试听，1-可以;0-不可以
      tip: "", //头衔,ask_name
      cont: "", //简介,ask_breif
      price: "", //提问价格,question_money
      leixing: "请选择", //提问类型,
      time: 10, //试听时长/秒 canseetime
      showPicker: false,
      disabled: true,
      columns: [], //提问类型列表
      open_ask: this.$route.query.open_ask, //是否开通
      dazhuMsg: {}, //答主的信息
      leixing_id: "" //传给后端的类型的id ,ask_type
    };
  },
  methods: {
    change() {
      this.isShow = !this.isShow;
    },
    changeValue2() {
      this.disabled = !this.disabled;
    },
    onConfirm(value, index) {
      this.leixing = value;
      this.showPicker = false;
      this.leixing_id = this.columns[index].id;
    },
    // 获取是否开通问答
    getOpenAsk() {
      if (this.open_ask == 0) {
        this.value = false;
      } else {
        this.value = true;
      }
    },
    //获取答主信息
    async getDazhuMsg() {
      const result = await reqDazhuMsg();
      console.log(result);
      this.tip = result.data.info.ask_name;
      this.cont = result.data.info.ask_breif;
      this.price = result.data.info.question_money;
      this.columns = result.data.type;
      this.value2 = result.data.info.cantry;
      this.time = result.data.info.canseetime;
      this.leixing = result.data.info.type_name;
      this.leixing_id = result.data.info.ask_type;
    },
    // 开通关闭修改答主信息
    async sumbit() {
      const result = await reqDazhuEdit(
        "",
        this.Isopen_ask,
        this.tip,
        this.cont,
        this.price,
        this.leixing_id,
        this.cantry,
        this.time
      );
      if (result.code == 1) {
        Toast.success("保存成功");
        this.$router.push("/openMaster");
      }else if(result.code == -995){
        Toast.fail("请完善信息")
      }
    }
  },
  mounted() {
    this.getOpenAsk();
    this.getDazhuMsg();
  },
  computed: {
    columnss() {
      let Arr = [];
      this.columns.forEach(element => {
        Arr.push(element.type_name);
      });
      return Arr;
    }
  },
  watch: {
    value2(newVal, oldVal) {
      if (newVal == true) {
        this.cantry = 1;
      } else {
        this.cantry = 0;
      }
    },
    value(newVal, oldVal) {
      if (newVal == true) {
        this.Isopen_ask = 1;
      } else {
        this.Isopen_ask = 0;
      }
    }
  }
};
</script>

<style scoped>
.openqa {
  width: 100%;
  background-color: #f6f6f6;
}
.openqa .isOpen {
  height: 100px;
  background: #fff;
  line-height: 100px;
  display: flex;
  justify-content: space-between;
  padding: 0 30px;
  box-sizing: border-box;
}
.openqa .isOpen .left {
  font-size: 30px;
  color: #333;
}
.openqa .isOpen .left span {
  color: red;
  vertical-align: middle;
  margin-right: 10px;
}
.openqa .isShow .box {
  margin-top: 30px;
  padding: 0 13px;
  box-sizing: border-box;
  background: #fff;
}
.van-button--disabled {
  background-color: transparent;
  border: none;
  font-size: 28px;
  /* height: 0.1px; */
}
.isShow .box2 {
  padding: 0 40px !important;
  box-sizing: border-box;
  background: #fff;
}
.isShow .box3 {
  padding: 0 8px !important;
  box-sizing: border-box;
  background: #fff;
}
.openqa .btn {
  padding: 50px;
  box-sizing: border-box;
}
.openqa .isOpen .left.shiting {
  font-size: 26px;
}
.line {
  line-height: 60px;
}
</style>