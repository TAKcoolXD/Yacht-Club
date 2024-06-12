<template>
	<view class="WalletList">
		<yachtTop></yachtTop>
		<view style="background-color: #bfd2fd;height: 1500rpx;">
			<view style="width: 680rpx;margin: 0 auto;display: flex;justify-content: space-between;padding: 20rpx;"
				height="1000rpx;">
				<view style="font-size: 40rpx;font-weight: bold;margin-top: 30rpx;">{{ nickname }}的钱包</view>
				<view
					style="background-color: white;font-size: 25rpx;width: 75rpx;height: 40rpx;border-radius: 15rpx;padding: 5rpx;line-height: 40rpx;margin-top: 30rpx;">
					未实名</view>
			</view>
			<view
				style="width: 690rpx; height: 250rpx;margin: 40rpx auto; border-radius: 10rpx;background-color: #498ffe;color: white;border: 1px solid #498ffe;">
				<view style="margin: 30rpx 10rpx;">总资产（元）</view>
				<view style="margin-left: 40rpx;">{{ dividends }}</view>
				<view style="display: flex;justify-content: space-between;width: 400rpx;margin:  0 auto;">
					<view>分红</view>
					<view>佣金</view>
				</view>
				<view style="display: flex;justify-content: space-between;width: 400rpx;margin:  0 auto;">
					<view>{{ dividends }}</view>
					<view>{{ commission }}</view>
				</view>
			</view>
			<view @click="gotakeMoney"
				style="width: 350rpx;height: 60rpx;text-align: center ; line-height: 60rpx;background-color: white;margin: 60rpx auto;">
				提现</view>
		</view>
	</view>
</template>

<script>
import { total } from '@/api/index.js'
export default {
	data() {
		return {
			nickname: '',//（昵称）
			real: '',//（实名）
			money: '',//（余额）
			already_golden: "",//（已提现）
			commission: "",//（佣金）
			dividends: "",//（分红）
			examine: '',//（审核中）
			integral: "",//（积分）
		};
	},
	onLoad(options) {
		total({
			user_id: uni.getStorageSync('userInfo').id
		}).then(res => {
			if (res.code == 1) {
				this.nickname = res.data.business.nickname;
				this.real = res.data.business.real;
				this.money = res.data.business.money;
				this.already_golden = res.data.business.already_golden;
				this.commission = res.data.business.commission
				this.dividends = res.data.business.dividends
				this.examine = res.data.business.examine
				this.integral = res.data.business.integral

			}
		})
	},
	methods: {
		gotakeMoney() {
			console.log('点击提现');
			uni.navigateTo({
				url: `/pageC/takeMoney/takeMoney`
			})
		}
	}

}
</script>

<style lang="scss"></style>
