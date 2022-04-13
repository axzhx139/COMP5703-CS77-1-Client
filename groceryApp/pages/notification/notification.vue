<template>
	<view id="notification-page">
		<view id="title">
			<text style="margin-left: 1%; font-size: 28px;color: #000000;font-weight: 900;">inbox</text>
		</view>
		<view id="main-body" :style="{height: scrollerHeight}">
			<view id="inboxTop">
				<view>
					<text>Notification</text>
					<xfl-select :list="candidates"
								:clearable="false"
								:initValue="candidates[0]"
								:style_Container="'height: 20px;width: auto; text-align: left; padding: 5px; padding-right: 15px;'"
								@change="changeUnread">

					</xfl-select>
				</view>
				<view @click="markAllReaded">Mark all as Readed</view>
			</view>
			<scroll-view scroll-y="true" class="scroll-y" v-if="isUnread" :style="{height: scrollerYHeight}">
				<uni-row v-for="(item, index) in notificationData" :key=index>
					<uni-col v-if="item.unread" class="notificationCol">
						<uni-icons type="chat" size="30"></uni-icons>
						<!-- <view>
							<text decode='true'>
								Hi, your&ensp;&emsp;<b>{{item.name}}</b> added on
								<strong class="boldTest">{{item.addDate}}</strong> will get expired on
								<strong class="boldTest">{{item.remindDays}}</strong> days
							</text>
						</view> -->
						<text decode='true'>
							Hi, your {{item.name}} added on {{item.addDate}} will get expired on {{item.remindDays}} days
						</text>
						
					</uni-col>
					<u-divider half-width="60%"></u-divider>
				</uni-row>
			</scroll-view>
			<scroll-view scroll-y="true" class="scroll-y" v-if="!isUnread" :style="{height: scrollerYHeight}">
				<uni-row v-for="(item, index) in notificationData" :key=index>
					<uni-col v-if="!item.unread" class="notificationCol">
						<uni-icons type="chat" size="30"></uni-icons>
						<!-- <view>
							<text decode='true'>
								Hi, your&ensp;&emsp;<b>{{item.name}}</b> added on
								<strong class="boldTest">{{item.addDate}}</strong> will get expired on
								<strong class="boldTest">{{item.remindDays}}</strong> days
							</text>
						</view> -->
						<text decode='true'>
							Hi, your {{item.name}} added on {{item.addDate}} will get expired on {{item.remindDays}} days
						</text>
						
					</uni-col>
					<u-divider half-width="60%"></u-divider>
				</uni-row>
			</scroll-view>
			
			
		</view>

		<u-tabbar :list="tabbar" :mid-button="false" height="55px"></u-tabbar>
		<u-tabbar :list="tabbar" :mid-button="false"></u-tabbar>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				store: this.$store,
				tabbar: this.$store.state.tabbar,
				// notificationData: [],
				notificationData: [
					{
						"name": " apple ",
						"addDate": "2022/04/01",
						"remindDays": 2,
						"unread": true,
					},
					{
						"name": "banana",
						"addDate": "2022/04/02",
						"remindDays": 2,
						"unread": true,
					},
					{
						"name": "beef",
						"addDate": "2022/04/03",
						"remindDays": 1,
						"unread": true,
					},
					{
						"name": "lamb",
						"addDate": "2022/04/03",
						"remindDays": 1,
						"unread": false,
					}
				],
				candidates: ["unread", "readed"],
				isUnread: true,
				clientHeight: "",

			}
		},
		// created() {
		// 	console.log("user id is ", uni.getStorageSync('userId'))
		// 	this.getList()
		// },
		onLoad(option) {
			// console.log("user id is ", uni.getStorageSync('userId'))
			// this.getList()
			console.log(option)
			this.notificationData = JSON.parse(decodeURIComponent(option.notificationDataString));
			console.log('上一个页面传递过来的参数对象', this.notificationData );
		},
		computed: {
			// 滚动区高度 
			scrollerHeight: function() {
				console.log(window.innerHeight)
				return (window.innerHeight - 160) + 'px'; //自定义高度需求
			},
			scrollerYHeight: function() {
				console.log(window.innerHeight)
				return (window.innerHeight - 200) + 'px'; //自定义高度需求
			},
		},
		methods: {
			changeUnread(xflSelectResult) {
				console.log(xflSelectResult)
				if (xflSelectResult.newVal == this.candidates[0]) {
					this.isUnread = true
				} else if (xflSelectResult.newVal == this.candidates[1]) {
					this.isUnread = false
				}
				
			},
			markAllReaded() {
				for (let i=0; i<this.notificationData.length; i++) {
					this.notificationData[i].unread = false
				}
			},
			getList(){
				uni.request({
				url: "http://101.35.91.117:7884/notification/get/"+uni.getStorageSync('userId'),
				method: 'get',
				}).then(res=>{
					console.log(res)
					console.log('load',res[1].data)
					// this.shopList = res[1].data
					this.notificationData = res[1].data.itemNotificationList
				})
			},
		}
	}
</script>

<style>
	page {
		background-color: #B0C07A;
	}
	#notification-page {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
	}
	#title {
		display: flex;
		justify-content: center;
		text-align: center;
	}
	#main-body {
		background-color: white;
		width: 90%;
		border-radius: 10px;
		/* text-align: center; */
		padding: 10px;
	}
	#inboxTop {
		display: flex;
		font-family: 'Inter';
		font-style: normal;
		font-weight: 500;
		font-size: 14px;
		line-height: 20px;
		justify-content: space-between;
	}
	.notificationCol {
		min-height: 50px;
		display: flex;
		align-items: center;
	}
	.uni-icons {
		margin: 10px;
	}
</style>