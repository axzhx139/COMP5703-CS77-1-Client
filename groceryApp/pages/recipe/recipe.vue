<template>
	<view>
		<hx-navbar ref="hxnb" :config="config" @clickBtn="onClickBtn">
		</hx-navbar>
		
		<view class="main-content">
			<view class="main-body" :style="{'height': deviceHeight + 'px'}">
			<!-- <view class="main-body"> -->
				<u-search placeholder="Search Ingredient" :show-action="true" actionText="search" height="80" v-model="searchIngre" @custom="searchRecipe()"></u-search>
				<block v-for="(item, index) in itemList">
					<view class="" v-if="index == 0" @click="toDetail(item.itemId)">
						<view style="text-align: left;margin-left: 25px;margin-top: -5px;font-weight: 600;font-size: 25px;">
							<text >{{item.title}}</text>
						</view>
						<view class="main-item" >
							<view class="main-item-img" style="width: 100%;text-align: center;" >
								<u-image class="actual-img" border-radius="5px" height="116px" width="95%" :src="item.img" :fade="true" duration="450"></u-image>
							</view>
							<view class="main-item-hover">
								<view style="height: 47%;"></view>
								<text style="color: #000000;margin-left: 14px;font-size: 16px;font-weight: 500;">{{ limitWords(item.name) }}</text>
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
					
					
					
				</block>
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
			this.getAllRecipe();
		},
		methods: {
			onClickBtn(){
				
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
					
					if (used.includes(ingre)) {
						console.log("111" + ingre)
						List.push(recipeInfo);
					}
					
				}
				this.searchList=List;
			},
			limitWords(txt){
			    var str = txt;
				var reg = /<[^<>]+>/g;
				if (str.length >= 40){
					str = str.substr(0,40) + '...';
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
		background-color: white;
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
		/* background-color: #4CD964; */
		z-index: 999999;
		width: 95%;
		height: 116px;
		margin-top: 10px;
		text-align: left;
	}

</style>
