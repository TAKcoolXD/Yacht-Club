<template>
	<view class="goImagedetail">
		<!-- 导航栏 -->
		<uv-navbar :fixed="false" :safeAreaInsetTop="true" leftIconSize="0rpx" title="游艇俱乐部">
			<template v-slot:center>
				<view>{{ title }}</view>
			</template>
			<template v-slot:left>
				<image src="/static/返回.png" mode="" style="width: 40rpx;height: 40rpx;" @click="back"></image>
			</template>
		</uv-navbar>
		<!-- 首页点击传过来的轮播图 -->
		<view class="floorImage" :style="{ 'background-image': 'url(' + floorImage + ')' }">
			<!-- 活动规则 定位 -->
			<view class="activeRule" @click="open">
				<view>活</view>
				<view>动</view>
				<view>规</view>
				<view>则</view>
			</view>
			<!-- 领卷部分 -->
			<view class="claimCoupon">
				<!-- 领卷1 -->
				<view class="projectAboard1">
					<!-- 随船 -->
					<view class="projectAboard"
						style="display: flex; align-items: center;justify-content: space-around;">
						<view class="left">
							<view class="top">￥{{ ShipboardProject.money }}</view>
							<view class="bottom" style="color: white;">{{ ShipboardProject.name }}</view>
						</view>
						<view class="right"
							style="background-color: #717171;;width: 100rpx;height: 50rpx;border-radius: 20rpx;text-align: center;line-height: 50rpx;">
							已领取
						</view>
					</view>
					<!-- 出海 -->
					<view class="setSail" style="display:flex ; align-items: center;">
						<view class="left" style="width: 65px;height: 52px;">
							<view class="top" style="color: #fbfe73;
							font-size: 38rpx;">￥{{ OffshoreProject.money }}</view>
							<view class="bottom" style="	font-size: 20rpx;
							text-align: center;color: white;">{{ OffshoreProject.name }}</view>
						</view>
						<view class="right"
							style="background-color: #717171;;width: 100rpx;height: 50rpx;border-radius: 20rpx;text-align: center;line-height: 50rpx;">
							已领取
						</view>
						<view class="right"
							style="background-color: #717171;;width: 100rpx;height: 50rpx;border-radius: 20rpx;text-align: center;line-height: 50rpx;">
							已领取
						</view>
					</view>
				</view>
				<!-- 领卷2 其他项目-->
				<view class="projectAboard2" style="display: flex;align-items: center;justify-content: space-around;">
					<view class="left"
						style="width: 300rpx;height: 120rpx;display: flex;flex-direction: column;align-items: center;justify-content: center;">
						<view style="color: #fbfe73;
							font-size: 38rpx;">￥{{ otherProject.money }}</view>
						<view style="color: white;">{{ otherProject.name }}</view>
					</view>
					<view class="left"
						style="width: 300rpx;height: 120rpx;display: flex;align-items: center;justify-content: center;">
						<view style="background-color: #717171;;width: 100rpx;height: 50rpx;">已领取</view>
					</view>
				</view>
				<!-- 海岛介绍-->
				<view class="projectAboard3">
					<image :src="`https://dpyt.cjpco.cn/${picture1}`" mode="scaleToFill" style="width: 100%;
				height: 120rpx;" />
				</view>
			</view>

		</view>
		<!-- 热销百岛套餐文字 -->
		<view style="background-color:#078ca3;">
			<view
				style="width: 300rpx;height: 70rpx; margin:auto;padding: 25rpx; font-size: 50rpx;color: white;font-weight: bold;">
				热销百岛套餐
			</view>
			<!--百岛套餐套餐展示 -->
			<view class="Combolist" style="width: 100%;height: 680rpx;">
				<view v-for="item in PopularIslands" :key="item.id"
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
			<!-- 环岛套餐文字 -->
			<view
				style="width: 200rpx;height: 70rpx;margin: 0 auto;padding: 25rpx; font-size: 50rpx;color: white;font-weight: bold;">
				环岛套餐
			</view>
			<!--环岛套餐套餐展示 -->
			<view class="Combolist" style="width: 100%;height: 680rpx;">
				<view v-for="item in IslandLoop" :key="item.id"
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
			<!-- 特价秒杀文字 -->
			<view
				style="width: 150rpx;height: 70rpx;margin: 0 auto;padding: 25rpx; font-size: 35rpx;color: white;font-weight: bold;">
				特价秒杀
			</view>
			<!-- 两个盒子 特价秒杀 爆款抢购 -->
			<view class="specialBox"
				style="width: 530rpx;height: 70rpx;margin: 0 auto;margin-bottom: 20rpx;display: flex;justify-content: space-between;align-items: center;">
				<view class="hotSelling"
					style="border: 1px solid #a98b72;border-radius: 15rpx;padding: 5rpx;color: #ebdc9d;">
					爆款抢购</view>
				<view class="special"
					style="border: 1px solid #a98b72;border-radius: 15rpx;padding: 5rpx;color: #ebdc9d;">特价秒杀
				</view>
			</view>
			<view class="Speciallist"
				style="position: relative;;width: 680rpx;height: 200rpx;margin: 0 auto;background-color: white;border-radius: 20rpx;display: flex;align-items: center;">
				<image :src="`https://dpyt.cjpco.cn/${FlashSale.product_img}`" mode="scaleToFill"
					style=" margin-left: 15rpx;width: 300rpx;height: 165rpx;" />
				<view style="margin-left: 15rpx;">
					<view style="font-weight: bold;font-size: 33rpx;">{{ FlashSale.name }}</view>
					<view
						style="font-size: 20rpx;border: 1px solid #717171;display: inline-block;padding: 5rpx;margin-bottom: 10rpx;color: #717171;">
						{{ FlashSale.describe }}</view>
					<view style="color: red;font-size: 35rpx;">{{ FlashSale.price }} <span
							style="color: red;font-size: 20rpx;">元起</span>
					</view>
					<view
						style="background-color: #fe8837;display: inline-block;padding: 10rpx;border-radius: 20rpx;color: white;position: absolute;bottom:10rpx;right: 10rpx;">
						限时抢购</view>
				</view>
			</view>
			<!-- 团建套餐 -->
			<!-- 团建套餐文字 -->
			<view
				style="width: 200rpx;height: 70rpx;margin: 0 auto;padding: 25rpx; font-size: 50rpx;color: white;font-weight: bold;">
				团建套餐
			</view>
			<view class="specialBox"
				style="width: 140rpx;margin: 0 auto;font-size: 35rpx;font-weight: bold;color: white;margin-top: 40rpx;">
				超值推荐
			</view>
			<!-- 超值推荐套餐 两个盒子-->
			<view class="greatValue"
				style="display: flex;justify-content: space-around;align-items: center; width: 730rpx;height: 200rpx;margin: 0 auto;margin-top: 30rpx;">
				<div v-for="item in Team" :key="item.id" class="greatValue1"
					style="position: relative; display: flex;flex-direction: column;width: 350rpx;height: 190rpx;background-color: white;border-radius: 20rpx;">
					<text style="font-size: 35rpx;font-weight: bold;">{{ item.city }}-->{{ item.city1 }}</text>
					<text style="font-size: 45rpx;color: #ff6709;"><span
							style="font-size: 25rpx;color: #717171;">￥</span>
						{{ item.price }}</text>
					<view
						style="position: absolute;bottom: 10rpx;right: 10rpx;background-color: #fe8837;padding: 10rpx;color: white;border-radius: 20rpx;font-weight: bold;">
						预定</view>
				</div>

			</view>
			<view
				style="width: 300rpx;height: 70rpx; margin:auto;padding: 25rpx; font-size: 50rpx;color: white;font-weight: bold;">
				生日求婚套餐
			</view>
			<!--生日求婚套餐展示 -->
			<view class="Combolist" style="width: 100%;height: 680rpx;">
				<view v-for="item in ProposalPackage" :key="item.id"
					style="position: relative; display: flex;width: 680rpx;height: 215rpx;margin:15rpx auto;background-color: white;border-radius: 10rpx;">
					<image :src="`https://dpyt.cjpco.cn/${item.product_img}`" mode="scaleToFill"
						style="width: 300rpx;height: 180rpx;margin: 10rpx;" />
					<view>
						<view style="font-weight: bold;font-size: 34rpx;">{{ item.name }}</view>
						<view style="font-size: 20rpx;">{{ item.describe
							}}</view>
						<text
							style="border: 1px solid black;padding: 5rpx;margin: 5rpx 10rpx;font-size: 20rpx;">无购物</text>
						<text
							style="border: 1px solid black;padding: 5rpx;margin: 5rpx 10rpx;font-size: 20rpx;">无购物</text>
						<view style="font-size: 25rpx;font-weight: bold;color: red;margin-top: 10rpx;">￥{{item.price}}</view>
					</view>
					<view
						style="position: absolute;bottom: 20rpx;right: 10rpx;background-color: #fe5633;color: white;border-radius: 30rpx;padding: 15rpx;">
						抢购</view>
				</view>

			</view>
		</view>
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
</template>

