<template>
	<view>
		<view class="content" >
			<view class="head-img"><u-image :src="avatar" shape="circle" width="250" height="250"></u-image></view>
			<view class="info-card " >
				<view class="edit-btn">
					<u-row gutter="20">
						<u-col span="5">
							<view class="demo-layout bg-purple"></view>
						</u-col>
						<u-col span="4">
							<view class="demo-layout bg-purple-light"></view>
						</u-col>
						<u-col span="3">
							<view class="demo-layout bg-purple-dark">
								<u-button shape="circle" style="background-color: #F5C979;color: white;width: 120rpx;" @click="goEdit" >Edit</u-button>
							</view>
						</u-col>
					</u-row>
					
				</view>
				<text class="us-name">{{userInfo.name}}</text>
				<view style="height: 30rpx;"></view>
				<view class="more-info">
					<u-row gutter="20" justify="center">
						<u-col span="4" style="text-align: center;">
							<view class="demo-layout bg-purple" >
								<image v-if="userInfo.gender==0"src="../../static/man-ico.png" style="width: 20px;height: 20px;">
								<image v-else-if="userInfo.gender==1"src="../../static/man.png" style="width: 20px;height: 20px;">
								<image v-else-if="userInfo.gender=2"src="../../static/neutral.png" style="width: 20px;height: 20px;">
								<image v-else-if="userInfo.gender==3"src="../../static/neutral.png" style="width: 20px;height: 20px;">
							</view>
						</u-col>
						<u-col style="text-align: center;">
							<view class="demo-layout bg-purple-light" >
								<text>{{userInfo.address}}</text>
							</view>
						</u-col>
						<u-col span="3">
							<view class="demo-layout bg-purple-dark">
							</view>
						</u-col>
					</u-row>
					<view style="text-align: center;">
						<!-- <text>25</text> -->
					</view>
					<view>
						<u-divider half-width="60%"></u-divider>
					</view>
					<view style="margin-top: 20rpx;">
						<u-grid :col="3" :border="false" >
							<u-grid-item @click="clickGrid('instock')">
								<view class="grid-text ftn">{{userInfo.instockItemCount}}</view>
								<view class="grid-text">Instock</view>
							</u-grid-item>
							<u-grid-item @click="clickGrid('consumed')">
								<view class="grid-text ftn">{{userInfo.consumedItemCount}}</view>
								<view class="grid-text">Consumed</view>
							</u-grid-item>
							<u-grid-item @click="clickGrid('expired')">
								<view class="grid-text ftn">{{userInfo.expiredItemCount}}</view>
								<view class="grid-text">Expired</view>
							</u-grid-item>
						</u-grid>
					</view>
				</view>
			</view>
		</view>
		<view class="content">
			<view class="rank-card"  @click='goRanking'>
				<!-- <view style="margin-top: 20rpx;"> -->
							<view class="rank-block" >
								<view style="font-weight: 700;">Days</view>
								<view style="margin-top: 10px;font-size: 25px;font-weight: 900;font-family: 'Lucida Calligraphy'">25</view>
							</view>
							<view class="rank-block" >
								<view style="font-weight: 700;">Ranking</view>
								<view style="margin-top: 10px;font-size: 25px;font-weight: 900;font-family: 'Lucida Calligraphy'">3</view>
							</view>
				<!-- </view> -->
			</view>
		</view>
		<view class="ncontent">
			<view>
				<u-button style="width: 400rpx;background-color: #443C34;color: white;margin-top: 30rpx;" @click="goSetting">
					<image src="../../static/setting.png" style="width: 20px;height: 20px;"></image>
					<view style="width: 16rpx;"></view>
					Setting
				</u-button>
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
				tabbar: this.$store.state.tabbar,
				deviceHeight: '',
				userInfo:{},
				avatar:'',
				shopList:[],
			}
		},
		onLoad() {
			// let deviceInfo = uni.getSystemInfoSync();
			// this.deviceHeight = deviceInfo.windowHeight;
			// Location.reload;
			this.loadInfo();
		},
		onShow(){
			this.loadInfo();
		},
		methods: {
			getList(){
				uni.request({
				url: "http://101.35.91.117:7884/potential/"+uni.getStorageSync('userId'),
				method: 'get',
				}).then(res=>{
					console.log('load',res[1].data)
					this.shopList = res[1].data
				})
			},
			clickGrid(e){
				console.log(e)
				if(e=='instock'){
					uni.switchTab({
						url:'../grocery/grocery'
					})
				}else{
					uni.setStorage({
						key: 'goToHistoty',
						data: e,
						success: function () {
							uni.switchTab({
								url:'../grocery/grocery'
							})
						}
					});
				}
			},
			refresh(){
				uni.showLoading({title: 'refreshing',mask:true});
				uni.request({
				url: "http://101.35.91.117:7884/potential/update/"+uni.getStorageSync('userId'),
				method: 'get',
				}).then(res=>{
					console.log('load',res[1].data)
					setTimeout(function () {uni.hideLoading();}, 500);
					this.getList();
				})
			},
			logoutAction(){
                uni.setStorageSync('userId', '')
                uni.navigateTo({
                    url: "/pages/welcome/welcome"
                })
            },
			goSetting(){
				uni.navigateTo({
					url:'../setting/setting'
				})
			},
			goEdit(){
				uni.navigateTo({
					url:'../edit/edit'
				})
			},
			deleteItem(id){
				uni.request({
					
				url: "http://101.35.91.117:7884/potential/delete/"+id,
				method: 'get',
				}).then(res=>{
					console.log('load',res[1].data)
					this.getList()
				})
			},
			save(id){
				uni.request({
				url: "http://101.35.91.117:7884/potential/update/status/save/"+id,
				method: 'get',
				}).then(res=>{
					console.log('load',res[1].data)
					this.getList()
				})
			},
			unsave(id){
				uni.request({
				url: "http://101.35.91.117:7884/potential/update/status/potential/"+id,
				method: 'get',
				}).then(res=>{
					console.log('load',res[1].data)
					this.getList()
				})
			},
			loadInfo(){
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
				this.avatar="http://101.35.91.117:7884/users/avatar/"+uni.getStorageSync('userId')+'?'+Math.random()
				if(this.avatar==''){
					this.avatar = "../../static/girl.png"
				}
				uni.request({
				url: "http://101.35.91.117:7884/users/profile/"+uni.getStorageSync('userId'),
				method: 'get',
				}).then(res=>{
					console.log('load',res[1].data)
					this.userInfo=res[1].data
					console.log('load',this.userInfo.name)
					if(this.userInfo.name==''|this.userInfo.name==null){
						this.userInfo.name="Unknow";
					}
					if(this.userInfo.address=='None'|this.userInfo.address==null){
						this.userInfo.address="City, State, Country";
					}
				})
				this.getList()
			},
			goGrocery(){
				uni.switchTab({
					url: "../grocery/grocery"
				});
			},
			goRanking(){
				uni.navigateTo({
					url:'../profile/ranking'
				})
			},
            
		},			
	}
