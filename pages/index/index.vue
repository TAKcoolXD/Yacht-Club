<template>
	<view class="index">
		<!-- 自定义顶部导航栏 -->
		<yachtTop></yachtTop>
		<!-- 轮播图 -->
		<view class="yachtSwiper">
			<swiper class="swiper" circular :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval"
				:duration="duration">
				<swiper-item v-for="(item, index) in SwiperList" :key=index @click="goImageDetail(item)">
					<image :src="`https://dpyt.cjpco.cn/${item.picurl}`" style="width: 100%;height: 100%;"
						mode="aspectFill">
					</image>
				</swiper-item>
				<!-- 服务器域名https://dpyt.cjpco.cn -->
			</swiper>
		</view>
		<!-- banner图 -->
		<view class="yachtBanner1">
			<image src="../../static/hailukong.png" mode="aspectFit"></image>
		</view>
		<!-- 组织机构 -->
		<view class="organization">
			<image src="../../static/更多.png" mode=""
				style="height: 30rpx;width: 30rpx;position:absolute;right: 8px;top: 26px;" @click="open">
			</image>
			<view class="icon" v-for="item in organizationList" :key=item.id>
				<image :src="item.imgUrl" mode="" style="width:50rpx;height: 50rpx;"></image>
				<text>{{ item.text }}</text>
			</view>
		</view>
		<!-- 游玩项目 -->
		<view class="activities">
			<swiper class="swiper" circular :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval"
				:duration="duration">
				<swiper-item>
					<view class="actContent">
						<!-- 第一个游玩项目ActivitiesList1 -->
						<view class="actContentItem" v-for="(item, index) in ActivitiesList1" :key="item.id"
							@click="goDetail(item)">
							<image :src="`https://dpyt.cjpco.cn/${item.img}`"
								style="width:70rpx;height: 70rpx;margin-bottom: 10rpx;" mode="aspectFit"></image>
							<text>{{ item.name }}</text>
						</view>
					</view>
				</swiper-item>
				<swiper-item>
					<view class="actContent">
						<!-- 第一个游玩项目ActivitiesList2 -->
						<view class="actContentItem" v-for="(item, index) in ActivitiesList2" :key="item.id"
							@click="goDetail(item)">
							<image :src="`https://dpyt.cjpco.cn/${item.img}`"
								style="width:70rpx;height: 70rpx;margin-bottom: 10rpx;" mode="aspectFit"></image>
							<text>{{ item.name }}</text>
						</view>
					</view>
				</swiper-item>
				<!-- 服务器域名https://dpyt.cjpco.cn -->
			</swiper>
		</view>
		<!-- 底部广告图 -->
		<view class="yachtBanner2">
			<image src="../../static/guanggao.png" mode="" style="width: 100%;height: 300rpx;"></image>
		</view>
		<uv-popup ref="popup" @change="change">
			<view class="otherAct" style="width: 100rpx; height: 450rpx;">
				<!-- 文化品类 -->
				<view class="category"
					style="width: 750rpx;height: 80rpx;display: flex; align-items: center;justify-content: space-between;">
					<text style="padding:0 30rpx;font-size:35rpx;font-weight: bold;">文化品类</text>
					<text style="font-size:80rpx;padding:0 30rpx;" @click="close">×</text>
				</view>
				<view class="categoryIcon"
					style="width: 150rpx;height: 100rpx;display: flex;flex-direction: column;align-items: center; box-shadow: 6px 5px 10px rgba(0, 0, 0, 0.3);border-radius: 15rpx; margin-top: 10rpx;margin-left: 20rpx;">
					<image src="../../static/yishu.png" mode="" style="width:70rpx;height: 70rpx;"></image>
					<text>艺术基金</text>
				</view>
				<!-- 文化传播 -->
				<view class="otherBottom"
					style="width: 750rpx;height: 90rpx;display: flex; align-items: center;justify-content: space-between;margin-top: 20rpx;">
					<text style="padding:0 30rpx;font-size:35rpx;font-weight: bold;">文化品类</text>
				</view>
				<view class="otherBottomItem" style="display:flex;width: 750rpx;height: 80rpx;">
					<view class="categoryIcon"
						style="width: 150rpx;height: 100rpx;display: flex;flex-direction: column;align-items: center; box-shadow: 6px 5px 10px rgba(0, 0, 0, 0.3);border-radius: 15rpx; margin-top: 10rpx;margin-left: 20rpx;">
						<image src="../../static/yishu.png" mode="" style="width:70rpx;height: 90rpx;"></image>
						<text>艺术基金</text>
					</view>
					<view class="categoryIcon"
						style="width: 150rpx;height: 100rpx;display: flex;flex-direction: column;align-items: center; box-shadow: 6px 5px 10px rgba(0, 0, 0, 0.3);border-radius: 15rpx; margin-top: 10rpx;margin-left: 20rpx;">
						<image src="../../static/yishu.png" mode="" style="width:70rpx;height: 70rpx;"></image>
						<text>艺术基金</text>
					</view>
					<view class="categoryIcon"
						style="width: 150rpx;height: 100rpx;display: flex;flex-direction: column;align-items: center; box-shadow: 6px 5px 10px rgba(0, 0, 0, 0.3);border-radius: 15rpx; margin-top: 10rpx;margin-left: 20rpx;">
						<image src="../../static/yishu.png" mode="" style="width:70rpx;height: 70rpx;"></image>
						<text>艺术基金</text>
					</view>
				</view>
			</view>
		</uv-popup>
	</view>
