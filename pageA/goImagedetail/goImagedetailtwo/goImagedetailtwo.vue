<template>
    <view class="goImagedetailtwo">
		<!-- 自定义导航 -->
        <uv-navbar :fixed="false" :safeAreaInsetTop="true" leftIconSize="0rpx" title="游艇俱乐部">
			<template v-slot:center>
				<view>{{title}}</view>
			</template>
			<template v-slot:left>
				<image src="/static/返回.png" mode="" style="width: 40rpx;height: 40rpx;" @click="back"></image>
			</template>
		</uv-navbar>
		<view class="floorImage" :style="{ 'background-image': 'url(' + floorImage + ')' }">
			<!-- 活动规则定位右边 -->
			<view class="activeRule" @click="open">
				<view>活</view>
				<view>动</view>
				<view>规</view>
				<view>则</view>
			</view>
			<!--弹出框活动规则  -->
			<view>
				<uv-popup ref="popup" @change="change" :close-on-click-overlay="true">

					<view style="position: relative; height: 400rpx;overflow: auto;">
						<image src="/static/关闭.png" mode="scaleToFill"
							style="width: 50rpx;height: 50rpx;position: absolute;right: 10rpx;" @click="close" />
						<view class="title"
							style="width: 160rpx;border: 1px solid red;margin: 0 auto;font-size: 40rpx;font-weight: bold;">
							活动规则
						</view>

						<view v-for="item in 11" style="width: 690rpx; margin: 0 auto;padding: 10rpx;">
							1:参与方式:活动期间，用户进入百岛游活动主页面可直接领取优惠</view>
					</view>
				</uv-popup>
			</view>
		</view>
		<view style="width: 100%; height: 2000rpx;background-color: #c0b49a;">
			<view
				style="width: 110rpx;height: 70rpx; margin:auto;padding: 25rpx; font-size: 50rpx;color: white;font-weight: bold;">
				游艇
			</view>
			<!--游艇套餐展示 -->
			<view class="Combolist" style="width: 100%;height: 430rpx;">
				<view v-for="item in yacht" :key="item.id"
					style="position: relative; display: flex;width: 680rpx;height: 200rpx;margin:15rpx auto;background-color: white;border-radius: 10rpx;">
					<image :src="`https://dpyt.cjpco.cn/${item.product_img}`" mode="scaleToFill"
						style="width: 200rpx;height: 180rpx;margin: 10rpx;" />
					<view>
						<view style="font-weight: bold;font-size: 34rpx;">{{ item.name }}</view>
						<view style="font-size: 20rpx;">{{ item.describe }}</view>
						<text
							style="border: 1px solid black;padding: 5rpx;margin: 5rpx 10rpx;font-size: 20rpx;">无购物</text>
						<text
							style="border: 1px solid black;padding: 5rpx;margin: 5rpx 10rpx;font-size: 20rpx;">无购物</text>
						<view style="font-size: 25rpx;font-weight: bold;color: red;margin-top: 10rpx;">￥{{ item.price }}
						</view>
					</view>
					<view
						style="position: absolute;bottom: 20rpx;right: 10rpx;background-color: #fe5633;color: white;border-radius: 30rpx;padding: 15rpx;">
						抢购</view>
				</view>

			</view>
			<!-- 别墅 -->
			<view
				style="width: 110rpx;height: 70rpx; margin:auto;padding: 25rpx; font-size: 50rpx;color: white;font-weight: bold;">
				别墅
			</view>
			<!--别墅套餐展示 -->
			<view class="Combolist" style="width: 100%;height: 430rpx;">
				<view v-for="item in villa" :key="item.id"
					style="position: relative; display: flex;width: 680rpx;height: 200rpx;margin:15rpx auto;background-color: white;border-radius: 10rpx;">
					<image :src="`https://dpyt.cjpco.cn/${item.product_img}`" mode="scaleToFill"
						style="width: 200rpx;height: 180rpx;margin: 10rpx;" />
					<view>
						<view style="font-weight: bold;font-size: 34rpx;">{{ item.name }}</view>
						<view style="font-size: 20rpx;">{{ item.describe }}</view>
						<text
							style="border: 1px solid black;padding: 5rpx;margin: 5rpx 10rpx;font-size: 20rpx;">无购物</text>
						<text
							style="border: 1px solid black;padding: 5rpx;margin: 5rpx 10rpx;font-size: 20rpx;">无购物</text>
						<view style="font-size: 25rpx;font-weight: bold;color: red;margin-top: 10rpx;">￥{{ item.price }}
						</view>
					</view>
					<view
						style="position: absolute;bottom: 20rpx;right: 10rpx;background-color: #fe5633;color: white;border-radius: 30rpx;padding: 15rpx;">
						抢购</view>
				</view>

			</view>

			<!-- 钓鱼艇 -->
			<view style="width: 160rpx;height: 70rpx; margin:auto;padding: 25rpx; font-size: 50rpx;color: white;font-weight: bold;">
				钓鱼艇
			</view>
			<!--钓鱼艇套餐展示 -->
			<view class="Combolist" style="width: 100%;height: 430rpx;">
				<view v-for="item in villa" :key="item.id"
					style="position: relative; display: flex;width: 680rpx;height: 200rpx;margin:15rpx auto;background-color: white;border-radius: 10rpx;">
					<image :src="`https://dpyt.cjpco.cn/${item.product_img}`" mode="scaleToFill"
						style="width: 200rpx;height: 180rpx;margin: 10rpx;" />
					<view>
						<view style="font-weight: bold;font-size: 34rpx;">{{ item.name }}</view>
						<view style="font-size: 20rpx;">{{ item.describe }}</view>
						<text
							style="border: 1px solid black;padding: 5rpx;margin: 5rpx 10rpx;font-size: 20rpx;">无购物</text>
						<text
							style="border: 1px solid black;padding: 5rpx;margin: 5rpx 10rpx;font-size: 20rpx;">无购物</text>
						<view style="font-size: 25rpx;font-weight: bold;color: red;margin-top: 10rpx;">￥{{ item.price }}
						</view>
					</view>
					<view
						style="position: absolute;bottom: 20rpx;right: 10rpx;background-color: #fe5633;color: white;border-radius: 30rpx;padding: 15rpx;">
						抢购</view>
				</view>

			</view>

			<!--顶配集团倾力打造背景图  -->
			<view class="DPGroup" style=" display: flex;justify-content: center; width: 750rpx;height: 544px;background-repeat: no-repeat;background-size: 375px 550px;background-position: center;position: relative;border: 0.1rpx solid white;"  :style="{ 'background-image': 'url(' + DPGroupImg + ')' }">
				<video :src="DPVideo"  style="margin-top: 115rpx; width: 680rpx;height: 400rpx;border-radius: 20rpx;"/>
			</view>

		</view>
    </view>
 </template>
 
 <script>
