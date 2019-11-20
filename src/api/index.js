/*
与后台交互模块 （依赖已封装的ajax函数）
 */
import ajax from './ajax'
const BASE_URL = 'https://ky.ybc365.com'
const BASE_URL2 = 'https://api.ybc365.com'

// const BASE_URL = '/api'
/**
 * 获取首页数据信息
 */
export const reqHomePageData = (mod_id ,cookie,type) => ajax(`${BASE_URL2}/api/5d7f13b67a187`, { mod_id,cookie,type }, 'POST'); //首页数据接口
/**
 * 获取病症子页面数据
 */
export const reqChildren = (mod_id) => ajax(`${BASE_URL2}/api/5da690d93cb9c`, { mod_id }, 'POST'); 
/**
 * 获取热门搜索数据接口
 */
export const reqHotSearch = () => ajax(`${BASE_URL}/api/5d5b87de18afa`, {}, 'POST');
/**
 * 发送请求查询证书信息
 */
export const reqBook = content => ajax(`${BASE_URL2}/api/5da3d36aed252`, { content },'GET');
/**
 * 发送请求查询机构和导师列表
 */
export const reqTeacherAndSchoolList = (cookie,type,page, keyword,uid,p_type) => ajax(`${BASE_URL2}/api/5d9ea5bf4efdd`, {cookie,type,page, keyword,uid,p_type}, 'POST');
/**
 * 发送请求模糊搜索
 */
export const reqfuzzySearch = keyword => ajax(`${BASE_URL}/api/5d099c34e2e62`, { keyword }, 'POST');
/**
 * 发送请求查询课程简介数据
 */
export const reqCourseJianjie = (id, cookie) => ajax(`${BASE_URL2}/api/5d803f8d8f2ce`, { id, cookie }, 'POST');
/**
 * 发送请求查询课程目录数据
 */
export const reqCourseMulu = (id, page) => ajax(`${BASE_URL2}/api/5d8050919a814`, { id, page }, 'POST');
/**
 * 发送请求查询课程评价数据
 */
export const reqCoursePingJia = (id, page,type,onlysee) => ajax(`${BASE_URL2}/api/5d8058e0250e4`, { id, page,type,onlysee }, 'POST');
/**
 * 发送请求查询课时课程播放页数据
 */
export const reqClassTimePlayer = (res_id, cookie,password) => ajax(`${BASE_URL2}/api/5d8078bf0054e`, { res_id,  cookie ,password}, 'POST');
/**
 * 发送请求手机号+密码登录
 */
export const reqPhonePwdLogin = (phone, password) => ajax(`${BASE_URL2}/api/5d789d5a3e9a6`, { phone, password }, 'POST');
/**
 * 发送请求查询直播页面数据
 */
export const reqLivePage = (cookie, page) => ajax(`${BASE_URL2}/api/5d82eadb4b27f`, { cookie, page }, 'POST');
/**
 * 发送请求查询问答页面导师列表
 */
export const reqTeacherList = (cookie, page) => ajax(`${BASE_URL2}/api/5d82f8d6001b3`, { cookie, page }, 'POST');
/**
 * 发送请求查询所有问答题目列表
 */
export const reqAllQuestion = (cookie, page) => ajax(`${BASE_URL2}/api/5d832f9083231`, { cookie, page }, 'POST');
/**
 * 发送请求查询用户是否绑定导师账号,判断用户是不是导师,open_ask判断是否开通问答，1开通，0未开通
 */
export const reqUserIsTeacher = (cookie) => ajax(`${BASE_URL2}/api/5d834322bef70`, { cookie }, 'POST');
/**
 * 发送请求查询用户个人中心菜单和用户名、邀约人等信息
 */
export const reqUserInfo = (cookie) => ajax(`${BASE_URL2}/api/5d8b2fed732ab`, { cookie }, 'POST');
/**
 * 发送请求查询病症分类标签
 */
export const reqLable = () => ajax(`${BASE_URL2}/api/5da2ad36ae464`, {}, 'POST');
/**
 * 发送请求根据id查询课时详细信息
 */
export const reqClassDetail = (res_id,cookie) => ajax(`${BASE_URL2}/api/5d8078bf0054e`, {res_id,cookie}, 'POST');
/**
 * 发送请求根据id查询资源的播放地址
 */
export const reqVideoUrl = (res_id,password,cookie) => ajax(`${BASE_URL2}/api/5d9eecad780d7`, {res_id,password,cookie}, 'POST');
/**
 * 发送验证码
 */
export const reqSendCode = (phone) => ajax(`${BASE_URL2}/api/5d904e531467a`, {phone}, 'POST');
/**
 * 手机+验证码登录
 */
export const reqPhoneCode = (phone,code) => ajax(`${BASE_URL2}/api/5d9053f5603c2`, {phone,code}, 'POST');
/**
 * 发送请求查询软文的分类
 */
export const reqWordLable = () => ajax(`${BASE_URL2}/api/5da56d6b26cbe`, {}, 'POST');
/**
 * 发送请求查询更多资源
 */
