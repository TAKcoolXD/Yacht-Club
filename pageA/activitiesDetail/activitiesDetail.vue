<template>
	<!-- 游玩活动 -->
	<view class="activitiesDetail" style="position: relative;">
		<!-- 自定义顶部导航栏 -->
		<yachtTop></yachtTop>
		<!--游玩轮播图-->
		<view class="activitiesSwiper">
			<swiper class="swiper" circular :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval"
				:duration="duration">
				<swiper-item v-for="(item, index) in 1" :key=index>
					<image :src='`https://dpyt.cjpco.cn/${activitiesImage}`' mode=""
						style="width: 100%;height: 100%;" />
				</swiper-item>
				<!-- 服务器域名https://dpyt.cjpco.cn -->
			</swiper>
		</view>
		<!-- 游玩活动名称 -->
		<view class="activitiesTitle" style="margin-left: 60rpx; margin-top: 25rpx;">
			<uv-tabs :list="list"></uv-tabs>
		</view>
		<!-- 选择游玩地点 -->
		<view class="touristSpot">
			<!-- 省 地点 -->
			<text style="">请选择游玩省市</text>
			<text>请选择活动地点</text>
		</view>
		<!-- 选择游玩地点pinker -->
		<view class="selectPinker" style="display: flex;width: 700rpx;margin: 0 auto;justify-content: space-between;">
			<!-- 游玩城市地点 -->
			<view class="province" @click="openprovincePicker"
				style="display: flex; justify-content: space-between; width: 300rpx;align-items: center;border-bottom: 1px solid black;border-radius: 30rpx;padding: 14rpx;margin-right: 25rpx;">
				<text>{{ city ? city : '全部' }}</text>
				<image src="../../static/倒三角.png" mode="" style="width: 30rpx;height: 30rpx;"></image>
			</view>
			<!-- 游玩详细地点 -->
			<view class="spot" @click="openspotPicker"
				style="display: flex; justify-content: space-between; width: 318rpx;align-items: center;border-bottom: 1px solid black;border-radius: 30rpx;padding: 14rpx;">
				<text>{{ activityAddress ? activityAddress : '' }}</text>
				<image src="../../static/倒三角.png" mode="" style="width: 30rpx;height: 30rpx;"></image>
			</view>
			<!-- picker 选择框 -->
			<view class="picker">
				<!-- 请选择游玩省市 选择框 -->
				<u-picker closeOnClickOverlay @cancel="Provinceshow = false" @close="Provinceshow = false"
					:show="Provinceshow" ref="Provincepicker" :columns="Provincecolumns" @confirm="ProvinceConfirm"
					@change="ProvinceChange"></u-picker>
				<!-- 请选择活动地点的省市 选择框 -->
				<u-picker closeOnClickOverlay @cancel="spotshow = false" @close="spotshow = false" ref="spotpicker"
					:show="spotshow" :columns="spotcolumns" @confirm="spotconfirm" @change="spotChange"></u-picker>
			</view>
		</view>
		<view class="inputspot" >
			<!-- 输入框组件库 宽度由父组件控制 -->
			<u--input  v-model="inputValue" placeholder="景点/品牌/酒店名" prefixIcon="search" prefixIconStyle="font-size: 22px;color: #909399" fontSize="30rpx"  border="bottom"></u--input>
			<!-- <u-icon name="search"></u-icon>
				
			<input type="text" style="width: 562rpx; height: 45rpx; border-bottom: 1px solid #e9e9e9; margin: 32rpx auto; border-radius: 6rpx;box-shadow: 0 3px 5px rgba(0, 0, 0, 0.3);"> -->
		</view>

		<view class="search">
			<!-- <uv-search placeholder="/景点/品牌/酒店" v-model="keyword" :showAction="false"></uv-search> -->
			<button style="width: 670rpx;margin-top: -10rpx;background-color: aquamarine;" @click="goSearch">查询</button>
		</view>
		<!-- 具体项目展示 -->
		<view class="projectList">
			<view class="ListItem" v-for="item in projectList" :key="item" @click="goProductDetails(item)">
				<image :src="`https://dpyt.cjpco.cn/${item.product_img}`" mode="scaleToFill"></image>
				<view class="ListText">
					<view class="Listtitle">
						{{ item.name }}
					</view>
					<view class="Listprice">
						<text style="color: red;font-size: 40rpx;">￥{{ item.price }}</text>
						<text style="color: #cccccc;">{{ item.deal }}付款</text>
					</view>
					<view class="OperatingHours">
						<text>{{ item.travel }}</text>
					</view>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
