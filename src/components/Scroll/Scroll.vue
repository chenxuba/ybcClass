
<template>
  <div ref="scroll" class="w-scroll">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "scroll",
  data() {
    return {};
  },
  computed: {},
  mounted() {
    this.wScroll(this.$refs.scroll);
  },
  methods: {
    wScroll(elem) {
      var startX = 0,
        startY = 0;
      document.addEventListener("touchstart", function(evt) {
        var touch = evt.touches[0];
        startX = Number(touch.pageX);
        startY = Number(touch.pageY);
      });

      elem.addEventListener("touchmove", function(ev) {
        var _point = ev.touches[0],
          _top = elem.scrollTop;
        var _bottomFaVal = elem.scrollHeight - elem.offsetHeight;
        //console.log(_top + ":" + _bottomFaVal + ":" + elem.offsetHeight + ":" + elem.scrollHeight);
        if (_top === 0) {
          if (_point.clientY > startY) {
            if (!ev.cancelable) {
              ev.stopPropagation();
            }
          } else {
            ev.stopPropagation();
          }
        } else if (_top === _bottomFaVal) {
          ev.stopPropagation();
          // console.log(1)
        } else if (_top > 0 && _top < _bottomFaVal) {
          ev.stopPropagation();
          // console.log(2)
        } else {
          ev.preventDefault();
          // console.log(3)
          
        }
      });
    }
  }
};
</script>
<style scoped="scoped">
.w-scroll {
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;
}
</style>