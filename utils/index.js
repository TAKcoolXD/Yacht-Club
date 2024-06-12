import {imagePath} from '@/config'

export let checkPhone = (phone) => {
  let myreg = /^1[3|4|5|6|7|8][0-9]{9}$/;
  return myreg.test(phone);
};

export function debounce(fn, time = 80) {
  let timer = null;
  return function () {
    clearTimeout(timer);
    let args = arguments;
    let self = this;
    timer = setTimeout(function () {
      fn.apply(self, args);
    }, time);
  };
}

export function throttle(fn, time = 80) {
  let now = Date.now();
  return function () {
    let current_now = Date.now();
    let isSend = current_now - now > time;
    if (isSend) {
      now = current_now;
      fn.apply(this, arguments);
    }
  };
}
export function getMonthDays(date = new Date(), end = false) {
  // 获取标准时间
  // 获取当天日期
  const currentDay = date.getDate();
  // 获取当前月份（实际月份需要加1）
  const currentMonth = date.getMonth() + 1 < 10 ? '0' + date.getMonth() + 1 : date.getMonth() + 1;
  // 获取当前年份
  const currentYear = date.getFullYear();
  // 获取当前月有多少天
  const currentMonthDays = new Date(currentYear, currentMonth, 0).getDate();
  // 当前月份所有日期集合
  const currentMonthArr = [];
  for (let day = 1; day <= currentMonthDays; day++) {
    // 截至当前日期为止
    if (end && day > currentDay) {
      // 年月日(yyyy-MM-dd)
      continue;
    }

    let dateItem = currentYear + "-" + currentMonth + "-" + (day < 10 ? '0' + day : day)
    currentMonthArr.push(dateItem)
  }
  return currentMonthArr;
}
export function getMonthFirstDay(date = new Date()) {
  date.setDate(1);
  let month = parseInt(date.getMonth() + 1);
  let day = date.getDate();
  if (month < 10) {
    month = "0" + month;
  }
  if (day < 10) {
    day = "0" + day;
  }
  return date.getFullYear() + "-" + month + "-" + day;
}

export function getMonthLastDay(date = new Date()) {
  let year = date.getFullYear();
  let month = date.getUTCMonth() + 1;
  if (month < 10) {
    month = "0" + month;
  }
  let day = new Date(year, month, 0);
  return `${year}-${month}-${day.getDate()}`;
}


export function getBeforeDaySeconds(day = 1, date = Date.now()) {
  let milliseconds = 86400000 * day;
  return date - milliseconds;
}

/**
 * 获取年月
 * @param {*} y
 * @param {*} month
 * @param {*} all
 */
export function getYearAndMonth(y = 2017, month = 12, all = true) {
  let date = new Date();
  let months = [];
  let years = [];
  let datalist = [];
  if (all) {
    months.push("全年");
  }
  for (let j = 1; j < 13; j++) {
    let m = j + "月";
    months.push(m);
  }

  for (let i = date.getFullYear(); i >= 2017; i--) {
    years.push(i);
    let obj = {};
    let m = [];
    obj.text = i;
    months.forEach((j, index) => {
      let monthObj = {};
      monthObj.text = j;
      monthObj.id = Number(`${i}${index}`);
      m.push(monthObj);
    });
    obj.children = m;
    datalist.push(obj);
  }
  return datalist;
}

/**
 * 获取字典数据列表
 * @param dictType  字典类型
 */
export function getDictDataList(dictType, dictList = [], _type = "value") {
  const type = dictList.find((element) => element.slug === dictType);
  if (type) {
    return type.children.map((i) => {
      let value = i[_type];
      return {
        ...i,
        value,
        checked: false,
      };
    });
  } else {
    return [];
  }
}

/**
 * 获取字典名称
 * @param dictType  字典类型
 * @param dictValue  字典值
 */
export function getDictLabel(
  dictType,
  dictValue,
  dictList = [],
  _type = "value"
) {
  const type = dictList.find((element) => element.slug === dictType);
  if (type) {
    const val = (type.children || []).find(
      (element) => element[_type] == dictValue + ""
    );
    if (val) {
      return val.label;
    } else {
      return dictValue;
    }
  } else {
    return dictValue;
  }
}

