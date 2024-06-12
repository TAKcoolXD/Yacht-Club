<template>
	<!-- 商品详情 -->
	<view class="productDetails" style="position: relative;">
		<!-- 自定义导航 -->
		<yachtTop></yachtTop>
		<!-- 顶部商品轮播 -->
		<view class="yachtSwiper">
			<swiper class="swiper" circular :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval"
				:duration="duration">
				<swiper-item v-for="(item, index) in productSwiper" :key=index>
					<image :src="`https://dpyt.cjpco.cn/${item}`" style="width: 100%;height: 100%;" mode="scaleToFill">
					</image>
				</swiper-item>
				<!-- 服务器域名https://dpyt.cjpco.cn -->
			</swiper>
		</view>
		<!-- 价格 1.8折热销 已售48 -->
		<view class="priceSales">
			<!-- 热销价钱 -->
			<view class="hotPrice" style="display: flex;align-items: center;justify-content: center;">
				<view style="color: #fc355b;font-weight: bold;position: relative;margin-left: 20rpx;font-size: 35rpx;">
					<span
						style="font-size: 25rpx;position: absolute;top: 2rpx;left: -20rpx;font-weight: 400;">￥</span>{{
							productInfo.price }}
				</view>
				<view
					style="margin-left: 10rpx;font-size: 21rpx;color: #838489;text-decoration: line-through;font-weight: bold;height: 50rpx;line-height: 70rpx;">
					￥20380</view>
				<view
					style="background-color: #fee3e8;color: #f35474;font-size: 21rpx;font-weight: bold;margin-left: 15rpx;padding: 8rpx;display: flex;">
					<u-icon name="tags-fill" color="#f35474"></u-icon>
					<span>1.8折热销中</span>
				</view>
			</view>
			<!-- 售出的个数 -->
			<view class="unitsSold"
				style="display: flex;align-items: center;justify-content: center;margin-top: 10rpx;">
				<span>已售{{ productInfo.deal }}</span>
			</view>
		</view>
		<!-- 九洲岛观光游玩2小时海钓拼团(下午2点) -->
		<view class="title">
			{{ productInfo.title }}
		</view>
		<!-- 服务指南 服务须知门店活动 -->
		<view class="serviceGuide">
			<u-cell-group center=true>
				<u-cell center size="large" title="服务" value="景区官方 周末通用 随时退·过期退" isLink></u-cell>
				<u-cell center size="large" title="服务" :value="productInfo.notice" isLink></u-cell>
				<u-cell center size="large" title="服务" :value="productInfo.store" isLink></u-cell>
				<u-cell center size="large" title="服务" value="活动 新人补贴 领新人专享优惠 显示补贴30元" isLink></u-cell>
			</u-cell-group>
			<!-- 分享商品·喊朋友一起购买 -->
			<u-cell-group customStyle="background-color: #f9f9f9;">
				<u-cell value="内容" icon="share-fill" center="true">
					<view slot="value" class="u-slot-title" style="display: flex;">
						<text class="u-cell-text" style="margin-right: 210rpx;">分享商品·喊朋友一起购买</text>
						<u-icon name="more-dot-fill"></u-icon>
					</view>
				</u-cell>
			</u-cell-group>
		</view>
		<!-- 团购详情 费用包含 -->
		<view class="groupPurchase">
			<view style="font-size: 35rpx;">团购详情</view>
			<view style="font-size: 25rpx;">{{ productInfo.freeInclude.group_name }}</view>
			<view style="display: flex;justify-content: space-between;" v-for="item in freeGroup_details" :key="item">
				<view>
					<span>·</span>
					<text style="font-size: 25rpx;">{{ item.group_title }}</text>
				</view>
				<view>
					<span style="font-size: 20rpx;color: #838489;">({{ item.group_weight }}份)</span>
					<span style="font-size: 25rpx;">￥{{ item.group_price }}</span>
				</view>
			</view>
		</view>
		<!-- 特别注意 -->
		<view class="attention">
			<view style="font-size: 35rpx;">{{ productInfo.attention.group_name }}</view>
			<view style="display: flex;justify-content: space-between;" v-for="item in attentionGroup_details"
				:key="item">
				<view>
					<span>·</span>
					<text style="font-size: 25rpx;">{{ item.group_title }}</text>
				</view>
				<view>
					<span style="font-size: 20rpx;color: #838489;">({{ item.group_weight }}份)</span>
					<span style="font-size: 25rpx;">￥{{ item.group_price }}</span>
				</view>
			</view>
		</view>
		<!-- 购买须知 -->
		<view class="notice">
			<view style="font-size: 35rpx;">购买须知</view>
			<view class="date" style="position: relative;">
				<image src="../../static/日期.png" mode="scaleToFill"
					style="width: 25rpx;height: 25rpx;position: absolute;top: 10rpx;left: 10rpx;" />
				<view style="margin-left: 40rpx;">可用日期</view>
				<view style=" margin-left: 30rpx;font-size: 25rpx;color: #707175;">有效期：购买30天有效</view>
			</view>
			<view class="date" style="position: relative;">
				<image src="../../static/往左.png" mode="scaleToFill"
					style="width: 25rpx;height: 25rpx;position: absolute;top: 10rpx;left: 10rpx;" />
				<view style="margin-left: 40rpx;">随时退</view>
				<view style="margin-left: 30rpx; font-size: 25rpx;color: #707175;">未使用可随时退款，过期后未使用系统自动发起退款，支持一笔订单部分退款
				</view>
			</view>
			<view class="date" style="position: relative;">
				<image src="../../static/对.png" mode="scaleToFill"
					style="width: 25rpx;height: 25rpx;position: absolute;top: 10rpx;left: 10rpx;" />
				<view style="margin-left: 40rpx;">使用说明</view>
				<view style=" margin-left: 30rpx;font-size: 25rpx;color: #707175;">使用时间: 09:00-18:00</view>
			</view>
		</view>
		<!-- 其他说明 -->
		<view class="other">
			<view style="font-size: 35rpx;">其他说明</view>
			<view style="font-size: 28rpx;margin: 20rpx;" v-for="item in other" :key="item"><span
					style="margin-left: 10rpx;margin-right: 10rpx;">·</span>{{ item.other_title }}
			</view>
		</view>
		<!-- 适用门店 -->
		<view class="shopDoor">
			<view style="font-size: 35rpx;">适用门店</view>
			<view style="display: flex;width: 680rpx;margin: 0 auto;">
				<image src="../../static/_r18_c4.jpg" mode="scaleToFill" style="width: 150rpx;height: 120rpx;" />
				<view style="width: 350rpx;height: 120rpx;font-size: 20rpx;">
					<view style="margin-left: 9rpx;font-weight: bold;font-size: 25rpx;">游艇俱乐部</view>
					<view style="margin-left: 9rpx;font-size: 25rpx;">推荐</view>
					<view style="margin-left: 9rpx;color: #838489;">人均￥325</view>
					<view style="margin-left: 9rpx;color: #838489;">广东省珠海市香洲区情侣南路</view>

				</view>
				<view style="width: 200rpx;height: 120rpx;">
					<view style="margin-left: 110rpx;">
						<u-icon name="phone"></u-icon>
						<view style="width: 10rpx;">电话</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 适应方式 -->
		<view class="userWay">
			<view style="font-size: 35rpx;">使用方式</view>
			<view
				style="width: 680rpx;height: 80rpx;margin: 0 auto;display: flex;align-items: center;justify-content: space-around;">
				<view
					style="width: 100rpx;height: 70rpx;display: flex;flex-direction: column;justify-content: center;align-items: center;">
					<u-icon name="order"></u-icon>
					<view style="font-size: 25rpx;">点击购买</view>
				</view>
				<u-icon name="play-right-fill"></u-icon>
				<view
					style="width: 100rpx;height: 70rpx;display: flex;flex-direction: column;justify-content: center;align-items: center;">
					<u-icon name="red-packet"></u-icon>
					<view style="font-size: 25rpx;">支付订单</view>
				</view>
				<u-icon name="play-right-fill"></u-icon>
				<view
					style="width: 100rpx;height: 70rpx;display: flex;flex-direction: column;justify-content: center;align-items: center;">
					<u-icon name="phone"></u-icon>
					<view style="font-size: 25rpx;">电话预约</view>
				</view>
				<u-icon name="play-right-fill"></u-icon>
				<view
					style="width: 100rpx;height: 70rpx;display: flex;flex-direction: column;justify-content: center;align-items: center;">
					<u-icon name="home"></u-icon>
					<view style="font-size: 25rpx;">到店使用</view>
				</view>

			</view>
		</view>
		<!-- 固定定位 联系客服 预定-->
		<view class="reserveConnect">
			<view class="connetPeople">
				<button open-type="contact"
					style="width: 197rpx; height: 49rpx; display: flex; font-size: 28rpx; border-radius: 20rpx; border: 1px solid #b6dfef; align-items: center;">
					<u-icon name="phone"></u-icon>
					联系客户
				</button>
			</view>
			<view class="safe" @click="safeopen"
				style="width: 170rpx;height: 50rpx;border: 1px solid #b6dfef;display: flex;border-radius: 20rpx;text-align: center;align-items: center;">
				<u-icon name="bookmark"></u-icon>
				<view>安全须知</view>
			</view>
			<view class="PreOrder" @click="Preopen"
				style="width: 170rpx;height: 50rpx;border-radius: 20rpx;text-align: center;line-height: 50rpx;background-image: linear-gradient(90deg,#fe9d38,#f84d6a);color: #fff;">
				立即预定</view>
		</view>
		<!-- 点击安全须知时 底部框弹出 -->
		<uv-popup ref="safepopup" @change="safechange" :close-on-click-overlay="true">
			<view style="position: relative; height: 400rpx;overflow: auto;">
				<image src="/static/关闭.png" mode="scaleToFill"
					style="width: 50rpx;height: 50rpx;position: absolute;right: 10rpx;" @click="safeclose" />
				<view class="title" style="width: 160rpx;margin: 0 auto;font-size: 40rpx;font-weight: bold;">
					安全须知
				</view>
				<view style="width: 690rpx; margin: 0 auto;padding: 10rpx;">
					为了您和家人、朋友的安全，请您在预订产品前仔细阅读安全须知并在旅游过程中严格遵守各项安全注意事项。同时特别提示，除安全须知外，针对具体产品，您还应仔细阅读产品展示页面的预订须知、安全提示以及预订说明中的其他安全提示内容以及旅行社告知您需要注意的其他事项。此外，以下内容如涉及疾病，请您注意所列示疾病仅为简要示例，如您或/和其他计划出行人员尚有其他疾病可能不适合参加旅游活动的，请主动向旅行社告知或进行相关咨询。
					一、特殊限制
					(一)病患者、孕妇及行动不便者:为了确保旅游顺利出行和您以及其他计划出行人员的人身安全请您和相关人员在出行前进行身体检查，如存在下列情况，由于服务能力所限原则上无法提供接待服务，如需出行请遵医嘱和提前咨询旅行社，谨慎决定是否出行。
					1.传染性疾病患者，如传染性肝炎、活动期肺结核、伤寒等传染病人;2.心血管疾病患者，如严重高血压、心功能不全、心肌缺氧、心肌梗塞等病人;3.脑血管疾病患者，如脑栓塞、脑出血、脑肿瘤等病人:
					4.呼吸系统疾病患者，如肺气肿、肺心病等病人
					6.严重贫血病患者，如血红蛋白量水平在50克/升以下的病人;
					7.大中型手术的恢复期病患者8.孕妇及行动不便者。
					(二)老年人:老年人的体力以及身体状况等方面相比年轻人有所不及，为了您的安全和家人，因此请您在预订前谨慎选择出游目的地以及游玩类目同时需携带必须物品。在遵守其他安全须知内容的情况下，还应遵守如下具体内容1.选择适宜的旅游目的地。尽量选择短途的名胜古迹旅游，或选择休闲度假地旅游，不宜远途旅游。同时:
					(1)65周岁(含65周岁)以上老年人请尽量不要预订云南跟团产品，或是在预订前与供应商进行确认;
					(2)70周岁(含70周岁)以上老年人请尽量不要预订四川跟团产品或是在预订前与供应商进行确认;(3)80周岁以上的旅游者尽量不要报名跟团
					游。
					2.选择适宜的游玩项目。尽量选择不会过度耗费体力的轻松观光类的旅游产品，耗费体力或存在一定危险性的活动如爬山、骑行、漂流、滑雪等请不要选择或谨慎选择。
					3.请携带必须的药品或急救医疗器械(1)防治慢性病药品，如患有高血压病、糖尿病、冠心病者，出游时请携带必要的药品
					2)常见疾病的治疗药品，如防止晕车、晕船的药品，止泻、消炎、通便的药品，防过敏药品以及伤湿止痛膏、酒精、药棉、红药水等，以防出现水士不服或发生其他意外情况。
					4.需携带适当的衣物和其他用品。出行前先了解旅游目的地天气状况和气候特点，带足衣服和避雨用具;鞋子尽量选择适足、松软、透气的鞋。5.出游应有家人陪同，不宜单独外出。在游览过程中也均要结伴而行，相互照料。
					6.游玩过程中不要爬高、弹跳或进行其他高速、剧烈的活动，建议带上手杖或其他辅助出行的用品。如发生跌倒、发病或其他意外情形，请经简单处理后速去附近医院诊治。(三)儿童:由于儿童身体抵抗力与适应新环境能力较差，同时缺乏自我控制和自我照顾能力，且好奇心强，较容易发生意外事故，未满18周岁的旅游者请由家属陪同参团。在遵守其他安全须知内容的情况下，同时应遵守如下内容1.出游地点应选择公共卫生条件良好的地区以防出现呼吸道感染、腹泻或其他病症。如发生相关情况，需紧急送医就诊。
					2.出行前咨询医师，并携带必备的药品如退烧、止泻、防过敏、治疗感冒等药品以及防蚊虫叮咬或其他治疗过敏的药品或外用药膏;同时了解必要的紧急救助措施。
					3.整个过程中，家长应紧跟儿童，不得让儿童离开视野和可触碰的范围之内。
					4.不得脱团，严格遵守导游或领队的指挥。5.活动过程中不得私自进行爬高、水上、高速或较剧烈的活动，以免出现跌倒、溺水、骨折或扭伤等状况。
					6.如发生跌倒、骨折、扭伤等运动伤害，运动伤害发生四十八小时内，应给予适当的休息、冰敷、抬高并固定受伤部位，切记处理不当，以防延长复原的时间或加重症状。二、危险项目安全须知对于危险项目，请旅游者根据自身情况谨慎选择参加。特别提醒，建议旅游者投保高风险意外险种酒后禁止参加。同时进行活动之前，请仔细阅读景区提示，在景区指定区域内开展活动。(一)漂流:患有精神病、颈椎病、高血压、心脏病、癫痫病、腰椎病、骨折及运动障碍的患者、饮酒的游客、孕妇、1.2米以下的儿童，55岁以上老人以及其他被漂流管理人员建议不宜参加的游客严禁参与漂流活动。同时须遵守如下具体内容
				</view>
			</view>
		</uv-popup>
		<!-- 点击立即预定  底部框弹出-->
		<uv-popup ref="Prepopup" @change="Prechange" :close-on-click-overlay="true">
			<view style="height: 450rpx;">
				<view>游玩地点：国际航海文化中心</view>
				<view>开始时间:</view>
				<!-- 开始时间 -->
				<view class="example-body">
					<uni-datetime-picker return-type="timestamp" type="datetime" v-model="startdatetimesingle"
						@change="startchangeLog" />
				</view>
				<view style="width: 650rpx;margin: 0 auto;text-align: center;font-weight: bold;">至</view>
				<!-- 结束时间: -->
				<view>结束时间:</view>
				<view class="example-body">
					<uni-datetime-picker return-type="timestamp" type="datetime" v-model="enddatetimesingle"
						@change="endchangeLog" />
				</view>
				<button style="background-color: #1aad19;color: white;" @click="goOrder">去下单</button>
			</view>
		</uv-popup>
	</view>
