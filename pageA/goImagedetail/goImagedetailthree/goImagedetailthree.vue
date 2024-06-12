<template>
	<view class="goImagedetailthree">
		<!-- 自定义导航 -->
		<uv-navbar :fixed="false" :safeAreaInsetTop="true" leftIconSize="0rpx" title="游艇俱乐部">
			<template v-slot:center>
				<view>{{ title }}</view>
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
		<view style="background-color:#0a409e;height: 3000rpx;">
			<!--单程 -->
			<view class="one-way" style="width:720rpx;height: 600rpx;margin: 0 auto;border-radius: 20rpx;background-color:#61d7f3 ;border: 0.01rpx solid #61d7f3;">
				<!-- 单程内容 -->
				<view style="width:690rpx;height: 520rpx;margin: 0 auto;margin: 70rpx auto;background-color: white;border-radius: 20rpx;border: 0.01rpx solid white;">
					<!-- 单程 开始-结束 去 -->
					<view class="time"style="width:670rpx;height: 100rpx;display: flex;justify-content: space-between;align-items: center;margin: 30rpx auto;">
						<view style="border: 3.5px solid #dfe1e2;width:90rpx;height: 50rpx;padding: 10rpx;text-align: center;">单程</view>
						<view style="width:200rpx;height: 70rpx;border-radius: 10rpx;background-color: #e8eaeb;text-align: center;line-height: 70rpx;">开始-结束-去</view>
					</view>
					<!-- 项目展示 西俑 情人岛 天文台 八大海滩-->
					<view class="showProject" style="width:670rpx;height: 360rpx;margin: 0 auto;">
						<view v-for="item in OneActivity" :key="item.id" style="width:670rpx;height: 115rpx;display: flex;justify-content: space-between;align-items: center;">
							<image :src="`https://dpyt.cjpco.cn/${item.product_img}`" mode="scaleToFill" style="width: 170rpx;height: 105rpx;"/>
							<!-- 文字描述 -->
							<view style="width: 480rpx;height: 100rpx;">
								<view class="top" style="display: flex; justify-content: space-between;">
									<span style="font-size: 38rpx;font-weight: bold;">{{item.city}}-->{{item.city1}}</span>
									<span style="color: #0086f6;font-size: 38rpx;font-weight: bold;">  <span style="font-size: 25rpx;">￥</span>{{ item.price}}<span style="font-size: 25rpx;">起</span>   </span>
								</view>
								<view>
									<span style="color: #9999b3;font-size: 30rpx;">{{ item.describe}}</span>
									<span style="padding: 5rpx;border: 1px solid greenyellow;color:greenyellow;margin-left: 100rpx;font-size: 20rpx;">1.5折</span>
								</view>
							</view>
						
					
						</view>
					</view>
				</view>
			</view>
			<!-- 游艇文字 -->
			<view class="text" style="width: 150rpx;height: 70rpx;font-size: 50rpx;text-align: center;margin: 0 auto;color: white;font-weight: bold;">
					游艇
			</view>
				<!-- 游艇详情展示 -->
			<view class="yacht" style="background-color:#61d7f3;width:720rpx;height: 250rpx;margin: 20rpx auto;border-radius: 20rpx;border: 0.01rpx solid #61d7f3;">
					<view style="position: relative; background-color: white;width: 670rpx;height: 190rpx;margin: 20rpx auto;border-radius: 20rpx;display: flex;align-items: center;justify-content: space-around;">
						<!-- 图片 -->
						<image
						:src="`https://dpyt.cjpco.cn/${yacht[0].product_img}`"
							mode="scaleToFill" style="width: 200rpx;height: 165rpx;border-radius: 20rpx;""
						/>
						<!-- 网红双体拼船出海1小时 -->
						<view style="width: 440rpx;height: 170rpx;">
							<view style="font-weight: bold;font-size: 40rpx;">{{yacht[0].name}}</view>
							<view style="font-size: 25rpx;">{{yacht[0].describe}}</view>
							<view>
								<span style="border: 1px solid gray;font-size: 25rpx;padding: 5rpx;">无购物</span>
								<span style="border: 1px solid gray;font-size: 25rpx;padding: 5rpx;">无购物</span>
							</view>
							<view style="color: red;">￥{{yacht[0].price}} <span style="font-size: 25rpx;">起</span></view>
						</view>
						<view style="position: absolute;bottom: 20rpx;right: 30rpx;border: 1px solid red;padding: 10rpx;border-radius: 20rpx;background-color: #fe5633;color: white;">抢购</view>
					</view>

			</view>



			<!-- 基地文字 -->
			<view class="text" style="width: 150rpx;height: 70rpx;font-size: 50rpx;text-align: center;margin: 0 auto;color: white;font-weight: bold;">
				基地
			</view>
				<!-- 基地详情展示 -->
			<view class="yacht" style="background-color:#61d7f3;width:720rpx;height: 600rpx;margin: 20rpx auto;border-radius: 20rpx;border: 0.01rpx solid #61d7f3;">
					<view v-for="item in base" :key="item" style="position: relative; display: flex;align-items: center;justify-content: space-between;background-color: white;width: 670rpx;height: 175rpx;margin: 20rpx auto;border-radius: 20rpx;">
						<!-- 图片 -->
						<image :src="`https://dpyt.cjpco.cn/${item.product_img}`" mode="scaleToFill" style="width: 200rpx;height: 165rpx;margin-left: 10rpx;border-radius: 20rpx;"/>
						<!-- 右边文字描述 -->
						<view style="width: 440rpx;height: 170rpx;">
							<view style="font-weight: bold;font-size: 40rpx;">{{item.name}}</view>
							<view style="font-size: 25rpx;">{{item.describe}}</view>
							<view>
								<span style="border: 1px solid gray;font-size: 25rpx;padding: 5rpx;">无购物</span>
								<span style="border: 1px solid gray;font-size: 25rpx;padding: 5rpx;">无购物</span>
							</view>
							<view style="color: red;">￥{{item.price}} <span style="font-size: 25rpx;">起</span></view>
						</view>
						<view style="position: absolute;bottom: 20rpx;right: 30rpx;border: 1px solid red;padding: 10rpx;border-radius: 20rpx;background-color: #fe5633;color: white;">抢购</view>
					</view>
			</view>



			<!-- 伴游文字 -->
			<view class="text" style="width: 150rpx;height: 70rpx;font-size: 50rpx;text-align: center;margin: 0 auto;color: white;font-weight: bold;">
				伴游
			</view>
				<!-- 伴游详情展示 -->
			<view class="yacht" style="background-color:#61d7f3;width:720rpx;height: 250rpx;margin: 20rpx auto;border-radius: 20rpx;border: 0.01rpx solid #61d7f3;">
				<view style="position: relative; background-color: white;width: 670rpx;height: 190rpx;margin: 20rpx auto;border-radius: 20rpx;display: flex;align-items: center;justify-content: space-around;">
					<image
					:src="`https://dpyt.cjpco.cn/${companion.product_img}`" 
							mode="scaleToFill" style="width: 200rpx;height: 165rpx;border-radius: 20rpx;""
						/>
						<!-- 网红双体拼船出海1小时 -->
						<view style="width: 440rpx;height: 170rpx;">
							<view style="font-weight: bold;font-size: 40rpx;">{{companion.name
}}</view>
							<view style="font-size: 25rpx;">{{companion.describe
}}</view>
							<view>
								<span style="border: 1px solid gray;font-size: 25rpx;padding: 5rpx;">无购物</span>
								<span style="border: 1px solid gray;font-size: 25rpx;padding: 5rpx;">无购物</span>
							</view>
							<view style="color: red;">￥{{companion.price
}} <span style="font-size: 25rpx;">起</span></view>
						</view>
						<view style="position: absolute;bottom: 20rpx;right: 30rpx;border: 1px solid red;padding: 10rpx;border-radius: 20rpx;background-color: #fe5633;color: white;">抢购</view>
				</view>
			</view>



			<!-- 活动文字 -->
			<view class="text" style="width: 150rpx;height: 70rpx;font-size: 50rpx;text-align: center;margin: 0 auto;color: white;font-weight: bold;">
				活动
			</view>
				<!-- 活动详情展示 -->
			<view class="yacht" style="background-color:#61d7f3;width:720rpx;height: 760rpx;margin: 20rpx auto;border-radius: 20rpx;border: 0.01rpx solid #61d7f3;">
				<view v-for="item in active" :key="item.id" style="position: relative; display: flex;align-items: center;justify-content: space-between;background-color: white;width: 670rpx;height: 230rpx;margin: 20rpx auto;border-radius: 20rpx;">
				<!-- 图片 -->
				<image :src="`https://dpyt.cjpco.cn/${item.product_img}`"  mode="scaleToFill" style="width: 200rpx;height: 165rpx;margin-left: 10rpx;border-radius: 20rpx;"/>
						<!-- 右边文字描述 -->
						<view style="width: 440rpx;height: 170rpx;">
							<view style="font-weight: bold;font-size: 40rpx;">{{item.name}}</view>
							<view style="font-size: 25rpx;">{{item.describe}}</view>
							<view>
								<span style="border: 1px solid gray;font-size: 25rpx;padding: 5rpx;">无购物</span>
								<span style="border: 1px solid gray;font-size: 25rpx;padding: 5rpx;">无购物</span>
							</view>
							<view style="color: red;">￥{{item.price}} <span style="font-size: 25rpx;">起</span></view>
						</view>
						<view style="position: absolute;bottom: 20rpx;right: 30rpx;border: 1px solid red;padding: 10rpx;border-radius: 20rpx;background-color: #fe5633;color: white;">抢购</view>
				</view>
				
			</view>
		</view>
	</view>
