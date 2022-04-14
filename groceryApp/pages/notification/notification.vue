<template>
	<view id="notification-page">
		<view id="title">
			<text style="margin-left: 1%; font-size: 28px;color: #000000;font-weight: 900;">inbox</text>
		</view>
		<view id="main-body" :style="{height: scrollerHeight}">
			<view id="inboxTop" v-if="isUnread" >
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
			<view id="inboxTop" v-if="!isUnread" >
				<view>
					<text>Notification</text>
					<xfl-select :list="candidates"
								:clearable="false"
								:initValue="candidates[0]"
								:style_Container="'height: 20px;width: auto; text-align: left; padding: 5px; padding-right: 15px;'"
								@change="changeUnread">

					</xfl-select>
				</view>
				<!-- <view @click="markAllReaded">Mark all as Readed</view> -->
			</view>
			<scroll-view scroll-y="true" class="scroll-y" v-if="isUnread" :style="{height: scrollerYHeight}">
				<uni-row v-for="(item, index) in notificationData" :key=index>
					<uni-col v-if="item.unread" class="notificationCol" @click="markAsReaded(index)">
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
						<uni-icons type="checkmarkempty" size="30" @click="markAsReaded(index)"></uni-icons>
						
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
import uniIcons from '../../components/uni-icons/uni-icons.vue';
	export default {
  components: { uniIcons },
		data() {
			return {
				store: this.$store,
				tabbar: this.$store.state.tabbar,
				// notificationData: [],
				notificationData: [
					{
						"name": " apple ",
						"itemId": 2,
						"addDate": "2022/04/01",
						"remindDays": 2,
						"unread": true,
					},
					{
						"name": "banana",
						"itemId": 2,
						"addDate": "2022/04/02",
						"remindDays": 2,
						"unread": true,
					},
					{
						"name": "beef",
						"itemId": 2,
						"addDate": "2022/04/03",
						"remindDays": 1,
						"unread": true,
					},
					{
						"name": "lamb",
						"itemId": 2,
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
			// console.log(option)
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
			getList() {
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
			async markAsReaded(index) {
				var toReadedItemId = this.notificationData[index].itemId
				console.log(index)
				console.log("item id is: ", toReadedItemId)
				// this.notificationData[index].unread = false
				var res = await uni.request({
					method:'POST',
					url:'http://101.35.91.117:7884/notification/post/' + toReadedItemId,
					// data: 2
				})
				// 获取后端返回的数据
				// -1:already readed, 0: itemId not exist, 1: success
				var data = res[1].data
				console.log("res[1] is :", res[1])
				console.log("res[1].data is :", res[1].data)
				if (data == 1) {
					this.notificationData[index].unread = false
					// this.$set(this.notificationData[index], unread, false)
				} else if (data == -1) {
					console.log("already checked!")
				} else if (data == 0) {
					console.log("item not exist in database!")
				}
			},
			async markAllAsReaded() {
				let itemIdList = []
				for (let i=0; i<this.notificationData.length; i++) {
					itemIdList.push(this.notificationData[i].itemId)
				}
				console.log(index)
				console.log("itemIdList is: ", itemIdList)
				var res = await uni.request({
					method:'POST',
					url:'http://101.35.91.117:7884/notification/postList',
					data:JSON.stringify({"itemIdList": itemIdList})
				})
				var data = res[1].data
				
				console.log("res is :", res)
				if (data == 1) {
					for (let i=0; i<this.notificationData.length; i++) {
						this.notificationData[i].unread = false
					}
				} else if (data == -1) {
					console.log("already checked!")
				} else if (data == 0) {
					console.log("item not exist in database!")
				}
				// this.getCol()
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