</template>

<script>
import { computed } from 'uview-ui/libs/mixin/mixin';
import { productDetail } from '@/api/index'
import {
	dateUtils
} from '@/utils';
export default {
	data() {
		return {
			indicatorDots: true,
			autoplay: false,
			interval: 2000,
			duration: 500,
			productSwiper: [], //轮播图列表
			orderInfo: {},//立即预定（去下单）传过去的信息
			sendOrderInfo: {},//立即预定（去下单）传过去的信息2
			reqUserInfo: {
				productId: '',//产平ID
				user_id: ''	//用户的ID
			},
			productInfo: {
				price: '',//商品价格
				deal: '',//商品已售出个数
				title: '',//商品活动标题
				notice: '',//商品公告
				store: '',//门店
				freeInclude: [],//费用包含
				attention: [],//特别注意
				other: [],
			},
			startTime: '',
			endTime: '',

			startdatetimesingle: '',
			enddatetimesingle: '',

			range: ['2021-02-1', '2021-3-28'],
			startdatetimerange: [],
			enddatetimerange: [],
			start: Date.now() - 1000000000,
			end: Date.now() + 1000000000,


		}
	},
	onLoad(options) {
		console.log("商品详情页加载");
		console.log('从activitiesDetail传过来的参数', options);
		console.log('从orderList传过来的参数', options);
		console.log(decodeURIComponent(options.obj));
		let newObj = JSON.parse(decodeURIComponent(options.obj))
		console.log('编码转换对象转换完毕的对象', newObj);
		this.reqUserInfo.productId = newObj.id//产品id
		let userInfo = uni.getStorageSync('userInfo')
		console.log('本地存储的Userinfo', userInfo);
		this.reqUserInfo.user_id = userInfo.id//用户id
		console.log('整理完毕this.reqUserInfo', this.reqUserInfo);
		this.getProductDetail() //根据用户id和产品id发送请求
	},
	methods: {
		// 发送请求
		getProductDetail() {
			productDetail(this.reqUserInfo).then(res => {
				console.log('根据用户id和产品id发送请求返回数据', res);
				if (res.code == 1) {
					this.orderInfo = res.data.res
					console.log('立即预定（去下单）传过去的信息', this.orderInfo);
					this.productSwiper = res.data.res.product_img1
					console.log('产品轮播图', this.productSwiper);
					this.productInfo.price = res.data.res.price//商品价格
					this.productInfo.deal = res.data.res.deal//商品已售出个数
					this.productInfo.title = res.data.res.name//商品活动标题
					this.productInfo.notice = res.data.res.notice//商品公告
					this.productInfo.store = res.data.res.store//门店
					this.productInfo.freeInclude = res.data.group[0]//费用包含
					this.productInfo.attention = res.data.group[1]//特别注意
					this.productInfo.other = res.data.res.other
					console.log('产品信息', this.productInfo);
				}
			})
		},
		// 打开安全须知的底部弹窗
		safeopen() {
			this.$refs.safepopup.open('bottom');
		},
		// 关闭安全须知的底部弹窗
		safeclose() {
			this.$refs.safepopup.close();
		},
		//安全须知的底部弹窗状态改变
		safechange(e) {
			console.log('安全须知弹窗状态改变：', e);
		},
		// 立即预定的底部弹窗
		Preopen() {
			this.$refs.Prepopup.open('bottom');
		},
		//立即预定的底部弹窗状态改变
		Prechange(e) {
			console.log('立即预定弹窗状态改变：', e);
		},
		// 切换选择的开始的时间
		startchangeLog(e) {
			// <uni-datetime-picker return-type="timestamp" type="datetime" v-model="enddatetimesingle" @change="endchangeLog" />
			//设置了return-type="timestamp" 所以每次切换返回的值是一个数字 为了去判断选择开始时间和结束时间的大小
			console.log('startchange事件:', e);
			this.startTime = e
		},
		//切换选择的结束的时间
		endchangeLog(e) {
			// <uni-datetime-picker return-type="timestamp" type="datetime" v-model="enddatetimesingle" @change="endchangeLog" />
			//设置了return-type="timestamp" 所以每次切换返回的值是一个数字 为了去判断选择开始时间和结束时间的大小
			console.log('endchange事件:', e);
			this.endTime = e
		},
		maskClick(e) {
			console.log('maskClick事件:', e);
		},
		// 去下单
		goOrder() {
			// 判断时间是否都选择了
			if (this.sendOrderInfo.endTime && this.sendOrderInfo.startTime) {
				if (this.startTime < this.endTime) { //选择的时间是正常时间  前选21 后选22
					let obj = JSON.stringify(this.sendOrderInfo)
					uni.navigateTo({
						url: `/pageA/orderDetail/orderDetail?obj=${encodeURIComponent(obj)}`
					})
					this.$refs.Prepopup.close()
				} else { //选择的时间是错误时间 前选20 后选19
					uni.showToast({
						title: '请重新选择时间',
						icon: 'error'
					})
				}
			} else {//时间没有同时选择
				uni.showToast({
					title: '请选择时间',
					icon: 'error'
				})
			}

		}

	},
	watch: {
		startdatetimesingle(newval) {
			// <uni-datetime-picker return-type="timestamp" type="datetime" v-model="enddatetimesingle" @change="endchangeLog" />
			//设置了return-type="timestamp" 所以每次切换返回的值是一个数字 为了去判断选择开始时间和结束时间的大小
			//需要用到 dateUtils()方法将日期的格式进行转换成日期格式
			console.log('startTime:', this.startdatetimesingle);
			this.orderInfo.startTime = this.startdatetimesingle
			console.log('立即预定（去下单）传过去的信息', this.orderInfo);
			this.sendOrderInfo = this.orderInfo
			this.sendOrderInfo.startTime = dateUtils(this.sendOrderInfo.startTime)

		},
		enddatetimesingle(newval) {
			// <uni-datetime-picker return-type="timestamp" type="datetime" v-model="enddatetimesingle" @change="endchangeLog" />
			//设置了return-type="timestamp" 所以每次切换返回的值是一个数字 为了去判断选择开始时间和结束时间的大小
			//需要用到 dateUtils()方法将日期的格式进行转换成日期格式
			console.log('endTime:', this.enddatetimesingle);
			this.orderInfo.endTime = this.enddatetimesingle
			console.log('立即预定（去下单）传过去的信息', this.orderInfo);
			this.sendOrderInfo = this.orderInfo
			this.sendOrderInfo.endTime = dateUtils(this.sendOrderInfo.endTime)
		},
		range(newval) {
			console.log('范围选:', this.range);
		},
		startdatetimerange(newval) {
			console.log('范围选:', this.startdatetimerange);
		},
		enddatetimerange(newval) {
			console.log('范围选:', this.enddatetimerange);
		},
	},
	computed: {
		// 费用包含
		freeGroup_details() {
			return this.productInfo.freeInclude.group_details
		},
		//特别注意
		attentionGroup_details() {
			return this.productInfo.attention.group_details
		},
		// 其他说明
		other() {
			return this.productInfo.other
		}

	}
}
</script>
<!-- #region -->
文字穿过 价格去掉
text-decoration: line-through;

