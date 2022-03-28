<template>
	<view>
		<view class = "container">
			<view class = "section">
				<text class = "title">Notification</text>
				<view class="divider"/>
				
				<view>
					<text class="name">Alert</text>
					<switch class="s" :checked="alertinfo.alert==1 ? 1:0" @change="switchA"/>
				</view>
				<view>
					<text class="name">Remind Time</text>
					<u-input style="width: 20%; margin-top: 5%; margin-left:15%; margin-right:4%;font-weight: 900;display: inline-block;background-color: #F3F1F1;border-radius: 10px;" placeholder="0" v-model="day" height="65" input-align="center" :clearable="false"/>
					<text style="margin-right: 4%; font-size: 18px;">days</text>
				</view>
				<view>
					<u-button style="background-color: #F5C979;color: white; height: 75rpx; %; margin-right:10%;width: 150rpx; margin-top: 10%;" @click="save">Save</u-button>
				</view>		
			</view>
			<view class = "section">
				<text  class = "title">Security</text>
				<view class="divider"/>
				<view style="text-align: left;width: 100%;">
					<view>
						<text class="n">Previous password</text>
						<u-input placeholder="previous password" v-model="ippwd" type="password"  class="end-input" height="10" input-align="center" :clearable="false"/>
					</view>
					
					<view>
						<text class="n">New password</text>
						<u-input placeholder="new password" v-model="inpwd" type="password"  class="end-input" height="10" input-align="center" :clearable="false"/>
					</view>
					
					<view>
						<text class="n">Verify password</text>
						<u-input placeholder="verify password" v-model="ivpwd" type="password"  class="end-input" height="10" input-align="center" :clearable="false"/>
					</view>
					
					<view >
						<u-button style="background-color: #F5C979; height: 75rpx; color: white; margin-right:10%;width: 240rpx; margin-top: 10%;" @click="change">Change password</u-button>
					</view>	
					<view class="feedbackButton">
						<u-button style="width: 310rpx;background-color: #443C34;color: white;margin-top: 30rpx;" @click="feedback()" >
							<image src="../../static/logout.png" style="width: 20px;height: 20px;"></image>
							<view style="width: 16rpx;"></view>
							Feedback
						</u-button>
					</view>
					<view class="logOutButton">	
						<u-button style="width: 310rpx;background-color: #443C34;color: white;margin-top: 30rpx; margin-right: 20rpx;" @click="logout">
							<image src="../../static/logout.png" style="width: 20px;height: 20px;"></image>
							<view style="width: 16rpx;"></view>
							Log out
						</u-button>
					</view>

				</view>
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
				day: "",
				ippwd:"",
				inpwd:"",
				ivpwd:"",
				alertinfo:{},
			}
		},
		onLoad(){
			
			this.update();
		},
		methods: {
			update(){
				let that=this
				uni.request({
				url: "http://101.35.91.117:7884/users/alert/"+uni.getStorageSync('userId'),
				method: 'get',
				}).then(res=>{
					console.log('load',res[1].data)
					this.$set(that.alertinfo,'alert',res[1].data)
				})
				
			},
			switchA(e){
				if(e.target.value){
					this.alertinfo.alert=1
				}else{
					this.alertinfo.alert=0
				}
				uni.request({
				url: "http://101.35.91.117:7884/users/alert/change/"+uni.getStorageSync('userId'),
				method: 'get',
				}).then(res=>{
					console.log('res',res)
				})
			},
			save(){
				
				if(this.day){
					let that = this
					uni.showModal({
					    title: 'Change all item remind time',
					    content: "Do you want to change all items' remind time?",
					    success: function (res) {
					        if (res.confirm) {
								console.log(that.day)
					            uni.request({
					            url: 'http://101.35.91.117:7884/item/update/all/'+uni.getStorageSync('userId')+'/'+that.day,
					            method: 'get',
					            }).then(res=>{
					            	console.log('res',res)
					            })
					        } if(res.cancel){
								
							}
					    }
					});
					
				}
			},
			change(){
				console.log(this.ivpwd)
				console.log(this.ippwd)
				if(this.ivpwd==this.inpwd){
					uni.request({
						url:'http://101.35.91.117:7884/users/reset/pwd',
						method:'POST',
						data:{
							'id':uni.getStorageSync('userId'),
							'newPwd':this.ivpwd,
							'prePwd':this.ippwd,
						},
						success:function(res){
							console.log(res.data)
							if(res.data==1){
								uni.showModal({
								    title: 'Change password successful',
									showCancel: false,
								    content: 'Your password has been changed',
								    success: function (res) {
								        if (res.confirm) {
								            console.log('confirm');
								        } 
								    }
								});
							}else{
								uni.showModal({
								    title: 'Change password failed',
									showCancel: false,
								    content: 'Please check with your original password',
								    success: function (res) {
								        if (res.confirm) {
								            console.log('confirm');
								        } 
								    }
								});
							}
						}
					})
				}else{
					uni.showModal({
					    title: 'Password not match',
						showCancel: false,
					    content: 'The verify password and new password should be same',
					    success: function (res) {
					        if (res.confirm) {
					            console.log('confirm');
					        } 
					    }
					});
				}
			},
			logout(){
			    uni.setStorageSync('userId', '')
			    uni.navigateTo({
			        url: "/pages/welcome/welcome"
			    })
			},
			feedback(){
				uni.navigateTo({
					url:"/pages/feedback/feedback"
				})
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
	margin-left: 5%;
	border-radius: 10px;
	display: flex;
	flex-direction: column;
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
.feedbackButton{
	float: left;
}
.logOutButton{
	float: right;
}
</style>
