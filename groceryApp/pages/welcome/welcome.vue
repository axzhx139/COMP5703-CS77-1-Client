<template>
	<view class="content">
		<view class="t-bg">
			<view class="v-logo" :style="{'height': deviceHeight/3 + 'px'}">
				<image class="logo-img" src="../../static/logo.png"></image>
				<image style="width: 301px;height: 12px;margin-top: 30px;" src="../../static/logo-b.png"></image>
			</view>
			<view class="welcome">
				<view class="t-bg">
					<text class="w-text" style="font-weight: 400;">Welcome to Track My Grocery</text>
					<u-input placeholder="example@example.com" v-model="loginemail" :type="type" :border="border" class="fn-input" height="90" input-align="center"/>
					<u-input style="margin-top: 10px;" placeholder="Password" v-model="pwd"  type="password" :border="border" class="fn-input" height="90" input-align="center"/>
					<u-button style="margin-top: 30px;background-color: #F5C979;border-color: #F5C979;" :hair-line="false" class="ctn-btn" @click="loginAction" >Log in</u-button>
					<view style="width: 100%;margin-top: 30px;">
						<u-row gutter="" justify="space-around">
									<u-col span="6">
										<view class="" style="text-align: center;text-decoration:underline" @click="toForgot">Forget password?</view>
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
					<!-- <u-button style="margin-top: 10px;background-color: #4A66AC;border-color: #4A66AC;color: white;" :hair-line="false" class="ctn-btn" @click="facebook_login" >
						<image src="../../static/facebook-icon.png" style="width: 10px;height: 20px;margin-left: 17px;"></image>
						<view style="width: 16px;"></view>
						Continue with Facebook
					</u-button> -->
					</view>
			</view>
			<hqs-popup title="" v-model="showPopup" :round="round" :showClose="false" :height="loginPopHeight + 'px'">
			    <view class="t-bg">
					<text style="margin-right: auto;margin-left: 30px;font-size: 25px;font-weight: 900" >Sign up</text>
					<div id="app" style="margin-top: 20px;height:50px;width:80%">
						<u-input style="width:75%;float:left;margin:0px 10px auto 0px;height:50px;" placeholder="example@example.com" v-model="email" :type="type" :border="border" class="fn-input" height="90" input-align="left"/>
						<u-button style="width:20%;float:left;margin-top: 0px;height:50px;background-color: #BDD7EF;border-color: #BDD7EF;" :hair-line="false" class="ctn-btn"  @click="sendcode(10)" v-bind:disabled="disabledbtn">{{verifyBtnText}}</u-button>
					</div>
					<u-input style="margin-top: 10px" placeholder="verification" v-model="vcode"  :border="border" class="fn-input" height="90" input-align="left"/>

					<!-- <u-input style="margin-top: 10px" placeholder="username" v-model="username"  :border="border" class="fn-input" height="90" input-align="left"/> -->
					<u-input style="margin-top: 10px" placeholder="password" v-model="password"  type="password" :border="border" class="fn-input" height="90" input-align="left"/>
					<u-button style="width:80%;margin-top: 20px;background-color: #F5C979;border-color: #F5C979;" :hair-line="false" class="ctn-btn" @click="SignupAction" >Sign up</u-button>
					<text style="margin-top: 10px;text-decoration:underline" @click="toLogin">Log in</text>
					<u-button style="margin-top: 10px;background-color: #5383EC;border-color: #5383EC;color: white;" :hair-line="false" class="ctn-btn" @click="google_start_login" >
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
			<hqs-popup title="" v-model="popForgot" :round="round" :showClose="false" :height="loginPopHeight + 'px'">
			    <view class="t-bg">
					<text style="margin-right: auto;margin-left: 30px;font-size: 25px;font-weight: 900" >Forgot Password</text>
					<div id="app" style="margin-top: 20px;height:50px;width:80%">
						<u-input style="width:75%;float:left;margin:0px 10px auto 0px;height:50px;" placeholder="example@example.com" v-model="email" :type="type" :border="border" class="fn-input" height="90" input-align="left"/>
						<u-button style="width:20%;float:left;margin-top: 0px;height:50px;background-color: #BDD7EF;border-color: #BDD7EF;" :hair-line="false" class="ctn-btn"  @click="sendChangeCode(10)" v-bind:disabled="disabledbtn">{{verifyBtnText}}</u-button>
					</div>
					<u-input style="margin-top: 10px" placeholder="verification" v-model="vcode"  :border="border" class="fn-input" height="90" input-align="left"/>
					<u-input style="margin-top: 10px" placeholder="password" v-model="password"  type="password" :border="border" class="fn-input" height="90" input-align="left"/>
					<u-input style="margin-top: 10px" placeholder="confirm password" v-model="password2"  type="password" :border="border" class="fn-input" height="90" input-align="left"/>
					<u-button style="width:80%;margin-top: 70px;background-color: #F5C979;border-color: #F5C979;" :hair-line="false" class="ctn-btn" @click="changePassword" >Change password</u-button>
					<text style="margin-top: 10px;text-decoration:underline" @click="toLogin">Log in</text>
					
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
		
			
		</view>
	</view>
	
