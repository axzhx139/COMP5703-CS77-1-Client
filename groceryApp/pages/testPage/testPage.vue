<template>
	
<view>
	<view class="content" >
		<view class="head-img" ><u-image :src="src" shape="circle"width="500" height="500"></u-image></view>
		
		<view class="test" style="margin-top: 100px;">
			<u-button shape="circle" :hair-line="false" style="margin-left: 25px;float:left;width: 150px;background-color: #F5C979;border-color: #F5C979;" @click="choosePhoto()">Choose a photo</u-button>
			<u-button shape="circle" :hair-line="false" style="margin-right: 25px;float:right;width: 150px;background-color: #F5C979;border-color: #F5C979;" @click="showPicture()">Show Picture</u-button>
		</view>
	</view>
			
</view>
		
	
</template>

<script>
	export default {
		data() {
			return {
				show:true,
				src:'http://101.35.91.117:7884/item/picture/1',
				item_id:1,
				filepath:"",
			}
		},
		methods: {
			choosePhoto(){
				let that = this
				uni.chooseImage({
				    count: 1, 
				    sizeType: ['original', 'compressed'], 
				    sourceType: ['album','camera'], 
				    success: function (res) {
				        console.log(JSON.stringify(res.tempFilePaths));
						that.filepath = res.tempFilePaths
						uni.previewImage({
							urls: res.tempFilePaths,
						});
						
						uni.uploadFile({
							url: 'http://101.35.91.117:7884/item/update/picture', 
							// url: 'http://localhost:7884/item/update/picture', 
							filePath: that.filepath[0], 
							name: 'picture', 
							// header: {
							// 	'content-type': 'multipart/form-data' 
							// },
							formData: {
								item_id: 1,
								// file: that.filepath[0]  
							},
							success: (uploadFileRes) => {
								console.log(uploadFileRes);
								console.log(uploadFileRes.data);
								
							},
							fail: (err) => {
								console.log(err)
							}
						});
				    }
				});
			},
			showPicture(){
				// uni.request({
				// 	url:'http://101.35.91.117:7884/picture/1',
				// 	method:'GET',
					
				// }).then(res=>{
				// 	console.log('url',1234)
				// 	// this.src=res[1].data
				// })
				
				// if(src!=null){
				// 	this.show=true
				// 	src=ResultBlueToothDevice
				// }
				// this.src='http://101.35.91.117:7884/picture/1'
			}
		}
	}
</script>

<style>
page{
	background-color: #B0C07A;
}
.head-img{
	width: 250rpx;
	height: 250rpx;
	position: absolute;
	top: 110rpx;
	left: 110rpx;
}
.test{
	position: absolute;
	top: 500rpx;
	left: 50rpx;
}
</style>
