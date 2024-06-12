<style lang="scss">
/* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
@import "uview-ui/index.scss";
</style>
<script>
export default {
	//小程序整个页面加载时触发
	onLaunch: function () {
		console.log('App Launch')
		//登录获取用户信息
		uni.login({
			success(loginRes) {
				console.log("登录微信获取的参数code", loginRes.code)//登录微信获取的参数code
				 if(loginRes.code){
						//将loginRes.code传给服务器发送请求
						uni.request({
							url: 'https://dpyt.cjpco.cn/home/user/user/login2',
							data: {
								logincode : loginRes.code
								},
							header: {
								'Content-Type': 'application/json',
								'X-Requested-With':'XMLHttpRequest'
								},
							method: 'POST',
							// sslVerify: true,
							success: (res) => {
								console.log('发送请求成功拿到res',res);
								if(res.data.code==1){
									console.log('成功拿到服务器返回res',res.data);
									uni.setStorageSync('userInfo', res.data.data)// 存储到本地缓存 用户信息
								}
								
								},
							fail: (error) => {
								console.log("发送请求失败",error);
								}
							})
				}else{
					console.log('登录失败',loginRes.errMsg);
				 }
				
			},
			fail(e){
				console.log("FAIL")
			}
		})
	},
	onShow: function () {
		console.log('App Show')
	},
	onHide: function () {
		console.log('App Hide')
	}
}
</script>

<style>
/*每个页面公共css */
</style>
