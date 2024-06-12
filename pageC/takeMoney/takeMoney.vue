<template>
	<view class="takeMoney">
		<yachtTop></yachtTop>
		<view style="display: flex; justify-content: flex-end;">
			<view style="margin-top: 20rpx;">提现记录</view>
		</view>
		<view style="margin: 90rpx auto;width: 400rpx;display: flex;flex-direction: column;align-items: center;height: 200rpx;">
			<view>我的佣金(元)</view>
			<view style="font-size: 70rpx;font-weight: bold;">￥0.00</view>
			<view style="color: orange;text-decoration: underline;">切换到分红</view>
		</view>
		<view style="font-weight: bold;display: flex;align-items: center;">
			<image
				src="../../static/微信支付.png"
				mode="scaleToFill" style="width: 60rpx;height: 60rpx;margin-right: 10rpx;"
			/>
			<span>选择提现金额</span>
		</view>
		<!-- 多选框 -->
		<view style="width: 690rpx;height: 450rpx;margin: 20rpx auto;display: flex; flex-wrap: wrap;justify-content: space-around;align-items: center;">
			<view class="one">
				<view class="price">131.00</view>
				<view style="display: flex;align-items: center;">
					<image
				src="../../static/微信支付.png"
				mode="scaleToFill" style="width: 50rpx;height: 50rpx;margin-right: 10rpx;"
			/>
			<span>微信打款</span>
				</view>
			</view>
			<view class="one">
				<view class="price">131.00</view>
				<view style="display: flex;align-items: center;">
					<image
				src="../../static/微信支付.png"
				mode="scaleToFill" style="width: 50rpx;height: 50rpx;margin-right: 10rpx;"
			/>
			<span>微信打款</span>
				</view>
			</view>
			<view class="one">
				<view class="price">131.00</view>
				<view style="display: flex;align-items: center;">
					<image
				src="../../static/微信支付.png"
				mode="scaleToFill" style="width: 50rpx;height: 50rpx;margin-right: 10rpx;"
			/>
			<span>微信打款</span>
				</view>
			</view>
			<view class="one">
				<view class="price">131.00</view>
				<view style="display: flex;align-items: center;">
					<image
				src="../../static/微信支付.png"
				mode="scaleToFill" style="width: 50rpx;height: 50rpx;margin-right: 10rpx;"
			/>
			<span>微信打款</span>
				</view>
			</view>
		</view>
		

		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss">
.one{
	width: 300rpx;
	height: 200rpx;
	border: 3px solid rgb(173, 166, 166);
	border-radius: 20rpx;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
}
.price{
	font-size: 55rpx;
	font-weight: bold;
}
</style>
