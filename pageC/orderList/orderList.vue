<template>
   <!-- 订单列表-->
   <view class="orderList">
      <yachtTop></yachtTop>
      <u-tabs :list="list1" @click="click"></u-tabs>
      <!-- 全部 -->
      <view class="All" v-show="showList == 0" style="margin-top: 20rpx;">
         <view v-for="item in orderInfoArr" :key="item" class="AllList"
            style="margin-top: 25rpx;width: 690rpx;border: 1px solid #eeeef8;margin: 0 auto;border-radius: 20rpx; box-shadow: 0px 0 3px rgba(0, 0, 0, 0.2);">
            <!-- 订单编号 订单状态 -->
            <view style="display: flex;justify-content: space-between;border-bottom: 1px solid #eeeef8;padding: 10rpx">
               <view style="font-size: 25rpx;">订单编号：{{ item.code }}</view>
               <view style="font-weight: bold;font-size: 27rpx;" v-show="item.status == 8">已取消</view>
               <view style="font-weight: bold;font-size: 27rpx;" v-show="item.status == 2">已支付</view>
               <view style="font-weight: bold;font-size: 27rpx;" v-show="item.status == 1">待支付</view>
            </view>
            <view @click="goProdetail(item)"
               style="display: flex;justify-content: space-around;border-bottom: 1px solid #eeeef8;margin-top: 20rpx;">
               <image :src="`https://dpyt.cjpco.cn/${item.product_img}`" mode="scaleToFill"
                  style="width: 110rpx;height: 100rpx;border-radius: 10rpx;margin-top: 70rpx;" />
               <view style="width: 530rpx;height: 270rpx;">
                  <view style="font-weight: bold;">{{ item.product_name }}</view>
                  <view style="font-size: 25rpx;margin-top: 15rpx">{{ item.accept_native_place }}</view>
                  <view style="font-size: 25rpx;margin-top: 15rpx">{{ item.createtime }}</view>
                  <view style="color: red;margin-top: 15rpx">￥{{ item.amount }}</view>
               </view>
            </view>
            <view style="width: 690rpx;font-size: 30rpx;margin: 15rpx 0;display: flex;justify-content: flex-end;">
               <view style="display: flex;">
                  <button @click="checkQr"
                     style="font-size: 28rpx;background-color: #3c9cff;width: 200rpx;height: 60rpx;line-height: 60rpx;border-radius: 20rpx;margin: 0 10rpx;"
                     v-if="item.status == 2">查看卷码</button>
                  <button @click="goPay(item.order_id)"
                     style="font-size: 28rpx;background-color: #3c9cff;width: 200rpx;height: 60rpx;line-height: 60rpx;border-radius: 20rpx;margin: 0 10rpx;"
                     v-if="item.status == 1">去付款</button>
                  <button @click="goCancel(item)"
                     style="font-size: 28rpx;background-color: #3c9cff;width: 200rpx;height: 60rpx;line-height: 60rpx;border-radius: 20rpx;margin: 0 10rpx;"
                     v-if="item.status == 1">取消订单</button>
               </view>

            </view>

         </view>
      </view>

      <!-- 待支付 -->
      <view class="PendingPayment" v-show="showList == 1">
         <view v-for="item in PaymentArr" :key="item" class="AllList"
            style="margin-top: 25rpx;width: 690rpx;border: 1px solid #eeeef8;margin: 0 auto;border-radius: 20rpx; box-shadow: 0px 0 3px rgba(0, 0, 0, 0.2);">
            <!-- 订单编号 订单状态 -->
            <view style="display: flex;justify-content: space-between;border-bottom: 1px solid #eeeef8;padding: 10rpx">
               <view style="font-size: 25rpx;">订单编号：{{ item.code }}</view>
               <view style="font-weight: bold;font-size: 27rpx;" v-show="item.status == 8">已取消</view>
               <view style="font-weight: bold;font-size: 27rpx;" v-show="item.status == 2">已支付</view>
               <view style="font-weight: bold;font-size: 27rpx;" v-show="item.status == 1">待支付</view>
            </view>
            <view
               style="display: flex;justify-content: space-around;border-bottom: 1px solid #eeeef8;margin-top: 20rpx;">
               <image :src="`https://dpyt.cjpco.cn/${item.product_img}`" mode="scaleToFill"
                  style="width: 110rpx;height: 100rpx;border-radius: 10rpx;margin-top: 70rpx;" />
               <view style="width: 530rpx;height: 270rpx;">
                  <view style="font-weight: bold;">{{ item.product_name }}</view>
                  <view style="font-size: 25rpx;margin-top: 15rpx">{{ item.accept_native_place }}</view>
                  <view style="font-size: 25rpx;margin-top: 15rpx">{{ item.createtime }}</view>
                  <view style="color: red;margin-top: 15rpx">￥{{ item.amount }}</view>
               </view>
            </view>
            <view style="width: 690rpx;font-size: 30rpx;margin: 15rpx 0;display: flex;justify-content: flex-end;">
               <view style="display: flex;">
                  <button
                     style="font-size: 28rpx;background-color: #3c9cff;width: 200rpx;height: 60rpx;line-height: 60rpx;border-radius: 20rpx;margin: 0 10rpx;"
                     v-if="item.status == 2">查看卷码</button>
                  <button @click="goPay(item.order_id)"
                     style="font-size: 28rpx;background-color: #3c9cff;width: 200rpx;height: 60rpx;line-height: 60rpx;border-radius: 20rpx;margin: 0 10rpx;"
                     v-if="item.status == 1">去付款</button>
                  <button @click="goCancel(item)"
                     style="font-size: 28rpx;background-color: #3c9cff;width: 200rpx;height: 60rpx;line-height: 60rpx;border-radius: 20rpx;margin: 0 10rpx;"
                     v-if="item.status == 1">取消订单</button>
               </view>

            </view>

         </view>

      </view>

      <!-- 已支付 -->
      <view class="Paid" v-show="showList == 2">
         <view v-for="item in PaidArr" :key="item" class="AllList"
            style="margin-top: 25rpx;width: 690rpx;height: 445rpx;border: 1px solid #eeeef8;margin: 0 auto;border-radius: 20rpx; box-shadow: 0px 0 3px rgba(0, 0, 0, 0.2);">
            <!-- 订单编号 订单状态 -->
            <view style="display: flex;justify-content: space-between;border-bottom: 1px solid #eeeef8;padding: 10rpx">
               <view style="font-size: 25rpx;">订单编号：{{ item.code }}</view>
               <view style="font-weight: bold;font-size: 27rpx;" v-show="item.status == 8">已取消</view>
               <view style="font-weight: bold;font-size: 27rpx;" v-show="item.status == 2">已支付</view>
               <view style="font-weight: bold;font-size: 27rpx;" v-show="item.status == 1">待支付</view>
            </view>
            <view
               style="display: flex;justify-content: space-around;border-bottom: 1px solid #eeeef8;margin-top: 20rpx;">
               <image :src="`https://dpyt.cjpco.cn/${item.product_img}`" mode="scaleToFill"
                  style="width: 110rpx;height: 100rpx;border-radius: 10rpx;margin-top: 70rpx;" />
               <view style="width: 530rpx;height: 270rpx;">
                  <view style="font-weight: bold;">{{ item.product_name }}</view>
                  <view style="font-size: 25rpx;margin-top: 15rpx">{{ item.accept_native_place }}</view>
                  <view style="font-size: 25rpx;margin-top: 15rpx">{{ item.createtime }}</view>
                  <view style="color: red;margin-top: 15rpx">￥{{ item.amount }}</view>
               </view>
            </view>
            <view style="width: 690rpx;font-size: 30rpx;margin-top: 20rpx;display: flex;justify-content: flex-end;">
               <view style="display: flex;">
                  <button @click="checkQr(item)"
                     style="font-size: 28rpx;background-color: #3c9cff;width: 200rpx;height: 60rpx;line-height: 60rpx;border-radius: 20rpx;margin: 0 10rpx;"
                     v-if="item.status == 2">查看卷码</button>
                  <button
                     style="font-size: 28rpx;background-color: #3c9cff;width: 200rpx;height: 60rpx;line-height: 60rpx;border-radius: 20rpx;margin: 0 10rpx;"
                     v-if="item.status == 1">去付款</button>
                  <button
                     style="font-size: 28rpx;background-color: #3c9cff;width: 200rpx;height: 60rpx;line-height: 60rpx;border-radius: 20rpx;margin: 0 10rpx;"
                     v-if="item.status == 1">取消订单</button>
               </view>

            </view>

         </view>

      </view>

      <!-- 已核销 -->
      <view class="Redeemed" v-show="showList == 3">
         <view v-for="item in RedeemedArr" :key="item" class="AllList"
            style="margin-top: 25rpx;width: 690rpx;border: 1px solid #eeeef8;margin: 0 auto;border-radius: 20rpx; box-shadow: 0px 0 3px rgba(0, 0, 0, 0.2);">
            <!-- 订单编号 订单状态 -->
            <view style="display: flex;justify-content: space-between;border-bottom: 1px solid #eeeef8;padding: 10rpx">
               <view style="font-size: 25rpx;">订单编号：{{ item.code }}</view>
               <view style="font-weight: bold;font-size: 27rpx;" v-show="item.status == 8">已取消</view>
               <view style="font-weight: bold;font-size: 27rpx;" v-show="item.status == 2">已支付</view>
               <view style="font-weight: bold;font-size: 27rpx;" v-show="item.status == 1">待支付</view>
            </view>
            <view
               style="display: flex;justify-content: space-around;border-bottom: 1px solid #eeeef8;margin-top: 20rpx;">
               <image :src="`https://dpyt.cjpco.cn/${item.product_img}`" mode="scaleToFill"
                  style="width: 110rpx;height: 100rpx;border-radius: 10rpx;margin-top: 70rpx;" />
               <view style="width: 530rpx;height: 270rpx;">
                  <view style="font-weight: bold;">{{ item.product_name }}</view>
                  <view style="font-size: 25rpx;margin-top: 15rpx">{{ item.accept_native_place }}</view>
                  <view style="font-size: 25rpx;margin-top: 15rpx">{{ item.createtime }}</view>
                  <view style="color: red;margin-top: 15rpx">￥{{ item.amount }}</view>
               </view>
            </view>
            <view style="width: 690rpx;font-size: 30rpx;margin: 15rpx 0;display: flex;justify-content: flex-end;">
               <view style="display: flex;">
                  <button
                     style="font-size: 28rpx;background-color: #3c9cff;width: 200rpx;height: 60rpx;line-height: 60rpx;border-radius: 20rpx;margin: 0 10rpx;"
                     v-if="item.status == 2">查看卷码</button>
                  <button
                     style="font-size: 28rpx;background-color: #3c9cff;width: 200rpx;height: 60rpx;line-height: 60rpx;border-radius: 20rpx;margin: 0 10rpx;"
                     v-if="item.status == 1">去付款</button>
                  <button
                     style="font-size: 28rpx;background-color: #3c9cff;width: 200rpx;height: 60rpx;line-height: 60rpx;border-radius: 20rpx;margin: 0 10rpx;"
                     v-if="item.status == 1">取消订单</button>
               </view>

            </view>

         </view>


      </view>

      <!-- 已评价 -->
      <view class="Reviewed" v-show="showList == 4">
         <view v-for="item in ReviewedArr" :key="item" class="AllList"
            style="margin-top: 25rpx;width: 690rpx;border: 1px solid #eeeef8;margin: 0 auto;border-radius: 20rpx; box-shadow: 0px 0 3px rgba(0, 0, 0, 0.2);">
            <!-- 订单编号 订单状态 -->
            <view style="display: flex;justify-content: space-between;border-bottom: 1px solid #eeeef8;padding: 10rpx">
               <view style="font-size: 25rpx;">订单编号：{{ item.code }}</view>
               <view style="font-weight: bold;font-size: 27rpx;" v-show="item.status == 8">已取消</view>
               <view style="font-weight: bold;font-size: 27rpx;" v-show="item.status == 2">已支付</view>
               <view style="font-weight: bold;font-size: 27rpx;" v-show="item.status == 1">待支付</view>
            </view>
            <view
               style="display: flex;justify-content: space-around;border-bottom: 1px solid #eeeef8;margin-top: 20rpx;">
               <image :src="`https://dpyt.cjpco.cn/${item.product_img}`" mode="scaleToFill"
                  style="width: 110rpx;height: 100rpx;border-radius: 10rpx;margin-top: 70rpx;" />
               <view style="width: 530rpx;height: 270rpx;">
                  <view style="font-weight: bold;">{{ item.product_name }}</view>
                  <view style="font-size: 25rpx;margin-top: 15rpx">{{ item.accept_native_place }}</view>
                  <view style="font-size: 25rpx;margin-top: 15rpx">{{ item.createtime }}</view>
                  <view style="color: red;margin-top: 15rpx">￥{{ item.amount }}</view>
               </view>
            </view>
            <view style="width: 690rpx;font-size: 30rpx;margin: 15rpx 0;display: flex;justify-content: flex-end;">
               <view style="display: flex;">
                  <button
                     style="font-size: 28rpx;background-color: #3c9cff;width: 200rpx;height: 60rpx;line-height: 60rpx;border-radius: 20rpx;margin: 0 10rpx;color:#fff !important;"
                     v-if="item.status == 2">查看卷码</button>
                  <button
                     style="font-size: 28rpx;background-color: #3c9cff;width: 200rpx;height: 60rpx;line-height: 60rpx;border-radius: 20rpx;margin: 0 10rpx;"
                     v-if="item.status == 1">去付款</button>
                  <button
                     style="font-size: 28rpx;background-color: #3c9cff;width: 200rpx;height: 60rpx;line-height: 60rpx;border-radius: 20rpx;margin: 0 10rpx;"
                     v-if="item.status == 1">取消订单</button>
               </view>

            </view>

         </view>
      </view>

      <!-- 待退款 -->
      <view class="PendingRefund" v-show="showList == 5">
         <view v-for="item in PendingRefundArr" :key="item" class="AllList"
            style="margin-top: 25rpx;width: 690rpx;border: 1px solid #eeeef8;margin: 0 auto;border-radius: 20rpx; box-shadow: 0px 0 3px rgba(0, 0, 0, 0.2);">
            <!-- 订单编号 订单状态 -->
            <view style="display: flex;justify-content: space-between;border-bottom: 1px solid #eeeef8;padding: 10rpx">
               <view style="font-size: 25rpx;">订单编号：{{ item.code }}</view>
               <view style="font-weight: bold;font-size: 27rpx;" v-show="item.status == 8">已取消</view>
               <view style="font-weight: bold;font-size: 27rpx;" v-show="item.status == 2">已支付</view>
               <view style="font-weight: bold;font-size: 27rpx;" v-show="item.status == 1">待支付</view>
            </view>
            <view
               style="display: flex;justify-content: space-around;border-bottom: 1px solid #eeeef8;margin-top: 20rpx;">
               <image :src="`https://dpyt.cjpco.cn/${item.product_img}`" mode="scaleToFill"
                  style="width: 110rpx;height: 100rpx;border-radius: 10rpx;margin-top: 70rpx;" />
               <view style="width: 530rpx;height: 270rpx;">
                  <view style="font-weight: bold;">{{ item.product_name }}</view>
                  <view style="font-size: 25rpx;margin-top: 15rpx">{{ item.accept_native_place }}</view>
                  <view style="font-size: 25rpx;margin-top: 15rpx">{{ item.createtime }}</view>
                  <view style="color: red;margin-top: 15rpx">￥{{ item.amount }}</view>
               </view>
            </view>
            <view style="width: 690rpx;font-size: 30rpx;margin: 15rpx 0;display: flex;justify-content: flex-end;">
               <view style="display: flex;">
                  <button
                     style="font-size: 28rpx;background-color: #3c9cff;width: 200rpx;height: 60rpx;line-height: 60rpx;border-radius: 20rpx;margin: 0 10rpx;"
                     v-if="item.status == 2">查看卷码</button>
                  <button
                     style="font-size: 28rpx;background-color: #3c9cff;width: 200rpx;height: 60rpx;line-height: 60rpx;border-radius: 20rpx;margin: 0 10rpx;"
                     v-if="item.status == 1">去付款</button>
                  <button
                     style="font-size: 28rpx;background-color: #3c9cff;width: 200rpx;height: 60rpx;line-height: 60rpx;border-radius: 20rpx;margin: 0 10rpx;"
                     v-if="item.status == 1">取消订单</button>
               </view>

            </view>

         </view>
      </view>

      <!-- 已退款 -->
      <view class="Refunded" v-show="showList == 6">
         <view v-for="item in RefundedArr" :key="item" class="AllList"
            style="margin-top: 25rpx;width: 690rpx;border: 1px solid #eeeef8;margin: 0 auto;border-radius: 20rpx; box-shadow: 0px 0 3px rgba(0, 0, 0, 0.2);">
            <!-- 订单编号 订单状态 -->
            <view style="display: flex;justify-content: space-between;border-bottom: 1px solid #eeeef8;padding: 10rpx">
               <view style="font-size: 25rpx;">订单编号：{{ item.code }}</view>
               <view style="font-weight: bold;font-size: 27rpx;" v-show="item.status == 8">已取消</view>
               <view style="font-weight: bold;font-size: 27rpx;" v-show="item.status == 2">已支付</view>
               <view style="font-weight: bold;font-size: 27rpx;" v-show="item.status == 1">待支付</view>
               <view style="font-weight: bold;font-size: 27rpx;" v-show="item.status == 7">已退款</view>
            </view>
            <view
               style="display: flex;justify-content: space-around;border-bottom: 1px solid #eeeef8;margin-top: 20rpx;">
               <image :src="`https://dpyt.cjpco.cn/${item.product_img}`" mode="scaleToFill"
                  style="width: 110rpx;height: 100rpx;border-radius: 10rpx;margin-top: 70rpx;" />
               <view style="width: 530rpx;height: 270rpx;">
                  <view style="font-weight: bold;">{{ item.product_name }}</view>
                  <view style="font-size: 25rpx;margin-top: 15rpx">{{ item.accept_native_place }}</view>
                  <view style="font-size: 25rpx;margin-top: 15rpx">{{ item.createtime }}</view>
                  <view style="color: red;margin-top: 15rpx">￥{{ item.amount }}</view>
               </view>
            </view>
            <view style="width: 690rpx;font-size: 30rpx;margin: 15rpx 0;display: flex;justify-content: flex-end;">
               <view style="display: flex;">
                  <button
                     style="font-size: 28rpx;background-color: #3c9cff;width: 200rpx;height: 60rpx;line-height: 60rpx;border-radius: 20rpx;margin: 0 10rpx;"
                     v-if="item.status == 2">查看卷码</button>
                  <button
                     style="font-size: 28rpx;background-color: #3c9cff;width: 200rpx;height: 60rpx;line-height: 60rpx;border-radius: 20rpx;margin: 0 10rpx;"
                     v-if="item.status == 1">去付款</button>
                  <button
                     style="font-size: 28rpx;background-color: #3c9cff;width: 200rpx;height: 60rpx;line-height: 60rpx;border-radius: 20rpx;margin: 0 10rpx;"
                     v-if="item.status == 1">取消订单</button>
               </view>

            </view>

         </view>
      </view>

      <!-- 已取消 -->
      <view class="Cancelled" v-show="showList == 7">
         <view v-for="item in CancelledArr" :key="item" class="AllList"
            style="margin-top: 25rpx;width: 690rpx;border: 1px solid #eeeef8;margin: 0 auto;border-radius: 20rpx; box-shadow: 0px 0 3px rgba(0, 0, 0, 0.2);">
            <!-- 订单编号 订单状态 -->
            <view style="display: flex;justify-content: space-between;border-bottom: 1px solid #eeeef8;padding: 10rpx">
               <view style="font-size: 25rpx;">订单编号：{{ item.code }}</view>
               <view style="font-weight: bold;font-size: 27rpx;" v-show="item.status == 8">已取消</view>
               <view style="font-weight: bold;font-size: 27rpx;" v-show="item.status == 2">已支付</view>
               <view style="font-weight: bold;font-size: 27rpx;" v-show="item.status == 1">待支付</view>
            </view>
            <view
               style="display: flex;justify-content: space-around;border-bottom: 1px solid #eeeef8;margin-top: 20rpx;">
               <image :src="`https://dpyt.cjpco.cn/${item.product_img}`" mode="scaleToFill"
                  style="width: 110rpx;height: 100rpx;border-radius: 10rpx;margin-top: 70rpx;" />
               <view style="width: 530rpx;height: 270rpx;">
                  <view style="font-weight: bold;">{{ item.product_name }}</view>
                  <view style="font-size: 25rpx;margin-top: 15rpx">{{ item.accept_native_place }}</view>
                  <view style="font-size: 25rpx;margin-top: 15rpx">{{ item.createtime }}</view>
                  <view style="color: red;margin-top: 15rpx">￥{{ item.amount }}</view>
               </view>
            </view>
            <view style="width: 690rpx;font-size: 30rpx;margin: 15rpx 0;display: flex;justify-content: flex-end;">
               <view style="display: flex;">
                  <button
                     style="font-size: 28rpx;background-color: #3c9cff;width: 200rpx;height: 60rpx;line-height: 60rpx;border-radius: 20rpx;margin: 0 10rpx;"
                     v-if="item.status == 2">查看卷码</button>
                  <button
                     style="font-size: 28rpx;background-color: #3c9cff;width: 200rpx;height: 60rpx;line-height: 60rpx;border-radius: 20rpx;margin: 0 10rpx;"
                     v-if="item.status == 1">去付款</button>
                  <button
                     style="font-size: 28rpx;background-color: #3c9cff;width: 200rpx;height: 60rpx;line-height: 60rpx;border-radius: 20rpx;margin: 0 10rpx;"
                     v-if="item.status == 1">取消订单</button>
               </view>

            </view>

         </view>

      </view>

      <!-- 待评价 -->
      <view class="PendingReview" v-show="showList == 8">
         <view v-for="item in PendingReviewArr" :key="item" class="AllList"
            style="margin-top: 25rpx;width: 690rpx;border: 1px solid #eeeef8;margin: 0 auto;border-radius: 20rpx; box-shadow: 0px 0 3px rgba(0, 0, 0, 0.2);">
            <!-- 订单编号 订单状态 -->
            <view style="display: flex;justify-content: space-between;border-bottom: 1px solid #eeeef8;padding: 10rpx">
               <view style="font-size: 25rpx;">订单编号：{{ item.code }}</view>
               <view style="font-weight: bold;font-size: 27rpx;" v-show="item.status == 8">已取消</view>
               <view style="font-weight: bold;font-size: 27rpx;" v-show="item.status == 2">已支付</view>
               <view style="font-weight: bold;font-size: 27rpx;" v-show="item.status == 1">待支付</view>
            </view>
            <view
               style="display: flex;justify-content: space-around;border-bottom: 1px solid #eeeef8;margin-top: 20rpx;">
               <image :src="`https://dpyt.cjpco.cn/${item.product_img}`" mode="scaleToFill"
                  style="width: 110rpx;height: 100rpx;border-radius: 10rpx;margin-top: 70rpx;" />
               <view style="width: 530rpx;height: 270rpx;">
                  <view style="font-weight: bold;">{{ item.product_name }}</view>
                  <view style="font-size: 25rpx;margin-top: 15rpx">{{ item.accept_native_place }}</view>
                  <view style="font-size: 25rpx;margin-top: 15rpx">{{ item.createtime }}</view>
                  <view style="color: red;margin-top: 15rpx">￥{{ item.amount }}</view>
               </view>
            </view>
            <view style="width: 690rpx;font-size: 30rpx;margin: 15rpx 0;display: flex;justify-content: flex-end;">
               <view style="display: flex;">
                  <button
                     style="font-size: 28rpx;background-color: #3c9cff;width: 200rpx;height: 60rpx;line-height: 60rpx;border-radius: 20rpx;margin: 0 10rpx;"
                     v-if="item.status == 2">查看卷码</button>
                  <button
                     style="font-size: 28rpx;background-color: #3c9cff;width: 200rpx;height: 60rpx;line-height: 60rpx;border-radius: 20rpx;margin: 0 10rpx;"
                     v-if="item.status == 1">去付款</button>
                  <button
                     style="font-size: 28rpx;background-color: #3c9cff;width: 200rpx;height: 60rpx;line-height: 60rpx;border-radius: 20rpx;margin: 0 10rpx;"
                     v-if="item.status == 1">取消订单</button>
               </view>

            </view>

         </view>
      </view>

      <!-- 取消订单弹出层 -->
      <u-modal :show="cancleshow" :closeOnClickOverlay="true" :showCancelButton="true" @confirm="confirm"
         @cancel="cancel" title="取消订单" @close="cancleclose">
         <view>确认取消当前订单？</view>
      </u-modal>
      <!-- 弹出查看卷码二维码 -->
      <u-modal :show="qrshow" :closeOnClickOverlay="true" :showConfirmButton="false" @close="qrclose">
         <view>
            <uv-qrcode ref="qrcode" size="300px" :value="codeValue"></uv-qrcode>
         </view>
      </u-modal>
   </view>

