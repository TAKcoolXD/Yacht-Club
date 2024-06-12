import config from '@/config';
export const uploadApi = config.baseURL+'/api/upload';
import http from './http'
// 首页轮播图
export function getSwiperList(data){
    return http.post('/home/homebanner/homebanner/list',data)
}
//首页游玩项目滚动菜单
export function getActivitiesDetail(data){
    return http.post('/home/product/product/productClub',data)
}
// goImagedetailone.vue(活动一)  goImagedetailthree.vue(活动二） goImagedetailtwo.vue（活动三）
//goImagedetailone.vue(活动一)的数据 （首页轮播图3）
export function getActivitiesOne(data){
    return http.post('/home/activity/activity/activityList',data)
}
//goImagedetailthree.vue(活动二）的数据 （首页轮播图1）
export function getActivitiesTwo(data){
	return http.post('/home/activity/activity/activityListtwo',data)
};
//goImagedetailtwo.vue（活动三）的数据 （首页轮播图2）
export function getActivitiesThree(data){
	return http.post('/home/activity/activity/activityListthree',data)
};
//我的页面 关于我们 公司简介

export function getAboutUs(data){
	return http.post('/home/news/news/newsDetail',data)
};

//登录接口
export function userLogin(data){
	return http.post('/home/user/user/login',data)
}
//上传头像到服务器数据库 
export function userHead(data){
	return http.post('/home/user/user/postUser',data)
};
//商品详情
export function productDetail(data){
	return http.post('/home/product/product/productDetail',data)
};
//支付
export function orderCartadd(data){
	return http.post('/home/order/order/cartadd',data)
};
//订单列表
export function goods(data){
	return http.post('/home/order/order/goods',data)
};
//订单状态
export function zfbpayStatus(data){
	return http.post('/home/order/order/zfbpayStatus',data)
};
// 通过订单id获取微信支付所需参数
export function payment(data){
	return http.post('/home/order/order/payment',data)
};
// 取消订单
export function cancelgoods(data){
	return http.post('/home/order/order/cancelgoods',data)
};
// 绑定手机号
export function bindMobile(data){
	return http.post('/home/user/user/bindMobile',data)
};
//钱包
export function total(data){
	return http.post('/home/user/user/total',data)
};