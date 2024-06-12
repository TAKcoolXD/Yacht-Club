<template>
	<view class="User">
		<!-- 显示加载中 -->
		<uv-loading-page :loading="showLoad" loading-text="加载中..." font-size="24rpx"></uv-loading-page>
		<!-- 顶部导航 -->
		<yachtTop></yachtTop>
		<!-- 头像 ID -->
		<view class="UserTop">
			<!-- 用户头像 名称-->
			<view class="userAvatar"> 
				<image v-if="userInfo.id" :src="`https://dpyt.cjpco.cn/${userInfo.userhead}`" mode="aspectFill" style="height: 90rpx;width: 90rpx;border-radius: 50%;">
				</image>
				<image v-else  src="../../static/_r18_c4.jpg" mode="aspectFill" style="height: 90rpx;width: 90rpx;border-radius: 50%;">
				</image>

				<text v-if="userInfo.id" style="font-size: 30rpx;">{{userInfo.nickname}}</text>
				<text v-else style="font-size: 30rpx;" @click="isLogin('未登录')">点此登录</text>


				<text style="font-size: 22rpx;color: #c3c3c3;margin-top: 15rpx;">ID:{{userInfo.id ?  userInfo.id : '未登录'}}</text>
			</view>
			<!-- 消费者点击选择地区 -->
			<text
				style="position: absolute;top: 140rpx;right: 50rpx;border: 1px solid indianred;width: 100rpx;height: 40rpx;line-height:40rpx;text-align: center;padding: 5rpx;border-radius: 20rpx;font-size: 25rpx;font-weight: bold;"
				@click="WeiXingetUserProfile">消费者</text>
		</view>
		<!-- 财富管理 -->
		<view class="Management">
			财富管理
		</view>
		<!-- 订单 钱包 -->
		<view class="OrderWallet">
			<!-- 订单 -->
			<view class="order" @click="goOrderList">
				<image src="../../static/dingdan.png" mode=""></image>
				<text>订单</text>
			</view>
			<!-- 钱包 -->
			<view class="money"  @click="goWalletList">
				<image src="../../static/qianbao.png" mode=""></image>
				<text>钱包</text>
			</view>
		</view>
		<!-- 广告图 -->
		<view class="banner" style="position: relative;">
			<image src="../../static/kefu.png" mode=""></image>
			<!-- 立即咨询  open-type="contact"-->
			<button class="but-msg" open-type="contact" style="width: 180rpx;height: 73rpx;font-size: 30rpx;border-radius: 30rpx;position: absolute;bottom: 35rpx;right: 36rpx;">立即咨询</button>
		</view>
		<view class="feature">
			更多功能
		</view>
		<!-- 我的资料 邀请新人 任务中心 入职有奖 关于我们 -->
		<view class="featureContent" v-for="(item, index) in featureList" :key="index" @click="goFeatureDetail(item)"
			:class="{ 'Noborder': index === 4 }">
			<image :src="item.imgUrl" mode="" style="width: 50rpx;height: 45rpx;margin-right: 20rpx;"></image>
			<text>{{ item.text }}</text>
		</view>
		<!-- 合作商伙伴 -->
		<view class="partner">
			<view class="top" style="display: flex;">
				<view class="topItem" v-for="(item, index) in partnerList" :key="index" style="margin-right: 120rpx;">
					<image :src="item.imgUrl" mode="" style="width: 50rpx;height: 45rpx;margin-right: 10rpx;"></image>
					<text style="font-weight: bold;">{{ item.text }}</text>
				</view>
			</view>
			<!-- 合作商伙伴icon图 -->
			<view class="Icon" style="display: flex;justify-content: space-around;margin-top: 20rpx;">
				<image src="../../static/gongying.jpg" mode=""
					style="width: 250rpx;height: 250rpx;border-radius: 20rpx;"></image>
				<image src="../../static/gongying.jpg" mode=""
					style="width: 250rpx;height: 250rpx;border-radius: 20rpx;"></image>
			</view>
		</view>
		<!-- 点击登录时或者第一次进入我的页面时 底部弹框 获取手机号-->
		<uv-popup ref="Userpopup" @change="changePhone" mode="bottom">
			<!-- <view class="otherAct" style="width: 100rpx; height: 450rpx;border: 1px solid red;">
					123
			</view> -->
			<view style="">
				<!-- 头部图标 和标题 -->
				<view  style="display:  flex;align-items: center;margin-top: 20rpx;margin-left: 55rpx;">
					<image
					src="../../static/_r18_c4.jpg"
					mode="scaleToFill" style="width: 50rpx;height: 50rpx;"
				/>
				<text style="margin: 10rpx;">游艇俱乐部</text>
				</view>
				<!-- 提示文字 获取用户手机号 -->
				<view style="width: 550rpx;height: 100rpx;margin-top: 20rpx;margin-left: 45rpx;">
					<view>获取手机号</view>
					<view  style="color: #c3c3c3;font-size: 28rpx;margin-top: 10rpx;">你的手机号将用于登录</view>
				</view>
				<!-- 取消 获取手机号两个按钮 -->
				<view style="display: flex;margin-top: 30rpx;width: 750rpx;">
					<button style="background-color: #f7f7f7;width: 220rpx;font-size: 30rpx;height: 70rpx;" @click="close">取消</button>
					<button style="background-color: #1aad19;width: 220rpx;color: white;font-size: 30rpx;height: 70rpx;" open-type="getPhoneNumber" withCredentials="true" @getphonenumber="getPhoneNumber">获取手机号</button>
				</view>
			</view>
		</uv-popup>
		<!-- 点击获取手机号之后成功获取手机号完毕弹出 上传头像 -->
		<uv-popup ref="userAvatarPopup" @change="changeUserAvatar" mode="bottom">
			<view style="">
					<!-- 头部图标 和标题 -->
				<view  style="display:  flex;align-items: center;margin-top: 20rpx;margin-left: 30rpx;">
					<image
					src="../../static/_r18_c4.jpg"
					mode="scaleToFill" style="width: 50rpx;height: 50rpx;margin-right: 15rpx;"
				/>
					<text style="margin: 10rpx;">游艇俱乐部</text>
				</view>
				<!-- 设置头像 昵称 -->
				<view style="margin-left: 30rpx;font-weight: bold;">设置你的头像--昵称</view>
				<view style="color: #c3c3c3;margin-left: 30rpx;font-size: 25rpx;margin-top: 10rpx;">展示个人信息</view>
				<!-- 选择头像 -->
				<!-- <view style="width: 300rpx;height: 80rpx;display: flex;align-items: center;margin-top: 25rpx;margin-left: 30rpx;">
					<text>头像</text>
					<view style="margin-left: 10rpx;" @click="choseUserAvatar">
						<image
							src="../../static/用户.png"
							mode="scaleToFill" style="width: 76rpx;height: 74rpx;margin-left: 37rpx;"
						/>
						<image
							src="../../static/右箭头.png"
							mode="scaleToFill" style="width: 76rpx;height: 49rpx;margin-left: 35rpx;"
						/>
					</view>
				</view> -->
				<!-- 弹出微信选择头像 -->
				<!-- 坑 @chooseavatar 没有驼峰命名-->
				<button open-type="chooseAvatar" @chooseavatar="chooseavatar" style="background-color: #ffffff;margin-top: 20rpx;">
					<view style="display: flex;align-items: center;">
						<text>头像</text>
						<view style="margin-left: 10rpx;display: flex;align-items: center;" @click="choseUserAvatar">
							<image  v-if="inPutInfo.iptImage"
							:src="inPutInfo.iptImage"
							mode="scaleToFill" style="width: 76rpx;height: 74rpx;margin-left: 37rpx;"
								/>
							<image v-else="inPutInfo.iptImage"
							 src="../../static/用户.png"
							mode="scaleToFill" style="width: 76rpx;height: 74rpx;margin-left: 37rpx;"
								/>
							<image
							src="../../static/右箭头.png"
							mode="scaleToFill" style="width: 76rpx;height: 49rpx;margin-left: 35rpx;"
								/>
					</view>
					</view>
				</button>
				<!-- 输入昵称 -->
				<view style="display: flex;align-items: center;margin-top: 20rpx;margin-left: 30rpx;">
					<text>昵称：</text>
					<u--input placeholder="请输入昵称" border="surround" v-model="inPutInfo.iptNickname" @change="nickchange" style="width: 300rpx;"></u--input>
				</view>
				<!-- 点击确认授权 获取用户信息 -->
				<button open-type="getUserInfo" @click="getuserinfo">确认授权</button> 
			</view>
		</uv-popup>
	</view>

