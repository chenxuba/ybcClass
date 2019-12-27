// 导入自己需要的组件
import {Sticky, Button,List,Grid,Area,Overlay,Skeleton, GridItem,Picker,Stepper,PullRefresh,CouponList,SwipeCell,Checkbox,CheckboxGroup,RadioGroup,PasswordInput, NumberKeyboard, Radio,Search,Switch, SubmitBar,Uploader,Popup,Toast,Slider,Field,Icon, Swipe, Cell,CellGroup,SwipeItem, Lazyload, Row, Col, Image, Divider, NoticeBar, ActionSheet, Dialog, Tab, Tabs, Pagination, Rate, Tag, NavBar,} from 'vant';
const vant = {
    install: function(Vue) {
        Vue.use(Button)
        Vue.use(Search)
        Vue.use(Icon)
        Vue.use(Swipe)
        Vue.use(SwipeItem)
        Vue.use(Lazyload)
        Vue.use(Row)
        Vue.use(Col)
        Vue.use(Image);
        Vue.use(Divider);
        Vue.use(NoticeBar);
        Vue.use(Dialog);
        Vue.use(Pagination);
        Vue.use(Tag);
        Vue.use(Toast);
        Vue.use(NavBar);
        Vue.use(Sticky);
        Vue.use(Rate);
        Vue.use(Tab);
        Vue.use(Tabs);
        Vue.use(Field);
        Vue.use(Popup);
        Vue.use(CellGroup);
        Vue.use(Cell);
        Vue.use(Slider);
        Vue.use(Uploader);
        Vue.use(SwipeCell);
        Vue.use(ActionSheet);
        Vue.use(Switch);
        Vue.use(RadioGroup);
        Vue.use(Radio);
        Vue.use(SubmitBar);
        Vue.use(PasswordInput).use(NumberKeyboard);
        Vue.use(Checkbox).use(CheckboxGroup);
        Vue.use(List);
        Vue.use(Picker);
        Vue.use(Stepper);
        Vue.use(Grid).use(GridItem);
        Vue.use(PullRefresh);
        Vue.use(Area);
        // Vue.use(CouponList);
        Vue.use(Skeleton);
        Vue.use(Overlay);
    }
}
export default vant