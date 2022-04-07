<template>
	<view id="notification-page">
		<view id="title">
			<text style="margin-left: 1%; font-size: 28px;color: #000000;font-weight: 900;">inbox</text>
		</view>
		<view id="main-body">
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
			<view v-if="isUnread">
				<uni-row v-for="(item, index) in inboxData" :key=index>
					<uni-col v-if="item.unread" class="notificationCol">
						<uni-icons type="chat" size="30"></uni-icons>
						<!-- <view>
							<text decode='true'>
								Hi, your&ensp;&emsp;<b>{{item.name}}</b> added on
								<strong class="boldTest">{{item.addDate}}</strong> will get expired on
								<strong class="boldTest">{{item.expireDays}}</strong> days
							</text>
						</view> -->
						<text decode='true'>
							Hi, your {{item.name}} added on {{item.addDate}} will get expired on {{item.expireDays}} days
						</text>
						
					</uni-col>
					<u-divider half-width="60%"></u-divider>
				</uni-row>
			</view>
			<view v-if="!isUnread">
				<uni-row v-for="(item, index) in inboxData" :key=index>
					<uni-col v-if="!item.unread" class="notificationCol">
						<uni-icons type="chat" size="30"></uni-icons>
						<!-- <view>
							<text decode='true'>
								Hi, your&ensp;&emsp;<b>{{item.name}}</b> added on
								<strong class="boldTest">{{item.addDate}}</strong> will get expired on
								<strong class="boldTest">{{item.expireDays}}</strong> days
							</text>
						</view> -->
						<text decode='true'>
							Hi, your {{item.name}} added on {{item.addDate}} will get expired on {{item.expireDays}} days
						</text>
						
					</uni-col>
					<u-divider half-width="60%"></u-divider>
				</uni-row>
			</view>
			
			
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
				// inboxData: [],
				inboxData: [
					{
						"name": " apple ",
						"addDate": "2022/04/01",
						"expireDays": 2,
						"unread": true,
					},
					{
						"name": "banana",
						"addDate": "2022/04/02",
						"expireDays": 2,
						"unread": true,
					},
					{
						"name": "beef",
						"addDate": "2022/04/03",
						"expireDays": 1,
						"unread": true,
					},
					{
						"name": "lamb",
						"addDate": "2022/04/03",
						"expireDays": 1,
						"unread": false,
					}
				],
				candidates: ["unread", "readed"],
				isUnread: true,
				clientHeight: "",

			}
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
				for (let i=0; i<this.inboxData.length; i++) {
					this.inboxData[i].unread = false
				}
			}
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