export const reqMoreResource = (cookie,id,type,page) => ajax(`${BASE_URL2}/api/5da2e501ec739`, {cookie,id,type,page}, 'POST');
/**
 * 问答提问问题-获取老师信息和问答配置
 */
export const reqMsgConfig = (user_id,cookie) => ajax(`${BASE_URL2}/api/5d8439c28432f`, {user_id,cookie}, 'POST');
/**
 * 问答提问问题-获取老师对应的问题列表
 */
export const reqCorresponding = (user_id,cookie,page) => ajax(`${BASE_URL2}/api/5d9da5763e316`, {user_id,cookie,page}, 'POST');
/**
 * 问答提交问题
 */
export const reqSubmitQa = (cookie,img_url, user_id,word,is_private) => ajax(`${BASE_URL2}/api/5d9c573110272`, {cookie,img_url, user_id,word,is_private}, 'POST');
/**
 * 获取软文资讯详情
 */
export const reqWordDetail = (article_id,cookie, password) => ajax(`${BASE_URL2}/api/5d80bdcc45a59`, {article_id,cookie, password}, 'POST');
/**
 * 学员开通、续费
 */
export const reqStuOpen = (cookie) => ajax(`${BASE_URL2}/api/5d9c27cfdb9fe`, {cookie}, 'POST');
/**
 * 获取购买记录
 */
export const reqBuyFood = (cookie) => ajax(`${BASE_URL2}/api/5dad698ea8eae`, {cookie}, 'POST');
/**
 * 获取收藏记录
 */
export const reqshouCang = (type,cookie,page) => ajax(`${BASE_URL2}/api/5dad706b3d441`, {type,cookie,page}, 'POST');
/**
 * 获取关注列表
 */
export const reqFollow = (name,cookie) => ajax(`${BASE_URL2}/api/5d81f12bab632`, {name,cookie}, 'POST');
/**
 * 获取用户个人信息
 */
export const reqUserInfo2 = (cookie) => ajax(`${BASE_URL2}/api/5da8188a00160`, {cookie}, 'POST');
/**
 * 修改昵称
 */
export const reqUserName = (name,cookie) => ajax(`${BASE_URL2}/api/5da81d0b089c4`, {name,cookie}, 'POST');
/**
 * 修改真实姓名
 */
export const reqRealName = (name,cookie) => ajax(`${BASE_URL2}/api/5da8244751e9e`, {name,cookie}, 'POST');
/**
 * 更改手机号码发送验证码
 */
export const reqSendCodeChange = (phone,cookie) => ajax(`${BASE_URL2}/api/5da82e228c371`, {phone,cookie}, 'POST');
/**
 * 更改手机号码
 */
export const reqPhoneCodeChange = (phone,code,cookie) => ajax(`${BASE_URL2}/api/5da965998e7a8`, {phone,code,cookie}, 'POST');
/**
 * 绑定手机号码，发送验证码
 */
export const reqBdingPhoneCode = (phone,cookie) => ajax(`${BASE_URL2}/api/5dad7645c1d54`, {phone,cookie}, 'POST');
/**
 * 绑定手机号码
 */
export const reqBdingPhone = (phone,code,cookie) => ajax(`${BASE_URL2}/api/5dad7834483f5`, {phone,code,cookie}, 'POST');
/**
 * 我的人气
 */
export const reqMyFans = (cookie,page) => ajax(`${BASE_URL2}/api/5db1697a74d6d`, {cookie,page}, 'POST');
/**
 * 课程购买---支付接口
 */
export const reqWxPay = (cookie,id,type,res_id,pay_type,money,multiply,pwd,user_id) => ajax(`${BASE_URL2}/api/5db6a07c84156`, {cookie,id,type,res_id,pay_type,money,multiply,pwd,user_id}, 'POST');
/**
 * 是否订阅接口
 */
export const reqIsDingYue = (cookie,id) => ajax(`${BASE_URL2}/api/5db7b626141dd`, {cookie,id}, 'POST');
/**
 * 导师-基本信息
 */
export const reqMyTeacherMsg = (cookie) => ajax(`${BASE_URL2}/api/5db699d01b243`, {cookie}, 'POST');
/**
 * 导师-基本资料
 */
export const reqMyTeacherData = (cookie) => ajax(`${BASE_URL2}/api/5db69bec7a1ea`, {cookie}, 'POST');
/**
 * 导师-粉丝
 */
export const reqMyTeacherFans = (cookie,page) => ajax(`${BASE_URL2}/api/5db6b7d65e314`, {cookie,page}, 'POST');
/**
 * 我的问答-我提问的
 */
export const reqMyQuery = (cookie,page) => ajax(`${BASE_URL2}/api/5db6493c9fdbd`, {cookie,page}, 'POST');
/**
 * 我的问答-我围观的
 */
export const reqMyWeiGuan = (cookie,page) => ajax(`${BASE_URL2}/api/5db661f6004b2`, {cookie,page}, 'POST');
/**
 * 我的问答-判断是否已经开通答主
 */
