/*
vuex 的 mutations 模块
 */
// import Vue from 'vue'
import {
    GET_SWIPER,
    GET_NOTICEBAR,
    GET_MENU3,
    GET_MENU4,
    GET_COUSRE,
    GET_NEWCOUSRE,
    GET_CLASSHOUR,
    GET_WORD,
    GET_HOTSEARCH,
    GET_Zbook,
} from './mutation-types'
// [方法名](state,{param}){}
export default {
    [GET_SWIPER](state, { swiper }) {
        state.swiper = swiper
    },
    [GET_NOTICEBAR](state, { NoticeBar }) {
        state.NoticeBar = NoticeBar
    },
    [GET_MENU3](state, { menu3 }) {
        state.menu3 = menu3
    },
    [GET_MENU4](state, { menu4 }) {
        state.menu4 = menu4
    },
    [GET_COUSRE](state, { cousre }) {
        state.cousre = cousre
    },
    [GET_NEWCOUSRE](state, { newcousre }) {
        state.newcousre = newcousre
    },
    [GET_CLASSHOUR](state, { classHour }) {
        state.classHour = classHour
    },
    [GET_WORD](state, { word }) {
        state.word = word
    },
    [GET_HOTSEARCH](state, { hotSearch }) {
        state.hotSearch = hotSearch
    },
    [GET_Zbook](state, { Zbook }) {
        state.Zbook = Zbook
    },
    //实时更新state中到val值
    setContent(state, content) {
        state.content = content
    },
    //把搜索的课程简介数据存到vuex中
    setCourseJianjie(state,CourseJianjie){
        state.CourseJianjie = CourseJianjie
    },
    //把搜索的课程目录数据存到vuex中
    setCourseMulu(state,CourseMulu){
        state.CourseMulu = CourseMulu
    },
    //把搜索的课程评价数据存到vuex中
    setCoursePingJia(state,CoursePingJia){
        state.CoursePingJia = CoursePingJia
    },
    //把课时课程播放页数据存到vuex中
    setClassTimePlayer(state,ClassTimePlayer){
        state.ClassTimePlayer = ClassTimePlayer
    },
    // 把赋值的礼物总价钱数据存到vuex中
    setLiwuTotalPrice(state,LiwuTotalPrice){
        state.LiwuTotalPrice = LiwuTotalPrice
    },
    setTransitionName(state,transitionName){
        state.transitionName = transitionName
    }
  
    
}