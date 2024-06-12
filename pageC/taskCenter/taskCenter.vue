<template>
    <view class="taskCenter">
		<!-- 头部自定义导航栏 -->
		<uv-navbar :fixed="false" :safeAreaInsetTop="true" leftIconSize="0rpx" title="游艇俱乐部">
			<template v-slot:center>
				<view>{{text}}</view>
			</template>
			<template v-slot:left>
				<image src="/static/返回.png" mode="" style="width: 40rpx;height: 40rpx;" @click="back"></image>
			</template>
		</uv-navbar>
        <view style="width: 100%;height: 60rpx;border-bottom: 0.01rpx solid #ecedee;padding: 10rpx;line-height: 60rpx;display: flex;align-items: center;">
			<view style="width: 9rpx;height: 30rpx;background-color: #0f8beb;margin-left: 30rpx;"></view>
			<span class="taskCenter-title" style="margin-left: 10rpx;">推荐任务</span>
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