export const isWx = () => {
  var ua = navigator.userAgent.toLowerCase();
  var isWeixin = ua.indexOf("micromessenger") != -1;
  if (isWeixin) {
    console.log("是微信浏览器");
    return true;
  } else {
    console.log("不是微信浏览器");
    return false;

  }
}

export const isIos = () => {
  const agent = navigator.userAgent;
  const isiOS = !!agent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); // ios终端
  console.log(isiOS);
  if (isiOS) {
    // 解决ios手机支付的时候提示当前url未注册问题（如果不写这一段代码，当前页面的url就会一直是刚进入的那个url，会提示当前url未注册）
    let _href = window.location.href; // 获取当前地址
    if (_href.indexOf("&replace=1") <= -1) {
      // 若没有replace参数，则添加进去
      // window.location.replace(_href + "&replace=1");
      console.log(11);
      
    }
   
  }
}

