import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

import Vuex from 'vuex'
Vue.use(Vuex)

var car = JSON.parse(localStorage.getItem('car') || '[]')

var store = new Vuex.Store({
	state: { 
		car: car,  
	},
	mutations: { 
		addToCar() {
			
			// 假设 在购物车中，没有找到对应的商品
			var flag = false

			state.car.some(item => {
			  if (item.id == goodsinfo.id) {
				item.count += parseInt(goodsinfo.count)
				flag = true
				return true
			  }
			})

			if (!flag) {
				state.car.push(goodsinfo)
			}

			// 当更新 car 之后，把 car 数组，存储到本地的 localStorage 中
			localStorage.setItem('car', JSON.stringify(state.car));
		},
		updateGoodsInfo(state, goodsinfo) {
			state.car.some(item => {
				if(item.id == goodsinfo.id) {
					item.count = parseInt(goodsinfo.count)
					return true
				}
			})
			// 当修改完商品的数量，把最新的购物车数据，保存到 本地存储中
			localStorage.setItem('car', JSON.stringify(state.car));
		},
		removeFromCar(state, id) {
			// 根据 Id，从 store 中的购物车中删除对应的那条商品数据
			state.car.some((item, i) => {
				if(item == id) {
					state.car.splice(i, 1)
					return true;
				}
			})
			// 将删除完毕后的，最新的购物车数据，同步到 本地存储中
			localStorage.setItem('car', JSON.stringify(state.car))
		},
		updateGoodsSelected(state, info) {
			state.car.some(item => {
				if(item.id == info.id) {
					item.selected = info.selected
				}
			})
			// 把最新的 所有购物车商品的状态保存到 store 中去
			localStorage.setItem('car', JSON.stringify(state.car))
		}
	},
	getters: { // this.$store.getters.***
		// 相当于计算属性，也相当于 filters
		getAllCount(state) {
			var c = 0;
			state.car.forEach(item => {
				c += item.count
			})
			return c;
		},
		getGoodsCount(state) {
			var o = {}
			state.car.forEach(item => {
				o[item.id] = item.id;
			})
			return o;
		},
		getGoodsSelected(state) {
			var o ={};
			state.car.forEach(item => {
				o[item.id] = item.selected;
			})
			return o;
		},
		getGoodsCountAndAmount(state) {
			var o = {
				count: 0,  // 勾选的数量
				amount: 0  // 勾选的总价
			}
			state.car.forEach(item => {
				if(item.selected) {
					o.count += item.count
					amount += item.price * item.count
				}		
			})
			return o;
		}
	}
})

// 导入格式化时间的插件
import moment from 'moment'
// 定义全局的过滤器
Vue.filter('dataFormat', function(dataStr, pattern = "YYYY-MM-DD HH:mm:ss") {
	return moment(dataStr).format(pattern)
})

import VueResource from 'vue-resource'
Vue.use(VueResource)
Vue.http.options.root = 'http://vue.studyit.io'
// 全局设置 post 时候表单数据格式组织形式   application/x-www-form-urlencoded
Vue.http.options.emulateJSON = true;


// 导入 MUI 样式
import './lib/mui/css/mui.min.css'
import './lib/mui/css/icons-extra.css'


import MintUI from 'mint-ui'
Vue.use(MintUI)
import 'mint-ui/lib/style.css'


// 安装 图片预览插件
import VuePreview from 'vue-preview'
Vue.use(VuePreview)


// 1.3 导入自己的 router.js 路由模块
import router from './router.js'


// 导入 App 根组件
import app from './App.vue'

var vm = new Vue({
	el: '#app',
	render: c => c(app),
	router, // 1.4 挂载路由对象到 vm 实例上
	store // 挂载 store 状态管理对象 
})