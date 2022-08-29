// 引入vant组件
import {
    Button,
    Icon,
    Tabbar,
    TabbarItem,
    Search,
    ConfigProvider,
    Tab,
    Tabs,
    Sticky,
    NoticeBar,
    Swipe,
    SwipeCell,
    NavBar,
    List,
    ActionBar, 
    ActionBarIcon, 
    ActionBarButton,
    Stepper,
    Form, 
    Field, 
    CellGroup,
    Dialog,
    Toast,
    Card,
    Cell,
    SubmitBar,
    Popup,
    Checkbox,
    CheckboxGroup 
    
} from 'vant'
import 'vant/lib/toast/style'
import 'vant/lib/dialog/style'
export default function(app){
    app.use(Button)
    app.use(Icon)
    app.use(Tabbar)
    app.use(TabbarItem)
    app.use(ConfigProvider)
    app.use(Tab)
    app.use(Tabs)
    app.use(Search)
    app.use(Sticky)
    app.use(NoticeBar)
    app.use(Swipe)
    app.use(SwipeCell)
    app.use(NavBar)
    app.use(List)
    app.use(ActionBar)
    app.use(ActionBarIcon)
    app.use(ActionBarButton)
    app.use(Stepper)
    app.use(Form)
    app.use(Field)
    app.use(CellGroup)
    app.use(Dialog)
    app.use(Toast)
    app.use(Card)
    app.use(Cell)
    app.use(SubmitBar)
    app.use(Popup)
    app.use(Checkbox)
    app.use(CheckboxGroup)
}