/**
 * 深拷贝
 * @param {*} obj 拷贝对象(object or array)
 * @param {*} cache 缓存数组
 */
export function deepCopy(obj, cache = []) {
  // typeof [] => 'object'
  // typeof {} => 'object'
  if (obj === null || typeof obj !== "object" || obj instanceof Date) {
    if (obj instanceof Date) {
      return new Date(obj.valueOf);
    }
    return obj;
  }
  // 如果传入的对象与缓存的相等, 则递归结束, 这样防止循环
  /**
   * 类似下面这种
   * let a = {b:1}
   * a.c = a
   * 资料: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Errors/Cyclic_object_value
   */
  const hit = cache.filter((c) => c.original === obj)[0];
  if (hit) {
    return hit.copy;
  }

  const copy = Array.isArray(obj) ? [] : {};
  // 将copy首先放入cache, 因为我们需要在递归deepCopy的时候引用它
  cache.push({
    original: obj,
    copy,
  });
  Object.keys(obj).forEach((key) => {
    copy[key] = deepCopy(obj[key], cache);
  });

  return copy;
}

export function stringToJSON(objStr = "", def = {}, type = "object") {
  let ret = def;
  try {
    ret = JSON.parse(objStr);
  } catch (err) { }
  if (typeof ret !== type) {
    ret = def;
  }
  return ret;
}
/**
 * 打开文件
 * @param {*} file 需要打开的文件链接
 */
export function openFile(file) {
  if (file.isImage) {
    uni.previewImage({
      current: file.url,
      urls: [file.url],
    });
  } else {
    // #ifdef H5
    let a = document.createElement("a");
    a.download = true;
    a.href = file.url;
    a.click();
    a = null;
    // #endif
    // #ifndef H5
    uni.openDocument({
      filePath: file.url,
      fail(err) {
        console.log(err);
        uni.showToast({
          title: "打开失败",
          icon: "none",
        });
      },
    });
    // #endif
  }
}


/**
 * 树形数据转换
 * @param {*} data
 * @param {*} id
 * @param {*} pid
 */
export function treeDataTranslate(data, id = "id", pid = "pid") {
  var res = [];
  var temp = {};
  for (var i = 0; i < data.length; i++) {
    temp[data[i][id]] = data[i];
  }
  for (var k = 0; k < data.length; k++) {
    if (!temp[data[k][pid]] || data[k][id] === data[k][pid]) {
      res.push(data[k]);
      continue;
    }
    if (!temp[data[k][pid]]["children"]) {
      temp[data[k][pid]]["children"] = [];
    }
    temp[data[k][pid]]["children"].push(data[k]);
    data[k]["_level"] = (temp[data[k][pid]]._level || 0) + 1;
  }
  return res;
}
/**
 * 树形数据转 array
 * @param {*} nodes
 */
export function TreeToArray(nodes = [], key = 'children', del = !0) {
  let r = [];
  if (Array.isArray(nodes)) {
    for (let i = 0, l = nodes.length; i < l; i++) {
      r.push(nodes[i]); // 取每项数据放入一个新数组
      if (Array.isArray(nodes[i][key]) && nodes[i][key].length > 0) {
        // 若存在children则递归调用，把数据拼接到新数组中，并且删除该children
        r = r.concat(TreeToArray(nodes[i][key], key, del));
      }
      del && delete nodes[i][key];
    }
  }
  return r;
}
export function transformURI(str = '') {
  // #ifdef H5
  if (!str) {
    str = location.href;
  }
  // #endif
  // 创建目标对象
  let obj = {},
    // 截取数据字符串
    data = str.slice(str.indexOf("?") + 1, str.length),
    // 将数据字符串表现为数组
    aParams = data.split("&");
  //console.log(data);
  //console.log(aParams);
  for (let i = 0; i < aParams.length; i++) {
    // 数据属性与数值分离
    var aParam = aParams[i].split("=");
    // 使用属性括号进行属性赋值
    obj[aParam[0]] = aParam[1]
  }
  return obj;
}

