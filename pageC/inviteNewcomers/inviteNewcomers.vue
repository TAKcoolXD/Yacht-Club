<template>
    <view class="inviteNewcomers">
		<!-- 头部自定义导航栏 -->
		<uv-navbar :fixed="false" :safeAreaInsetTop="true" leftIconSize="0rpx" title="游艇俱乐部">
			<template v-slot:center>
				<view>{{text}}</view>
			</template>
			<template v-slot:left>
				<image src="/static/返回.png" mode="" style="width: 40rpx;height: 40rpx;" @click="back"></image>
			</template>
		</uv-navbar>
        <view style="width: 700rpx;height: 600rpx;margin: 15rpx auto;border-radius: 20rpx;display:flex;align-items: center;flex-direction: column;">
			<view style="width: 700rpx;height: 100rpx;text-align: center;line-height: 100rpx;margin-bottom: 20rpx;">邀请好友加入我们，一起分享喜悦</view>
			<view style="width: 700rpx;height: 100rpx;border: 1px solid red;text-align: center;line-height: 100rpx;border-radius: 20rpx;margin-top: 40rpx;background-color: #e43748;color: white;">面对面邀请</view>
			<view style="width: 700rpx;height: 100rpx;border: 1px solid red;text-align: center;line-height: 100rpx;border-radius: 20rpx;margin-top: 40rpx;background-color: #e43748;color: white;">一键邀请好友</view>
			<view style="width: 700rpx;height: 100rpx;border: 1px solid red;text-align: center;line-height: 100rpx;border-radius: 20rpx;margin-top: 40rpx;background-color: #e43748;color: white;">绑定上级</view>
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