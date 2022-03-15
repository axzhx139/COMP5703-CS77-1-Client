/*
	
	vuex全局状态管理
	这里用来存储一些数据 比如说tabbar的list在每个页面都要声明
	（因为安全策略的原因tabbar要在page.json中定义才能被使用）
	但是在这里面定义下就可以在全局引用简化代码
	用法可以百度搜索 uniapp vuex


*/
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);


export default new Vuex.Store({
    state: {
		tabbar: [{
					"pagePath": "/pages/home/home",
					"iconPath": "/static/uview/example/component.png",
					"selectedIconPath": "/static/uview/example/component_select.png",
					"text": "Home",
					"count": 0,
					"isDot": false
				},
				{
					"pagePath": "/pages/grocery/grocery",
					"iconPath": "/static/uview/example/fridge-line.png",
					"selectedIconPath": "/static/uview/example/fridge-fill.png",
					"text": "Grocery",
					"count": 0,
					"isDot": false
				},
				{
					"pagePath": "/pages/recipe/recipe",
					"iconPath": "/static/uview/example/template.png",
					"selectedIconPath": "/static/uview/example/template_select.png",
					"text": "Recipe",
					"count": 0,
					"isDot": false
				},
				{
					"pagePath": "/pages/profile/profile",
					"iconPath": "/static/uview/example/user-line.png",
					"selectedIconPath": "/static/uview/example/user-fill.png",
					"text": "Profile",
					"count": 0,
					"isDot": false
				}
			],
        hasLogin: false, // 登录状态
        userInfo: {}, // 用户信息
		recipeInfo:[],
		
    },
    mutations: {
        setHasLogin(state, value){
            state.hasLogin = value
            console.log(state.hasLogin)
        },
		setUserLogin(state, uid) {
			state.userInfo = uid 
		},
		setRecipe(state, recipeList) {
			state.recipeInfo = recipeList
		},
    },
	
    actions: {},
    getters: {}
})