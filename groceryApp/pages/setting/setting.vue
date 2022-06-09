<template>
	<view>
		<scroll-view :scroll-y="true" :style="{'height':getDeviceHeight()-70+'px'}" >
		
			<view class = "container">
				<view class = "section">
					<text class = "title">Notification</text>
					<view class="divider"/>
					
					<view>
						<text class="name">Alert</text>
						<switch class="s"  @change="switchA"/>
						<!-- :checked="alertinfo.alert==1 ? 1:0" -->
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
					<!-- <view style="text-align: left;width: 100%;"> -->
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
					<view>
						<u-button style="background-color: #F5C979; height: 75rpx; color: white; margin-right:10%;width: 240rpx; margin-top: 10%;" @click="change">Change password</u-button>
					</view>	
				</view>
				<view class = "section">
					<view class="divider"/>
					<u-row gutter = "3">
						<!-- <view class="feedbackButton"> -->
							<u-button style="width: 620rpx;background-color: #443C34;color: white;" @click="feedback()" >
								<!-- <image src="../../static/logout.png" style="width: 20px;height: 20px;"></image> -->
								<view style="width: 16rpx;"></view>
								Feedback
							</u-button>
						<!-- </view> -->
						<!-- <view class="DeleteAccountButton"> -->
							<u-button style="width: 620rpx;background-color: #443C34;color: white;margin-top: 30rpx;" @click="deleteVerify()">
								<!-- <image src="../../static/logout.png" 
										style="width: 20px;height: 20px;"></image> -->
								<view style="width: 16rpx;"></view>
								Delete Account
							</u-button>
						<!-- </view> -->
						<!-- <view class="logOutButton">	 -->
							<u-button style="width: 620rpx;background-color: #443C34;color: white;margin-top: 30rpx;" @click="logout()">
								<image src="../../static/logout.png" 
									style="width: 20px;height: 20px;"></image>
								<view style="width: 16rpx;"></view>
								Log out
							</u-button>
						<!-- </view> -->
					</u-row>
				</view>
			</view>
		</scroll-view>
		
		
		<hqs-popup v-model="deleteVer" :showClose="false" height="400px">
			<view class="d_acc">
				<text>Password</text>
				<u-input style="height:50px;"placeholder="Password" v-model="password"  type="password" class="fn-input" height="90" input-align="left" />
				<text>Verify Code</text>
				<div id="app" style="margin-top: 10px;height:50px;">
					<u-input style="width:80%;float:left;" placeholder="Verify Vode" v-model="vcode" class="fn-input" height="90" input-align="left"/>
					<u-button style="width:20%;float:left;margin-top: 0px;height:50px;background-color: #BDD7EF;border-color: #BDD7EF;" :hair-line="false" class="ctn-btn"  @click="sendcode2(10)" v-bind:disabled="disabledbtn">{{verifyBtnText}}</u-button>
				</div>
				<view style="margin-top: 30px;">
					<u-button shape="circle" style="width: 130px;background-color: #F5C979;border-color: #F5C979;" @click="deleteAcc()">Delete</u-button>
				</view>
			</view>
		</hqs-popup>
			
		<!-- #ifdef APP-PLUS
		<u-tabbar :list="tabbar" :mid-button="false" height="55px"></u-tabbar>
		#endif -->
		
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
				deleteVer: false, 
				verifyCode: "",
				vcode:"",
				password:"",
				disabledbtn: false,
				verifyBtnText:'verify',
				
			}
		},
		onLoad(){
			
			this.update();
		},
		methods: {
			update(){
				let that=this
				uni.request({
				url: "http://"+uni.getStorageSync('ip')+"/users/alert/"+uni.getStorageSync('userId'),
				method: 'get',
				}).then(res=>{
					// console.log('load',res[1].data)
					this.$set(that.alertinfo,'alert',res[1].data)
				})
				
			},
			getDeviceHeight(){
				let deviceInfo = uni.getSystemInfoSync();
				this.deviceHeight = deviceInfo.windowHeight;
				return this.deviceHeight
			},
			switchA(e){
				if(e.target.value){
					this.alertinfo.alert=1
				}else{
					this.alertinfo.alert=0
				}
				uni.request({
				url: "http://"+uni.getStorageSync('ip')+"/users/alert/change/"+uni.getStorageSync('userId'),
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
					            url: 'http://'+uni.getStorageSync('ip')+'/item/update/all/'+uni.getStorageSync('userId')+'/'+that.day,
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
						url:'http://'+uni.getStorageSync('ip')+'/users/reset/pwd',
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
			},
			deleteVerify(){
				// this.deleteVer = true;
				let that = this
				var email = uni.getStorageSync('email')
				console.log(email)
				uni.showModal({
				    title: 'Delete prompt',
				    content: 'Are you sure to delete the account?',
					confirmText: "Yes",
					cancelText: "No",
				    success(res) {
						if (res.confirm) {
							// console.log("ok")
							// console.log(uni.getStorageSync('email'))
							that.deleteVer = true;
						}
				    }
				});
				  // this.deleteVer = that
			},
			deleteAcc(){
				var that = this;
				if(this.password != null && this.password!= '' && this.vcode!=null && this.vcode !=''){
					uni.request({
						url:'http://'+uni.getStorageSync('ip')+'/users/login/normal',
						method:'POST',
						data:{
							'email':uni.getStorageSync('email'),
							'pwd': this.password
						},
						success:function(res){
							console.log(res)
							if(res.data!=-1){
								console.log(uni.getStorageSync('userId'))
								uni.request({
									url:'http://'+uni.getStorageSync('ip')+'/users/deleteUserAccount',
									method:'POST',
									data:{
										'uId':uni.getStorageSync('userId'),
										'email':uni.getStorageSync('email'),
										'verificationCode': that.vcode,
									},
									success:function(res){
										console.log(uni.getStorageSync('userId'))
										
										console.log(res)
										if(res.data == 1){
											uni.showToast({
												title: 'Delete account success',
												icon: 'none',
												duration:4000,
											})
											uni.navigateTo({
											    url: "/pages/welcome/welcome"
											})
										}else if(res.data == -3){
											uni.showToast({
												title: 'Sorry, the verify code is wrong',
												icon: 'none',
												duration:4000,
											})
										}else{
											uni.showToast({
												title: 'Sorry, fail to delete account ',
												icon: 'none',
												duration:4000,
											})
										}
								
									}
								})
							}else{
								uni.showToast({
									title: 'Sorry, your password is incorrect, please try again. ',
									icon: 'none',
									duration:4000,
								});
							}
						}
					})
				}else{
					uni.showToast({
						icon: "none",
						title: "information uncomplete",
					});
				}	
			},
			
			sendcode2: function(seconds,e) {
					this.disabledbtn=true
					this.verifyBtnText=seconds+'s'
					console.log()
					
					uni.request({
						url:'http://'+uni.getStorageSync('ip')+'/users/register/sendVerifyCode',
						method:'POST',
						data:{
							'email': uni.getStorageSync('email'),
						},
						success:function(res){
							console.log(res)
							if(res.data!=1){
								uni.showToast({
									icon: "none",
									title: "Email sending failed",
								});
							}else{
								uni.showToast({
									icon: "none",
									title: "Send verification code success",
								});
							}
						},
						fail:function(res){
							console.log(res.data);
						}
					})
					this.liveCountTimes=setInterval(()=>{
						if (seconds > 1){
							seconds--;
							this.verifyBtnText=seconds+'...'
						}else{
							clearInterval(this.liveCountTimes)
							this.verifyBtnText='verify'
							this.disabledbtn=false
						}
						},1000)
				// }
			},
		}
	}
</script>

<style>
page{
	background-color: #B0C07A;
}
.container{
	width: 90%;
	/* height: 95%; */
	background-color: white;
	margin-top: 7%;
	margin-left: 5%;
	border-radius: 10px;
	display: flex;
	flex-direction: column; 
	justify-content: center;
	padding: 10px 10px 10px 10px;
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
	 margin-bottom: 3%;
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
.DeleteAccountButtonP{
	float: left;
}
.logOutButton{
	float: left;
}
</style>