import { getActivitiesThree } from '@/api/index'
 export default {
     data() {
         return {
			floorImage: '',//底部背景图
           	title:'',
			DPGroupImg: '',//鼎配集团背景图
			DPVideo:'',//鼎配集团介绍视频
			yacht:[],//游艇数据
			villa:[],//别墅数据
			fishingVessel:[],//钓鱼艇数据

         }
     },
     methods:{
        back() {
			uni.navigateBack({
				delta: 1
			})
		},
		open() {
			this.$refs.popup.open('bottom');
		},
		change(e) {
			console.log('弹窗状态改变：', e);
		},
		close() {
			this.$refs.popup.close();
		},
		getActivitiesData(){
			getActivitiesThree().then(res => {
				console.log("🚀 ~ getActivitiesTwo ~ res 首页轮播图3:", res)
				if(res.code==1){
					this.floorImage='https://dpyt.cjpco.cn/' + res.data.activity.picture
					this.DPGroupImg='https://dpyt.cjpco.cn/' + res.data.activity.picture1
					this.DPVideo='https://dpyt.cjpco.cn/' + res.data.activity.video
					console.log("鼎配集团背景图", this.DPGroupImg)
					console.log("底部背景图", this.floorImage)
					console.log("鼎配集团video", this.DPVideo)
					
					this.yacht=res.data.product_type[0].product
					console.log("游艇的数据", this.yacht)

					this.villa=res.data.product_type[1].product
					console.log("别墅的数据", this.villa)

					this.fishingVessel=res.data.product_type[3].product
					console.log("钓渔船的数据", this.fishingVessel)


				}
				
			})
		}
     },
     onLoad(e) {
		//用户在首页点击轮播 传入过来的item 从这边接收
		console.log("🚀 ~ onLoad ~ e:", e)
		let newObj = JSON.parse(decodeURIComponent(e.obj)) //decodeURIComponent 前面用了${encodeURIComponent(obj)} 需要转换一次
		// let newObj=JSON.parse(options.obj)
		console.log('转化后的newObj', newObj);
		this.title=newObj.title
		// this.floorImage = 'https://dpyt.cjpco.cn/' + newObj.picurl
		// console.log("🚀 ~ onLoad ~  this.floorImage:", this.floorImage)
		this.getActivitiesData()

	},
     
 }
 </script>
 
 <style lang="scss">
.floorImage {
	width: 750rpx;
    height: 623rpx;
    background-repeat: no-repeat;
    background-size: 750rpx 623rpx;
    background-position: center;
    position: relative;
    border: 0.1rpx solid;

	.activeRule {
		width: 75rpx;
		height: 143rpx;
		background-color: #f9d492;
		position: absolute;
		top: 150rpx;
		right: 0rpx;
		border-radius: 10px 0 0 10px;
		font-size: 32rpx;
		text-align: center;
		color: white;
		line-height: 37rpx;
		list-style: none;

	}

}
 </style>