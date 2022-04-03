<template>
	<view>
		<hx-navbar ref="hxnb" :config="config" @clickBtn="onClickBtn">
		</hx-navbar>
		
		
		<view style="margin-top: 60px;">
			<u-row gutter="16" justify="space-between">
				<u-col span="9">
					<view class="demo-layout bg-purple">
						<view class="name" style="font">
							<text style="font-size: 20px;font-weight: 800;color: #999999;">Welcome Back, </text>
							<text style="font-size: 28px;color: #000000;font-weight: 900;">{{user.name}}</text>
						</view>
					</view>
				</u-col>
				<u-col span="3">
					<view class="demo-layout bg-purple-light">
						<u-image :src="avatar" shape="circle" width="160" height="160"></u-image>
						
					</view>
				</u-col>
			</u-row>
		</view>
		<view class="" style="padding: 0 15px 0 15px;margin-top: 30px;">
			<u-row gutter="16" justify="space-between">
				<u-col span="9">
					<view class="demo-layout bg-purple">
						<text style="font-size: 16px;font-weight: 500;">Expiring  Products</text>
					</view>
				</u-col>
<!-- 				<u-col span="3">
					<view class="demo-layout bg-purple-light" style="text-align: right;">
						<image src="../../static/000.png" style="width: 26px;height: 27px;display: inline-block;">
					</view>
				</u-col> -->
			</u-row>	
		</view>
		<view class="">
			<scroll-view :scroll-with-animation="true"  :scroll-x="true" style="white-space: nowrap;" >
			  <template v-for="(item, index) in expiringFoodList">
				  <view class="scroll_item" @click="toDetail(item.itemId)" :style="{'background-image': 'url('+item.img+')'}">
					<view style="height: 100%;">
							<img src="../../static/knife_fork.png" style="width: 20px;height: 20px;float:right"></img>
					</view>
					<text style="margin-left: 14px;font-size: 16px;font-weight: 500;">{{ item.name }}</text>
					<view class="" style="margin-left: 14px;">
						<img src="../../static/bottle.png" style="width: 15px;height: 15px;"></img>
						<text style="display: inline-block;margin-left: 5px;">{{item.remindTime.split("T")[0].split('-')[2]+'/'+ item.remindTime.split("T")[0].split('-')[1] }}</text>
					</view>
				  </view>
				  
			  </template>
			</scroll-view>
		</view>

		<view class="" style="padding: 0 15px 0 15px;margin-top: 30px;">
			<u-row gutter="16" justify="space-between">
				<u-col span="9">
					<view class="demo-layout bg-purple">
						<text style="font-size: 16px;font-weight: 500;">Recipe Recommendation</text>
					</view>
				</u-col>
				<u-col span="3">
					<view class="demo-layout bg-purple-light" @click="getRandomRecipes" style="text-align: right;">
						<image src="../../static/refresh.png" style="width: 29px;height: 27px;display: inline-block;">
					</view>
				</u-col>
			</u-row>	
		</view>
		
		
		<!-- <view class="" style="padding: 0 15px 0 15px;margin-top: 30px;" > -->
		<view class="" style="padding: 0 15px 0 15px;margin-top: 30px;" v-for="recipe in randomRecipesList">
			<u-row gutter="0" justify="space-between">

				<u-col span="6">
					<view class="demo-layout bg-purple-light card" @click="toDetail((recipe[0]).recipeId)">
						<view class="card-box">
							<u-image border-radius="6px" height="138px" width="100%" :src="(recipe[0]).img" :fade="true" duration="450"></u-image>
							<text style="font-size: 12px;font-weight: 500;">{{ (recipe[0]).name }}</text>
							
							<view style="text-align: left;margin-top: 10px;">
								<image src="../../static/b-medal.png" style="width: 15px;height: 15px;margin-left: 30rpx;">
								<text style="display: inline-block;margin-left: 10px;font-size: 10px;">{{ Math.floor((Math.random() * 5000) + 100) }} Likes</text>
								
							</view>
<!-- 							<view style="margin-top: 10px;text-align: left;margin-left: 30rpx;">
								<text style="font-size: 12px;color: #4CD964;font-weight: 500;">Beef, Mushroom</text>
							</view> -->
						</view>
					</view>
				</u-col>
				
				<u-col span="6" v-if="recipe.length == 2">
					<view class="demo-layout bg-purple-light card" @click="toDetail((recipe[1]).recipeId)">
						<view class="card-box">
							<u-image border-radius="6px" height="138px" width="100%" :src="(recipe[1]).img" :fade="true" duration="450"></u-image>
							<text style="font-size: 12px;font-weight: 500;">{{ (recipe[1]).name }}</text>
							
							<view style="text-align: left;margin-top: 10px;">
								<image src="../../static/b-medal.png" style="width: 15px;height: 15px;margin-left: 30rpx;">
								<text style="display: inline-block;margin-left: 10px;font-size: 10px;">{{ Math.floor((Math.random() * 5000) + 100) }} Likes</text>
								
							</view>