</template>

<script>
import { getSwiperList } from '@/api/index'
export default {
	data() {
		return {
			background: ['color1', 'color2', 'color3'],
			indicatorDots: true,
			autoplay: false,
			interval: 2000,
			duration: 500,
			SwiperList: [], //轮播图列表
			//
			organizationList: [{
				id: 0,
				text: '艺术基金',
				imgUrl: '../../static/yishu.png'
			},
			{
				id: 1,
				text: '商学院',
				imgUrl: '../../static/shangxueyuan.png'
			},
			{
				id: 2,
				text: '心连心',
				imgUrl: '../../static/xinlianxin.png'
			},
			{
				id: 3,
				text: '义工',
				imgUrl: '../../static/yigong.png'
			},
			],
			// 活动项目
			ActivitiesList: [],
			ActivitiesList1: [], // 活动项目第一页
			ActivitiesList2: [], //活动项目第二页

		}
	},
	methods: {
		//获取轮播图列表请求
		// getSwiperList() {
		// 	uni.request({
		// 		url: 'https://dpyt.cjpco.cn/home/homebanner/homebanner/list',
		// 		method: 'POST',
		// 		header: {
		// 			'Authorization': "token",
		// 			"Content-Type": "application/x-www-form-urlencoded",
		// 			"X-Requested-With": "XMLHttpRequest"
		// 			//自定义请求头的信息
		// 		},
		// 		success: (res) => {
		// 			this.SwiperList = res.data.data
		// 			console.log(this.SwiperList, '轮播');
		// 		}                                 
		// 	});
		// },
		goImageDetail(item) { //点击首页轮播图去活动页面
			console.log("点击首页轮播图去活动页面传入过去的item:", item)
			let title=item.title
			console.log("获取标题用来判断去哪个页面", title)
			let obj = JSON.stringify(item)//将对象转换成字符串


			if(title == "首页轮轮播图3"){
				console.log("去首页轮播图3");
				uni.navigateTo({
					url: `/pageA/goImagedetail/goImagedetailone/goImagedetailone?obj=${encodeURIComponent(obj)}`,//encodeURIComponent 处理路径中存在的字符窜带有空格
				})
			}
			if(title == "首页轮轮播图2"){
				console.log("去首页轮播图2");
				uni.navigateTo({
					url: `/pageA/goImagedetail/goImagedetailtwo/goImagedetailtwo?obj=${encodeURIComponent(obj)}`,//encodeURIComponent 处理路径中存在的字符窜带有空格
				})
			}
			if(title == "首页轮轮播图1"){
				console.log("去首页轮播图1");
				uni.navigateTo({
					url: `/pageA/goImagedetail/goImagedetailthree/goImagedetailthree?obj=${encodeURIComponent(obj)}`,//encodeURIComponent 处理路径中存在的字符窜带有空格
				})
			}
			// else if (title == "首页轮播图2"){
			// 	console.log("去首页轮播图2");
			// }
			// else if (title == "首页轮播图1"){
			// 	console.log("去首页轮播图1");
			// }
			// uni.navigateTo({
			// 		url: `/pageA/goImagedetail/goImagedetailone/goImagedetailone?obj=${encodeURIComponent(obj)}`,//encodeURIComponent 处理路径中存在的字符窜带有空格
			// 	})
			// if (item.title == "首页轮播图3") {
			// 	uni.navigateTo({
			// 		url: `/pageA/goImagedetail/goImagedetailone/goImagedetailone?obj=${encodeURIComponent(obj)}`,//encodeURIComponent 处理路径中存在的字符窜带有空格
			// 	})
			// }
			// if(item.title == "首页轮播图1"){
				// uni.navigateTo({
				// 	url: `/pageA/goImagedetail/goImagedetailtwo/goImagedetailtwo?obj=${encodeURIComponent(obj)}`,//encodeURIComponent 处理路径中存在的字符窜带有空格
				// })
			// }
			// if(item.title == "首页轮播图2"){
				// uni.navigateTo({
				// 	url: `/pageA/goImagedetail/goImagedetailthree/goImagedetailthree?obj=${encodeURIComponent(obj)}`,//encodeURIComponent 处理路径中存在的字符窜带有空格
				// })
			// }

		},
		//获取活动项目列表请求
		getActivitiesList() {
			uni.request({
				url: 'https://dpyt.cjpco.cn/home/type/type/list',
				method: 'POST',
				header: {
					'Authorization': "token",
					"Content-Type": "application/x-www-form-urlencoded",
					"X-Requested-With": "XMLHttpRequest"
					//自定义请求头的信息
				},
				success: (res) => {
					if (res.data && res.data.data) {
						this.ActivitiesList = res.data.data;
						console.log(this.ActivitiesList, '所有数据');

						this.ActivitiesList1 = this.ActivitiesList.slice(0, 10); //取1到9的数据
						this.ActivitiesList2 = this.ActivitiesList.slice(10); //取10后面的数据（包括10）

						console.log(this.ActivitiesList1, "这个是第一页的");
						console.log(this.ActivitiesList2, "这个是第二页的");
					} else {
						console.error('Unexpected response structure', res);
					}
				},
				fail: (error) => {
					console.error('Request failed', error);
				}
			});
		},
		open() {
			this.$refs.popup.open('bottom');
		},
		close() {
			this.$refs.popup.close();
		},
		change(e) {
			console.log('弹窗状态改变：', e);
		},
		// 去活动详细页面 遍历的item传入对象
		goDetail(item) {
			console.log("遍历传过来的item", item)
			let obj = JSON.stringify(item)//因为路径需要字符串  item传过来是一个对象需要转化成字符串
			console.log('将传过来的对象转化为字符串', obj)
			uni.navigateTo({
				url: `/pageA/activitiesDetail/activitiesDetail?obj=${encodeURIComponent(obj)}`,//encodeURIComponent 处理路径中存在的字符窜带有空格
			})
		},
		// 封装好的获取getSwiperList
		test() {
			getSwiperList().then(res => {
				console.log("🚀 ~ test ~ res:", res)
				this.SwiperList = res.data
				console.log("获取轮播图数组", this.SwiperList)
			})
		}
	},
	mounted() {

	},
	onLoad() {
		console.log('首页页面加载');
		this.test()
		this.getActivitiesList() //获取活动项目列表请求
	},
}
</script>
<style lang="scss">
.index {

	// 轮播图
	.yachtSwiper {}

	// 广告图
	.yachtBanner1 {
		width: 100%;
		height: 214rpx;

		image {
			width: 100%;
			height: 127px;
		}
	}

	.yachtBanner2 {}

	// 组织机构
	.organization {
		position: relative;
		width: 100%;
		height: 100rpx;
		margin-top: 13rpx;
		box-shadow: 1px 8px 10px -13px rgba(0, 0, 0, 0.75);
		border-radius: 20rpx;
		display: flex;
		align-items: center;
		justify-content: center;

		.icon {
			width: 180rpx;
			height: 50rpx;
			// border: 1px solid red;
			display: flex;
			justify-content: center;
			align-items: center;
			// margin: 0 10rpx;
		}
	}

	.activities {
		.actContent {
			width: 713rpx;
			height: 270rpx;
			margin: 20rpx auto;
			// border: 1px solid red;
			display: flex;
			flex-wrap: wrap;
			align-items: center;
			// justify-content: space-between;

			.actContentItem {
				width: 110rpx;
				height: 104rpx;
				// border: 1px solid red;
				margin: 0 15rpx;
				display: flex;
				flex-direction: column;
				align-items: center;
				align-items: center;
				font-size: 27rpx;
			}

			// .actContentItem:nth-child(5){
			// 	margin-left: 0 1rpx;
			// }
		}
	}
}
</style>