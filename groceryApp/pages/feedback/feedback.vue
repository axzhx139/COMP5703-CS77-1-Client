
<template>
	<view class="main-content">
		<view class="main-body">
			<view class="info-card">
				<view style="text-align: left;margin-bottom: 10px;">Type of issue:
					<xfl-select @change="selectTypeItemList"
						:list="sortingMethod"
						:clearable="false"
						:showItemNum="5" 
						:listShow="false"
						:isCanInput="false"  
						:style_Container="'height: 30px; font-size: 15px;'"
						:placeholder = "'Default'"
						:selectHideType="'hideAll'"
						style="width: 100%; background-color: #FFFFFF;margin-top: 10px;"
					>
					</xfl-select>
				</view>
				<view style="margin-top: 15px;  height:600rpx;text-align: left;border: 1px solid #c2c2c2;border-radius: 15px;padding: 15px;">
					<textarea v-model="feedback" placeholder="Say something..."></textarea>
				</view>
			</view>
						
						
			<u-button style="display: flex;width: 400rpx;background-color: #443C34;color: white;margin-top: 30rpx;" @click="goSend">
				<!-- <image src="../../static/setting.png" style="width: 20px;height: 20px;"></image> -->
				<view style="width: 16rpx;"></view>
				Send
			</u-button>
			
			</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				feedback:'',
				sortingMethod: ['Account issues', 'Data issues','Application bugs','General suggestions'],
				type:'default'
			}
		},
		methods: {
			goSend(){
				var result = this.type+':'+this.feedback
				console.log("feedbacck", result)
				uni.request({
					url:'http://43.142.11.191:7884/feedback/storeFeedback',
					method:'POST',
					data:{
						'id':uni.getStorageSync('userId'), 
						'feedback':result
					},
					// header: {
					//      "Content-Type": "feedback/json"
					// }, 
					success:function(res){
						console.log(res)
						uni.showModal({
							title: "Hint",
							content: "Thank you for your feedback.",
							showCancel: false,
							success: function (res) {
								if (res.confirm) {
									uni.navigateTo({
										url:'../setting/setting'
									})
								}
							}
						})
						
						
						
					},	
				});
			
					// uni.switchTab({
					// 	url:"../setting/setting"
					// })
				
			},
			selectTypeItemList(xflSelectResult){
				this.type=xflSelectResult.newVal
			
			},
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
	padding: 20px;
}
.main-content{
	display: flex;
	justify-content: center;
	text-align: center;
}
.main-body{
	width: 100%;
	border-radius: 10px;
	text-align: center;
}
</style>
