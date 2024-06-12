<template>
    <view class="joiningBonus" style="position: relative;">
		<!-- 头部自定义导航栏 -->
		<uv-navbar :fixed="false" :safeAreaInsetTop="true" leftIconSize="0rpx" title="游艇俱乐部">
			<template v-slot:center>
				<view>{{text}}</view>
			</template>
			<template v-slot:left>
				<image src="/static/返回.png" mode="" style="width: 40rpx;height: 40rpx;" @click="back"></image>
			</template>
		</uv-navbar>
       <image src="/static/shangjia.png" mode="scaleToFill" style="width: 100%;height: 800rpx;"/>
	   <!-- 橙色背景 -->
	   <view style="margin-top: -10rpx;width: 100%;height: 1500rpx;background-color: #f66e53;position: relative;border: 1px solid #f66e53;">
			<view style="background-color: #ff2b2b;width: 165px;height: 33px;text-align: center;line-height: 33px;position: absolute;margin-top: -11px;border-radius: 27px;top: -12rpx;left: 210rpx;color: white;">快速答疑</view>
			<view style=" background-color: white;;display: flex;flex-direction: column;align-items: center;justify-content: space-around; margin-top: 50rpx;border: 5px solid #fe9c99;width: 690rpx;height: 500rpx;margin: 0 auto ;border-radius: 20rpx;">
				<!-- 入驻所需材料 -->
				<!-- 入驻流程操作 -->
				<view v-for="item in 2" :key="item" style=" background-color: #fe6158;border-radius: 20rpx;;width: 600rpx;height: 200rpx;margin-top: 10rpx;">
					<view style="padding: 10rpx;color: white;">入驻所需材料</view>
					<view style="padding: 10rpx;color: white;">手把手教你准备材料，助你-次通过</view>
					<view style="padding: 10rpx;color: white;">入驻亨流量扶持、助力开启生意增长之路</view>
				</view>

			</view>
			<!-- 常见问题 -->
			<view style="background-color: #ff2b2b;width: 165px;height: 33px;text-align: center;line-height: 33px;position: absolute;margin-top: -11px;border-radius: 27px;top: 580rpx;left: 210rpx;color: white;">常见问题</view>
			<view style="color: #f66e53; border: 5px solid #fe9c99;width: 695rpx;height: 690rpx;margin: 70rpx auto ;border-radius: 20rpx;background-color: white;">
				<image src="/static/打勾.png" mode="scaleToFill" style="width: 30rpx;height: 30rpx;margin-bottom: -30rpx;margin-left: 36rpx;"/>
				<view style="font-size: 25rpx;margin-left: 85rpx;">第一步，登录账户</view>
				<view style="font-size: 25rpx;margin-left: 50rpx;border-left: 1px solid red;padding: 30rpx;">使用手机号验证码登录即可</view>

				<image src="/static/打勾.png" mode="scaleToFill" style="width: 30rpx;height: 30rpx;margin-bottom: -30rpx;margin-left: 36rpx;"/>
				<view style="font-size: 25rpx;margin-left: 85rpx;">第二步,提交资料</view>
				<view style="font-size: 25rpx;margin-left: 50rpx;border-left: 1px solid red;padding: 30rpx;">提交营业执照,法人/经营者身份证明,店铺LOGO</view>

				<image src="/static/打勾.png" mode="scaleToFill" style="width: 30rpx;height: 30rpx;margin-bottom: -30rpx;margin-left: 36rpx;"/>
				<view style="font-size: 25rpx;margin-left: 85rpx;">第三步,平台审核</view>
				<view style="font-size: 25rpx;margin-left: 50rpx;border-left: 1px solid red;padding: 30rpx;">平台进行资质审核</view>

				<image src="/static/打勾.png" mode="scaleToFill" style="width: 30rpx;height: 30rpx;margin-bottom: -30rpx;margin-left: 36rpx;"/>
				<view style="font-size: 25rpx;margin-left: 85rpx;">第四步,开店完成</view>
				<view style="font-size: 25rpx;margin-left: 50rpx;padding: 30rpx;">审核通过后可以生成收款二维码,可以开始正常营业了</view>

				<view style="background-color: #ff2b2b;width: 165px;height: 33px;text-align: center;line-height: 33px;position: absolute;margin-top: -11px;border-radius: 27px;bottom: 80rpx;left: 210rpx;color: white;">入驻顶配游艇</view>
			</view>






















			
	   </view>
	  
	
	
	 
	 
	 
	 
	 </view>
</template>

<script>

export default {
	data() {
		return {
			text:'',//导航栏中的文字			
		};
	},
	onLoad(options) {
	
		console.log('user页面点击传过来的item',options);
		let newObj = JSON.parse(decodeURIComponent(options.obj))
		console.log('转化后的newObj', newObj);
		this.text=newObj.text

	},
	methods: {

		back() {
			uni.navigateBack({
				delta: 1
			})
		},


	},
}
</script>

<style lang="scss">


</style>