</script>

<style>
page{
	background-color: #B0C07A;
}
.content{
	display: flex;
	width: 100%;
	justify-content: center;
	/* flex-direction: column; */
	text-align: center;
}
.info-card{
	width: 90%;
	height: 500rpx;
	background-color: white;
	margin-top: 200rpx;
	border-radius: 10px;
	display: flex;
	justify-content: center;
	flex-direction: column;
	text-align: center;
	box-shadow:2px 2px 10px #909090
}
.rank-card{
	width: 90%;
	background-color: #B0C07A;
	background:#B0C07A;
	margin-top: 20rpx;
	border-radius: 10px;
	display: flex;
}
.rank-block{
	float:left;
	width: 100%;
	height: 180rpx;
	background-color: #f2f3d5;
	margin-top: 20rpx;
	border-radius: 10px;
	display: flex;
	justify-content: center;
	flex-direction: column;
	text-align: center;
	box-shadow:2px 2px 10px #909090
}
.us-name{
	/* margin-top: -100rpx; */
	font-size: 30px;
	font-weight: 700;
}
.head-img{
	width: 250rpx;
	height: 250rpx;
	position: absolute;
	top: 60rpx;
}
.edit-btn{
/* 	position: absolute;
	right: 60rpx; */
	margin-top: -10rpx;
}
.more-info{
	margin-top: 10rpx;
	width: 100%;
}
.ftn{
	font-weight: 900;
	font-size: 15px;
}
.ncontent{
	display: flex;
	width: 100%;
	justify-content: center;
}
.like-card{
	width: 90%;
	height: 320rpx;
	background-color: white;
	margin-top: 30rpx;
	border-radius: 10px;
	display: flex;
	justify-content: center;
	flex-direction: column;
	text-align: center;
}
.like-img{
	height: 124px;
}
.img-controller{
	position: absolute;

}
.scroll_item{
  width:90%; 
  height:116px; 
  margin: 5px 5px 5px 5px;
  border-radius: 10rpx;
  display: inline-block;
  margin-left: 10px;
  background-size: 100%;
  opacity:0.6; filter: alpha(opacity=60);
  background: #3F536E;
  
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
.dim{
  opacity:0.6; filter: alpha(opacity=60);
}

</style>
