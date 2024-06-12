<template>
	<view class="myProfile">
		<!-- 头部自定义导航栏 -->
		<uv-navbar :fixed="false" :safeAreaInsetTop="true" leftIconSize="0rpx" title="游艇俱乐部">
			<template v-slot:center>
				<view>{{ text }}</view>
			</template>
			<template v-slot:left>
				<image src="/static/返回.png" mode="" style="width: 40rpx;height: 40rpx;" @click="back"></image>
			</template>
		</uv-navbar>
		<!-- 显示我的资料信息的展示 -->
		<view style="width: 700rpx;height: 600rpx;margin: 40rpx auto;border-radius: 20rpx;background-color: #f9f9f9;">
			<view
				style="display: flex;justify-content: space-between;padding: 30rpx;border-bottom: 0.01rpx solid #f3f3f3;">
				<span>昵称</span>
				<span>{{ nickname }}</span>
			</view>
			<view
				style="display: flex;justify-content: space-between;padding: 30rpx;border-bottom: 0.01rpx solid #f3f3f3;">
				<span>账号</span>
				<span>{{ account }}</span>
			</view>
			<view
				style="display: flex;justify-content: space-between;padding: 30rpx;border-bottom: 0.01rpx solid #f3f3f3;"
				@click="bindPhone"">
				<span>手机号</span>
				<view style=" display: flex;align-items: center;">
				<span style="color: skyblue;text-decoration: underline;">{{ phoneNum }}</span>

			</view>
		</view>
		<view style="display: flex;justify-content: space-between;padding: 30rpx;border-bottom: 0.01rpx solid #f3f3f3;">
			<span>地址</span>
			<span>暂无</span>
		</view>
		<view style="display: flex;justify-content: space-between;padding: 30rpx;border-bottom: 0.01rpx solid #f3f3f3;">
			<span>身份证号码</span>
			<span v-if="true" style="color: skyblue;text-decoration: underline;">去绑定</span>
			<span v-else>xxxx</span>
		</view>
		<view style="display: flex;justify-content: space-between;padding: 30rpx;border-bottom: 0.01rpx solid #f3f3f3;">
			<span>注册日期</span>
			<span>{{ createTime }}</span>

		</view>
	</view>
	<u-modal :show="bindPhoneModal" title="更换手机号" :showConfirmButton="false" :showCancelButton="true" @cancel="changeCancel"
		cancelColor="#594e87">
		<view>
			<view class="slot-content" style="width: 550rpx;height: 150rpx;">
				更换手机号后，此微信号上原有的权益不变，专属喜服可通过新的手机号联系您。

			</view>
			<view>
				<button style="background-color:#676fff;border-radius: 50rpx;" open-type="getPhoneNumber"
					@getphonenumber="getphonenumber">一件获取手机号</button>
			</view>
		</view>

	</u-modal>
	</view>
</template>

<script>
import { idCard } from '@climblee/uv-ui/libs/function/test';
import { bindMobile } from '@/api/index.js';

export default {
	data() {
		return {
			text: '',//导航栏中的文字
			nickname: '',//昵称
			account: '',
			phoneNum: '',
			address: '',
			idCard: '',
			createTime: '',
			bindPhoneModal: false,
			reqBlind: {
				logincode: '',
				phonecode: ''
			}

		};
	},
	onLoad(options) {

		console.log('user页面点击传过来的item', options);
		let newObj = JSON.parse(decodeURIComponent(options.obj))
		console.log('转化后的newObj', newObj);
		this.text = newObj.text
		let userInfo = uni.getStorageSync('userInfo')
		console.log("🚀 ~ onLoad ~ userInfo:", userInfo)

		this.nickname = userInfo.nickname
		this.account = userInfo.mobile
		this.phoneNum = userInfo.mobile
		this.address = userInfo.address
		this.createTime = userInfo.user_data + ' ' + userInfo.user_time


	},
	methods: {

		back() {
			uni.navigateBack({
				delta: 1
			})
		},
		bindPhone() {
			console.log('去绑定手机号');
			this.bindPhoneModal = true
		},
		// 微信会返回一个e 参数中有 电话号码的code
		getphonenumber(e) {
			console.log('获取手机号', e)
			let obj = this.reqBlind //这里定义一个obj 嵌套太多层 下方的if里面拿不到 this.reqBlind
			obj.phonecode = e.detail.code
			if (e.detail.errMsg == 'getPhoneNumber:ok') {
				console.log(1);
				// 需求登录返回的COde
				uni.login({
					provider: 'weixin',
					success:(loginRes)=>{
						console.log(loginRes);
						obj.logincode = loginRes.code
						console.log(obj);
						
						bindMobile(obj).then(res=>{
							console.log(res);
							if(res.code==1){
								
								this.phoneNum=res.data.mobile
								
							}
							this.bindPhoneModal = false
							uni.showToast({
								title: '绑定成功',
								icon: 'none'
							})
						})
					},
					fail: function (err) {
						// 登录授权失败
						// err.code是错误码
					}
				});

			}

			// bindMobile().then(res=>{
			// 	console.log(res);
			// })
		},
		changeCancel(){
			this.bindPhoneModal = false
		}


	},
}
</script>

<style lang="scss"></style>