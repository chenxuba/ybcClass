/*
与后台交互模块 （依赖已封装的ajax函数）
 */
import ajax from './ajax'
const BASE_URL = 'https://api.ybc365.com'

// const BASE_URL = '/api'
/**
 * 用户登录
 */
export const reqUserLogin = (login_name, login_pwd, verifycode, type) => ajax(`${BASE_URL}/api/5dbfe3d399960`, {login_name,login_pwd,verifycode,type}, 'POST');
/**
 * 导师主页
 */
export const reqUserHomepage = () => ajax(`${BASE_URL}/api/5dc25807a5689`, {}, 'POST');
/**
 * 获取直播设备信息
 */
export const reqLiveShebeiMsg = () => ajax(`${BASE_URL}/api/5dc1453454d32`, {}, 'POST');
/**
 * 获取课时资源列表-标题,时间搜索
 */
export const reqClassHourList = (title, start_time, end_time, page) => ajax(`${BASE_URL}/api/5dc3e1174d0ba`, {title,start_time, end_time,page}, 'POST');
/**
 * 发布课时资源
 */
export const reqReleaseClassHour = (res_type, res_id,title,start_date, cover, video_url, audio_url,intro, first_label, second_label, needpay, real_price, password, cantry, cantrytime, is_open_class,is_open_privacy,associate_sell,screen_type, is_specify, release_time,associate_type,course_id,clockin_id) => ajax(`${BASE_URL}/api/5dc8f73cabf87`, {res_type, res_id,title,start_date, cover, video_url, audio_url,intro, first_label, second_label, needpay, real_price, password, cantry, cantrytime, is_open_class,is_open_privacy, associate_sell,screen_type,is_specify, release_time,associate_type,course_id,clockin_id}, 'POST');
/**
 * 新增资源_获取分类标签 pros_type	资源类型：1-视频;2-软文
 */
export const reqMenuLabel = (pros_type) => ajax(`${BASE_URL}/api/5de076cd343cc`, {pros_type}, 'POST');
/**
 * 课时资源删除
 */
export const reqDeleteClassHour = (id,type) => ajax(`${BASE_URL}/api/5dccc7d463277`, {id,type}, 'POST');
/**
 * 开始/结束视频直播
 */
export const reqStartLive = (live_type,live_id,type) => ajax(`${BASE_URL}/api/5de5d919b1ea4`, {live_type,live_id,type}, 'POST');
/**
 * 课时资源编辑
 */
export const reqResourceEdit = (res_id) => ajax(`${BASE_URL}/api/5dca854b00572`, {res_id}, 'POST');
/**
 * 获取课程列表
 */
export const reqCourseList = (title,start_time,end_time) => ajax(`${BASE_URL}/api/5dcce8d430b73`, {title,start_time,end_time}, 'POST');
/**
 * 删除课程资源
 */
export const reqDeleteCourse = (id) => ajax(`${BASE_URL}/api/5dcd1ef33efda`, {id}, 'POST');
/**
 * 保存课程信息
 */
export const reqAddCourse = (title,cover,needpay,pay,money,first_label,second_label,liveintro,id,is_specify,release_time) => ajax(`${BASE_URL}/api/5dccf910268c9`, {title,cover,needpay,pay,money,first_label,second_label,liveintro,id,is_specify,release_time}, 'POST');
/**
 * 编辑课程-获取内容
 */
export const reqEditCourse = (id) => ajax(`${BASE_URL}/api/5de8950c521dd`, {id}, 'POST');
/**
 * 获取课程相关课列表
 */
export const reqRelevantCourse = (course_id,title,page) => ajax(`${BASE_URL}/api/5de8adc24fa0b`, {course_id,title,page}, 'POST');
/**
 * 新增资源-获取课程和打卡学堂列表
 */
export const reqHoursCourseList = () => ajax(`${BASE_URL}/api/5de9bb8a43b7b`, {}, 'POST');