<template>
	<view id="notification-page">
		<view id="title">
			<text style="margin-left: 1%; font-size: 28px;color: #000000;font-weight: 900;">inbox</text>
		</view>
		<view id="main-body">
			<uni-row v-for="(item, index) in inboxData" :key=index>
				<uni-col v-if="item.unread">
					Hi, your {{item.name}} will get expired on {{item.expireDays}} days
				</uni-col>
			</uni-row>
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
						"name": "apple",
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
				]

			}
		},
		methods: {

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
		padding-left: 5px;
	}
</style>