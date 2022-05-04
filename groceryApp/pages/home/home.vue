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
			<scroll-view  :scroll-x="true" style="white-space: nowrap;" >
			  <template v-for="(item, index) in expiringFoodList">
				  <view class="scroll_item" :style="{'background-image': 'url('+'http://101.35.91.117:7884/item/picture/'+item.itemId+')','filter': 'grayscale('+getFreshness(index)+'%)'}">
					<image src="../../static/knife_fork.png" style="width: 20px;height: 20px;float:right" @click="consumeSelect(index)"></image>

					<view style="height: 100%;"  @click="toDetail(item.itemId)">
							
				</view>
					<text style="margin-left: 14px;font-size: 16px;font-weight: 500;">{{ item.name }}</text>
					<view class="" style="margin-left: 14px;">
						<image src="../../static/remind.png" style="width: 15px;height: 15px;" v-if="isReminded(index)"></image>
						<text style="display: inline-block;margin-left: 5px;">{{getDate(item.expDate,'day')}}</text>
					</view>
				  </view>
				  
			  </template>
			  <template v-if="expiringFoodList.length==0">
			  				  <div style="height: 80px;width: 100%;text-align: center;margin-top: 20px;">(You have nothing in stock)</div>
			  				  <text style="margin-left: 14px;font-size: 16px;font-weight: 500;"> </text>
			  				  <view class="" style="margin-left: 14px;">
			  				  	<text style="display: inline-block;margin-left: 5px;"> </text>
			  				  </view>
			  </template>
			</scroll-view>
		</view>

		
		<view class="ncontent">
			<view class="like-card">
				<view>
					<u-row gutter="16" justify="space-between">
						<u-col span="9">
							<view class="demo-layout bg-purple">
								<text style="font-size: 16px;font-weight: 500;">Shopping list</text>
							</view>
						</u-col>
						<u-col span="3">
							<view class="demo-layout bg-purple-light"  @click="refresh" style="text-align: right;">
								<image src="../../static/refresh.png" style="width: 25px;height: 20px;display: inline-block;">
							</view>
						</u-col>
					</u-row>	
				</view>
				<scroll-view :scroll-y="true" :style="{'height':getScrollHeight()+'px'}"  >
					<view style="margin-top:20px;">
						<text v-if="shopList.length==0" style="font-size: 16px;font-weight: 500;">( Nothing in shopping list )</text>
					</view>
					
					<block v-for="(item,index) in shopList" class="scroll_item">
						<view style="margin-top: 10px;" >
							
							<u-row gutter="16">
								<u-col span="2">
										<image :src="'http://101.35.91.117:7884/item/picture/'+item.itemId+'?'+Math.random()" style="width: 35px;height: 35px;">
								</u-col>
								<u-col span="7">
									<u-row style="margin: 0px 0px 10px 5px;">{{ item.name }}</u-row>
								</u-col>
								<u-col span="3">
										<u-row style="justify-content: flex-end; margin-bottom: 5px">
											<image src="../../static/add2.png" style="height:40rpx; width: 40rpx; float:right;  margin-right: 10px" @click="addToStock(item)"></image>
											
											<image src="../../static/delete.png" style="height: 45rpx; width: 45rpx; float:right;  " @click="deletePotential(item.pid)"></image>
										<!-- </view>	 -->
										</u-row>
								</u-col>
							</u-row>
						</view>
						<u-divider half-width="60%"></u-divider>
					</block>
				</scroll-view>
			</view>
		</view>
		
		
		<hqs-popup  title="" :from="popFrom" v-model="consumePop" :round="20" :showClose="false" height="300px">
			<view class="t-bg">
				<text style="font-size: 20px;font-weight: 900;">Have you consumed already?</text>
				<view class="sm-ipbox">
					<!-- <text>-</text> -->
					<!-- <view style="margin-top: 10px;font-size: 20px;margin-right: 15px;" @click=" packs-= 1">-</view>
					<u-input style="font-weight: 900;display: inline-block;background-color: #F3F1F1;border-radius: 10px;" placeholder="Amount" v-model="packs"  class="fn-input" height="90" input-align="center"/>
					<view class="sum-item" @click=" packs+= 1">+</view> -->
				</view>
				<view style="margin-top: 30px;">
					<u-button shape="circle" :hair-line="false" style="width: 130px;background-color: #F5C979;border-color: #F5C979;" @click="consume('yes')">Yes</u-button>
					<u-button shape="circle" :hair-line="false" style="width: 130px;background-color: #F5C979;border-color: #F5C979;margin-top: 10px;" @click="consume('no')">No</u-button>
				</view>
			</view>
		</hqs-popup>
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
						key: 'notification',
						icon: '&#xE61E;',
						position: 'right'
					}],
					leftButton: [{
						key: 'text',
						icon: '&#xe680;',
						txt: '\xa0\xa0\xa0Track My Grocery',
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
				consumePop:false,
				needChangeItem: '',
				popFrom: 'bottom',
				notificationData: '',
				shopList:[],
				deviceHeight:0,
			}
		},
		onLoad(){
			// let clientInfo = plus.push.getClientInfo();
			// console.log('clientid ', clientInfo.clientid);
			let deviceInfo = uni.getSystemInfoSync();
			this.deviceHeight = deviceInfo.windowHeight;
			Location.reload;
			// this.$refs.popup.open('center')
		},
		onShow(){
			// this.loadinfo()
			// this.getCol()
			this.loadinfo()
			this.getCol()
			this.getShoppingList()
			this.getNotificationData()
			// this.getShoppingList()
		},
		methods: {
			getScrollHeight(){
				let deviceInfo = uni.getSystemInfoSync();
				this.deviceHeight = deviceInfo.windowHeight;
				return this.deviceHeight-500
			},
			onClickBtn(e){
				if (e.key == 'notification'){
					let notificationDataString = encodeURIComponent(JSON.stringify(this.notificationData))
					uni.navigateTo({
					url: '../notification/notification?notificationDataString=' + notificationDataString
				})
				}
			},
			getDate(time,type){
				var dt = new Date(time)
				var year = dt.getFullYear();
				var month = dt.getMonth()+1;
				var day = dt.getDate();
				var hour = dt.getHours();
				var minut = dt.getMinutes();
				var second = dt.getSeconds();
				month =  month < 10 ? "0"+month : month;
				day =  day < 10 ? "0"+day : day;
				hour =  hour < 10 ? "0"+hour : hour;
				minut =  minut < 10 ? "0"+minut : minut;
				second =  second < 10 ? "0"+second : second;
				if(type=='min')
					var res = day+'-'+month+'-'+year+' '+hour+':'+minut
				else if(type='day')
					var res = day+'/'+month
				return res
			},
			toDetail(e){
				console.log(e)
				uni.navigateTo({
					url: '../grocery/detail?id=' + e + '&backType=2'
				})
			},
			getShoppingList(){
				uni.request({
				url: "http://101.35.91.117:7884/potential/"+uni.getStorageSync('userId'),
				method: 'get',
				}).then(res=>{
					console.log('load',res[1].data)
					this.shopList = res[1].data
				})
			},
			consumeSelect(e){
				console.log(e)
				this.consumePop = true
				this.needChangeItem = e
				
			},
			isReminded(e){
				// console.log(new Date(this.expiringFoodList[e].remindTime))
				
				var now = new Date()
				// console.log(now)
				if(new Date(this.expiringFoodList[e].remindTime)>new Date()){
					return false
				}else{
					return true
				}
			},
			getFreshness(e){
				// console.log(this.expiringFoodList[e].addDate)
				// console.log(this.expiringFoodList[e].expDate)
				const totalTime = new Date(this.expiringFoodList[e].expDate)-new Date(this.expiringFoodList[e].addDate)
				const restTime = new Date(this.expiringFoodList[e].expDate)-new Date()
				// console.log(restTime/totalTime)
				return (1-restTime/totalTime)*100
			},
			consume(e){
				if (e === 'yes'){
					var changedItem = this.expiringFoodList[this.needChangeItem]
					// var lsConsumeTime = new Date().toLocaleDateString().split("/");
					// //China Timezone needed
					// // if(lsConsumeTime[2].length === 1){
					// //     lsConsumeTime[2] = "0" + lsConsumeTime[2]
					// // }
					// //Australian Timezone needed
					// if(lsConsumeTime[1].length === 1){
					// 	lsConsumeTime[1] = "0" + lsConsumeTime[1]
					// }
					// var consumeTime = lsConsumeTime[2]+"-"+lsConsumeTime[0]+"-"+lsConsumeTime[1]
					this.consumeItem(changedItem)
					console.log(changedItem)
					console.log(changedItem.itemId)
					uni.request({
						url: 'http://101.35.91.117:7884/item/update/status/'+"consume"+"/id/"+changedItem.itemId,
					}).then(res => {
						this.getCol()
						console.log(res[1])
					})
			        
				}
				this.consumePop = false
				
			},
			consumeItem(item){
				let itemUpdated = {
				  "addDate": item.addDate,
				  "addMethod": item.addMethod,
				  "category": item.category,
				  "conDate": new Date(),
				  "detail": item.detail,
				  "expDate": item.expDate,
				  "itemId": item.itemId,
				  "name": item.name,
				  "remindTime": item.remindTime,
				  "status": "consume",
				}
				console.log(JSON.stringify(itemUpdated))
				uni.request({
					method:'POST',
					url:'http://101.35.91.117:7884/item/update',
					data:JSON.stringify(itemUpdated)
				}).then(res => {
					console.log(res)
					// this.getCol()
					
				})
			},
			loadinfo(){
				// uni.request({
				// url: "http://101.35.91.117:7884/users/avatar/"+uni.getStorageSync('userId'),
				// method: 'get',
				// }).then(res=>{
				// 	console.log('res',res)
				// 	if(res[1].data!=''){
				// 		this.avatar = res[1].data
				// 	}else{
				// 		this.avatar = "../../static/girl.png"
				// 	}
				// })
				
				this.avatar="http://101.35.91.117:7884/users/avatar/"+uni.getStorageSync('userId');
				if(this.avatar==''){
					this.avatar = "../../static/girl.png"
				};
				uni.request({
				url: "http://101.35.91.117:7884/users/profile/"+uni.getStorageSync('userId'),
				method: 'get',
				}).then(res=>{
					// console.log('load',res[1].data)
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
						// console.log(item.remindTime);
					}					
				}
				expiringFoodList.sort(function(a, b){
				  let dateA = a.remindTime;
				  let dateB = b.remindTime;
				  if (dateA < dateB){
				    return -1;
				  } else if (dateA > dateB){
				    return 1;
				  }else{
					  if( a.expDate<b.expDate){
						  return -1
					  }else{
						  return 1
					  }
				  }
				  return 0;
				});

				// console.log(expiringFoodList)
				this.expiringFoodList = expiringFoodList
				// console.log(this.expiringFoodList)
			},
			getNotificationData() {
				uni.request({
				url: "http://101.35.91.117:7884/notification/get/"+uni.getStorageSync('userId'),
				method: 'get',
				}).then(res=>{
					console.log(res)
					console.log('res[1].data', res[1].data)
					// this.shopList = res[1].data
					var resData = res[1].data
					this.notificationData = resData.itemNotificationList
					if (resData.unreadNum > 0) {
						// uni.showToast({
						// 	title: "You have " + resData.unreadNum + " messages unread!",
						// 	icon: 'success',
						// 	duration: 2000,
						// });
						try {
							var notificationCount = uni.getStorageSync("NotificationCount")
						} catch (error) {
							console.log("error is :", error)
							var notificationCount = 1
							uni.setStorageSync("NotificationCount", notificationCount)
							// uni.setStorage({key: "NotificationCount",
							// 				data: notificationCount})
						}
						console.log(notificationCount == "")
						if (notificationCount == "") {
							var notificationCount = 1
							uni.setStorageSync("NotificationCount", notificationCount)
						} else {
							uni.setStorageSync("NotificationCount", notificationCount + 1)
						}
						console.log("notificationCount is: ", notificationCount)
						if (notificationCount == 1) {
							uni.showModal({
								title: "Notification",
								content: "You have " + resData.unreadNum + " messages unread!",
								showCancel: false,
								success: function (res) {
									if (res.confirm) {
										console.log('用户点击确定');
									} else if (res.cancel) {
										console.log('用户点击取消');
									}
								}
							})
						}
						
					}
				})
			},
			popNotification() {
				
			},
			addToStock(item){
				uni.setStorage({
					key: 'addToStock',
					data: {'iName':item.name,'iId':item.itemId,'iPicture':item.picture,'iCategory':item.category},
					success: function () {
						uni.switchTab({
							url:'../grocery/grocery'
						})
					}
				});
			},
			refresh(){
				let that = this
				// uni.showLoading({title: 'refreshing',mask:true});
				uni.showModal({
				    title: 'Notice',
				    content: 'Are you sure to clear the shopping list?',
				    success: function (res) {
				        if (res.confirm) {
				            uni.request({
				            url: "http://101.35.91.117:7884/potential/deleteAll/"+uni.getStorageSync('userId'),
				            method: 'get',
				            }).then(res=>{
				            	console.log('load',res[1].data)
				            	// setTimeout(function () {uni.hideLoading();}, 500);
				            	that.getShoppingList();
				            })
				        } else if (res.cancel) {
							
				        }
				    }
				});
				
			},
			deletePotential(pid){
				let that = this
				uni.showModal({
				    title: 'Notice',
				    content: 'Do you want to remove this from  shopping list?',
				    success: function (res) {
				        if (res.confirm) {
				            uni.request({
				            url: "http://101.35.91.117:7884/potential/delete/"+pid,
				            method: 'get',
				            }).then(res=>{
				            	// setTimeout(function () {uni.hideLoading();}, 500);
				            	that.getShoppingList();
				            })
				        } else if (res.cancel) {
							
				        }
				    }
				});
				
				// uni.showLoading({title: 'refreshing',mask:true});
				
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
  filter:gray;
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
.t-bg{
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
}
.ncontent{
	display: flex;
	width: 100%;
	justify-content: center;
	
}
.like-card{
	width: 90%;
	background-color: #f3f3f3;
	margin-top: 20px;
	border-radius: 10px;
	display: flex;
	flex-direction: column;
	text-align: center;
	padding:10px 20px 0 20px;
}
</style>
