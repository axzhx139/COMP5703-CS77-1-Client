<template>
	<view>
		<view class="main-content">
			<view class="main-body">
				<view class = "section">
					<view class="main-item-img" style="width: 100%;text-align: center;" >
						<u-image border-radius="5px" height="116px" width="95%" :src="'http://'+uni.getStorageSync('ip')+'/item/picture/'+product.itemId+'?'+Math.random()" :fade="true" duration="450"></u-image>
					</view>
					<view class="divider"/>
	
				</view>
				<view class = "section">
					<text class = "subtitle"> N a m e</text><text class = "content">{{product.name}}</text>
				</view>
				<view class = "section">
					<text class = "subtitle">Category</text><text class = "content">{{product.category}}</text>
				</view>
				<view class = "section">
					<text class = "subtitle">add-Date</text><text class = "content">{{getDate(product.addDate,'min')}}</text>
				</view>
				<view class = "section">
					<text class = "subtitle">exp-Date</text><text class = "content">{{ getDate(product.expDate,'day')}}</text>
				</view>
				<view class = "section">
					<text class = "subtitle">remindTime</text><text class = "content">{{ getDate(product.remindTime,'day')}}</text>
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
				// recipe: this.$store.state.recipeInfo,
				product:{},
			}
		},
		onLoad(e) {
			console.log(e); 
			this.getProductById(e.id);
		},
		methods: {
			getProductById(id){
				console.log(id)
				uni.request({
				url: "http://"+uni.getStorageSync('ip')+"/item/"+id,
				method: 'get',
				}).then(res=>{
					this.product = res[1].data
					console.log(res[1].data.name)
					console.log(res[1].data.addDate)
					console.log(res[1].data.conDate)
					console.log(res[1].data.expDate)
					console.log(res[1].data.status)
					console.log(res[1].data.category)
					console.log(res[1].data.picture)
					console.log(res[1].data.remindTime)
					console.log(this.product)
				})
				
			},
			getDate(time,type){
				var dt = new Date(time)
				var year = dt.getFullYear();
				var month = dt.getMonth()+1;
				var day = dt.getDate();
				var hour = dt.getHours();
				var minut = dt.getMinutes();
				var second = dt.getSeconds();
				month =  month < 10 ? "0"+month : month;
				day =  day < 10 ? "0"+day : day;
				hour =  hour < 10 ? "0"+hour : hour;
				minut =  minut < 10 ? "0"+minut : minut;
				second =  second < 10 ? "0"+second : second;
				if(type=='min')
					var res = day+'-'+month+'-'+year+' '+hour+':'+minut
				else if(type='day')
					var res = day+'-'+month+'-'+year
				return res
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
	margin-top: 20px;
	margin-bottom: 20px;
	margin-left:3%;
	margin-right:3%;
	text-align: left;
}
.title{
	margin-top: 10px;
	font-size:25px;
	color: #32325D;
}
.subtitle{
	float:left;
	font-size:22px;
	color: #32325D;
	width:140px;
}
.content{
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
