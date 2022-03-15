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
						<u-grid :col="3" :border="false">
							<u-grid-item>
								<view class="grid-text ftn">{{userInfo.totalItemCount}}</view>
								<view class="grid-text">Added</view>
							</u-grid-item>
							<u-grid-item>
								<view class="grid-text ftn">{{userInfo.consumedItemCount}}</view>
								<view class="grid-text">Consumed</view>
							</u-grid-item>
							<u-grid-item>
								<view class="grid-text ftn">{{userInfo.expiredItemCount}}</view>
								<view class="grid-text">Expired</view>
							</u-grid-item>
						</u-grid>
					</view>
				</view>
			</view>
		</view>
		<view class="ncontent">
			<view class="like-card">
				<text style="text-align: left;margin-left: 15rpx; font-size: 30rpx;">Shopping List</text>
				
				<view  class="demo-layout bg-purple-light">
					<image src="../../static/refresh.png" style="width: 46rpx;height: 40rpx;display: inline-block; margin-right:10%; float:right" @click="refresh">
				</view>
				<view v-if="shopList.length==0" style="margin-top: 8%;">
					<text>No item added, please try add some item first.</text>
					<u-button shape="circle" style="background-color: #F5C979;color: white;width: 180rpx;" @click="goGrocery" >Add Item</u-button>
				</view>
				<scroll-view :scroll-with-animation="true"  :scroll-x="true" style="white-space: nowrap;" >
				  <template v-for="(item, index) in shopList">
					  <view class="scroll_item" :style="{'background-image': 'url('+item.picture+')'}">
						<view style="height: 20%;">								
							<u-button shape="circle" style="background-color: #FF0909;color: white; height: 60rpx; width: 110rpx; float:left; margin-left: 4%; margin-top: 4%;" @click="deleteItem(item.pid)" >Delete</u-button>
<!-- 							<image v-if="item.status=='potential'" src="../../static/heart-line.png" style="height: 80rpx; width: 80rpx; float:right;  margin-right: 6%; margin-top: 4%;" @click="save(item.pid)"></image>
							<image v-if="item.status=='save'" src="../../static/heart-fill.png" style="height: 80rpx; width: 80rpx; float:right;  margin-right: 6%; margin-top: 4%;" @click="unsave(item.pid)"></image> -->
							
						</view>
						<text style="color: #FFFFFF;margin-left: 4%;margin-right: 17%;font-size: 40rpx;font-weight: bold; text-stroke:2rpx #000000">{{ item.name }}</text>
						
						
					  </view>
				  </template>
				</scroll-view>
<!-- 				<text style="text-align: left;margin-left: 15rpx;">Weekly Potential Shopping List</text>
				
				<view>
					<image src="../../static/rou.png" class="like-img">
						
				</view>
				<view class="img-controller">
					<!-- <text>button and text hover</text> -->
					
<!-- 				</view> -->
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
	margin-top: 250rpx;
	border-radius: 10px;
	display: flex;
	justify-content: center;
	flex-direction: column;
	text-align: center;
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
	top: 110rpx;
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
