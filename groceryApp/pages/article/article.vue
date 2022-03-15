<template>
	<view>
		<view class="main-content">
			<view class="main-body">
				<view class = "section">
					<text class = "title">{{info.title}}</text>
					<view class="main-item-img" style="width: 100%;text-align: center;" >
						<u-image border-radius="5px" height="116px" width="95%" :src="info.img" :fade="true" duration="450"></u-image>
					</view>
					<view class="divider"/>
	
				</view>
				<view class = "section">
					<text class = "subtitle">Credit</text>
					<view><text>{{info.credit}}</text></view>
				</view>
				<view class = "section">
					<text class = "subtitle">Source</text>
					<view><text style="width:90%;display:inline-block;white-space: pre-wrap; word-wrap: break-word;height: auto;">{{info.sourceUrl}}</text></view>
				</view>
				<view class = "section">
					<text class = "subtitle">Description</text>
					<view><text>{{info.summary}}</text></view>
				</view>
				<view class = "section">
					<text class = "subtitle">Ingrediants</text>
					<ul id="v-for-object" class="demo">
					  <li v-for="value in info.used">
					  {{ value.original}}
					  </li>
					</ul>
				</view>
				<view class = "section">
					<text class = "subtitle">Steps</text>
					<ul id="v-for-object" class="demo">
					  <li v-for="value in steps">
						{{ value.step}}
					  </li>
					</ul>
                    <view style="height: 30px;">
                    </view>
				</view>
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
				recipe: this.$store.state.recipeInfo,
				info:{},
				steps:{},
				used:{},
				instruction:'',
			}
		},
		onLoad(e) {
			// console.log(e); 
			console.log(this.recipe);
			let deviceInfo = uni.getSystemInfoSync();
			this.deviceHeight = deviceInfo.windowHeight;
			this.getRecipe(this.recipe,e.id);
			this.getRecipeById(e.id);
		},
		methods: {
			getRecipeById(id){
				uni.request({
				url: "https://api.spoonacular.com/recipes/"+id+"/information"+"?apiKey=6385d9e8c80541019fd4201bacea1f1f",
				method: 'get',
				}).then(res=>{
					console.log(res[1].data)
					
					this.info.summary=this.limitWords(res[1].data.summary);
					this.info.sourceUrl=res[1].data.sourceUrl;
					this.info.credit=res[1].data.creditsText;
					this.instruction=res[1].data.instructions;
					this.steps = res[1].data.analyzedInstructions[0].steps;
				})
			},
			getRecipe(itemList,id){
				for (var i=0;i<itemList.length;i++){
					if (itemList[i].id==id){
						var item = itemList[i]
						var recipeInfo ={
							"title": item.title,
							"img": item.image,
							"summary": "You just peel the sweet potatoes, slice them into 1/4-inch slices, paint them with olive oil, sprinkle on some salt, and place on a hot grill.",
							'used': item.usedIngredients,
							'need': item.missedIngredients,
							'sourceUrl':'',
							'credit':'',
						}
						this.info=recipeInfo
						break
					}
				}

			},
			limitWords(txt){
			    var str = txt;
				var reg = /<[^<>]+>/g;
			    str = str.substr(0,250) + '...';
				str = str.replace(reg, '');
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
.section{
	margin-top: 5%;
	margin-left:3%;
	margin-right:3%;
	text-align: left;
}
.title{
	margin-top: 5%;
	font-size:25px;
	color: #32325D;
}
.subtitle{
	margin-top: 5%;
	font-size:22px;
	color: #32325D;
}
.des{
	
}
.divider{
	 background: #E0E3DA;
	 margin-top: 1%;
	 margin-bottom: 5%;
	 width: 95%;
	 height: 5rpx;
	}
</style>
