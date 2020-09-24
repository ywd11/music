<template>
	<view class="search-result-index">
		<view class="header">
			<view class="header-search" @click="goTosearch()">
				<view class="iconfont icon-search"></view>
				{{ searchValue }}
			</view>
			<!-- 设置圆角 -->
			<v-tabs v-model="current" :tabs="tabs.map(_=>_.title)" @change="changeTab" :bold="false" lineColor="#ff261b"
			 activeColor="#ff261b" lineHeight="5rpx"  padding="4rpx 0"></v-tabs>
		</view>
		<view class="tab-active">
			<zong-he :synthesis="tabs[current].synthesis" :searchValue="searchValue" v-if="current===0" @handleClick="handleClick" :scrollTop="scrollTop"></zong-he>
			<danqu :scrollTop="scrollTop" :dataList="tabs[current].data" :searchValue="searchValue" v-if="current===1"></danqu>
			<gedan :scrollTop="scrollTop" :dataList="tabs[current].data" :searchValue="searchValue" v-if="current===2"></gedan>
			<geshou :scrollTop="scrollTop" :dataList="tabs[current].data" :searchValue="searchValue" v-if="current===3"></geshou>
			<zhuanji :scrollTop="scrollTop" :dataList="tabs[current].data" :searchValue="searchValue" v-if="current===4"></zhuanji>
			<shipin :scrollTop="scrollTop" :dataList="tabs[current].data" :searchValue="searchValue" v-if="current===5"></shipin>
			<diantai :scrollTop="scrollTop" :dataList="tabs[current].data" :searchValue="searchValue" v-if="current===7"></diantai>
			<user :scrollTop="scrollTop" :dataList="tabs[current].data" :searchValue="searchValue" v-if="current===8"></user>
		</view>
	</view>
</template>
<script>
	import ZongHe from "../../components/searchresult/zonghe.vue"
	import danqu from "../../components/searchresult/danqu.vue"
	import gedan from "../../components/searchresult/gedan.vue"
	import geshou from "../../components/searchresult/geshou.vue"
	import zhuanji from "../../components/searchresult/zhuanji.vue"
	import shipin from "../../components/searchresult/shipin.vue"
	import diantai from "../../components/searchresult/diantai.vue"
	import user from "../../components/searchresult/user.vue"
	export default {
		components: {
			ZongHe,
			danqu,
			gedan,
			geshou,
			zhuanji,
			shipin,
			diantai,
			user
		},
		data() {
			return {
				searchValue: '',
				current: 0,
				scrollTop: 0,
				tabs: [{
						key: 1018,
						title: "综合",
						synthesis: {
							song: {
								songs: []
							},
							playList: {
								playLists: []
							},
							video: {
								videos: []
							},
							sim_query: {
								sim_querys: []
							},
							djRadio: {
								djRadios: []
							},
							artist: {
								artists: []
							},
							album: {
								albums: []
							},
							user: {
								users: []
							}
						}
					},
					{
						key: 1,
						title: "单曲",
						data: [],
						offset: 0,
						count: null
					},
					{
						key: 1000,
						title: "歌单",
						data: [],
						offset: 0,
						count: null
					}, {
						key: 100,
						title: "歌手",
						data: [],
						offset: 0,
						count: null
					}, {
						key: 10,
						title: "专辑",
						data: [],
						offset: 0,
						count: null
					}, {
						key: 1014,
						title: "视频",
						data: [],
						offset: 0,
						count: null
					},
					{
						key: 1006,
						title: "歌词"
					}, {
						key: 1009,
						title: "主播电台",
						data: [],
						offset: 0,
						count: null
					}, {
						key: 1002,
						title: "用户",
						data: [],
						offset: 0,
						count: null
					}
				]
			}
		},
		onLoad(option) {
			this.searchValue = option.keywords
			this.searchSongs(this.tabs[this.current].key)
		},
		onReachBottom() {
			console.log(11111111111111111111)
			if (this.current !== 0 && (this.tabs[this.current].count > this.tabs[this.current].data.length)) {
				this.searchSongs(this.tabs[this.current].key)
			}
		},
		onPageScroll({
			scrollTop
		}) {
			// 传入scrollTop值并触发所有easy-loadimage组件下的滚动监听事件
			// console.log(scrollTop)
			this.scrollTop = scrollTop;
		},
		methods: {
			// 接收子组件值
			handleClick(value) {
				console.log(value)
				this.searchValue = value
				uni.redirectTo({
					url:"../searchresult/searchresult?keywords=" + this.searchValue
				})
				// uni.pageScrollTo({
				//     scrollTop: 0,
				//     duration: 0
				// });
				// this.searchSongs(this.tabs[this.current].key)
			},
			changeTab(index) {
			   uni.pageScrollTo({
			       scrollTop: 0,
			       duration: 0
			   });
				this.current = index
				this.tabs[this.current].offset = 0
				this.tabs[this.current].data = []
				this.searchSongs(this.tabs[this.current].key)
			},
			goTosearch() {
				uni.navigateTo({
					url:"../search/search?keywords=" + this.searchValue
				})
			},
			async searchSongs(type) {
				const index = parseInt(this.current)
				uni.showLoading({
					title: "加载中"
				})
				const res = await this.$myRuquest({
					url: "/search/?keywords=" + this.searchValue + "&type=" + type,
					data: parseInt(this.current) !== 0 ? {limit: 10, offset: this.tabs[index].data.length || 0} : {}
				})
				uni.hideLoading()
				if (res.code === 200) {
					if ( index === 0) {
						this.tabs[index].synthesis =  res.result
					} else {
						if (res.result.songs) {
							this.tabs[index].count = res.result.songCount
							this.tabs[index].data = [...this.tabs[index].data, ...res.result.songs]
						}
						if (res.result.playlists) {
							this.tabs[index].count = res.result.playlistCount
							this.tabs[index].data = [...this.tabs[index].data, ...res.result.playlists]
						}
						if (res.result.artists) {
							this.tabs[index].count = res.result.artistCount
							this.tabs[index].data = [...this.tabs[index].data, ...res.result.artists]
						}
						if (res.result.albums) {
							this.tabs[index].count = res.result.albumCount
							this.tabs[index].data = [...this.tabs[index].data, ...res.result.albums]
						}
						if (res.result.videos) {
							this.tabs[index].count = res.result.videoCount
							this.tabs[index].data = [...this.tabs[index].data, ...res.result.videos]
						}
						if (res.result.djRadios) {
							this.tabs[index].count = res.result.djRadiosCount
							this.tabs[index].data = [...this.tabs[index].data, ...res.result.djRadios]
						}
						if (res.result.userprofiles) {
							this.tabs[index].count = res.result.userprofileCount
							this.tabs[index].data = [...this.tabs[index].data, ...res.result.userprofiles]
						}
					}
				}
			}

		}
	}
</script>

<style lang="scss">
	page {
		height: 100%;
	}
	.search-result-index {
		padding: 0 20rpx 80rpx;
		height: 100%;
		.header {
			position: fixed;
			left: 0;
			width: 100%;
			background-color: #fff;
			z-index: 999;
		}

		.header-search {
			background-color: #f7f7f7;
			display: flex;
			border-radius: 18px;
			height: 36px;
			font-size: 14px;
			margin-top: 10px;
			line-height: 36px;
			margin: 10px 20rpx 0;

			.iconfont {
				margin: 0 10px;
			}
		}
		.tab-active {
			height: 100%;
			padding-top: 160rpx;
		}
	}
</style>
