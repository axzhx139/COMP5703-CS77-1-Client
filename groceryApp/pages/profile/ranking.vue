<template>
	<view>
		
		<view class="main-content">
			<view class="main-body" :style="{'height': deviceHeight + 'px'}">
				<view class="content" >
					<view class='rank-head'>
						<view class="rank-block" :class="['selected-item',allSelect?'selected-item':'un-select-item']">
							<text  @click="changeTab('all')">All</text>
						</view>
						<view class="rank-block" :class="[citySelect?'selected-item':'un-select-item']">
							<text  @click="changeTab('city')">City</text>
						</view>
					</view>
				</view>
				<view style="margin-top:10px;">
					<block>
						<view style="padding-top: 10px;color:#B0C07A">
							<text style="font-weight: 900;margin-left: 40px;float:left;">Rank</text>
							<text style="font-weight: 900;margin-left: 40px;float:left;">Name</text>
							<text style="font-weight: 900;margin-right: 40px;float:right;">Days</text>
							<div class="titleline"></div>
						</view>
					</block>
					
					<block v-for="(item,index) in ranking_list">
						
						<view :style="{'color': getcolor(index),'padding-top':'10px' }">
							<text style="font-weight: 900;margin-left: 40px;float:left;width: 40px;">{{getIndex(index)}}</text>
							<text style="font-weight: 900;margin-left: 40px;float:left;">{{item.name}}</text>
							<text style="font-weight: 900;margin-right: 50px;float:right;">{{item.rankingDays}}</text>
						</view>
						<div class="partingline"></div>
						<!-- <u-divider half-width="40%"></u-divider> -->
					</block>
				</view>
					<view class='my-content'>
						<view  class='rank-self'>
							<text style="line-height:45px;font-weight: 900;margin-left: 20px;float:left;">{{getIndex(my_rank.userRanking-1)}}</text>
							<text style="line-height:45px;font-weight: 900;margin-left: 30px;float:left;">{{my_rank.userName}}</text>
							
							<text style="font-style:italic;line-height:45px;font-weight: 600;margin-right: 20px;float:right;">({{my_rank.daysGap}}↑)</text>
							<text style="line-height:45px;font-weight: 900;margin-right: 5px;float:right;">{{my_rank.userRankingDays}}</text>
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
				deviceHeight: 0,
				allSelect:true,
				citySelect:false,
				ranking_list:[],
				my_rank:{},
				address:'null',
				useraddress:'',
			}
		},
		onLoad() {
			let deviceInfo = uni.getSystemInfoSync();
			this.deviceHeight = deviceInfo.windowHeight-80;
			uni.request({
				url: "http://101.35.91.117:7884/users/profile/"+uni.getStorageSync('userId'),
					method: 'get',
				}).then(res=>{
					if (this.useraddress=='None'|this.useraddress==null){
						this.useraddress='null'
					}else{
						var temp=res[1].data.address.split(',')
						this.useraddress = temp[temp.length-1]
					}
					console.log(this.useraddress)
					
			});
		},
		onShow(){
			this.getRankData()
		},
		methods: {
			onClickBtn(){
				
			},
			changeTab(e){
				if (e === 'all'){
					this.citySelect = false
					this.allSelect = true
					this.address='null'
					this.getRankData()
				}else if(e === 'city'){
					this.allSelect = false
					this.citySelect = true
					this.address=this.useraddress
					this.getRankData()
				}
			},
			getRankData(){
				uni.request({
					url: "http://101.35.91.117:7884/ranking/topTen/"+this.address,
					method: 'get',
				}).then(res=>{
					this.ranking_list = res[1].data.filter(x=>x['rankingDays']!=-1)
					console.log(this.ranking_list)
				})
				uni.request({
					url: "http://101.35.91.117:7884/ranking/previous/"+uni.getStorageSync('userId')+"/"+this.address,
					method: 'get',
				}).then(res=>{
					this.my_rank = res[1].data
					console.log(this.my_rank)
				})
			},
			
			getIndex(index){
				if (index==0){
					return '1st'
				}
				else if (index==1){
					return '2nd'
				}else if (index==2){
					return '3rd'
				}
				else{
					return index+1+'nd'
				}
			},
			getcolor(index){
				if (index==0){
					return 'red'
				}
				else if (index==1){
					return 'orange'
				}else if (index==2){
					return 'green'
				}
				else{
					return '#626262'
				}
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
		margin-top: 10px;
		background-color: white;
		width: 90%;
		border-radius: 10px;
		text-align: center;
	}
	.content{
		display: flex;
		justify-content: center;
		width: 100%;
	}
	.my-content{
		display: flex;
		justify-content: center;
		width: 100%;
	}
	.selected-item{
		font-size: 15px;
		font-weight: 900;
		color: black;
		background: #B0C07A;
	}
	.un-select-item{
		font-size: 12px;
		font-weight: 300;
		color: #545b66;
		background: #e5e5e5;
	}
	.rank-head{
		width: 80%;
		margin-top: 20rpx;
		border-radius: 10px;
		display: flex;
	}
	.rank-block{
		float:left;
		width: 80%;
		height:70rpx;
		margin-top: 20rpx;
		border-radius: 10px;
		display: flex;
		justify-content: center;
		flex-direction: column;
		text-align: center;
	}
	.partingline {
		width:80%;
		border: 1px solid #D5D5D5;
		margin:25px auto 10px auto
    }
	.titleline {
		width:80%;
		border: 1px solid #D5D5D5;
		margin:20px auto 5px auto
	}
	.rank-self{
		width: 80%;
		margin-top: 20rpx;
		border-radius: 10px;
		background: #B0C07A;
		height:45px;
		color:white;
		position:absolute;
		bottom:80px;
	}

</style>
