<template>
	<view>
		<view class="info-card">
					
						<view>
							<textarea v-model="feedback" placeholder="Add Feedback"></textarea>
						</view>
					</view>
					
					
					<u-button style="width: 400rpx;background-color: #443C34;color: white;margin-top: 30rpx;" @click="goSend">
						<!-- <image src="../../static/setting.png" style="width: 20px;height: 20px;"></image> -->
						<view style="width: 16rpx;"></view>
						Send
					</u-button>
			
			
	</view>
</template>

<script>
	export default {
		data() {
			return {
				feedback:'',
			}
		},
		methods: {
			goSend(){
							console.log("feedbacck", this.feedback)
							uni.request({
								url:'http://101.35.91.117:7884/feedback/storeFeedback',
								method:'POST',
								data:{
									'id':uni.getStorageSync('userId'), 
									'feedback':this.feedback
								},
								// header: {
								//      "Content-Type": "feedback/json"
								// }, 
								success:function(res){
									console.log(res)
									uni.navigateTo({
										url:'../setting/setting'
									})
									
									
								},	
							});
					
							// uni.switchTab({
							// 	url:"../setting/setting"
							// })
						
					}
		}
	}
</script>

<style>
page{
	background-color: #B0C07A;
}.feedbackContent{
	display: flex;
	width: 100%;
	justify-content: center;
	/* flex-direction: column; */
	text-align: center;
}.info-card{
	width: 85%;
	height: 700rpx;
	background-color: white;
	margin-top: 100rpx;
	margin-left: 60rpx;
	border-radius: 10px;
	display: flex;
	justify-content: center;
	flex-direction: column;
	text-align: center;
}
</style>