<script>
import { getActivitiesOne } from '@/api/index'
export default {
	data() {
		return {
			floorImage: '',
			title: '',
			ShipboardProject: '',//随船项目
			OffshoreProject: '',//出海项目
			otherProject: '',//其他项目
			picture1: '',//海岛介绍
			PopularIslands: [],//热销百岛
			IslandLoop: [],//环岛
			FlashSale: {},//特价秒杀
			Team: [],//团建超值推荐
			ProposalPackage: [],//求婚套餐
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
		getActivitiesData() {
			getActivitiesOne().then(res => {
				console.log('活动一的数据', res);
				if (res.code == 1) {
					this.otherProject = res.data.accepTadd[0]
					console.log("this.otherProject其他项目:", this.otherProject)
					this.ShipboardProject = res.data.accepTaddress[0]
					console.log("🚀 ~ getActivitiesThree ~ 随船项目this.ShipboardProject:", this.ShipboardProject)
					this.OffshoreProject = res.data.accepTaddress[1]
					console.log("🚀 ~ getActivitiesThree ~ 出海项目this.OffshoreProject:", this.OffshoreProject)
					this.picture1 = res.data.activity.picture1

					this.PopularIslands = res.data.product_type[0].product
					console.log("🚀 ~ getActivitiesThree ~ this.PopularIslands热销百岛:", this.PopularIslands)

					this.IslandLoop = res.data.product_type[1].product
					console.log("🚀 ~ getActivitiesThree ~ this.IslandLoop环岛:", this.IslandLoop)

					this.FlashSale = res.data.product_plane.product
					console.log("🚀 ~ getActivitiesThree ~ this.FlashSale特价秒杀:", this.FlashSale)

					this.Team = res.data.product_ticket.product
					console.log("🚀 ~ getActivitiesThree ~ this.Team团建:", this.Team)

					this.ProposalPackage = res.data.product_activity.product
					console.log("🚀 ~ getActivitiesThree ~ this.ProposalPackage求婚套餐:", this.ProposalPackage)


				}
			})
		}
	},
	mounted() {

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

	created() {

	}

}
</script>
<style lang="scss">
.goImagedetail {


	.floorImage {
		width: 750rpx;
		height: 900rpx;
		background-repeat: no-repeat;
		background-size: 750rpx 1400rpx;
		background-position: bottom;
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

		.claimCoupon {
			width: 700rpx;
			height: 450rpx;
			// border: 1px solid red;
			margin: 478rpx auto;

			.projectAboard1 {
				width: 100%;
				height: 130rpx;
				// border: 1px solid red;
				margin: 20rpx auto;
				display: flex;
				align-items: center;
				justify-content: space-around;

				.projectAboard {
					width: 331rpx;
					height: 105rpx;
					border: 1px solid rgb(11, 10, 10);

					.left {
						.top {
							color: #fbfe73;
							font-size: 38rpx;

						}

						.bottom {
							width: 194rpx;
							font-size: 20rpx;
							text-align: center;
						}
					}

					.right {}
				}

				.setSail {
					width: 331rpx;
					height: 105rpx;
					border: 1px solid rgb(11, 10, 10);
				}
			}

			.projectAboard2 {
				width: 100%;
				height: 130rpx;
				border: 1px solid black;
				margin: 20rpx auto;
			}

			.projectAboard3 {
				width: 100%;
				height: 130rpx;
				// border: 1px solid red;
				margin: 20rpx auto;
			}

		}
	}
}
</style>