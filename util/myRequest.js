var BASE_URL
//#ifdef MP-WEIXIN
  console.log('微信小程序')
  BASE_URL = "http://ii9nsq.natappfree.cc"
  //#endif
  //#ifdef H5
  console.log('h5页面')
  BASE_URL = "/api"
  //#endif
export const myRequest = (options) => {
		return new Promise((resolve, reject) => {
			uni.request({
				url: BASE_URL + options.url,
				method: options.method || "GET",
				data: options.data|| {},
				success: res => {
					if (res.data.code !== 200) {
						return uni.showToast({
							title: "获取数据失败"
						})
					}
					resolve(res.data)
				},
				fail: err => {
					uni.showToast({
						title: "请求接口失败"
					})
					reject(err)
				}
			})
		})
}