</template>

<script>
import { onLoad } from 'uview-ui/libs/mixin/mixin';
goods
import { goods, payment, cancelgoods } from '@/api/index'

export default {
   data() {
      return {
         list1: [{
            name: '全部',
         }, {
            name: '待支付',
         }, {
            name: '已支付'
         }, {
            name: '已核销'
         }, {
            name: '已评价'
         }, {
            name: '待退款'
         }, {
            name: '已退款'
         }, {
            name: '已取消'
         }, {
            name: '待评价'
         }],
         orderInfoArr: [],//全部订单 0
         PaymentArr: [],//待支付 1
         PaidArr: [],//已支付  2
         RedeemedArr: [],//已核销 4
         ReviewedArr: [],//已评价 5
         PendingRefundArr: [],//待退款 6
         RefundedArr: [],//已退款 7
         CancelledArr: [],//已取消 8
         PendingReviewArr: [],//待评价 9

         cancleshow: false,
         showList: '',//每个切换页面元素
         orderId: '', //取消订单的id

         qrshow:false,//控制二维码展示
         codeValue:'',//二维码值
         // options2: {
			// 	data: 'https://www.uvui.cn',
			// 	size: 300,
			// 	useDynamicSize: false,
			// 	errorCorrectLevel: 'Q',
			// 	margin: 10,
			// 	// 指定二维码前景，一般可在中间放logo
			// 	foregroundImageSrc: imagePath() + '/static/img/logo2.png'
			// },

      }
   },
   onLoad(options) {
      console.log('订单列表加载');
      let userInfo = uni.getStorageSync('userInfo')
      
      this.getGoodslist({ status: 0, user_id: userInfo.id }, '所有的数据')//页面加载时 第一次发送请求 全部数据
      // goods({ status: 0, user_id: userInfo.id }).then(res => {
      //    console.log(res);
      //    if (res.code == 1) {

      //       this.orderInfoArr = res.data
      //       this.PaymentArr = res.data.filter(item => { return item.status == 1 })//待支付
      //       this.PaidArr = res.data.filter(item => { return item.status == 2 })//已支付
      //       this.CancelledArr = res.data.filter(item => { return item.status == 8 })//已取消
      //       // this.OrderInfo.code=res.
      //       // this.OrderInfo.status
      //       // this.OrderInfo.product_name
      //       // this.OrderInfo.accept_native_place
      //       // this.OrderInfo.createtime
      //       // this.OrderInfo.amount

      //    }
      // })
      // this.getGoodslist({ status: 0, user_id: userInfo.id }, '所有的数据')
      // this.getGoodslist({ status: 1, user_id: userInfo.id }, '待支付')
      // this.getGoodslist({ status: 2, user_id: userInfo.id }, '已支付')
      // this.getGoodslist({ status: 4, user_id: userInfo.id }, '已核销')
      // this.getGoodslist({ status: 5, user_id: userInfo.id }, '已评价')
      // this.getGoodslist({ status: 6, user_id: userInfo.id }, '待退款')
      // this.getGoodslist({ status: 7, user_id: userInfo.id }, '已退款')
      // this.getGoodslist({ status: 8, user_id: userInfo.id }, '已取消')
      // this.getGoodslist({ status: 9, user_id: userInfo.id }, '待评价')

   },
   methods: {
      click(item) {
         console.log('点击展示的内容', item);
         this.showList = item.index
         let userInfo = uni.getStorageSync('userInfo')
         // 切换到item.index == 0 时发送所有的数据请求
         if (item.index == 0) {
            this.getGoodslist({ status: 0, user_id: userInfo.id }, '所有的数据')
         }
         // 切换到item.index == 1 时发送待支付的数据请求
         if (item.index == 1) {
            this.getGoodslist({ status: 1, user_id: userInfo.id }, '待支付')
         }
         // 切换到item.index == 2 时发送已支付的数据请求
         if (item.index == 2) {
            this.getGoodslist({ status: 2, user_id: userInfo.id }, '已支付')
         }
         // 切换到item.index == 3 时发送已核销的数据请求
         if (item.index == 3) {
            this.getGoodslist({ status: 4, user_id: userInfo.id }, '已核销')
         }
         // 切换到item.index == 4 时发送已评价的数据请求
         if (item.index == 4) {
            this.getGoodslist({ status: 5, user_id: userInfo.id }, '已评价')
         }
         // 切换到item.index == 5 时发送待退款的数据请求
         if (item.index == 5) {
            this.getGoodslist({ status: 6, user_id: userInfo.id }, '待退款')
         }
         // 切换到item.index == 6 时发送已退款的数据请求
         if (item.index == 6) {
            this.getGoodslist({ status: 7, user_id: userInfo.id }, '已退款')
         }
         // 切换到item.index == 7 时发送已取消的数据请求
         if (item.index == 7) {
            this.getGoodslist({ status: 8, user_id: userInfo.id }, '已取消')
         }
         // 切换到item.index == 8 时发送待评价的数据请求
         if (item.index == 8) {
            this.getGoodslist({ status: 9, user_id: userInfo.id }, '待评价')
         }

      },
      //获取商品数据
      getGoodslist(a) {
         goods(a).then(res => {
            console.log(res);
            console.log(a);
            //发送过去status的值为0时 赋值给orderInfoArr 全部数据
            if (a.status == 0) {
               this.orderInfoArr = res.data
            }
            //发送过去status的值为1时 赋值给PaymentArr 待支付
            if (a.status == 1) {
               this.PaymentArr = res.data
            }
            //发送过去status的值为2时 赋值给PaidArr 已支付
            if (a.status == 2) {
               this.PaidArr = res.data 
            }
            //发送过去status的值为4时 赋值给RedeemedArr 已核销
            if (a.status == 4) {
               this.RedeemedArr = res.data
            }
            //发送过去status的值为5时 赋值给ReviewedArr 已评价
            if (a.status == 5) {
               this.ReviewedArr = res.data
            }
            //发送过去status的值为6时 赋值给PendingRefundArr 待退款
            if (a.status == 6) {
               this.PendingRefundArr = res.data
            }
            //发送过去status的值为7时 赋值给RefundedArr  已退款
            if (a.status == 7) {
               this.RefundedArr = res.data
            }
            //发送过去status的值为8时 赋值给CancelledArr    已取消
            if (a.status == 8) {
               this.CancelledArr = res.data
            }
            //发送过去status的值为9时 赋值给PendingReviewArr 待评价
            if (a.status == 9) {
               this.PendingReviewArr = res.data
            }
         })
      },
      //进行支付
      goPay(item) {
         console.log(item);
         let obj = {}
         obj.order_id = item
         console.log(obj);
         payment(obj).then(res => {
            console.log(res);
            if (res.code == 1) {
               uni.requestPayment({
                  provider: 'wxpay',
                  timeStamp: res.data.url.timeStamp,
                  nonceStr: res.data.url.nonceStr,
                  package: res.data.url.package,
                  signType: res.data.url.signType,
                  paySign: res.data.url.paySign,
                  success: function (res) {
                     console.log(res);
                     uni.showToast({
                        title: '支付成功',
                        icon: 'none'
                     })
                  },
                  fail: function (err) {
                     console.log(err);
                     uni.showToast({
                        title: '支付失败',
                        icon: 'none'
                     })
                  }
               });
            }
         })
      },
      //跳转到商品详情
      goProdetail(item) {
         console.log(item);
         let obj = {
            id: item.product_id
         }
         let newObj = JSON.stringify(obj)
         uni.navigateTo({ url: `/pageA/productDetails/productDetails?obj=${encodeURIComponent(newObj)}` })
      },
      //取消订单
      goCancel(item) {
         console.log('取消订单', item);
         this.cancleshow = true
         this.orderId = item.order_id
      },
      //确认订单
      confirm() {
         console.log('取消订单');
         cancelgoods({ order_id: this.orderId }).then(res => {
            console.log(res);
            if (res.code == 1) {
               this.cancleshow = false
               uni.showToast({
                  title: res.msg,
                  icon: 'none'
               })
               let userInfo = uni.getStorageSync('userInfo')
               let obj_0 = {
                  status: 0,
                  user_id: userInfo.id
               }
               let obj_1 = {
                  status: 1,
                  user_id: userInfo.id
               }
               let obj_2 = {
                  status: 2,
                  user_id: userInfo.id
               }
               let obj_4 = {
                  status: 4,
                  user_id: userInfo.id
               }
               let obj_5 = {
                  status: 5,
                  user_id: userInfo.id
               }
               let obj_6 = {
                  status: 6,
                  user_id: userInfo.id
               }
               let obj_7 = {
                  status: 7,
                  user_id: userInfo.id
               }
               let obj_8 = {
                  status: 8,
                  user_id: userInfo.id
               }


               if (this.showList == 0) {
                  this.getGoodslist(obj_0, '所有的数据')
               }
               if (this.showList == 1) {
                  goods(obj_0).then(res => {
                     console.log(res, '取消支付拉！！');
                     this.PaymentArr = res.data
                  })


               }
               if (this.showList == 2) {
                  this.getGoodslist(obj_0, '所有的数据')
               }
               // if (this.showList == 3) {
               //    this.getGoodslist(obj_0, '所有的数据')
               // }
               // if (this.showList == 4) {
               //    this.getGoodslist(obj_0, '所有的数据')

               // }
               // if (this.showList == 5) {
               //    this.getGoodslist(obj_0, '所有的数据')
               // }

               // if (this.showList == 6) {
               //    this.getGoodslist(obj_0, '所有的数据')

               // }
               // if (this.showList == 7) {
               //    this.getGoodslist(obj_0, '所有的数据')

               // }
               // if (this.showList == 8) {
               //    this.getGoodslist(obj_0, '所有的数据')

               // }
               // if (this.showList == 9) {

               //    this.getGoodslist(obj_0, '所有的数据')
               // }


               // if (obj_2.status == 2) {
               //    // this.getGoodslist(obj_2, '已支付')
               //    console.log(3);
               // }
               // if  (obj_4.status == 4) {
               //    // this.getGoodslist(obj_4, '已核销')
               //    console.log(4);
               // }
               // if  (obj_5.status == 5) {
               //    // this.getGoodslist(obj_5, '已评价')
               //    console.log(5);
               // }
               // if (obj_6.status == 6) {
               //    // this.getGoodslist(obj_6, '待退款')
               //    console.log(6);
               // }
               // if  (obj_7.status == 7) {
               //    // this.getGoodslist(obj_7, '已退款')
               //    console.log(7);
               // }
               // if (obj_8.status == 8) {
               //    // this.getGoodslist(obj_8, '已取消')
               //    console.log(1);
               // }
               // if  (obj_9.status == 9) {
               //    // this.getGoodslist(obj_9, '待评价')
               //    console.log(1);
               // }


            } else {
               uni.showToast({
                  title: res.msg,
                  icon: 'none'
               })
               return
            }
         })
      },
      //取消订单模态框以外的关闭
      cancleclose(){
         this.cancleshow=false
      },
      //取消
      cancel() {
         console.log('取消');
         this.cancleshow = false
      },
      //查看卷码
      checkQr(item){
         console.log('查看二维码',item);
         this.qrshow=true
         this.codeValue=item.code
      },
      //取消qr模态框以外的关闭
      qrclose(){
       console.log(1);
       this.qrshow=false
      }


   },
   computed: {

   }
}
</script>

<style lang="scss"></style>