<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
			let ip = getApp().globalData.ipAddress
			uni.setStorageSync("ip", ip)
			// 第一次加载时设置NotificationCount为1，在访问过home后，每次+1
			const notificationCount = uni.getStorageSync("NotificationCount")
			console.log("notificationCount is: ", notificationCount)
			uni.setStorageSync("NotificationCount", 1)
			// var info = plus.push.getClientInfo()
			// plus.push.addEventListener("click", function(msg) {
			// 	console.log("click:" + JSON.stringify(msg));
			// 	console.log(msg.payload);
			// 	console.log(JSON.stringify(msg));
			// 	setTimeout(() => {
			// 		if (typeof uni.getStorageSync('userId') != 'undefined' && uni.getStorageSync('userId') != '' && uni.getStorageSync('userId')){
			// 			uni.navigateTo({
			// 				url: `/pages/notification/notification`
			// 			})
			// 		}
			// 	}, 1000)
			// }, false);  
			// plus.push.addEventListener("receive", function(msg) {
			// 	console.log("recevice:" + JSON.stringify(msg))
			// }, false);
			// console.log('push')
			// if (typeof uni.getStorageSync('userId') != 'undefined' && uni.getStorageSync('userId') != '' && uni.getStorageSync('userId')){
			// 	uni.switchTab({
			// 		url:'./pages/home/home'
			// 	})
			// }
			// // #ifdef APP-PLUS 
			// const _self = this;  
			// const _handlePush = function(message) {  
			// 	console.log(message);
			// 	uni.navigateTo({  
			// 		url: './pages/notification/notification'
			// 	});
			// };
			// plus.push.addEventListener('click', _handlePush);  
			// plus.push.addEventListener('receive', _handlePush);  
			// // #endif 
			
		},
		onShow: function() {
			console.log('App Show')
			let ip = getApp().globalData.ipAddress
			
			uni.setStorageSync("ip", ip)
			
		},
		onHide: function() {
			console.log('App Hide')
		},
		globalData:{
			ipAddress: '43.142.11.191:7884'
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	@import "uview-ui/index.scss";
	@import "./font/ifont.css";  
	
</style>
<style>
	.uni-sample-toast {
		width:80%;
	}
</style>