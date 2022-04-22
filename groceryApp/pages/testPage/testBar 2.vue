<template>
	<view>
		<view class="content" >
			<view v-if="result">{{ result }}</view>
			<button type="primary" @click="scan">扫一扫</button>
		</view>
	</view>
</template>
<script>
export default {
	data() {
		return {
			title: 'scanCode',
			result: ''
		};
	},
	methods: {
		async scan() {
			var mpaasScanModule = uni.requireNativePlugin("Mpaas-Scan-Module")
			
			mpaasScanModule.mpaasScan({
			                        // 扫码识别类型，参数可多选，qrCode、barCode，不设置，默认识别所有
			                        'scanType':  ['qrCode','barCode'],
			                        // 是否隐藏相册，默认false不隐藏
			                        'hideAlbum': false
			                    },
			                    (ret) => {
			                        uni.showModal({
			                            title: "弹窗标题",
			                            // 返回值中，resp_code 表示返回结果值，10：用户取消，11：其他错误，1000：成功
			                            // 返回值中，resp_message 表示返回结果信息
			                            // 返回值中，resp_result 表示扫码结果，只有成功才会有返回
			                            content: JSON.stringify(ret),
			                            showCancel: false,
			                            confirmText: "确定"
			                        })
			                    })
			// uni.scanCode({
			// 	success: function (res) {
			// 		console.log('条码类型：' + res.scanType);
			// 		console.log('条码内容：' + res.result);
			// 	}
			// });
		}
	}
};
</script>