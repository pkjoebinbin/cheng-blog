// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Router from './router/router.js'
import resource from 'vue-resource'
import './css/style.css'
import $ from 'jquery'
import {
  Pagination,
  Autocomplete,
  Menu,
  Submenu,
  MenuItem,
  MenuItemGroup,
  Input,
  InputNumber,
  Radio,
  RadioGroup,
  RadioButton,
  Checkbox,
  CheckboxButton,
  CheckboxGroup,
  Switch,
  Select,
  Option,
  OptionGroup,
  Button,
  ButtonGroup,
  Table,
  TableColumn,
  Tabs,
  TabPane,
  Tag, 
  Icon,
  Row,
  Col,
  Upload,
  Badge,
  Tooltip,
  Container,
  Header,
  Aside,
  Main,
  Footer,
  Loading,
  
  
  Notification} from 'element-ui'
//import 'element-ui/lib/theme-chalk/index.css'

import Store from './store/index.js'

//import $ from 'jquery'







Vue.config.productionTip = false


Vue.use(Pagination)

Vue.use(Autocomplete)
Vue.use(Tooltip)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(MenuItemGroup)
Vue.use(Input)
Vue.use(InputNumber)
Vue.use(Radio)
Vue.use(RadioGroup)
Vue.use(RadioButton)
Vue.use(Checkbox)
Vue.use(CheckboxButton)
Vue.use(CheckboxGroup)
Vue.use(Switch)
Vue.use(Select)
Vue.use(Option)
Vue.use(OptionGroup)
Vue.use(Button)
Vue.use(ButtonGroup)
Vue.use(Table)
Vue.use(TableColumn)





Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Tag)



Vue.use(Icon)
Vue.use(Row)
Vue.use(Col)
Vue.use(Upload)
Vue.use(Badge)
Vue.use(Container)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Footer)
Vue.use(Loading.directive)



Vue.use(resource);
/* eslint-disable no-new */

Vue.prototype.Host = '';
Vue.prototype.$loading = Loading.service;


var vm = new Vue({
  el: '#app',
  store:Store,
  router:Router,
  template: '<App/>',
  components: { App },
  data:{
  	message:'1',
  },
  
  created(){
  	
  }



})











