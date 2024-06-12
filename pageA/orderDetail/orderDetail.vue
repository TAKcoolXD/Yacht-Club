<template>
    <!-- 下单详情-->
    <view class="orderDetail">
        <yachtTop></yachtTop>
        <!-- 俱乐部名称 标题 有效期 使用时间 游玩地点  -->
        <view class="InforText">
            <view style="padding: 25rpx 0;color:#747474 ;">游艇俱乐部</view>
            <view style="font-weight: bold;font-size: 40rpx;">{{ title }}</view>
            <view style="color:#747474">
                <view>有效期：{{ inforText.date }}</view>
                <view>使用时间:{{ inforText.userTime }}</view>
                <view>游玩地点:{{ inforText.address }}</view>
            </view>
        </view>
        <!-- 计步器 -->
        <view class="purchase">
            <view style="font-weight: bold;font-size: 40rpx;">购买份数</view>
            <!-- 计步器 -->
            <view>
                <u-number-box v-model="value" @change="valChange"></u-number-box>
            </view>
        </view>
        <!-- 景区官方 -->
        <view style="display: flex;justify-content: space-between;  width:660rpx;height: 140rpx;margin: 0 auto;">
            <view style="font-size: 27rpx;color: #4c7aab;">
                <span style="margin: 0 10rpx;">景区官方</span>
                <span style="margin: 0 10rpx;">可走明日</span>
                <span style="margin: 0 10rpx;">随时退·过期退</span>
            </view>
            <view style="font-size: 27rpx;color:#747474 ;">购买须知></view>
        </view>
        <!-- 展示手机号码 -->
        <view style=" width: 690rpx; height: 100rpx; margin: 10rpx auto;display: flex;align-items: center;">
            <view style="font-weight: bold;">手机号码</view>
            <view style="width: 500rpx;">
                <uv-input placeholder="请输入内容" border="surround" clearable v-model="numValue"></uv-input>
            </view>
        </view>
        <!-- 本单可享 优惠卷 暂无可用 -->
        <view style="width: 690rpx; height: 110rpx; margin: 60rpx auto;">
            <view style="font-weight: bold;">本单可享</view>
            <view style="display: flex;justify-content: space-between;margin-top: 15rpx;">
                <view>优惠卷</view>
                <view>暂不可用></view>
            </view>
        </view>
        <!-- 价格 提交订单 -->
        <view style="margin: 0 auto;display: flex;justify-content: space-between;width: 730rpx; height: 110rpx;">
            <view style="color: red;font-size: 40rpx;font-weight: bold;">￥{{ total }}</view>
            <view style="width: 200rpx;height: 100rpx;">
                <uv-button text="提交订单" type="primary" shape="circle" @click="goSumit"></uv-button>
            </view>
        </view>
        <!-- 弹出支付 -->
        <u-modal :show="show" :closeOnClickOverlay="closeOnClick" :showCancelButton="true" @confirm="confirm"
            @cancel="cancel">

            <view style="width: 400rpx;margin: 110rpx auto; ">
                <view style="width: 400rpx;height: 60rpx;margin: 20rpx auto;text-align: center;line-height: 60rpx;">
                    选择支付</view>
                <view
                    style="width: 400rpx;height: 60rpx;border-bottom: 1px solid gray;border-top: 1px solid gray;margin: 5rpx auto; display: flex;justify-content: space-between;align-items: center;padding: 15rpx;">
                    <view>微信支付</view>
                    <view>
                        <radio value="r1" :checked="checked" @click="handleCheckd" />
                    </view>
                </view>

            </view>

        </u-modal>
        <!-- 加载中 -->
        <uv-loading-page :loading="wxshowLoad" loading-text="微信支付" font-size="24rpx"></uv-loading-page>
    </view>

</template>

<script>
import { onLoad } from 'uview-ui/libs/mixin/mixin';
import { orderCartadd,zfbpayStatus } from '@/api/index'