</template>

<script>
import { userLogin,userHead } from '@/api/index'
export default {
	data() {
		return {
			featureList: [
				{
					text: '我的资料',
					id: 1,
					imgUrl: '../../static/shimingrenzheng.png'
				},
				{
					text: '邀请新人',
					id: 2,
					imgUrl: '../../static/yaoqingxinren.png'
				},
				// {
				// 	text: '任务中心',
				// 	id: 3,
				// 	imgUrl: '../../static/ruzhuyoujiang.png'
				// },
				{
					text: '入职有奖',
					id: 4,
					imgUrl: '../../static/ruzhuyoujiang.png'
				},
				{
					text: '关于我们',
					id: 5,
					imgUrl: '../../static/shezhi.png'
				},
			],
			partnerList: [
				{
					text: '成为合作商',
					id: 0,
					imgUrl: '../../static/gongyingshang.png'
				},
				{
					text: '我的伙伴',
					id: 1,
					imgUrl: '../../static/hezuohuoban.jpg'
				},
			],
			showLoad:false,//显示加载中效果
			userInfo:{
				userhead:'../../static/_r18_c4.jpg', //用户头像
				nickname:'', //用户昵称
				id:'',//用户ID
			},//用户信息
			inPutInfo:{ //用户输入的 获取微信头像的信息
				iptImage:'',
				iptNickname:'',
				id:''
			}
		}
	},
	methods: {
		/**实现微信登录该函数调用 uni.getUserProfile 方法来获取用户信息。*/
		// WeiXingetUserProfile() {
		// 	wx.getUserProfile({
		// 		desc: '获取用户信息',
		// 		lang: 'zh_CN',
		// 		success: (res) => {
		// 			console.log("成功的res", res)
		// 			// 写微信登录逻辑
		// 			if(res.userInfo){
		// 				// this.WeiXingLogin(res.userInfo)
		// 			}						
		// 		},
		// 		fail: (res) => {
		// 			console.log("失败的res", res)
		// 		}
		// 	})
		// },
		// // 微信登录
		// WeiXingLogin(userInfo){
		// 	wx.login({
		// 		success:res=>{
		// 			console.log(res)
		// 			if(res.code){
		// 				console.log(res);
		// 			}
		// 		},
		// 	})
		// },


		//联系客服 点击跳转到跟客户聊天
		goConsultation(){
			console.log("联系客服");
			wx.openCustomerServiceChat({
					extInfo: {
						url: 'https://work.weixin.qq.com/...'//客服地址链接
					},
					corpId: '企业ID',//必须和你小程序上的一致
					success(res) {
						console.log(res, 1)
					},
					fail(res) {
						console.log(res, 2)
					},
				})
		},
		//去用户点击详情页
		goFeatureDetail(item){
			console.log("遍历传过来的item", item)
			let obj = JSON.stringify(item)//因为路径需要字符串  item传过来是一个对象需要转化成字符串
			console.log('将传过来的对象转化为字符串', obj)
			if(item.id==1){	
				uni.navigateTo(
				{
				 	url: `/pageC/myProfile/myProfile?obj=${encodeURIComponent(obj)}`
				})
			}
			if(item.id==2){
				uni.navigateTo(
				{
				 	url: `/pageC/inviteNewcomers/inviteNewcomers?obj=${encodeURIComponent(obj)}`
				})
			}
			if(item.id==3){
				uni.navigateTo(
				{
				 	url: `/pageC/taskCenter/taskCenter?obj=${encodeURIComponent(obj)}`
				})
			}
			if(item.id==4){
				uni.navigateTo(
				{
				 	url: `/pageC/joiningBonus/joiningBonus?obj=${encodeURIComponent(obj)}`
				})
			}
			if(item.id==5){
				uni.navigateTo(
				{
				 	url: `/pageC/aboutUs/aboutUs?obj=${encodeURIComponent(obj)}`
				})
			}
			// uni.navigateTo(
			// 	{
			// 	 	url: `/pageC/aboutUs/aboutUs?obj=${encodeURIComponent(obj)}`
			// 	})
		},
		//弹出获取手机号的弹框
		openUserpopup(){
			console.log('打开弹窗');
			this.$refs.Userpopup.open();
		},
		//改变获取手机号时的弹框
		changePhone(e){
			console.log('弹窗状态改变：',e);
		},
		// 改变获取头像 昵称时的弹框
		changeUserAvatar(e){
			console.log('弹窗状态改变：',e);
		},
		//输入昵称输入框发生变化触发
		nickchange(e){
			console.log('change', e);
		},
		// 点击按钮成功获取手机号 button 的open-type=getPhoneNumber  获取用户手机号，可以从@getphonenumber回调中获取到用户信息 弹出获取手机号
		getPhoneNumber(e){
			console.log('打开微信的询问是否获取用户电话的弹窗进行绑定',e);
			if(e.detail.errMsg=='getPhoneNumber:ok'){ //用户点了允许
				this.$refs.Userpopup.close(); //点击获取手机号关闭手机号弹窗
				uni.login({
				provider: 'weixin',
				success:(loginRes)=>{
					console.log('这个登录成功的code',loginRes);
					this.showLoad=true //显示加载中的动画
					let data = {
						phonecode: e.detail.code,
						logincode: loginRes.code,
						encryptedDataStr: e.detail.encryptedData,
						iv: e.detail.iv,
					}
					// 成功获取电话号码 然后进行登录 
					userLogin(data).then(res=>{
						console.log('登录人的信息',res);
						this.showLoad=false
						this.$refs.Userpopup.close()
						this.$refs.userAvatarPopup.open()
					}).catch(res=>{
						console.log('获取登录人的信息失败');
					})

				}
			})
			}else{ //用户点了拒绝
				this.$refs.Userpopup.close(); //点击获取手机号关闭手机号弹窗
				this.showLoad=false
			}
			// uni.login({
			// 	provider: 'weixin',
			// 	success:(loginRes)=>{
			// 		console.log('这个登录成功的code',loginRes);
			// 		this.showLoad=true //显示加载中的动画
			// 		let data = {
			// 			phonecode: e.detail.code,
			// 			logincode: loginRes.code,
			// 			encryptedDataStr: e.detail.encryptedData,
			// 			iv: e.detail.iv,
			// 		}
			// 		// 成功获取电话号码 然后进行登录 
			// 		userLogin(data).then(res=>{
			// 			console.log('登录人的信息',res);
			// 			this.showLoad=false
			// 			this.$refs.Userpopup.close()
			// 			this.$refs.userAvatarPopup.open()
			// 		}).catch(res=>{
			// 			console.log('获取登录人的信息失败');
			// 		})

			// 	}
			// })
		},
		// 关闭获取手机弹窗
		close(){
			this.$refs.Userpopup.close();
		},
		//判断是否登录
		isLogin(e){
			console.log('登录了嘛？',e);
			if(e==='未登录'){
				this.$refs.Userpopup.open() // 未登录打开弹窗
				this.showLoad=false //显示加载中  关闭
			}else{
				this.showLoad=false
			}
			// console.log('打开弹窗');
			// this.$refs.Userpopup.open();
		},
		//打开选择微信头像 或者自己上传头像
		chooseavatar(e){
			console.log('打开相册选择',e);
			e.detail.avatarUrl
			this.inPutInfo.iptImage=e.detail.avatarUrl
			console.log("上换的头像", this.inPutInfo.iptImage)
		},
		getuserinfo(e){
			console.log('获取用户信息',e);
			console.log(this.inPutInfo);
			console.log(this.userInfo);
			const baseUrl='https://dpyt.cjpco.cn'
			// let _this = this
			let userInfo = uni.getStorageSync('userInfo');
			if(this.inPutInfo.iptImage&&this.inPutInfo.iptNickname){
				this.$refs.userAvatarPopup.close()
				uni.uploadFile({
					url:baseUrl+'/home/user/user/uploadImage',
					filePath:this.inPutInfo.iptImage,
					name: 'file',
					header: {
						'Content-Type': 'multipart/form-data'
					}, // 设置请求头部信息
					success: (res) => {
						console.log('成功上传',res);
						let content=JSON.parse(res.data)
						console.log("打印的转化结果", content)
						this.inPutInfo.iptImage=content.data //图片途径
						let userContent={
							busid:userInfo.id,
							...this.inPutInfo
						}
						console.log('合并的对象',userContent);
						userHead({
							busid:userContent.busid,
							nickname:userContent.iptNickname,
							userhead:userContent.iptImage
						}).then(res=>{
							console.log('成功发送到数据库',res);
							if(res.code==1){
								uni.setStorageSync('userInfo', res.data)
								this.userInfo={
									userhead:res.data.userhead, //空
									nickname:res.data.nickname,//空
									id:res.data.id
								}
								console.log(this.userInfo);
							}
						})
						// 存入后台数据
					},
					fail:(res)=>{
						console.error('上传失败', err);
						// 处理上传失败后的操作
						// ...
					}
				})
			}
		},
		goOrderList(){
			uni.navigateTo({ url: `/pageC/orderList/orderList` })
		},
		goWalletList(){
			console.log('我的钱包')
			uni.navigateTo({ url: `/pageC/WalletList/WalletList` })
		}
	},
	onLoad() {
		console.log('我的页面加载时');

		// this.$refs.Userpopup.open();//打开获取手机号 弹窗
		// this.openUserpopup()
		if(uni.getStorageSync('userInfo')){ //在app.vue已经存储了userInfo 
			let userInfo = uni.getStorageSync('userInfo');
			// console.log('这个是us',userInfo);
			//第一次在app.vue存储的userinfo没有电话号码，在获取电话号码之后存储的userInfo才有电话号码
			if (userInfo.mobile && userInfo.mobile !== '') {  //userInfo.mobile  手机号 同时拥有手机号且不为空 
				this.userInfo.userhead = userInfo.userhead //用户头像 空
				this.userInfo.nickname = userInfo.nickname;//用户昵称 空
				this.userInfo.id = userInfo.id//用户id
			} else {
				this.isLogin('未登录')

			}
		}else{
			this.$refs.Userpopup.open();
			this.isLogin('未登录') //未登录
		}
	}

}
</script>