export const reqIsOpenDazhu = (cookie) => ajax(`${BASE_URL2}/api/5db7fd6762740`, {cookie}, 'POST');
/**
 * 我的问答-答主基本信息
 */
export const reqDazhuMsg = (cookie) => ajax(`${BASE_URL2}/api/5db80296789a9`, {cookie}, 'POST');
/**
 * 我的问答-开通关闭修改答主信息
 */
export const reqDazhuEdit = (cookie,open_ask,ask_name,ask_breif,question_money,ask_type,cantry,canseetime) => ajax(`${BASE_URL2}/api/5db809c0c2558`, {cookie,open_ask,ask_name,ask_breif,question_money,ask_type,cantry,canseetime}, 'POST');
/**
 * 我的机构
 */
export const reqMySchool = (cookie) => ajax(`${BASE_URL2}/api/5db2b2ccc79eb`, {cookie}, 'POST');
/**
 * ws接口
 */
export const wsUrl = "wss://kf.ybc365.com/websocket/train";
/**
 * 获取礼物列表
 */
export const reqLiwu = (res_id,cookie) => ajax(`${BASE_URL2}/api/5d9fec015a5dc`, {res_id,cookie}, 'POST');
/**
 * 查询支付结果
 */
export const reqPayResult = (batchcode,cookie) => ajax(`${BASE_URL2}/api/5da03c640d0d8`, {batchcode,cookie}, 'POST');
/**
 * 查询零钱支付结果
 */
export const reqPayResult2 = (batchcode,cookie,type) => ajax(`${BASE_URL2}/api/5dba8fc19df10`, {batchcode,cookie,type}, 'POST');
/**
 * 导师申请检查申请结果
 */
export const reqCheckResult = (cookie,type) => ajax(`${BASE_URL2}/api/5db68570d92ed`, {cookie,type}, 'POST');
/**
 * 申请导师
 */
export const reqShenQingTeacher = (cookie,agency_id,idcard_imgz,idcard_imgf,user_id) => ajax(`${BASE_URL2}/api/5db689027f3dc`, {cookie,agency_id,idcard_imgz,idcard_imgf,user_id}, 'POST');
/**
 * 【康复云教育】用户申请机构
 */
export const reqApplySchool = (cookie,schoolname,province,city,area,addressdetails,brief_intro,business_license,idcard_imgz,idcard_imgf,checkbox,agency_id) => ajax(`${BASE_URL2}/api/5db2a35d6bfa7`, {cookie,schoolname,province,city,area,addressdetails,brief_intro,business_license,idcard_imgz,idcard_imgf,checkbox,agency_id}, 'POST');
/**
 * 获取用户零钱信息
 */
export const reqlingQianMsg = (cookie) => ajax(`${BASE_URL2}/api/5d9c2474c1463`, {cookie}, 'POST');
/**
 * 获取用户订阅接口
 */
export const reqUserDingyue = (cookie,page) => ajax(`${BASE_URL2}/api/5db28aa0d5b54`, {cookie,page}, 'POST');
/**
 * 获取软文评论
 */
export const reqWordComment = (cookie,article_id,page) => ajax(`${BASE_URL2}/api/5dce1099d8222`, {cookie,article_id,page}, 'POST');
/**
 * 发布软文评论
 */
export const reqFabuComment = (cookie,article_id,content) => ajax(`${BASE_URL2}/api/5dce0f5bb2557`, {cookie,article_id,content}, 'POST');
/**
 * 软文评论删除
 */
export const reqDeleteComment = (cookie,article_id,comm_id) => ajax(`${BASE_URL2}/api/5dd22ec451501`, {cookie,article_id,comm_id}, 'POST');
/**
 * 软文评论点赞和取消点赞
 */
export const reqCommentZan = (cookie,article_id,user_id,comm_id) => ajax(`${BASE_URL2}/api/5dd22d909fd99`, {cookie,article_id,user_id,comm_id}, 'POST');
/**
 * 导师关注和取消关注
 */
export const reqTeacherGuanzhu = (cookie,user_id,active) => ajax(`${BASE_URL2}/api/5d81fbf53aad8`, {cookie,user_id,active}, 'POST');
/**
 * 软文点赞/取消点赞
 */
export const reqwordZan = (cookie,article_id,user_id,mtype) => ajax(`${BASE_URL2}/api/5dce0c8cc3973`, {cookie,article_id,user_id,mtype}, 'POST');
/**
 * 软文收藏/取消收藏
 */
export const reqwordShouCang = (cookie,article_id,user_id,mtype) => ajax(`${BASE_URL2}/api/5dce0e16b788a`, {cookie,article_id,user_id,mtype}, 'POST');
/**
 * 机构主页详情
 */
export const reqschoolDetail = (cookie,agency_id) => ajax(`${BASE_URL2}/api/5dcb9c5759416`, {cookie,agency_id}, 'POST');
/**
 * 机构---导师列表
 */
export const reqschoolteacherList = (cookie,agency_id,page) => ajax(`${BASE_URL2}/api/5dcb9db86b938`, {cookie,agency_id,page}, 'POST');