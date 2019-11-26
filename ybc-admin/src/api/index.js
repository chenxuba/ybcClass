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

