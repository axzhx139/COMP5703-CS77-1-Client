<template>
	<view class="content">
		<view class="t-bg">
			<view class="v-logo" :style="{'height': deviceHeight/2 + 'px'}">
				<image class="logo-img" src="../../static/logo.png"></image>
				<image style="width: 301px;height: 12px;margin-top: 30px;" src="../../static/logo-b.png"></image>
			</view>
			<view class="welcome">
				<view class="t-bg">
					<text class="w-text" style="font-weight: 400;">Welcome to Track My Grocery</text>
					<text class="w-text" style="margin-right: auto;margin-right: 60px;">Let’s manage your daily \npurchase wisely</text>
				</view>
				<u-button style="background-color: #F5C979;border-color: #F5C979;" :hair-line="false" class="ctn-btn" @click="next">Continue</u-button>
			</view>
		</view>
	</view>
	
</template>

<script>
	
	
	export default {
		data() {
			return {
				title: 'Hello',
				deviceHeight: ''
			}
		},
		onLoad() {
			// console.log(this.$store.state.tabbar)
			let deviceInfo = uni.getSystemInfoSync();
			console.log(deviceInfo)
			this.deviceHeight = deviceInfo.windowHeight;
		},
		methods: {
			next(){
				uni.navigateTo({
					url:'../welcome/welcome'
				})
			}

		}
	}
</script>

<style>
	page{
		background-color: #B0C07A;
	}
	/* .content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	} */

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