export default {
    data() {
        return {
            value: 1,
            numValue: '',
            title: '',
            show: false,
            wxshowLoad: false,
            closeOnClick: false,
            checked: false,
            inforText: {
                date: '',
                userTime: '',
                address: '',
                price: ''
            },
            wxPayInfo: {

            },
        }
    },
    onLoad(options) {
        console.log('加载下单详情页');
        console.log('从productDetails传过来的参数', options);
        console.log(decodeURIComponent(options.obj));
        let newObj = JSON.parse(decodeURIComponent(options.obj))
        console.log('编码转换对象转换完毕的对象', newObj);
        this.wxPayInfo.id = newObj.id
        this.wxPayInfo.startTime = newObj.startTime
        this.wxPayInfo.endTime = newObj.endTime
        this.title = newObj.name
        this.inforText.date = newObj.notice
        this.inforText.userTime = newObj.illustrate
        this.inforText.address = newObj.accept_address
        this.inforText.price = newObj.price
        let userInfo = uni.getStorageSync('userInfo');
        console.log(userInfo);
        this.numValue = userInfo.mobile
    },
    methods: {
        valChange(e) {
            console.log('当前值为: ' + e.value)
        },
        goSumit() {
            console.log('提交订单');
            this.show = true
        },
        confirm() {
            console.log('确认');
            let userInfo = uni.getStorageSync('userInfo')
            if (this.checked == true) {
                console.log('打开支付'); //勾选微信支付 打开支付
                // pay_type   1=微信支付
                // total_price  价格
                // user_id  用户id
                // product_id 商品id
                // start 开始日期
                // end  结束日期
                // tel  手机号
                // copies 购买数量
                // level // 一级分佣 体验官 商品得数量*10
                // distribution// 二级分佣 渠道分佣   商品得数量*20
                // strator// 管理员费用 合伙人  商品得数量*30
                let obj = {}
                obj.pay_type = 1
                obj.total_price = '0.01' // 这里改钱，不改的话就是 obj.total_price = this.total
                obj.user_id = userInfo.id
                obj.product_id = this.wxPayInfo.id
                obj.start = this.wxPayInfo.startTime
                obj.end = this.wxPayInfo.endTime
                obj.tel = this.numValue
                obj.copies = this.value
                obj.level = this.value * 10
                obj.distribution = this.value * 20
                obj.strator = this.value * 30
                console.log("🚀 ~ confirm ~ obj:", obj)
                this.show = false
                this.wxshowLoad = true
                orderCartadd(obj).then(res => {
                    console.log(res);
                    if (res.code == 1) {
                        this.wxshowLoad = false
                        uni.requestPayment({
                            provider: 'wxpay',
                            nonceStr: res.data.url.nonceStr,
                            package: res.data.url.package,
                            paySign: res.data.url.paySign,
                            signType: res.data.url.signType,
                            timeStamp: res.data.url.timeStamp,
                            success: (result) => {
                                console.log("🚀 ~ orderCartadd ~ result:", result)
                                if(result.errMsg){
                                    // let obj={}
                                    uni.showToast({
                                    title: '支付成功',
                                    icon: 'none'
                                    })
                                    zfbpayStatus({orderId:res.data.order_no}).then(res=>{
                                        console.log(res);
                                        uni.reLaunch({ url: `/pageC/orderList/orderList` })
                                        //uni.navigateTo：用于在现有页面栈中添加新页面，用户可以返回到之前的页面。
                                        //uni.reLaunch：用于关闭所有页面并重新打开一个新页面，用户无法返回到之前的页面。
                                    }) 
                                }

                          
                            },
                            fail: (error) => {
                                console.log("🚀 ~ orderCartadd ~ error:", error)
                                // zfbpayStatus({orderId:res.data.order_no}).then(res=>{
                                //     console.log('支付订单的状态',res);
                                // }) 
                                uni.showToast({
                                    title: '支付失败',
                                    icon: 'none'
                                })
                            }
                        })

                    }
                })

            } else {
                console.log('不能打开');
                uni.showToast({
                    title: '请选择支付方式',
                    icon: 'error'
                })
            }

        },
        cancel() {
            console.log('取消');
            this.show = false
        },
        wxconfirm() {
            console.log('点击确认按钮');
        },
        wxcancel() {
            console.log('取消');
        },
        handleCheckd() {
            this.checked = true
        }
    },
    computed: {
        total() {
            return this.value * this.inforText.price
        }

    }
} 
</script>

<style lang="scss">
.InforText {
    width: 690rpx;
    height: 400rpx;
    // border: 1px solid red;
    margin: 40rpx auto;
}

.purchase {
    width: 690rpx;
    height: 150rpx;
    // border: 1px solid red;
    margin: 20rpx auto;
    display: flex;
    justify-content: space-between;
}
</style>