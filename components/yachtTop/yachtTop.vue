<template>
	<view>
		<uv-navbar :fixed="false" :safeAreaInsetTop="true" leftIconSize="0rpx" title="游艇俱乐部">
			<template v-slot:left>
				<image src="../../static/返回.png" mode="" style="width: 40rpx;height: 40rpx;" v-if="isShow"
					@click="back"></image>
			</template>
			<template v-slot:center>
				<view style="display: flex;align-items: center;justify-content: center;">
					<image src="../../static/_r18_c4.jpg" style="width: 50rpx;height: 70rpx;"></image>
					<text style="margin:0 10rpx;">游艇俱乐部</text>
					<image src="../../static/二维码.png" style="width: 70rpx;height: 70rpx;" @click="openModal"></image>
				</view>
			</template>
		</uv-navbar>
		<!-- 弹出二维码 -->
		<uv-modal ref="modal" title="扫码加入" @confirm="confirm">
			<uv-qrcode ref="qrcode" size="300px" :value="value"></uv-qrcode>
		</uv-modal>
	</view>
</template>

<script>
import { onLoad } from 'uview-ui/libs/mixin/mixin';

export default {
	name: "yachtTop",
	data() {
		return {
			isShow: false,
			value:'',//二維碼地址
			userInfo:{},//用户信息
		};
	},
	methods: {
		// leftClick() {
		// 	console.log('leftClick');
		// }
		openModal() {
			this.$refs.modal.open();
			
		},
		confirm() {
			console.log('点击确认按钮');
		},
		back() {
			uni.navigateBack({ delta: 1 })
		},
		getUserInfo(){
			if(uni.getStorageSync('userInfo')){
				this.userInfo=uni.getStorageSync('userInfo')
				this.value='https://dpyt.cjpco.cn'+'/qrcode/myOrder/?user_id'+this.userInfo.id
			}
		}
	},
	created() {
		this.getUserInfo()
		let pages = getCurrentPages();
		let page = pages[pages.length - 1] || {};
		console.log(page, "当前页面");
		if (page.route == 'pageA/activitiesDetail/activitiesDetail' || page.route == 'pageA/productDetails/productDetails' || page.route == 'pageA/orderDetail/orderDetail' ||page.route == 'pageC/orderList/orderList' ||page.route == 'pageC/WalletList/WalletList'||page.route == 'pageC/takeMoney/takeMoney') {
			this.isShow = true
			console.log('显示返回',this.isShow);
		} else {
			this.isShow = false
			console.log(this.isShow);
		}
	},
	onLoad() {
		console.log('头部加载时');
	
	}


}
</script>

<style lang="scss">
// @mixin flex($direction: row) {
// 		/* #ifndef APP-NVUE */
// 		display: flex;
// 		/* #endif */
// 		flex-direction: $direction;
// 	}
// 	.uv-nav-slot {
// 		@include flex;
// 		align-items: center;
// 		justify-content: space-between;
// 		border-width: 0.5px;
// 		border-radius: 100px;
// 		border-color: #dadbde;
// 		padding: 3px 7px;
// 		opacity: 0.8;
// 	}</style>