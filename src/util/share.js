import wx from 'weixin-js-sdk';
import axios from 'axios'
export const wxJS_SDk = (title, desc, link, imgUrl) => {
  var href = window.location.href;
  axios.post("https://api.ybc365.com/api/5db107ce2d316", {
    url: href
  }).then((res) => {
    // console.log(res.data.data.appId)
    wx.config({
      // beta: true,
      debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
      appId: res.data.data.appId, // 必填，公众号的唯一标识
      timestamp: res.data.data.timestamp, // 必填，生成签名的时间戳
      nonceStr: res.data.data.nonceStr, // 必填，生成签名的随机串
      signature: res.data.data.signature, // 必填，签名，见附录1
      jsApiList: ['onMenuShareAppMessage', 'onMenuShareTimeline']
    });
  }).catch((err) => {
    console.log(err)
  });



  wx.ready(() => {
    wx.onMenuShareAppMessage({
      title: title, // 分享标题
      desc: desc, // 分享描述
      link: link, // 分享链接
      imgUrl: imgUrl, // 分享图标
      type: "", // 分享类型,music、video或link，不填默认为link
      dataUrl: "", // 如果type是music或video，则要提供数据链接，默认为空
      success: function (res) {
        console.log(res)
      },
      cancel: function () {
        // 用户取消分享后执行的回调函数
      }
    });


    // 分享朋友圈
    wx.onMenuShareTimeline({
      title: title, // 分享标题
      link: link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      imgUrl: imgUrl, // 分享图标
      success: function (res) {
        // 用户点击了分享后执行的回调函数
        console.log(res)
      }
    })
  })
}



