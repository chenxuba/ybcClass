/*
Action:通过操作mutation间接更新state的多个方法的对象
 */

import {
    GET_SWIPER,
    GET_NOTICEBAR,
    GET_MENU3,
    GET_MENU4,
    GET_COUSRE,
    GET_NEWCOUSRE,
    GET_WORD,
    GET_CLASSHOUR,
    GET_HOTSEARCH,
    GET_Zbook,
} from './mutation-types'
import {
    reqHomePageData,
    reqHotSearch,
    reqBook,
} from '../api'
export default {
    // 异步获取首页数据
    async getHomePageData({ commit, state }) {
        // 从state状态中获取到mod_id用来设置reqHomePageData的参数
        const mod_id = state.mod_id
        // const cookie = sessionStorage.getItem("cookie")
        // 1. 发送异步ajax请求
        const result = await reqHomePageData(mod_id)
        // 2. 提交一个mutation,获取到轮播图数据
        const swiper = result.data[2]
        commit(GET_SWIPER, { swiper })
        // 3. 在提交一个mutation，获取到通告栏数据
        const NoticeBar = result.data[3]
        commit(GET_NOTICEBAR, { NoticeBar })
        // 4. 在提交一个mutation，获取到menu3数据
        const menu3 = result.data[4]
        commit(GET_MENU3, { menu3 })
        // 5. 在提交一个mutation，获取到menu4数据
        const menu4 = result.data[5]
        commit(GET_MENU4, { menu4 })
        // 6. 在提交一个mutation，获取到课程数据
        const cousre = result.data[6]
        commit(GET_COUSRE, { cousre })
        // 6. 在提交一个mutation，获取到最新课程数据
        const newcousre = result.data[7]
        commit(GET_NEWCOUSRE, { newcousre })
        // 7. 在提交一个mutation，获取到课时数据
        const classHour = result.data[8]
        commit(GET_CLASSHOUR, { classHour })
        // 8. 在提交一个mutation，获取到软文数据
        const word = result.data[9]
        commit(GET_WORD, { word })
    },

    // 异步获取热门搜索信息
    async getHotSearch({ commit }) {
        // 发送异步ajax请求
        const result = await reqHotSearch()
        // 提交一个mutation
        const hotSearch = result
        commit(GET_HOTSEARCH, { hotSearch })
    },
    // 异步获取证书查询信息
    async getZbook({ commit, state }) {
        const content = state.content
        // 发送异步ajax请求
        const result = await reqBook(content)
        console.log(result);
        
        // 提交一个mutation
        const Zbook = result
        commit(GET_Zbook, { Zbook })
    },

}