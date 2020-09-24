const comuptNum = function(num) {
	let str = ''
	if (num < 10) {
		str = "00:0" + num
	} else if (num >= 10 && num < 60) {
		str = "00:" + num
	} else if (num >= 60) {
		let num1 = Math.floor(num / 60)
		let num2 = (num % 60).toFixed(2)
		let str1 = ''
		if (num1 < 10) {
			str1 = '0' + num1 + ":"
		} else {
			str1 = num1 + ':'
		}
		str = str1 + `${num2<10? ('0'+ num2) : num2}`
	}
	return str
}
//时间戳转换方法    date:时间戳数字
const formatDate = function(date) {
	var date = new Date(date);
	var YY = date.getFullYear() + '-';
	var MM = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
	var DD = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate());
	var hh = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
	var mm = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
	var ss = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
	return YY + MM + DD + " " + hh + mm + ss;
}
// 高亮搜索条件
const textActive = function(searchValue, value) {
		let str
		if (value && searchValue) {
			let str
			const keywords = searchValue.toLocaleUpperCase()
			const text = value.toLocaleUpperCase()
			const reg = new RegExp(keywords, 'g')
			const index = text.search(reg)
			if (index > -1) {
				const str1 = value.substr(index, keywords.length)
				str = value.substring(0, index) + '<span style="color: blue;">' + str1 + '</span>' + value.substring(index +
					keywords.length, value.length);
				return str
			} else {
				return value
			}
		} else {
			return value
		}
	}
	export {
		comuptNum,
		formatDate,
		textActive
	}
