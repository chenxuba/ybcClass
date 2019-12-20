import $axios from "axios"

export const getCode = () => {
  // console.log(getUrlCode().parent_id);
  
  if (getUrlCode().parent_id) {
    sessionStorage.setItem('parent_id', getUrlCode().parent_id)
  }
  let openids = localStorage.getItem("login_name");
  let unionids = localStorage.getItem("login_pwd_md5");
  let cookies = sessionStorage.getItem("cookie");
  let parent_id = sessionStorage.getItem("parent_id");
  if (cookies) {
    checkCookiesLogin(cookies); //检查cookie是否过期
    // console.log(1)
  } else {
    getWechatUserInfo(); //获取用户信息
    // console.log(2)
  }



  // *********************************************************** //
  function getCookie(openids, unionids) {
    $axios.post("https://api.ybc365.com/api/5d7e36be38a64", {
      account: openids,
      password: unionids
      })
      .then(result => {
        if (result.data.code == 1) {
          sessionStorage.setItem("cookie", result.data.data.cookie);
          sessionStorage.setItem("uuid", result.data.data.uuid);
          sessionStorage.setItem("member_id", result.data.data.member_id);
          location.reload() 
        }
      });
  }

  function getWechatCode() {
    var url = encodeURI(window.location.href); //取得整个地址栏
    // console.log("encodeURI" + url)
    window.location.href = `https://wxauth.ybc365.com/?appid=wxe0d15ea2f03bed68&response_type=code&scope=snsapi_userinfo&redirect_uri=${url}`;
  }


  function checkCookiesLogin(cookies) {
    $axios.post("https://api.ybc365.com/api/5d7ee3635fe1a", {
        cookie: cookies
      })
      .then(result => {
        // console.log(result);
        if (result.data.code == -7) {
          if (openids && unionids) {
            getCookie(openids, unionids);
            
          }
        }else{
          console.log("cookie没过期");
          
        }
      });
  }



  function getWechatUserInfo() {
    if (openids && unionids) {
      getCookie(openids, unionids);
    } else {
      //截取url中的参数,包括openid，uuid，cookie等
      // getUrlCode();
      if (getUrlCode().code) {
        $axios.post("https://api.ybc365.com/api/5d7bb81605c03", {
            code: getUrlCode().code,
            parent_id: parent_id
          })
          .then(result => {
            console.log(result);
            // alert(JSON.stringify(result))
            // return;
            if (result.data.code == 1) {
              console.log(result);
              // return;member_id
              sessionStorage.setItem("cookie", result.data.data.cookie);
              sessionStorage.setItem("uuid", result.data.data.uuid);
              localStorage.setItem("login_name", result.data.data.login_name);
              localStorage.setItem("login_pwd_md5", result.data.data.login_pwd_md5);
              sessionStorage.setItem("member_id", result.data.data.member_id);
              // console.log("我把cookie存到sessionStorage里了");
              location.reload() 
              // console.log("结束");
              
            }
          });
      } else {
        getWechatCode();
      }
    }
  }
  // if(typeof callback=="function"){
  //   callback();
  // }

  function getUrlCode() {
    var str = window.location.href; //取得整个地址栏
    var num = str.indexOf("?");
    str = str.substr(num); //取得所有参数
    var theRequest = new Object();
    if (num != -1) {
      var str_1 = str.substr(1);
      var strs_1 = str_1.split("&");
      for (var i = 0; i < strs_1.length; i++) {
        theRequest[strs_1[i].split("=")[0]] = strs_1[i].split("=")[1];
      }
    }
    return theRequest;
  }
}