<!-- 							<view style="margin-top: 10px;text-align: left;margin-left: 30rpx;">
								<text style="font-size: 12px;color: #4CD964;font-weight: 500;">Beef, Mushroom</text>
							</view> -->
						</view>
					</view>
				</u-col>

			</u-row>	
		</view>
		
		
		
		<!-- #ifdef APP-PLUS -->
		<u-tabbar :list="tabbar" :mid-button="false" height="55px"></u-tabbar>
		<!-- #endif -->
		
		<!-- #ifdef H5 -->
		<u-tabbar :list="tabbar" :mid-button="false"></u-tabbar>
		<!-- #endif -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tabbar: this.$store.state.tabbar,
				avatar:"",
				user:{},
				config:{
					title: '',
					color: 'black',
					backgroundColor: '#FFFFFF',
					back: false,
					backTxt: 'xxxxxx',
					statusBarBackground:'#FFFFFF',
					rightButton:[{
						key: 'scan',
						icon: '&#xe62c;',
						position: 'left'
					}],
					leftButton: [{
						key: 'text',
						icon: '&#xe62b;',
						txt: 'Track My Grocery',
						position: 'left'
					}],
				},
				item_box: [
					{
						'itemId':1,
						'title': 'Fridge Cleaning',
						'img': 'https://imgs.heartplan.cn/Fp11e_N392CzYKutu_3IsudIiM9R/preview',
						'name': 'Grilled Sweet Potatoes',
						'type':'Sweet Potatoes, Celery',
						'view': '50'
					},
					{
						'itemId':2,
						'title': 'Fridge Cleaning',
						'img': 'https://imgs.heartplan.cn/Fp11e_N392CzYKutu_3IsudIiM9R/preview',
						'name': 'Grilled Sweet Potatoes',
						'type':'Sweet Potatoes, Celery',
						'view': '50'
					}
				],
				expiringFoodList: [],
				randomRecipesList: [],
			}
		},
		onLoad(){
			let clientInfo = plus.push.getClientInfo();
			console.log('clientid ', clientInfo.clientid);
		},
		onShow(){
			this.loadinfo()
			this.getCol()
		},
		methods: {
			onClickBtn(e){
				console.log(e)
			},
			toDetail(e){
				console.log(e)
				uni.navigateTo({
					url: '../grocery/detail?id=' + e + '&backType=2'
				})
			},
			loadinfo(){
				uni.request({
				url: "http://101.35.91.117:7884/users/avatar/"+uni.getStorageSync('userId'),
				method: 'get',
				}).then(res=>{
					console.log('res',res)
					if(res[1].data!=''){
						this.avatar = res[1].data
					}else{
						this.avatar = "../../static/girl.png"
					}
				})
				
				uni.request({
				url: "http://101.35.91.117:7884/users/profile/"+uni.getStorageSync('userId'),
				method: 'get',
				}).then(res=>{
					console.log('load',res[1].data)
					this.user=res[1].data
					console.log('load',this.user.name)
					if(this.user.name==''|this.user.name==null){
						this.user.name="Unknow";
					}
					if(this.user.address=='None'|this.user.address==null){
						this.user.address="City, State, Country";
					}
				})
			},
			
			getCol(){
				
				// if (uni.getStorageSync('userId')){
					
				// }
				
				uni.request({
					url:'http://101.35.91.117:7884/item/user/'+uni.getStorageSync('userId')
				}).then(res => {
					console.log(res[1].data)
					this.updateItemList(res[1].data)
				})
			},
			
			updateItemList(foodList){
				let expiringFoodList = []
				for (var i=0;i<foodList.length;i++){
			        var item = foodList[i]
					var itemInfo = {
			            "addDate": item.addDate,
			            "addMethod": item.addMethod,
			            "category": item.category,
			            "conDate": item.conDate,
			            "detail": item.detail,
			            "expDate": item.expDate.substr(0,10),
			            "itemId": item.itemId,
			            "name": item.name,
			            "remindTime": item.remindTime,
			            "status": item.status,
						"time":this.iCitime,
			            "uid": uni.getStorageSync('userId'),
						"img": item.picture
					}
					if (foodList[i].status === 'instock'){
						expiringFoodList.push(itemInfo);
						console.log(item.remindTime);
					}					
				}
				expiringFoodList.sort(function(a, b){
				  let dateA = a.remindTime;
				  let dateB = b.remindTime;
				  if (dateA < dateB){
				    return -1;
				  } else if (dateA > dateB){
				    return 1;
				  }   
				  return 0;
				});

				console.log(expiringFoodList)
				this.expiringFoodList = expiringFoodList
				console.log(this.expiringFoodList)
			},
			getRandomRecipes(){
				uni.request({
				url: "http://101.35.91.117:7884/recipe/random",
				method: 'get',
				}).then(res=>{
					this.loadRecipe(res[1].data);
					this.$store.commit("setRecipe",res[1].data);
				})
			},
			loadRecipe(recipeList){
				let tmp = []
				let List = []
				for (var i=0;i<recipeList.length;i++){
				    var recipe = recipeList[i]
					var recipeInfo = {
					    "recipeId": recipe.id,
						'img': recipe.image,
						'name': recipe.title,
					};
					if (tmp.length == 2){
						List.push(tmp);
						tmp = [];
					}
					tmp.push(recipeInfo);
				}
				if (tmp.length !=0) {
					List.push(tmp);
				}
				this.randomRecipesList=List;
				console.log(this.randomRecipesList);
			}
		}
	}
</script>

<style>
.name{
	display: flex;
	flex-direction: column;
	text-align: left;
	margin-left: 15px;
}
.scroll_item{
  background: #f7edc8;
  width:100px; 
  height:100px; 
  margin: 5px 5px 5px 5px;
  border-radius: 25rpx;
  display: inline-block;
  margin-left: 10px;
  background-size: 100%;
}

.scroll_item_text {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 6px;
  font-size: 12px;
  color: white;
  font-weight: 800;
}
.card{
	display: flex;
	justify-content: center;
	align-items: center;
}
.card-box{
	background-color: white;
	width: 95%;
	height: 218px;
	border-radius: 10px;
	border:solid  1px #C8C7CC;
	text-align: center;
}
</style>
