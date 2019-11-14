<template>
  <div class="number-grow-warp">
    <span ref="numberGrow" :data-time="time" class="number-grow" :data-value="value">0</span>
  </div>
</template>

<script>
export default {
  props: {
    time: {
      type: Number,
      default: 0
    },
    value: {
      type: String,
      default: 500
    }
  },
  methods: {
    numberGrow(ele, oldVal) {
      let _this = this;

      let step = 1;
      let current = 0;
      let start = 200;
      let t = setInterval(function() {
        start += step;
        if (start > _this.value) {
          clearInterval(t);
          start = _this.value;
          t = null;
        }
        if (current === start) {
          return;
        }
        current = start;
        ele.innerHTML = current.toString();
      }, 1);
    }
  },
  mounted() {
    this.numberGrow(this.$refs.numberGrow);
  },
  watch: {
    value(newVal, oldVal) {
      console.log(oldVal);
      this.numberGrow(this.$refs.numberGrow, oldVal);
    }
  }
};
</script>

<style scoped>
.number-grow-warp {
  transform: translateZ(0);
  display: inline-block;
}
.number-grow {
  font-size: 24px;
  color: #fff;
  letter-spacing: 2px;
}
</style>