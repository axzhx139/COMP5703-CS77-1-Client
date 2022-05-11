<template>
	<view>
		<hx-navbar ref="hxnb" :config="config" @clickBtn="onClickBtn">
		</hx-navbar>
		
		<view class="main-content">
			<view class="main-body" :style="{'height': getDeviceHeight()-110 + 'px'}">
			<!-- <view class="main-body"> -->
				<u-search placeholder="Search Ingredient" :show-action="true" actionText="search" :actionStyle="{width:'60px'}"  margin="30rpx 30rpx" height="50"  v-model="searchIngre" @custom="searchRecipe()"></u-search>
				<scroll-view :scroll-y="true"  :style="{'height': getDeviceHeight()-190 + 'px'}">
					<div v-if="itemList.length==0" style="margin-top: 20px;">Nothing in stock</div>
					<view class="" style="padding: 0 15px 0 15px;margin-top: 30px;" v-for="(recipe, index) in itemList">
						
								<u-row v-if="index%2==0" gutter="0" justify="space-between">
					
									<u-col span="6">
										<view class="demo-layout bg-purple-light card" @click="toDetail(recipe.itemId)">
											<view class="card-box">
												<u-image border-radius="6px" height="138px" width="100%" :src="recipe.img" :fade="true" duration="450"></u-image>
												<text style="margin-left: 20rpx;font-size: 12px;font-weight: 300; text-align: left;display:inline-block;">{{ limitWords(recipe.name,20) }}</text>
												
												<view style="text-align: left;margin-top: 10px;">
													<image src="../../static/uview/example/recipe.png" style="width: 15px;height: 15px;margin-left: 10rpx;">
													<text style="display: inline-block;margin-left: 10px;font-size: 10px;">{{ limitWords(recipe.type,20)}}</text>
													
												</view>
					<!-- 							<view style="margin-top: 10px;text-align: left;margin-left: 30rpx;">
													<text style="font-size: 12px;color: #4CD964;font-weight: 500;">Beef, Mushroom</text>
												</view> -->
											</view>
										</view>
									</u-col>
									
									<u-col span="6" v-if="recipe2=itemList[index+1]">
										<view class="demo-layout bg-purple-light card" @click="toDetail(itemList[index+1].itemId)">
											<view class="card-box">
												<u-image border-radius="6px" height="138px" width="100%" :src="recipe2.img" :fade="true" duration="450"></u-image>
												<text style="margin-left: 20rpx;font-size: 12px;font-weight: 500; text-align: left;display:inline-block;">{{ limitWords(recipe2.name,20) }}</text>
												
												<view style="text-align: left;margin-top: 10px;">
													<image src="../../static/uview/example/recipe.png" style="width: 15px;height: 15px;margin-left: 10rpx;">
													<text style="display: inline-block;margin-left: 10px;font-size: 10px;">{{ limitWords(recipe2.type,20)}}</text>
													
												</view>
					<!-- 							<view style="margin-top: 10px;text-align: left;margin-left: 30rpx;">
													<text style="font-size: 12px;color: #4CD964;font-weight: 500;">Beef, Mushroom</text>
												</view> -->
											</view>
										</view>
									</u-col>
								</u-row>	
							</view>
						</scroll-view>
			<!-- 			
				<block v-for="(item, index) in itemList">
					<view class="" v-if="index == 0" @click="toDetail(item.itemId)">
						<view style="text-align: left;margin-left: 25px;margin-top: -5px;font-weight: 600;font-size: 25px;">
							<text >{{item.title}}</text>
						</view>
						<view class="main-item" >
							<view class="main-item-img" style="width: 100%;text-align: center;" >
								<u-image class="actual-img" border-radius="5px" height="116px" width="90%" :src="item.img" :fade="true" duration="450"></u-image>
							</view>
							<view class="main-item-hover">
								<view style="height: 47%;"></view>
								<text style="color: #000000;margin-left: 14px;font-size: 16px;font-weight: 500;">{{ item.name}}</text>
								<view class="" style="margin-left: 14px;margin-top: 10px;color: #000000;">
									<image src="../../static/bottle.png" style="width: 15px;height: 15px;">
									<text style="display: inline-block;margin-left: 5px;">{{ limited(item.type) }}</text>
									<image src="../../static/medal.png" style="width: 15px;height: 15px;margin-left: 30rpx;">
									<text style="display: inline-block;margin-left: 10px;">{{ Math.floor((Math.random() * 5000) + 100) }} Likes</text>
								</view>
							</view>
						</view>
					</view>
					
					
					
					
					<view class=""  v-if="index != 0" style="margin-top: 150px;" @click="toDetail(item.itemId)">
						<view style="text-align: left;margin-left: 25px;margin-top: 25px;font-weight: 600;font-size: 25px;">
							<text >{{item.title}}</text>
						</view>
						<view class="main-item" >
							<view class="main-item-img" style="width: 100%;text-align: center;" >
								<u-image class="actual-img" border-radius="5px" height="116px" width="95%" :src="item.img" :fade="true" duration="450"></u-image>
							</view>
							<view class="main-item-hover">
								<view style="height: 47%;"></view>
								<text style="color: #000000;margin-left: 14px;font-size: 16px;font-weight: 500;">{{ limitWords(item.name )}}</text>
								<view class="" style="margin-left: 14px;margin-top: 10px;color: #000000;">
									<image src="../../static/bottle.png" style="width: 15px;height: 15px;">
									<text style="display: inline-block;margin-left: 5px;">{{ limited(item.type) }}</text>
									<image src="../../static/medal.png" style="width: 15px;height: 15px;margin-left: 30rpx;">
									<text style="display: inline-block;margin-left: 10px;">{{ Math.floor((Math.random() * 5000) + 100)}} Likes</text>
								</view>
							</view>
						</view>
					</view>			
				</block> -->
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
				config:{
					title: 'Recipe',
					color: 'black',
					backgroundColor: '#B0C07A',
					back: false,
					
					statusBarBackground:'#B0C07A'
				},
				deviceHeight: 0,
				itemList: [
				],
				searchList: [	
				],
				searchIngre:'',
			}
		},
		onLoad() {
			let deviceInfo = uni.getSystemInfoSync();
			this.deviceHeight = deviceInfo.windowHeight;
			// this.getAllRecipe();
		},
		onShow(){
			if (this.searchIngre ==='') {
				this.getAllRecipe();
			} else {
				this.searchRecipe(this.searchIngre);
			}
			
		},
		methods: {
			onClickBtn(){
				
			},
			getDeviceHeight(){
				let deviceInfo = uni.getSystemInfoSync();
				this.deviceHeight = deviceInfo.windowHeight;
				return this.deviceHeight
			},
			searchRecipe(searchIngre){
				// console.log(this.searchIngre);
				uni.request({
				url: "http://101.35.91.117:7884/recipe/"+uni.getStorageSync('userId'),
				method: 'get',
				}).then(res=>{
					this.loadRecipe2(res[1].data)
					this.$store.commit("setRecipe",res[1].data)
				})

			},
			
			getAllRecipe(){
				uni.request({
				url: "http://101.35.91.117:7884/recipe/"+uni.getStorageSync('userId'),
				method: 'get',
				}).then(res=>{
					this.loadRecipe(res[1].data)
					this.$store.commit("setRecipe",res[1].data)
				})
			},
			toDetail(e){
				uni.navigateTo({
					url: '/pages/article/article?id='+e
				})
			},

			loadRecipe(itemList){
				let List = []
				// let ingre = this.searchIngre
				for (var i=0;i<itemList.length;i++){
				    var item = itemList[i]
					var used = ""
					for( var j=0;j<item.usedIngredients.length;j++){
						used+=item.usedIngredients[j].name
						used+=" "
					}
					console.log(used);
					var recipeInfo = {
					    "itemId": item.id,
					    // "title": "Fridge Cleaning",
						'img': item.image,
						'name': item.title,
						'type': used,
						'likes': item.likes,
					}
				
						
					List.push(recipeInfo);
					
					
				}
				this.itemList=List;
			},
			loadRecipe2(searchList){
				let List = []
				var ingre = this.searchIngre
				for (var i=0;i<searchList.length;i++){
				    var item = searchList[i]
					var used = ""
					
					for( var j=0;j<item.usedIngredients.length;j++){
						used+=item.usedIngredients[j].name
						used+=" "
					}
					console.log(used);
					var recipeInfo = {
					    "itemId": item.id,
					    // "title": "Fridge Cleaning",
						'img': item.image,
						'name': item.title,
						'type': used,
						'likes': item.likes,
					}
					
					if (used.toLowerCase().includes(ingre.toLowerCase()) || item.title.toLowerCase().includes(ingre.toLowerCase())) {
						console.log("111" + item.title)
						List.push(recipeInfo);
						
					} 
					
				}
			
				this.itemList=List;
				if (this.itemList.length === 0) {
					uni.showToast({
						title: 'There is no ' + ingre + ' in the stock.\n' + 'Please add ' + ingre + ' in the stock first.',
						icon: 'none',
						duration:4000,
					})
					this.getAllRecipe();
					
				}
				console.log(this.itemList.length);
			},
			limitWords(txt,len){
			    var str = txt;
				var reg = /<[^<>]+>/g;
				if (str.length >= len){
					str = str.substr(0,len-3) + '...';
					str = str.replace(reg, '');
				}
			    return str;
			},
			limited(txt){
			    var str = txt;
				var reg = /<[^<>]+>/g;
				if (str.length >= 18){
					str = str.substr(0,18) + '...';
					str = str.replace(reg, '');
				}
			    return str;
			}
		}
	}
</script>

<style>
	page{
		background-color: #B0C07A;
	}
	.main-content{
		display: flex;
		justify-content: center;
		text-align: center;
	}
	.main-body{
		background-color: #f7edc8;
		width: 90%;
		border-radius: 10px;
		text-align: center;
	
	}
	.main-item{
		position:relative;
		display: flex;
		justify-content: center;
		text-align: center;
		background: #000;
	}
	.main-item-img{
		display: flex;
		justify-content: center;
		text-align: center;
		margin-top: 10px;
		position: absolute;
		opacity:0.6;
		filter: alpha(opacity=60);
	}

	
	.main-item-hover{

		position:absolute;
		z-index: 999999;
		width: 95%;
		height: 116px;
		margin-top: 10px;
		text-align: left;
	}
.card{
	display: flex;
	justify-content: center;
	align-items: center;
}
.card-box{
	background-color: white;
	width: 90%;
	height: 218px;
	border-radius: 10px;
	border:solid  1px #C8C7CC;
	text-align: left;
	display:inline-block;
	padding: 5px;

}
</style>
