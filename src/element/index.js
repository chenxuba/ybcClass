// 导入自己需要的组件
import { Select, Option, OptionGroup, Pagination,Switch,Input, Tree, Dialog, Row, Col, Button, Message ,Loading} from 'element-ui'
const element = {
    install: function (Vue) {
        Vue.use(Select)
        Vue.use(Option)
        Vue.use(OptionGroup)
        Vue.use(Input)
        Vue.use(Tree)
        Vue.use(Dialog)
        Vue.use(Row)
        Vue.use(Col)
        Vue.use(Button),
        Vue.use(Switch);
        Vue.prototype.$loading = Loading.service
        Vue.prototype.$message = Message
        Vue.use(Pagination);
    }
}
export default element

