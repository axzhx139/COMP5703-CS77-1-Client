<template>
	<view class="content">
		<view class="t-bg">
			<view class="v-logo" :style="{'height': deviceHeight/2 + 'px'}">
				<image class="logo-img" src="../../static/logo.png"></image>
				<image style="width: 301px;height: 12px;margin-top: 30px;" src="../../static/logo-b.png"></image>
			</view>
			<view class="welcome">
				<view class="t-bg">
					<text class="w-text" style="margin-right: auto;margin-right: 110px;">What is your firstname?</text>
					<u-input placeholder="Write your firstName" v-model="value" :type="type" :border="border" class="fn-input" height="90" input-align="center"/>
				</view>
				<u-button style="background-color: #F5C979;border-color: #F5C979;" :hair-line="false" class="ctn-btn" @click="next" >Continue</u-button>
			</view>
			<hqs-popup title="" v-model="showPopup" :round="round" :showClose="false" :height="loginPopHeight + 'px'">
			    <view class="t-bg">
					<text style="margin-right: auto;margin-left: 30px;font-size: 25px;font-weight: 900" >Sign up</text>
					<u-input placeholder="example@example.com" v-model="email" :type="type" :border="border" class="fn-input" height="90" input-align="center"/>
					<u-button style="margin-top: 30px;background-color: #F5C979;border-color: #F5C979;" :hair-line="false" class="ctn-btn" @click="registerWithEmail" >Sign up with Email</u-button>
					<text style="margin-top: 25px;text-decoration:underline" @click="toLogin">Log in</text>
					<text style="margin-top: 5px;color: #828282;" >Or connect with social media</text>
					<u-button style="margin-top: 30px;background-color: #5383EC;border-color: #5383EC;color: white;" :hair-line="false" class="ctn-btn" @click="google_start_login" >
							<image src="../../static/google-icon.png" style="width: 20px;height: 20px;"></image>
							<view style="width: 10px;"></view>
							<text>Continue with Google</text>
					</u-button>
					<u-button style="margin-top: 10px;background-color: #4A66AC;border-color: #4A66AC;color: white;" :hair-line="false" class="ctn-btn" @click="facebook_login" >
						<image src="../../static/facebook-icon.png" style="width: 10px;height: 20px;margin-left: 17px;"></image>
						<view style="width: 16px;"></view>
						Continue with Facebook
					</u-button>
				</view>
			</hqs-popup>
			
			
			
			<hqs-popup title="" :from="popFrom" v-model="showLoginPopup" :round="round" :showClose="false" :height="loginPopHeight + 'px'">
			    <view class="t-bg">
					<text style="margin-right: auto;margin-left: 30px;font-size: 25px;font-weight: 900" >Log in</text>
					<u-input placeholder="example@example.com" v-model="loginemail" :type="type" :border="border" class="fn-input" height="90" input-align="center"/>
					<u-input style="margin-top: 10px;" placeholder="Password" v-model="pwd"  type="password" :border="border" class="fn-input" height="90" input-align="center"/>
					<u-button style="margin-top: 30px;background-color: #F5C979;border-color: #F5C979;" :hair-line="false" class="ctn-btn" @click="loginAction" >Log in</u-button>
					<view style="width: 100%;margin-top: 30px;">
						<u-row gutter="" justify="space-around">
									<u-col span="6">
										<view class="" style="text-align: center;text-decoration:underline">Forget password?</view>
									</u-col>
									<u-col span="3">
										<view class="" style="text-align: center;text-decoration:underline" @click="toSignUp">Sign up</view>
									</u-col>
								</u-row>
					</view>
					<u-button style="margin-top: 20px;background-color: #5383EC;border-color: #5383EC;color: white;" :hair-line="false" class="ctn-btn" @click="google_start_login" >
							<image src="../../static/google-icon.png" style="width: 20px;height: 20px;"></image>
							<view style="width: 10px;"></view>
							<text>Continue with Google</text>
					</u-button>
					<u-button style="margin-top: 10px;background-color: #4A66AC;border-color: #4A66AC;color: white;" :hair-line="false" class="ctn-btn" @click="facebook_login" >
						<image src="../../static/facebook-icon.png" style="width: 10px;height: 20px;margin-left: 17px;"></image>
						<view style="width: 16px;"></view>
						Continue with Facebook
					</u-button>
				</view>
			</hqs-popup>
			
			<hqs-popup title="" :from="popFrom" v-model="showFacebookLoginPopup" :round="round" :showClose="false" :height="loginPopHeight + 'px'">
				<view class="t-bg">
					<text style="margin-right: auto;margin-left: 30px;font-size: 25px;font-weight: 900" >Log in</text>
					<u-input placeholder="facebook@example.com" v-model="email" :type="type" :border="border" class="fn-input" height="90" input-align="center"/>
					<u-input style="margin-top: 10px;" placeholder="Password" v-model="pwd" type="password" :border="border" class="fn-input" height="90" input-align="center"/>
					<u-button style="margin-top: 30px;background-color: #F5C979;border-color: #F5C979;" :hair-line="false" class="ctn-btn" @click="loginAction" >Log in</u-button>
					<view style="width: 100%;margin-top: 30px;">
						<u-row gutter="" justify="space-around">
									<u-col span="6">
										<view class="" style="text-align: center;text-decoration:underline">Forget password?</view>
									</u-col>
									<u-col span="3">
										<view class="" style="text-align: center;text-decoration:underline" @click="toSignUp">Sign up</view>
									</u-col>
								</u-row>
					</view>
					<u-button style="margin-top: 20px;background-color: #5383EC;border-color: #5383EC;color: white;" :hair-line="false" class="ctn-btn" @click="google_start_login" >
							<image src="../../static/google-icon.png" style="width: 20px;height: 20px;"></image>
							<view style="width: 10px;"></view>
							<text>Continue with Google</text>
					</u-button>
					<u-button style="margin-top: 10px;background-color: #4A66AC;border-color: #4A66AC;color: white;" :hair-line="false" class="ctn-btn" @click="facebook_login" >
						<image src="../../static/facebook-icon.png" style="width: 10px;height: 20px;margin-left: 17px;"></image>
						<view style="width: 16px;"></view>
						Continue with Facebook
					</u-button>
				</view>
			</hqs-popup>
			
			<hqs-popup title="" :from="popFrom" v-model="showGoogleLoginPopup" :round="round" :showClose="false" :height="loginPopHeight + 'px'">
				<view class="t-bg">
					<text style="margin-right: auto;margin-left: 30px;font-size: 25px;font-weight: 900" >Log in</text>
					<u-input placeholder="google@example.com" v-model="email" :type="type" :border="border" class="fn-input" height="90" input-align="center"/>
					<u-input style="margin-top: 10px;" placeholder="Password" v-model="pwd" type="password" :border="border" class="fn-input" height="90" input-align="center"/>
					<u-button style="margin-top: 30px;background-color: #F5C979;border-color: #F5C979;" :hair-line="false" class="ctn-btn" @click="loginAction" >Log in</u-button>
					<view style="width: 100%;margin-top: 30px;">
						<u-row gutter="" justify="space-around">
									<u-col span="6">
										<view class="" style="text-align: center;text-decoration:underline">Forget password?</view>
									</u-col>
									<u-col span="3">
										<view class="" style="text-align: center;text-decoration:underline" @click="toSignUp">Sign up</view>
									</u-col>
								</u-row>
					</view>
					<u-button style="margin-top: 20px;background-color: #5383EC;border-color: #5383EC;color: white;" :hair-line="false" class="ctn-btn" @click="google_start_login" >
							<image src="../../static/google-icon.png" style="width: 20px;height: 20px;"></image>
							<view style="width: 10px;"></view>
							<text>Continue with Google</text>
					</u-button>
					<u-button style="margin-top: 10px;background-color: #4A66AC;border-color: #4A66AC;color: white;" :hair-line="false" class="ctn-btn" @click="facebook_login" >
						<image src="../../static/facebook-icon.png" style="width: 10px;height: 20px;margin-left: 17px;"></image>
						<view style="width: 16px;"></view>
						Continue with Facebook
					</u-button>
				</view>
			</hqs-popup>
		
			
			<hqs-popup  :showBack="true" title="" :from="popFrom" v-model="confirmPwd" :round="round" :showClose="false" :height="loginPopHeight + 'px'">
			    <view class="t-bg">
					<text style="margin-right: auto;margin-left: 30px;font-size: 25px;font-weight: 900" >Sign up with email</text>
					<u-input placeholder="password" v-model="password" type="password" :border="border" class="fn-input" height="90" input-align="center"/>
					<u-input style="margin-top: 10px;" placeholder="confirmed password" v-model="confirm" type="password" :border="border" class="fn-input" height="90" input-align="center"/>
					<u-button style="margin-top: 30px;background-color: #F5C979;border-color: #F5C979;" :hair-line="false" class="ctn-btn" @click="SignupAction" >Sign up</u-button>
					<view style="width: 100%;margin-top: 30px;">
						<u-row gutter="" justify="space-around">
							<u-col span="6">
								<view class="" style="text-align: center;text-decoration:underline">Forget password?</view>
							</u-col>
							<u-col span="3">
								<view class="" style="text-align: center;text-decoration:underline" @click="toLogin()">Log in</view>
							</u-col>
						</u-row>
					</view>
					<u-button style="margin-top: 20px;background-color: #5383EC;border-color: #5383EC;color: white;" :hair-line="false" class="ctn-btn" @click="google_start_login" >
							<image src="../../static/google-icon.png" style="width: 20px;height: 20px;"></image>
							<view style="width: 10px;"></view>
							<text>Continue with Google</text>
					</u-button>
					<u-button style="margin-top: 10px;background-color: #4A66AC;border-color: #4A66AC;color: white;" :hair-line="false" class="ctn-btn" @click="facebook_login" >
						<image src="../../static/facebook-icon.png" style="width: 10px;height: 20px;margin-left: 17px;"></image>
						<view style="width: 16px;"></view>
						<text>Continue with Facebook</text>
					</u-button>
				</view>
			</hqs-popup>
		</view>
	</view>
	