背景渐变 background-image: linear-gradient(direction, color-stop1, color-stop2, ...);

<uni-datetime-picker return-type="timestamp" type="datetime" v-model="enddatetimesingle" @change="endchangeLog" />
return-type="timestamp" 每次点击时间获取的值 返回时一个数字  （return-type的返回值格式：timestamp 、string、date）
<!-- #endregion -->
<style lang="scss">


.slot-icon {
	width: 21px;
	height: 21px;
	background-color: $u-warning;
	border-radius: 100px;
	font-size: 12px;
	color: #fff;
	line-height: 21px;
	text-align: center;
}

.priceSales {
	width: 730rpx;
	height: 110rpx;
	// border: 1px solid red;
	margin: 15rpx auto;
	display: flex;
	justify-content: space-between;

	.hotPrice {
		width: 450rpx;
		height: 110rpx;
		// border: 1px solid rgb(0, 34, 255);
	}

	.unitsSold {
		width: 150rpx;
		height: 110rpx;
		color: #d7d7d9;
		// border: 1px solid rgb(0, 255, 0);
	}
}

.title {
	width: 700rpx;
	height: 60rpx;
	margin: 0 auto;
	// border: 1px solid rebeccapurple;
	font-weight: bold;
	line-height: 60rpx;
	font-size: 38rpx;
}

