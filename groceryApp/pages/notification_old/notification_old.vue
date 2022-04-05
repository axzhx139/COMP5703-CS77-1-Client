<template>
	<view>
		<view class="main-content">
			<view class="main-body">
				<view class = "section">
					<text style="font-size: 20px;font-weight: 800;color: #999999;">Hi,</text>
					<text style="margin-left: 1%; font-size: 28px;color: #000000;font-weight: 900;"> {{user.name}}</text>
				</view>
				<view class = "section">
					<text>You have {{expiring.length}} expiring items to remind! </text>
					
					<view class="demo-layout bg-purple-dark">
						<text> Check your consumption opions here! </text>
						<u-button style="background-color: #F5C979;color: white;width: 120rpx; margin-right: 6%;" @click="goRecipe"> Check</u-button>
					</view>
				</view>
				<u-notify message="Hi uView" :show="show"></u-notify>
				<text>aaa</text>
				<!-- <view class="stock-card">
					<view>
						<u-row gutter="16" justify="space-between">
							<u-col span="6">
								<view class="demo-layout bg-purple">
									<text style="font-weight: 900; ">Expiring  Products</text>
								</view>
							</u-col>
							<u-col span="5" style="text-align: right;">
								<view class="demo-layout bg-purple-light">

									
								</view>
							</u-col>
						</u-row>
					</view>
					<view style="margin-top: 5px;">
						<u-row gutter="16" justify="space-between">
							<u-col span="6">
								<view class="demo-layout bg-purple">
									<text>Item Name</text>
								</view>
							</u-col>
							<u-col span="6" style="text-align: right;">
								<view class="demo-layout bg-purple-light">
									<text >Expiring Date</text>
										
								</view>
							</u-col>
						</u-row>
					</view>
					<view style="margin-top: 5px; ">
						<block v-for="(item,index) in expiring">
							<view style="margin-top: 10px;">
								
								<u-row gutter="16">
									<u-col span="3">
										<view class="demo-layout bg-purple">
											<image :src="item.picture" style="width: 65px;height: 65px;">
										</view>
									</u-col>
									<u-col span="6">
										<view class="demo-layout bg-purple-light">
											<u-row gutter="18" justify="space-between">
											<text>{{ item.name }}</text>
											</u-row>
											<view>
												<u-row gutter="18" justify="space-between">
													<u-col span="4" style="text-align: left;">
													</u-col>
												</u-row>
												
												
											</view>
										</view>
									</u-col>
									<u-col span="3">
										<view class="demo-layout bg-purple-dark">
											<view class="demo-layout bg-purple">
												<text style="font-size: 24rpx;font-weight: 500;float:right;color: #AA4A44">{{item.expDate.substr(0,10)}}</text>
											</view>
										</view>
									</u-col>
								</u-row>
							</view>
							<u-divider half-width="60%"></u-divider>
						</block>
					</view>
				</view> -->
			</view>
			
						
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
				store: this.$store,
				tabbar: this.$store.state.tabbar,
				expiring:[],
				user:{},
				show: true,				
			}
		},
		onLoad(){
			this.getName()
			this.checkAlert()
			this.getExpiring()
			console.log("this.$store is: ", this.$store)
		},
		methods: {
			getName(){
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
				})
			},
			checkAlert(){
				uni.request({
				url: "http://101.35.91.117:7884/users/alert/"+uni.getStorageSync('userId'),
				method: 'get',
				}).then(res=>{
					console.log('load',res[1].data)
					if(res[1].data==0){
						uni.showModal({
							confirmText:"Setting",
							cancelText:"Cancel",
						    title: 'Alert turn off',
						    content: "Please turn on your notification in setting",
						    success: function (res) {
						        if (res.confirm) {
									uni.navigateTo({
										url:'../setting/setting'
									})
						        } if(res.cancel){
									uni.switchTab({
										url: '../home/home'
									});
								}
						    }
						});
					}
				})
			},
			
			getExpiring(){
				var date = JSON.stringify(new Date())
				// var month = date.getMonth() + 1;
				// var hours = date.getHours();
				// if (hours < 10)
				// 	hours = "0" + hours;
				// var minutes = date.getMinutes();
				// if (minutes < 10)
				// 	minutes = "0" + minutes;
				// var time = date.getFullYear() + "-" + month + "-" + date.getDate() +
				// 	" " + hours + ":" + minutes;
				// date = JSON.stringify(new Date())
				console.log(uni.getStorageSync('userId'))
				console.log(date)
				// let info = {
				// 	'itemId': uni.getStorageSync('userId'),
				// 	'remindDate': date,
				// }
				
				uni.request({
					// url:'http://101.35.91.117:7884/item/user/'+uni.getStorageSync('userId')
					url:'http://101.35.91.117:7884/item/remind',
					method:'POST',
					data:{
						'userId': uni.getStorageSync('userId'),
						'remindDate': new Date(),
					},
					header: {
					     "Content-Type": "application/json"
					},
				}).then(res => {
					console.log(res[1].data)
					this.expiring = res[1].data
					this.sortStockListByExpDate()
				})
			},
			sortStockListByExpDate(){
				// this function will sort the stocklist by the expire date of each item in ascending order
				// E.g. Apple expires at 2021/Dec/12, Orange expires at 2021/Nov/11, Tofu expires at 2021/Dec/31
				// the order after sort will be Orange -> Apple -> Tofu
				this.expiring.sort(function(a, b){
				  let dateA = a.expDate;
				  let dateB = b.expDate;
				  if (dateA < dateB){
				    return -1;
				  } else if (dateA > dateB){
				    return 1;
				  }   
				  return 0;
				});
			},
			goRecipe(){
				uni.switchTab({
					url: '../recipe/recipe'
				});
			}
			
		}
	}
</script>

<style>
page{
	background-color: #B0C07A;
}
.container{
	width: 90%;
	height: 1200rpx;
	background-color: white;
	margin-top: 7%;
	margin-left: 6%;
	border-radius: 10px;
	display: flex;
	flex-direction: column;
}
.stock-card{
	width: 90%;
	/* height: 300rpx; */
	padding: 10px 10px 10px 10px;
	background-color: #F5C979;
	margin-top: 50rpx;
	margin-left: 4%;
	margin-bottom: 50rpx;
	border-radius: 10px;
	display: flex;
	justify-content: center;
	flex-direction: column;
	text-align: center;
}
.section{
	margin-top: 5%;
	margin-left:3%;
	text-align: left;
}
.title{
	margin-top: 5%;
	font-size:25px;
	color: #32325D;
}
.divider{
	 background: #E0E3DA;
	 margin-top: 1%;
	 margin-bottom: 5%;
	 width: 95%;
	 height: 5rpx;
	}
.name{
	margin-top: 10%;
	font-size:20px;
	margin-left:4%;
}
.sec{
	margin-top: 40%;
	font-size:20px;
	margin-left:4%;
}
.s{
	margin-left:50%;
}
.n{
	margin-top: 10%;
	font-size:15px;
	margin-left:4%;
}
.main-content{
		display: flex;
		justify-content: center;
		text-align: center;
	}
.main-body{
	background-color: white;
	width: 90%;
	border-radius: 10px;
	text-align: center;
}

.end-input {
		display: flex;
		justify-content: center;
		align-items: center;
		background: #F4F4F4;
		border-radius: 4upx;
		width: 90%;
		height: 70upx;
		font-size: 28upx;
		line-height: 70upx;
		font-family: PingFang SC;
		font-weight: 500;
		margin-left: 4%;
		margin-right: 4%;
		color: #848484
}
</style>