</template>

<script>
	// add up for facebook login section 1 start
	var facebook = uni.requireNativePlugin("sn-facebook");
	// add up for facebook login section 1 end
	
	// google section 1 start
	const JYGoogleSignin = uni.requireNativePlugin('JY-GoogleSignin');
	// google section 1 end
	export default {
		data() {
			return {
				title: 'Hello',
				deviceHeight: '',
				value: '',
				email: '',
				pwd: '',
				password:'',
				confirm:'',
				user:'',
				loginemail:'',
				round: 20,
				type: 'text',
				border: true,
				loginPopHeight: 0,
				popFrom: 'bottom',
				show: false,
				confirmPwd: false,
				showPopup: false,
				showLoginPopup: false,
				showGoogleLoginPopup: false,
				showFacebookLoginPopup: false,
			// add up for facebook login section 2 start
				
				title: 'Hello',
				w:0,
				h:0,
			// add up for facebook login section 2 end
				
			}
		},
		onLoad() {
			let deviceInfo = uni.getSystemInfoSync();
			
			this.deviceHeight = deviceInfo.windowHeight;
			
			
			
			// #ifdef App
			this.loginPopHeight = deviceInfo.windowHeight / 2 + 320
			console.log('app')
			// #endif
			
			this.loginPopHeight = deviceInfo.windowHeight / 2 + 60
			console.log(this.loginPopHeight)
			
			// add up for facebook login section 3 start
			// facebook.getKeyHash((e) => {
			//   if (e.code == 0) {
			//     let keyhash = e.keyHash[0];
			//   }
			// });
			// add up for facebook login section 3 end
			
			// google section 2 start
			JYGoogleSignin.jy_init({
			    //  安卓的client_id应该是谷歌开发者后台默认Web应用的；iOS的client_id应该是谷歌开发者后台iOS对应的
			    client_id: "244209124309-okkt8tas8ri1689r5qf3dope7m6biieq.apps.googleusercontent.com"
			}, res=> {
			    //    这里不会有返回数据
			})
			// google section 2 end
		},
		methods: {
			// add up for facebook login section 4 start
		
			facebook_login(){
				// 登录
				facebook.login((e) => {
				  // e 对象如下
				  var e = {
				      result: true,
				      data: {
				          token: '',
				          userId: '',
				          name: '',
				          email: '',
				          gender: '',
				          birthday: '',
				          photo: ''
				      }
				  }
				  uni.showToast({
					icon: "none",
					title: JSON.stringify(e),
				  });
				});
			},
			facebook_logout(){
				facebook.logout((e) => {
				  uni.showToast({
					icon: "none",
					title: "登出成功",
				  });
				});
			},
			share(){
	
				dFacebook.share({
					shareType:"0",
					shareUrl:"http://www.baidu.com/",
					imgPath:this.options.bgUrl
				})
	
			},
			// add up for facebook login section 4 end
			
			// google section 3 start 
			google_start_login(){
			
				JYGoogleSignin.jy_startLogin(res=> {
				// 这里会返回登录的结果，如果errorCode = 1，代表错误，可检查msg返回的数据判断；
				// 如果errorCode = 0，代表成功，也会在data里面返回登录数据
					console.log(JSON.stringify(res));
					uni.showToast({
					icon:'none',
					title:JSON.stringify(res)
					})
				})
			},
			
			google_check_last_login(){
				JYGoogleSignin.jy_getLastSigned(res=> {
				// 这里会返回登录的结果，如果errorCode = 1，代表未登录；
				// 如果errorCode = 0，代表已登录，也会在data里面返回登录数据
				console.log(JSON.stringify(res));
					uni.showToast({
					icon:'none',
					title:JSON.stringify(res)
					})
				})
			},
			
			google_logout(){
				JYGoogleSignin.jy_logout(res=> {
				//  不会返回数据，调用就成功
				})
			},
			// google section 3 end
			next(){
				
				this.popAction('showPopup')
			},
			
			registerWithEmail(){
				if(this.email == ''||this.email==null){
					uni.showModal({
					    title: 'Missing email address',
						showCancel: false,
					    content: 'please enter your email. ',
					    success: function (res) {
					        if (res.confirm) {
					            console.log('confirm');
					        } 
					    }
					});
				}
				if (this.email != '' && this.email != null){
					this.show = true
					this.popAction('confirmPwd')
				}
				
			},
			
			SignupAction(){
				console.log(this.value)
				console.log(this.email)
				console.log(this.password)
				if(this.password == null || this.password == ''||this.confirm == null || this.confirm == ''){
					uni.showModal({
					    title: 'Missing password detail',
						showCancel: false,
					    content: 'The password can not be empty. please try again. ',
					    success: function (res) {
					        if (res.confirm) {
					            console.log('confirm');
					        } 
					    }
					});
				}
				else if(this.password==this.confirm){
					uni.request({
						url:'http://43.142.11.191:7884/users/register/normal',
						method:'POST',
						data:{
							'name':this.value,
							'email':this.email,
							'gender':2,
							'pwd':this.confirm,
							'uid':0
						},
						success:function(res){
							console.log(res)
							if (res.data==-1){
								uni.showModal({
								    title: 'Account exist',
									showCancel: false,
								    content: 'The email address already exist, please try again or log in by this email. ',
								    success: function (res) {
								        if (res.confirm) {
								            console.log('confirm');
								        } 
								    }
								});
							}else{
								
								// this.$store.commit("setUserLogin", res.data)
								// console.log(res.data)
								uni.setStorageSync('userId',res.data)
								console.log("success")
								console.log("Start action")
								//store uid
								uni.switchTab({
									url:"../profile/profile"
								})
							}
						}
					})
				}else{
					//raise error alert
					uni.showModal({
					    title: 'Unmatch password',
						showCancel: false,
					    content: 'The confirm password not match. please try again. ',
					    success: function (res) {
					        if (res.confirm) {
					            console.log('confirm');
					        } 
					    }
					});
					
				}
			},
			toLogin(){
				
				this.popAction('showLoginPopup')
			},
			toSignUp(){
				
				this.popAction('showPopup')
			},
            
			loginAction(){
				// uni.switchTab({                         --------------- xjg的服务器挂了就用它 ---------------
				// 	url:"../profile/profile"
				// })
				//alert('11111')
				
				//原始代码
				if(this.loginemail!=null && this.loginemail!=''&& this.pwd!=null && this.pwd!=''){
					var that = this;
					uni.request({
						url:'http://43.142.11.191:7884/users/login/normal',
						method:'POST',
						data:{
							'email':this.loginemail,
							'pwd':this.pwd,
						},
						success:function(res){
							console.log(res.data)
							console.log(res.statusCode)
							if(res.data == -1||res.statusCode==500){
								//password not match alert or email not exist
								uni.showModal({
									title: 'Unmatch Account Detail',
									showCancel: false,
									content: 'Your email or password is incorrect, please try again. ',
									success: function (res) {
										if (res.confirm) {
											console.log('confirm');
										} 
									}
								});
							}else{
								//home navigation + store uid
								// console.log(that.$store)
								that.$store.commit("setUserLogin", res.data)
								uni.setStorageSync('userId',res.data)
								console.log(res.data)
								console.log("success")
								console.log("Start action")
								uni.switchTab({
									url:"../profile/profile"
								})
							}
						}}
					)
				}else{
					uni.showModal({
						title: 'Missing input',
						showCancel: false,
						content: 'The email and password can not be empty. please try again. ',
						success: function (res) {
							if (res.confirm) {
								console.log('confirm');
							} 
						}
					});
				}
			},
            
			popAction(e){
				if (e === 'confirmPwd'){
					this.showPopup = false
					this.showLoginPopup = false
					this.confirmPwd = true
					this.showGoogleLoginPopup = false
					this.showFacebookLoginPopup = false
					
				}else if(e === 'showPopup'){
					this.showLoginPopup = false
					this.confirmPwd = false
					this.showPopup = true
					this.showGoogleLoginPopup = false
					this.showFacebookLoginPopup = false
					
				}else if(e === 'showLoginPopup'){
					this.confirmPwd = false
					this.showPopup = false
					this.showLoginPopup = true
					this.showGoogleLoginPopup = false
					this.showFacebookLoginPopup = false
					
				}else if(e === 'showGoogleLoginPopup'){
					this.confirmPwd = false
					this.showPopup = false
					this.showLoginPopup = false
					this.showGoogleLoginPopup = true
					this.showFacebookLoginPopup = false
					
				}else if(e === 'showFacebookLoginPopup'){
					this.confirmPwd = false
					this.showPopup = false
					this.showLoginPopup = false
					this.showGoogleLoginPopup = false
					this.showFacebookLoginPopup = true
				}
			}

		}
	}
</script>

<style>
	page{
		background-color: #B0C07A;
	}
	.fn-input{
		width: 80%;
		background-color: #F3F1F1;
		margin-top: 30px;
		border-style: none;
		font-weight: 900;
	}
	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}
	.welcome{
		background-color: white;
		height: 375px;
		width: 100%;
		position:fixed;
		bottom:0;
		
	}
	.t-bg{
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	.w-text{
		margin-top: 45px;
		font-size: 20px;
		font-weight: 200;
	}
	.ctn-btn{
		background-color: #F5C979;
		border-color: #F5C979;
		width: 90%;
		margin-top: 70px;
	}
	.logo-img{
		width: 200px;
		height: 200px;
		margin-top: 60px;
	}
	.v-logo{
		width: 100%;
		
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

</style>
