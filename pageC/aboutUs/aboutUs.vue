<template>
    <view class="aboutUs">
		<!-- 头部自定义导航栏 -->
		<uv-navbar :fixed="false" :safeAreaInsetTop="true" leftIconSize="0rpx" title="游艇俱乐部">
			<template v-slot:center>
				<view>{{text}}</view>
			</template>
			<template v-slot:left>
				<image src="/static/返回.png" mode="" style="width: 40rpx;height: 40rpx;" @click="back"></image>
			</template>
		</uv-navbar>
		<!-- 头部图 -->
        <view style="width: 100%;border: 1px solid white;">
			<view v-html="content"></view>
		</view>
	</view>
</template>

<script>
import {getAboutUs} from '@/api/index.js'
export default {
	data() {
		return {
			text:'',//导航栏中的文字	
			content:'',//页面内容html	
		};
	},
	onLoad(options) {
	
		console.log('user页面点击传过来的item',options);
		let newObj = JSON.parse(decodeURIComponent(options.obj))
		console.log('转化后的newObj', newObj);
		this.text=newObj.text
		this.getAboutUsData()

	},
	methods: {

		back() {
			uni.navigateBack({
				delta: 1
			})
		},
		//获取关于我们数据
		getAboutUsData(){
			getAboutUs({id:58}).then(res=>{
				console.log('关于我们',res);
				if(res.code==1){
					this.content=res.data.content
					console.log("页面内容html", this.content)
				}
			})
		}


	},
}
</script>

<style lang="scss">


</style>