import { getActivitiesDetail } from '@/api/index'
export default {
	data() {
		return {
			indicatorDots: true,//轮播图上的点
			autoplay: false,//	轮播图是否自动播放
			interval: 2000,//轮播图时间
			duration: 500,//滑动的时间
			SwiperList: [], //轮播图列表
			list: [{
				name: '关注', //关注底部蓝色
			}],

			Provinceshow: false,//控制请选择省市的的显示 pinker值
			Provincecolumns: [],//控制请选择省市的pinker值第一个picker数组
			ProvincecolumnData: [],//控制请选择省市的pinker值第一个picker多级联动第二个数组

			//渲染页面的数据
			city: '',//控制请选择省市的pinker值 渲染到模板上的值
			activitiesImage: '',//顶部展示轮播图 
			activityAddress: '',//船名称 比如九州港码头 渲染到模板上的值
			projectList: [],//商品展示船 价格 时间 

			spotshow: false,//这个是显示活动地点pinker的显示
			spotcolumns: [],//显示活动地点的pinker值 数组
			// 进入页面第一次整理数据 发送的请求数据
			submitData: {
				typeid: '',
				acceptCity: '',
				accepTaddress_name: '',
				search_name: '',
				name: '',
				limit: 28
			},
			//整理第一个picker 用于后面的pinker选择地点
			from: {
				typeid: '', // 类型id
				acceptCity: '', //比如珠海市 城市名称
				accepTaddress_name: '', //船名称 比如九州港码头
				search_name: '', //	搜索商品名称
				name: '',
				limit: 10
			},
			inputValue:'' //输入框的值
		};
	},
	onLoad(options) {
		console.log('点击各个项目游艇 别墅 钓鱼艇 展示页面');
		// JSON.stringify()：将 JavaScript 对象转换为 JSON 字符串。
		// JSON.parse()：将 JSON 字符串解析为 JavaScript 对象。
		// 传过来的options 是一个json对象 需要json.parse()将json对象转化为对象形式
		console.log("这个是options", options)//用户从首页点击 传入过来的item
		let newObj = JSON.parse(decodeURIComponent(options.obj)) //decodeURIComponent 前面用了${encodeURIComponent(obj)} 需要转换一次
		// let newObj=JSON.parse(options.obj)
		console.log('转化后的newObj', newObj);
		this.submitData.typeid = newObj.id
		// this.id = newObj.id
		this.from.typeid = newObj.id
		console.log('需要传入的id', this.id);
		// 页面加载根据 页面传过来的id 发送请求
		this.test()
	},
	methods: {
		// 点击打开省市pinker 控制显示请选择省市的pinker值方法
		openprovincePicker() {
			// this.$refs.Provincepicker.open();
			this.Provinceshow = true
		},
		//点击打开活动地点pinker 控制显示请选择活动地点的pinker值方法
		openspotPicker() {
			this.spotshow = true
		},
		// 控制请选择省市的pinker值第一个picker 每次切换确认选择获得值
		ProvinceConfirm(e) {
			console.log('省confirm', e)
			this.Provinceshow = false//每次选择完关闭 pinker
			this.city = e.value[1] //渲染模板的城市
			this.from.acceptCity = e.value[1] //用于发送请求的整理的数据 通过这个发请求
			this.from.accepTaddress_name = ''
			console.log('更新后的this.from', this.from);
			getActivitiesDetail(this.from).then((res) => {
				console.log('点击第一个省市的pinker框选择其中一个城市发请求回来的数据', res);
				this.projectList = res.data.res //点击第一个省市的pinker框选择其中一个城市发请求回来的数据 珠海显示 国际航海文化中心 日月贝格力游艇码头
				if (res.code == 1) {
					let a = []
					let b = []
					a = res.data.accepTaddress //比如说选了珠海 显示的是 国际航海文化中心 日月贝格力游艇码头 数组
					console.log('a数组', a);
					for (let i = 0; i < a.length; i++) {  //遍历数组对象
						// this.spotcolumns.push(a[i].accept_address) //赋值给第二个picker框
						b.push(a[i].accept_address) //遍历出来成为一个数组

					}
					console.log('b数组', b);//遍历出来成为一个数组
					this.spotcolumns.length = ''
					this.spotcolumns.push(b) //赋值给第二个picker框spotcolumns 它的值是数组里面包着数组
					console.log('通过获取请求得到活动地点的数组', this.spotcolumns);
				}
			})

		},
		//控制请选择活动地点pinker值 每次确认选择时触发 获得值
		spotconfirm(e) {
			console.log('通过获取请求得到活动地点的数组11111', this.spotcolumns);
			console.log('spotconfirmconfirm具体活动城市1', e.value);
			this.activityAddress = e.value
			let a = e.value.toString()
			console.log('confirm a', a);
			this.from.accepTaddress_name = a
			console.log('111111', this.from);
			getActivitiesDetail(this.from).then(res => {
				console.log('整理第二个picker', res);
				this.projectList = res.data.res
			})
			this.spotshow = false
		},
		//省市picker选择框切换时 触发
		ProvinceChange(e) {
			const {
				columnIndex,
				value,
				values, // values为当前变化列的数组内容
				index,
				// 微信小程序无法将picker实例传出来，只能通过ref操作
				picker = this.$refs.Provincepicker
			} = e
			// 当第一列值发生变化时，变化第二列(后一列)对应的选项
			if (columnIndex === 0) {
				// picker为选择器this实例，变化第二列对应的选项
				picker.setColumnValues(1, this.ProvincecolumnData[index])
			}
			this.activityAddress = ''
		},
		//活动地点picker选择框切换时 触发
		spotChange(e) {
			console.log('2222222222', e);
			console.log('spotChange', e.value);
			this.activityAddress = ''
		},
		// 页面加载根据 页面传过来的id 发送请求
		test() {
			getActivitiesDetail(this.submitData).then(res => {
				console.log('获取数据结果', res)
				this.projectList = res.data.res //各个商品展示船图片 价格 时间 
				console.log("this.projectList:展示图", this.projectList)//商品展示船图片 价格 时间 
				this.activitiesImage = res.data.product_TypeImg.picture //顶部展示轮播图
				let { accepTaddress, product_accept_province } = res.data //解构数组
				this.spotcolumns=[]
				this.spotcolumns.length=0
				let d=[]
				res.data.accepTaddress.forEach(element => {
						console.log('打印出来的',element.accept_address);
						d.push(element.accept_address)
				});
				console.log('d数组',d);
				this.spotcolumns.push(d)
				console.log('打印this.spotcolumns',this.spotcolumns);
				this.Provincecolumns.length = 0 //让省城市第一个数组长度为0
				let addre = product_accept_province //将解构的数组product_accept_province 存入addre数组  这个数组包括城市 和省份
				console.log("🚀 ~ getActivitiesDetail ~ addre:", addre)//[{accept_city:["惠州市", "深圳市", "珠海市"],accept_province:"广东省"}, {accept_city:['玉林市'],accept_province:'广西壮族自治区'}]
				this.Provincecolumns = [] //将选择省市的第一个数组滞空Provincecolumns 数组滞空
				let a = [] //Provincecolumns第一个数组 ["广东省" ,"广西壮族自治区"]
				let b = []//Provincecolumns第二个数组['广东省','深圳市','珠海市']
				for (let v = 0; v < addre.length; v++) {
					a.push(addre[v].accept_province) //a数组这里面包括 [{accept_city:['广东省','深圳市','珠海市'],accept_province:'广东省'},{accept_city:['玉林市'],accept_province:'广西壮族自治区'}]
					this.ProvincecolumnData.push(addre[v].accept_city)//this.ProvincecolumnData数组包括 {accept_city:['广东省','深圳市','珠海市']
					if (addre[v].id == 6) {
						b = addre[v].accept_city
					}
				}
				this.Provincecolumns.push(a) //Provincecolumns:[["广东省" ,"广西壮族自治区"],['广东省','深圳市','珠海市']]
				this.Provincecolumns.push(b)
			})
		},
		//通过输入框搜索发送请求
		goSearch(){
			this.from.accepTaddress_name=''
			this.from.acceptCity=''
			this.from.search_name=this.inputValue
			console.log('输入完毕后整理对象',this.from);
			getActivitiesDetail(this.from).then(res=>{
				 console.log(res);
				 this.projectList = res.data.res
				 this.inputValue=''
			})
			
		},
		goProductDetails(item){
			console.log(item);
			let obj=JSON.stringify(item)
			uni.navigateTo({ url: `/pageA/productDetails/productDetails?obj=${encodeURIComponent(obj)}` })
		}
	
	},
}
</script>
<!-- #region -->
picker 每一个选择框里面是一个二维数组
遍历数组需要 先用一个空数组 将数据遍历出来 再push到空数组中 在放进data中定义的数组 
<!-- #endregion -->
<style lang="scss">
.touristSpot {
	margin-top: 30rpx;
	margin-bottom: 30rpx;
	display: flex;
	justify-content: space-around;

	text {
		font-size: 25rpx;
		color: #818181;
		margin-left: -60rpx;
	}

}
.inputspot{
	width: 605rpx;
	height: 66rpx;
	// border: 1px solid red;
	margin: 10rpx auto;
	// position: relative !important;
	// .u-icon__icon.data-v-172979f2{
	// 	font-size: 44rpx !important; 
	// 	position: absolute !important;
	// 	top: 40rpx !important;
	// 	left: 95rpx !important;
	// 	font-size: 60rpx !important;
	// }
}

.search {
	margin-top: 30rpx;
	margin-left: 10rpx;
}

.projectList {
	width: 750rpx;
	height: 100%;
	// margin-top: 20rpx;
	margin: 19rpx 5rpx;
	// border: 1px solid red;
	display: flex;
	flex-wrap: wrap;
	// justify-content: center;

	.ListItem {
		width: 350rpx;
		height: 420rpx;
		// border: 1px solid red;
		margin: 0 10rpx;

		// margin: 50rpx 10rpx;
		// margin-top: 150rpx;
		// margin-left: 10rpx;
		image {
			width: 350rpx;
			height: 250rpx;
			border-radius: 20rpx;
		}

		.ListText {

			.Listtitle {
				white-space: nowrap;
				font-size: 40rpx;
				overflow: hidden;
				text-overflow: ellipsis;
				font-weight: bold;
			}

			.Listprice {
				display: flex;
				justify-content: space-between;
			}

			.OperatingHours {
				text {
					border: 1px solid #c56a37;
					font-size: 27rpx;
					color: #d28c65;
				}
			}
		}
	}
}
</style>