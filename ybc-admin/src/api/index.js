/*
与后台交互模块 （依赖已封装的ajax函数）
 */
import ajax from './ajax'
const BASE_URL = 'https://api.ybc365.com'

// const BASE_URL = '/api'
/**
 * 用户登录
 */
export const reqUserLogin = (login_name ,login_pwd,verifycode,type) => ajax(`${BASE_URL}/api/5dbfe3d399960`, { login_name ,login_pwd,verifycode,type}, 'POST'); 
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
export const reqClassHourList = (title,start_time,end_time,page) => ajax(`${BASE_URL}/api/5dc3e1174d0ba`, {title,start_time,end_time,page}, 'POST'); 