<style lang="scss">
.UserTop {
	position: relative;
	width: 750rpx;
	height: 320rpx;
	// border: 1px solid red;
	display: flex;
	justify-content: center;

	.userAvatar {
		width: 200rpx;
		height: 200rpx;
		// border: 1px solid red;
		margin-top: 20rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		// border-radius: 20rpx;
	}
}

.Management {
	width: 700rpx;
	border-bottom: 1px solid #c3c3c3;
	margin: 0 auto;
	padding-bottom: 15rpx;
	font-weight: bold;
}

.OrderWallet {
	width: 700rpx;
	height: 150rpx;
	// border: 1px solid red;
	margin: 0 auto;
	display: flex;
	justify-content: space-around;
	align-items: center;

	.order {
		width: 100rpx;
		height: 100rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;

		image {
			width: 50rpx;
			height: 70rpx;
			margin-bottom: 10rpx;
		}
	}

	.money {
		width: 100rpx;
		height: 100rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;

		image {
			width: 50rpx;
			height: 70rpx;
			margin-bottom: 10rpx;
		}
	}

}

.banner {
	position: relative;
	width: 700rpx;
	height: 150rpx;
	// border: 1px solid red;
	margin: 35rpx auto;

	image {
		width: 700rpx;
		height: 150rpx;
		border-radius: 20rpx;
	}

	.advisory {
		position: absolute;
		top: 45rpx;
		right: 20rpx;
		width: 170rpx;
		height: 60rpx;
		// border: 1px solid red;
		line-height: 60rpx;
		text-align: center;
		border-radius: 30rpx;
		background-color: #fff;
	}

}

.feature {
	width: 700rpx;
	border-bottom: 1px solid #c3c3c3;
	margin: 0 auto;
	padding-bottom: 15rpx;
	font-weight: bold;
}

.featureContent {
	width: 700rpx;
	border-bottom: 1px solid #c3c3c3;
	margin: 0 auto;
	padding-bottom: 15rpx;
	display: flex;
	align-items: center;
	margin-top: 17rpx;

}

.Noborder {
	border-bottom: none;
}

.partner {
	width: 700rpx;
	height: 350rpx;
	// border: 1px solid red;
	margin: 50rpx auto;
	// display: flex;
}
</style> 