.serviceGuide {
	.u-cell__value--large.data-v-913eaa32 {
		margin-right: 158rpx !important;
	}
}

.groupPurchase {
	width: 700rpx;
	// height: 90rpx;
	// border: 1px solid red;
	font-weight: bold;
	margin-left: 30rpx;
	margin-top: 20rpx;
}

.attention {
	width: 700rpx;
	margin-top: 15rpx;
	// border: 1px solid red;
	font-weight: bold;
	margin-left: 30rpx;
}

.notice {
	width: 700rpx;
	// height: 1000rpx;
	// border: 1px solid red;
	font-weight: bold;
	margin-left: 30rpx;

	.date {
		width: 600rpx;
		// height: 120rpx;
		// border: 1px solid red;
		margin-top: 35rpx;
	}
}

.other {
	width: 700rpx;
	// height: 1000rpx;
	// border: 1px solid red;
	font-weight: bold;
	margin-left: 30rpx;
	margin-top: 10rpx;
}

.shopDoor {
	width: 700rpx;
	// height: 1000rpx;
	// border: 1px solid red;
	font-weight: bold;
	margin-left: 30rpx;
	margin-top: 10rpx;
}

.userWay {
	width: 700rpx;
	// height: 1000rpx;
	// border: 1px solid red;
	font-weight: bold;
	margin-left: 30rpx;
	margin-top: 10rpx;
}

.reserveConnect {
	position: fixed;
	bottom: 25rpx;
	left: 50rpx;
	width: 650rpx;
	height: 70rpx;
	// border: 1px solid red;
	background: rgba(241, 240, 241, 0.5);
	box-shadow: 0rpx 1rpx 1rpx rgba(56, 140, 146, 0.651);
	border-radius: 20rpx;
	backdrop-filter: blur(20rpx);
	display: flex;
	justify-content: space-around;
	align-items: center;


}
</style>