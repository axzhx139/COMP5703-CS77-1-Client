<template>
	<view>
		<view id="title">
			<text style="margin-left: 1%; font-size: 28px;color: #000000;font-weight: 900;">inbox</text>
		</view>
		<view>
			<uni-row v-for="(item, index) in inboxData" :key=index>
				<uni-col v-if="item.unread">item.name</uni-col>
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

	#title {
		display: flex;
		justify-content: center;
		text-align: center;
	}
</style>