</template>

<script>
	//add up for facebook login section 1 start

	// var facebook = uni.requireNativePlugin("sn-facebook");
	// add up for facebook login section 1 end
	
	// google section 1 start
	// const JYGoogleSignin = uni.requireNativePlugin('JY-GoogleSignin');
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
				showGoogleLoginPopup: false,
				showFacebookLoginPopup: false,

				popForgot:false,
				disabledbtn: false,
				verifyBtnText:'verify',
				username:'',
				vcode:'',
				password2:'',
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
			//this.loginPopHeight = deviceInfo.windowHeight / 2 + 320
			//console.log('app')
			// #endif
			

			this.loginPopHeight = 450
			// console.log(this.loginPopHeight)
			
			// add up for facebook login section 3 start
			// facebook.getKeyHash((e) => {
			//   if (e.code == 0) {
			//     let keyhash = e.keyHash[0];
			//   }
			// });
			// add up for facebook login section 3 end
			
			// google section 2 start
			// JYGoogleSignin.jy_init({
			//     //  安卓的client_id应该是谷歌开发者后台默认Web应用的；iOS的client_id应该是谷歌开发者后台iOS对应的
			//     client_id: "244209124309-okkt8tas8ri1689r5qf3dope7m6biieq.apps.googleusercontent.com"
			// }, res=> {
			//     //    这里不会有返回数据
			// })
			// google section 2 end
		},
		methods: {
			// add up for facebook login section 4 start
			sendcode: function(seconds,e) {
				this.disabledbtn=true
				this.verifyBtnText=seconds+'...'
				console.log(this.email)
				uni.request({
					url:'http://43.142.11.191:7884/users/register/sendVerifyCode',
					method:'POST',
					data:{
						'email':this.email,
					},
					success:function(res){
						console.log(res)
						if (res.data==0){
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
							uni.showToast({
								icon: "none",
								title: "Send verification code success",
							});
						}
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
			},

			sendChangeCode:function(seconds,e){
				console.log(this.email)
				　　var myReg=/^[a-zA-Z0-9_-]+@([a-zA-Z0-9]+\.)+(com|cn|net|org)$/
					if(this.email=='' ||this.email==null || ! myReg.test(this.email)){
						uni.showToast({
							icon: "none",
							title: "wrong email",
						});
					}else{
						this.disabledbtn=true
						this.verifyBtnText=seconds+'...'
						uni.request({
							url:'http://43.142.11.191:7884/users/register/sendChangeCode',
							method:'POST',
							data:{
								'email':this.email,
							},
							success:function(res){
								console.log(res)
								if(res.data==1){
									uni.showToast({
										icon: "none",
										title: "Send verification code success",
									});
								}else if (res.data==-1){
									uni.showModal({
										title: 'Account do not exist',
										showCancel: false,
										content: 'The email address have not been register, please sign up',
										success: function (res) {
											if (res.confirm) {
												console.log('confirm');
											} 
										}
									});
								}else{
									uni.showToast({
										icon: "none",
										title: "Send verification code failed",
									});
								}
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
					}
			},
			sendcode: function(seconds,e) {
				console.log(this.email)
			　　var myReg=/^[a-zA-Z0-9_-]+@([a-zA-Z0-9]+\.)+(com|cn|net|org)$/
				if(this.email=='' ||this.email==null || ! myReg.test(this.email)){
					uni.showToast({
						icon: "none",
						title: "wrong email",
					});
				}else{
					this.disabledbtn=true
					this.verifyBtnText=seconds+'...'
					uni.request({
						url:'http://43.142.11.191:7884/users/register/sendVerifyCode',
						method:'POST',
						data:{
							'email':this.email,
						},
						success:function(res){
							console.log(res)
							if (res.data==0){
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
							}else if(res.data==-2){
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
				}
			},
			facebook_login(){
				// 登录
				console.log('facebook login')
				uni.login({
					provider: 'facebook',
					success: function (loginRes) {
						// 登录成功
						var logedEmailArray = uni.getStorageSync('logedEmailArray')
						console.log('-------------------------------')
						console.log('logedEmailArray is: ', logedEmailArray)
						if (logedEmailArray == '' || logedEmailArray == undefined || logedEmailArray == null) {
							logedEmailArray = []
							uni.setStorageSync('logedEmailArray', logedEmailArray)
						}

						uni.getUserInfo({
							provider: 'facebook',
							success: function(info) {
								// 获取用户信息成功, info.authResult保存用户信息
								var googleEmail = info.userInfo.email
								var googleNickname = info.userInfo.nickname
								
								// 判断是否为新用户，新用户，走注册
								if (logedEmailArray.indexOf(googleEmail) < 0) {
									var isNewUser = true
								} else {
									var isNewUser = false
								}

								//原始代码
								if (googleEmail != null && googleEmail != '') {
									var that = this
									console.log("uni.getStorageSync('userId') is: " ,uni.getStorageSync('userId'))
									uni.request({
										url:'http://43.142.11.191:7884/users/login/thirdparty',
										method:'POST',
										data:{
											'email': googleEmail,
											'nickname': googleNickname,
											'isNewUser': isNewUser
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
												console.log('that.$store is: ', this.$store)
												var that = this;
												console.log('that store is: ', that.$store)
												if (!isNewUser) {
													// that.$store.commit("setUserLogin", res.data)
												}
												uni.setStorageSync('userId',res.data)
												// 登陆成功后将email加入到loged中
												if (isNewUser) {
													logedEmailArray.push(googleEmail)
												}
												uni.setStorageSync('logedEmailArray', logedEmailArray)
												console.log(res.data)
												console.log("success")
												console.log("Start action")
												uni.switchTab({
													url:"../profile/profile"
												})
											}
										}}
									)
								}
								else{
									uni.showToast({
										icon: "none",
										title: "information uncomplete",
									});
								}
							}
						})
					},
					fail: function (err) {
						// 登录授权失败  
						// err.code是错误码
						console.log('error.code is: ', err.code, err)
						uni.showModal({
							title: 'Cannot featch facebook.',
							showCancel: false,
							content: 'Cannot featch facebook.',
							success: function (res) {
								if (res.confirm) {
									console.log('confirm');
								} 
							}
						});
					}
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
				console.log("kaishi")
				console.log('userId 1', uni.getStorageSync('2'))
				uni.login({
				    provider: 'google',
				    success: function (loginRes) {
						console.log("ddeng")
						// console.log('loginRes is: ', loginRes)
						var logedEmailArray = uni.getStorageSync('logedEmailArray')
						console.log('-------------------------------')
						console.log('logedEmailArray is: ', logedEmailArray)
						if (logedEmailArray == '' || logedEmailArray == undefined || logedEmailArray == null) {
							logedEmailArray = []
							uni.setStorageSync('logedEmailArray', logedEmailArray)
						}
						// uni.setStorageSync('logedEmailArray', [])
				        // 登录成功
				        uni.getUserInfo({
				            provider: 'google',
				            success: function(info) {
								// console.log(info)
								// for (var key in info) {
								// 	// console.log('key: ', key)
								// 	console.log(key, ": ", info[key])
								// }
								// console.log('info.userInfo is: ', info.userInfo)
								// for (var key in info.userInfo) {
								// 	// console.log('key: ', key)
								// 	console.log(key, ": ", info.userInfo[key])
								// }
								console.log('info.userInfo-->', info.userInfo)
				                // 获取用户信息成功, info.authResult保存用户信息
								
								var googleEmail = info.userInfo.email
								var googleNickname = info.userInfo.nickname
								
								// 判断是否为新用户，新用户，走注册
								if (logedEmailArray.indexOf(googleEmail) < 0) {
									var isNewUser = true
								} else {
									var isNewUser = false
								}

								//原始代码
								if (googleEmail != null && googleEmail != '') {
									var that = this
									console.log("uni.getStorageSync('userId') is: " ,uni.getStorageSync('userId'))
									uni.request({
										url:'http://43.142.11.191:7884/users/login/thirdparty',
										method:'POST',
										data:{
											'email': googleEmail,
											'nickname': googleNickname,
											'isNewUser': isNewUser
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
												console.log('that.$store is: ', this.$store)
												var that = this;
												console.log('that store is: ', that.$store)
												if (!isNewUser) {
													// that.$store.commit("setUserLogin", res.data)
												}
												uni.setStorageSync('userId',res.data)
												// 登陆成功后将email加入到loged中
												if (isNewUser) {
													logedEmailArray.push(googleEmail)
												}
												uni.setStorageSync('logedEmailArray', logedEmailArray)
												console.log(res.data)
												console.log("success")
												console.log("Start action")
												uni.switchTab({
													url:"../profile/profile"
												})
											}
										}}
									)
								}
								else{
									uni.showToast({
										icon: "none",
										title: "information uncomplete",
									});
								}
				            }
				        })
				    },
				    fail: function (err) {
				        // 登录授权失败  
				        // err.code是错误码
				    }
				});
				// JYGoogleSignin.jy_startLogin(res=> {
				// // 这里会返回登录的结果，如果errorCode = 1，代表错误，可检查msg返回的数据判断；
				// // 如果errorCode = 0，代表成功，也会在data里面返回登录数据
				// 	console.log(JSON.stringify(res));
				// 	uni.showToast({
				// 	icon:'none',
				// 	title:JSON.stringify(res)
				// 	})
				// })
			},
			
			// google_check_last_login(){
			// 	JYGoogleSignin.jy_getLastSigned(res=> {
			// 	// 这里会返回登录的结果，如果errorCode = 1，代表未登录；
			// 	// 如果errorCode = 0，代表已登录，也会在data里面返回登录数据
			// 	console.log(JSON.stringify(res));
			// 		uni.showToast({
			// 		icon:'none',
			// 		title:JSON.stringify(res)
			// 		})
			// 	})
			// },
			
			// google_logout(){
			// 	JYGoogleSignin.jy_logout(res=> {
			// 	//  不会返回数据，调用就成功
			// 	})
			// },
			// google section 3 end
			next(){
				
				this.popAction('showPopup')
			},
			
			

			SignupAction(){
				
				console.log(this.email)

				console.log(this.vcode)
				console.log(this.password)
				if(this.password == null || this.password == ''){
					uni.showToast({
						icon: "none",
						title: "please enter a password",
					});
				}
				else{
					uni.request({
						url:'http://43.142.11.191:7884/users/register/normal',
						method:'POST',
						data:{
							'name':this.email.split('@')[0],
							'email':this.email,
							'verificationCode':this.vcode,
							'gender':2,
							'pwd':this.password,
							'uuid':0,
							'token':'',
						},
						success:function(res){

							console.log(res)
							if (res.data==-1){
								uni.showToast({
									icon: "none",
									title: "先获取验证码",
								});
							}else if (res.data==-2){

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

							}else if(res.data==-3){
								uni.showModal({
								    title: 'Verify failed',
									showCancel: false,
								    content: 'The verify code is wrong',
								    success: function (res) {
								        if (res.confirm) {
								            console.log('confirm');
								        } 
								    }

								});
							}else if(res.data==-4){
								uni.showModal({
									title: 'failed',
									showCancel: false,
									content: '注册失败',
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
								uni.setStorageSync('email', this.email)
								console.log("success")
								console.log("Start action")
								//store uid
								uni.switchTab({
									url:"../profile/profile"
								})
							}
						}
					})
				}
			},
			changePassword(){
				
				console.log(this.email)
				console.log(this.vcode)
				console.log(this.password)
				console.log(this.password2)
				if(this.password == null || this.password == ''||this.password2 == null || this.password2 == ''){
					uni.showToast({
						icon: "none",
						title: "please enter a password and confirm",
					});
				}else if(this.password!=this.password2){
					uni.showToast({
						icon: "none",
						title: "The confirm password is wrong",
					});
				}
				else{
					uni.request({
						url:'http://43.142.11.191:7884/users/register/changePasswordbyVcode',
						method:'POST',
						data:{
							'email':this.email,
							'verification_code':this.vcode,
							'pwd':this.password,
						},
						success:function(res){
							console.log(res)
							if (res.data==-1){
								uni.showModal({
								    title: 'Account not exist',
									showCancel: false,
								    content: 'The email address have not been register',
								    success: function (res) {
								        if (res.confirm) {
								            console.log('confirm');
								        } 
								    }
								});
							}else if(res.data==-2){
								uni.showModal({
								    title: 'Verify failed',
									showCancel: false,
								    content: 'The verify code is wrong',
								    success: function (res) {
								        if (res.confirm) {
								            console.log('confirm');
								        } 
								    }
								});
							}else if(res.data==1){
								console.log("success")
								//store uid
								uni.showToast({
									icon: "none",
									title: "Change password success, please log in",
								});
								
							
							}else{
								uni.showModal({
									title: 'failed',
									showCancel: false,
									content: 'Change password failed',
									success: function (res) {
										if (res.confirm) {
											console.log('confirm');
										} 
									}
								});
								
							}
						}
					})
				}
			},
			toLogin(){
				
				this.popAction('showLoginPopup')
			},
			toSignUp(){
				
				this.popAction('showPopup')
			},
            toForgot(){
				this.popAction('popForgot')
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
							// console.log(res.data)
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
								console.log('that.$store is: ', that.$store)
								that.$store.commit("setUserLogin", res.data)
								uni.setStorageSync('userId',res.data)
								uni.setStorageSync('email',that.loginemail)
								console.log(res.data)
								console.log(that.loginemail)
								console.log("success")
								console.log("Start action")
								uni.switchTab({
									url:"../profile/profile"
								})
							}
						}}
					)
				}else{
					uni.showToast({
						icon: "none",
						title: "information uncomplete",
					});
				}
			},
            
			popAction(e){
				this.password=''
				this.password2=''
				this.vcode=''
				if (e === 'confirmPwd'){
					this.showPopup = false
					this.confirmPwd = true
					this.showGoogleLoginPopup = false
					this.showFacebookLoginPopup = false
					this.popForgot = false
				}else if(e === 'showPopup'){
					this.confirmPwd = false
					this.showPopup = true
					this.showGoogleLoginPopup = false
					this.showFacebookLoginPopup = false
					this.popForgot = false
				}else if(e === 'showLoginPopup'){
					this.confirmPwd = false
					this.showPopup = false
					this.showGoogleLoginPopup = false
					this.showFacebookLoginPopup = false
					this.popForgot = false
				}else if(e === 'showGoogleLoginPopup'){
					this.confirmPwd = false
					this.showPopup = false
					this.showGoogleLoginPopup = true
					this.showFacebookLoginPopup = false
					this.popForgot = false
				}else if(e === 'showFacebookLoginPopup'){
					this.confirmPwd = false
					this.showPopup = false
					this.showGoogleLoginPopup = false
					this.showFacebookLoginPopup = true
					this.popForgot = false
				}else if(e === 'popForgot'){
					this.confirmPwd = false
					this.showPopup = false
					this.showGoogleLoginPopup = false
					this.showFacebookLoginPopup = false
					this.popForgot = true
				}
			}

		}
	}
</script>

<style>
	
	page{
		background-color: #B0C07A;
	}
	.disabled {
	    opacity: 0.6;
	    cursor: not-allowed;
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
		height: 500px;
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
	.message {
				position: fixed;
				z-index: 2000;
				left: 50%;
				top: 75%;
				transition: all .5s;
				-webkit-transform: translateX(-50%) translateY(-50%);
				-moz-transform: translateX(-50%) translateY(-50%);
				-ms-transform: translateX(-50%) translateY(-50%);
				-o-transform: translateX(-50%) translateY(-50%);
				transform: translateX(-50%) translateY(-50%);
				text-align: center;
				border-radius: 5px;
				color: #FFF;
				background: rgba(17, 17, 17, 0.7);
				height: 45px;
				line-height: 45px;
				padding: 0 15px;
				max-width: 150px;
			}
	
</style>