/**
 * 获取uuid
 */
export function getUUID() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    return (c === "x" ? (Math.random() * 16) | 0 : "r&0x3" | "0x8").toString(
      16
    );
  });
}
export function getCurrentEnv() {
  //判断当前页面的运行环境（微信/其他） 
  // #ifdef H5
  let ua = navigator.userAgent.toLowerCase();
  return {
    wechatH5: ua.match(/MicroMessenger/i) == "micromessenger",
  }
  // #endif
  return {
    wechatH5: false
  }
}

export function parseJSON(data, def = {}) {
  try {
    data = JSON.parse(data);
    return data;
  } catch (err) {
    return def || {}
  }
}

// 上传文件的方法
export const uploadFile = function(params, url) {
	uni.uploadFile({
		url: imagePath() + url, // 设置上传接口地址
		filePath: params, // 要上传的文件路径
		name: 'file', // 后台接收参数名称
		// 其他配置项（根据需求自定义）
		header: {
			'Content-Type': 'multipart/form-data'
		}, // 设置请求头部信息
		success(res) {
			console.log('上传成功', res);
			// ...
		},
		fail(err) {
			console.error('上传失败', err);
			// 处理上传失败后的操作
			// ...
		}
	});
}

// 显示提示错误的方法
export const showError = function(params) {
	return uni.showToast({
		title: params.title ? params.title : "操作失败!",
		duration: params.time ? params.time : 1500,
		icon: params.icon ? params.icon : 'none',
	})
}

// 显示提示成功的方法
export const showSuccess = function(params) {
	return uni.showToast({
		title: params.title ? params.title : "操作成功!",
		duration: params.time ? params.time : 1500,
		icon: params.icon ? params.icon : 'none',
	})
}




// 判断一个对象内所有数据不为null 或者undefined
export const objAll = function(obj) {
	// // 使用Object.values获取对象的所有值
	// const values = Object.values(obj);
	// // 使用Array.prototype.every检查每个值是否都不为null或undefined
	// return values.every(value => value !== null && value !== undefined);
	// 遍历对象的所有键
	for (const key in obj) {
		if (obj.hasOwnProperty(key)) {
			const value = obj[key];

			// 检查值是否为null或undefined
			if (value === null || value === undefined) {
				return false;
			}

			// 检查值是否为空字符串、空数组或空对象
			if (typeof value === 'string' && value === '') {
				return false;
			} else if (Array.isArray(value) && value.length === 0) {
				return false;
			} else if (typeof value === 'object' && value !== null && Object.keys(value).length === 0) {
				return false;
			}

			// 如果值是一个对象，递归检查它的所有值
			if (typeof value === 'object' && value !== null) {
				if (!areAllValuesValid(value)) {
					return false;
				}
			}
		}
	}
  
	// 如果所有值都有效，返回true
	return true;
}
export const dateUtils = function(params) {

	// 创建一个新的Date对象并设置其时间戳属性
	var dateObj = new Date(params);

	// 提取年、月、日等信息
	var year = dateObj.getFullYear();
	var month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
	var day = dateObj.getDate().toString().padStart(2, '0');
	var hours = dateObj.getHours().toString().padStart(2, '0');
	var minutes = dateObj.getMinutes().toString().padStart(2, '0');
	var seconds = dateObj.getSeconds().toString().padStart(2, '0');

	// 构造最终的日期字符串
	var formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
	return formattedDate
}

export const dateMonth = function(params) {

	// 创建一个新的Date对象并设置其时间戳属性
	var dateObj = new Date(params);

	// 提取年、月、日等信息
	var year = dateObj.getFullYear();
	var month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
	var day = dateObj.getDate().toString().padStart(2, '0');
	var hours = dateObj.getHours().toString().padStart(2, '0');
	var minutes = dateObj.getMinutes().toString().padStart(2, '0');
	var seconds = dateObj.getSeconds().toString().padStart(2, '0');

	// 构造最终的日期字符串
	var formattedDate = `${year}-${month}`;
	return formattedDate
}
export default {
  checkPhone,
  debounce,
  getYearAndMonth,
  transformURI,
};