</template>

<script>
import { getActivitiesTwo } from '@/api/index'
export default {
	data() {
		return {
			floorImage: '',//底部背景图
			OneActivity:[],//单程活动数据,
			yacht:[],//游艇的数据
			base:[],//基地的数据
			companion:[],//海外的数据
			active:[],//活动
			title:''
		}
	},
	methods: {
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
			getActivitiesTwo().then(res => {
				console.log("🚀 ~ getActivitiesTwo ~ res 首页轮播图1:", res)
				if(res.code==1){
				this.OneActivity=res.data.product_helicopter
				console.log("单程活动数据:", this.OneActivity)
				this.yacht=res.data.product_type[0].product
				console.log("游艇的数据", this.yacht)
				this.base=res.data.product_type[6].product
				console.log("基地的数据", this.base)
				this.companion=res.data.product_type[8].product[0]
				console.log("海外的数据", this.companion)
				this.active=res.data.product_type[11].product
				console.log("活动的数据", this.active)

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
		this.title = newObj.title
		this.floorImage = 'https://dpyt.cjpco.cn/' + newObj.picurl
		console.log("🚀 ~ onLoad ~  this.floorImage:", this.floorImage)
		this.getActivitiesData()

	},
}
</script>

<style lang="scss">
.floorImage {
	width: 750rpx;
	height: 400rpx;
	background-repeat: no-repeat;
	background-size: 750rpx 430rpx;
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