import cnm from 'luch-request'
import config from "@/config/index";
import { whitePages, WhiteList } from "@/config/white";
import { transformURI, debounce } from "@/utils";

const http = new cnm();
http.config.baseURL = config.baseURL;
let baseURL = config.baseURL;
function waitForToken() {
    return new Promise((resolve) => {
        if (uni.getStorageSync('token')) {
            resolve();
        }
    });
}

http.interceptors.request.use(async function (config, cancel) {
    // 等待 token 更新
    // await waitForToken();
    config.header["X-Requested-With"] = "XMLHttpRequest"
    // 在这之后，token 应该已经被设置，继续添加到请求头
    if (uni.getStorageSync('token')) {
        config.header["token"] = uni.getStorageSync('token')
    }
    return config;
});
export const f401 = debounce(function () {
    return new Promise((resolve, reject) => {
        uni.login({
            success: res => {
                console.log('登录成功', res);
                if (res.code) {
                    uni.request({
                        url: baseURL + '/api/login/getToken',
                        method: 'POST',
                        header: {
                            'Content-Type': 'application/json',
                        },
                        data: {
                            code: res.code
                        },
                        success: res => {
                            if (res.data.code == 200 && res.data.data.token) {
                                uni.setStorageSync('userInfo', res.data)
                                uni.setStorageSync('token', res.data.token)
                                resolve(); // 登录成功并token更新后解决Promise
                            } else {
                                reject('登录失败');
                            }
                        },
                        fail: err => {
                            reject('请求失败');
                        }
                    });
                } else {
                    reject('登录失败！' + res.errMsg);
                }
            },
            fail: e => {
                reject("登录流程失败");
            }
        })
    });
}, 250);
export function f402(data) {
    let pages = getCurrentPages();
    let page = pages[pages.length - 1] || {};
    console.log(page.route, "page");
    let notWhite = WhiteList.indexOf(page.route) === -1;
    if (notWhite) {
        console.log("notWhite == true")
        return uni.reLaunch({
            url: "/pages/bindmobile/index",
        });
    }
}
http.interceptors.response.use(
    async function (res) {
        // console.log('%c网络请求', 'font-size:18px;color:green;font-weight:bolder', '\n接口地址: ', res.config.method, res.config.fullPath, '\n请求体: ', res.config.data, '\n返回结果: ', res.data, '\n完整参数: ');
        console.log('%c网络请求', 'font-size:18px;color:green;font-weight:bolder', '\nAPI:', res.config.method, res.config.fullPath, '\nREQ_BODY:', res.config.data, '\nRES_BODY:', res.data, '\nFULL:', res);
        let data = res.data;
        if (data.code === 402) {
            f402(data);
            return {
                msg: '请先绑定用户'
            }
        } else if (data.code === 401) {
            await f401();
            return
        }
        return data || {};
    },
    function (err) {
        if (err && err.errMsg === 'request:fail timeout') {
            err.errMsg = "请求数据超时,请重试";
        }
        return err;
    }
);

export function verifyCode(code) {
    return code === 200;
}

export default http;

export const defHttp = new cnm();
defHttp.config.baseURL = config.baseURL;
export function getInstance() {
    return defHttp;
}