import Vue from 'vue'
import App from './App'
import { myRequest } from './util/myRequest.js'
import store from './store/index.js'
Vue.prototype.$myRuquest = myRequest
Vue.config.productionTip = false
const innerAudioContext = uni.createInnerAudioContext()
innerAudioContext.autoplay = true;
// innerAudioContext.onTimeUpdate((callback)=>{
// 	callback(innerAudioContext.currentTime)
// })
Vue.prototype.$audio= innerAudioContext
App.mpType = 'app'

const app = new Vue({
    ...App,
	store
})
app.$mount()
