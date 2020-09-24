<template>
	<view class="tab-zonghe">
		<view class="single-box" v-if="synthesis.song && synthesis.song.songs.length > 0">
			<view class="title">
				<view class="title-text">
					单曲
				</view>
			</view>
			<view class="content">
				<songs-item :scrollTop="scrolltops" :dataList="synthesis.song.songs" :searchValue="searchValue"></songs-item>
				<view class="more-text" v-if="synthesis.song.more">
					{{synthesis.song.moreText}} >
				</view>
			</view>
		</view>
		<view class="play-list"  v-if="synthesis.playList && synthesis.playList.playLists.length > 0">
			<view class="title">
				<view class="title-text">
					歌单
				</view>
			</view>
			<view class="content">
				<song-list :scrollTop="scrolltops"  :dataList="synthesis.playList && synthesis.playList.playLists" :searchValue="searchValue"></song-list>
			</view>
			<view class="more-text" v-if="synthesis.playList.more">
				{{synthesis.playList.moreText}} >
			</view>
		</view>
		<view class="video-list" v-if="synthesis.video && synthesis.video.videos.length > 0">
			<view class="title">
				<view class="title-text">
					视频
				</view>
			</view>
			<view class="content">
				<video-item :scrollTop="scrolltops"  :dataList="synthesis.video.videos" :searchValue="searchValue"></video-item>
			</view>
			<view class="more-text" v-if="synthesis.video.more">
				{{synthesis.video.moreText}} >
			</view>
		</view>
		<view class="search-about" v-if="synthesis.sim_query && synthesis.sim_query.sim_querys.length > 0">
			<view class="title">
				<view class="title-text">
					相关搜索
				</view>
			</view>
			<view class="content">
				<view
					class="search-item"
					v-for="(item, index) in synthesis.sim_query.sim_querys"
					:key="index"
					@click="handlerClick(item.keyword)"
				>
					{{item.keyword}}
				</view>
			</view>
		</view>
		<view class="djRadio-list" v-if="synthesis.djRadio && synthesis.djRadio.djRadios.length > 0">
			<view class="title">
				<view class="title-text">
					电台
				</view>
			</view>
			<view class="content">
				<radio-item :scrollTop="scrolltops" :dataList="synthesis.djRadio && synthesis.djRadio.djRadios" :searchValue="searchValue"></radio-item>
			</view>
			<view class="more-text" v-if="synthesis.djRadio.more">
				{{synthesis.djRadio.moreText}} >
			</view>
		</view>
		<view class="artist-list" v-if="synthesis.artist && synthesis.artist.artists.length > 0">
			<view class="title">
				<view class="title-text">
					歌手
				</view>
			</view>
			<view class="content">
				
				<singer-item :scrollTop="scrolltops" :dataList="synthesis.artist.artists" :searchValue="searchValue"></singer-item>
			</view>
			<view class="more-text" v-if="synthesis.artist.more">
				{{synthesis.artist.moreText}} >
			</view>
		</view>
		<view class="album-list" v-if=" synthesis.album && synthesis.album.albums.length > 0">
			<view class="title">
				<view class="title-text">
					专辑
				</view>
			</view>
			<view class="content">
				<album-item :scrollTop="scrolltops"  :dataList="synthesis.album.albums" :searchValue="searchValue"></album-item>
			</view>
			<view class="more-text" v-if="synthesis.album.more">
				{{synthesis.album.moreText}} >
			</view>
		</view>
		<view class="user-list" v-if="synthesis.user && synthesis.user.users.length > 0">
			<view class="title">
				<view class="title-text">
					用户
				</view>
			</view>
			<view class="content">
				<user-item  :scrollTop="scrolltops" :dataList="synthesis.user.users" :searchValue="searchValue"></user-item>
			</view>
			<view class="more-text" v-if="synthesis.user.more">
				{{synthesis.user.moreText}} >
			</view>
		</view>
	</view>
</template>

<script>
	import { comuptNum, formatDate } from "../../util/plugins.js"
	import songsItem from "../baseComponents/songsItem.vue"
	import songList from "../baseComponents/songList.vue"
	import videoItem from "../baseComponents/videoItem.vue"
	import radioItem from "../baseComponents/radioItem.vue"
	import singerItem from "../baseComponents/singerItem.vue"
	import albumItem from "../baseComponents/albumItem.vue"
	import userItem from "../baseComponents/userItem.vue"
	export default {
		components:{
			songsItem,
			songList,
			videoItem,
			radioItem,
			singerItem,
			albumItem,
			userItem
		},
		props: {
			synthesis: {
				type: Object,
				default: () => {
					return {
						synthesis: {
							song: {
								songs: [
									{
										id:'',
										name: ',',
										ar: []
									}
								]
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
					}
				}
			},
			searchValue: "",
			scrollTop: {
				type: Number,
				default: 0
			}
		},
		
		onLoad() {
			console.log(this.synthesis)
		},
		computed: {
			scrolltops(){
				return this.scrollTop
			}
		},
		methods:{
			comuptNum,
			formatDate,
			// 相关搜索
			handlerClick(value) {
				this.$emit('handleClick', value)
			},
			// 高亮搜索条件
			textActive(value) {
				let str
				if (value && this.searchValue) {
					let str
					const keywords = this.searchValue.toLocaleUpperCase()
					const text = value.toLocaleUpperCase()
					const reg = new RegExp(keywords, 'g')
					const index = text.search(reg)
					if (index > -1) {
						const str1 = value.substr(index,keywords.length)
						str = value.substring(0, index) + '<text style="color: blue;">' + str1 + '</text>' + value.substring(index + keywords.length, value.length);
						return str
					} else {
						return value
					}
				} else {
					return value
				}
			},
			goToplayer(id) {
				uni.navigateTo({
					url:"../player/player?id=" + id
				})
			}
		}
	}
</script>
<style lang="scss">
	.tab-zonghe {
		.title {
			margin-top: 20rpx;
			height: 60rpx;
			line-height: 60rpx;
			border-bottom: 1px solid #ccc;

			.title-text {
				font-size: 32rpx;
				font-weight: 700;
			}
		}

		.more-text {
			text-align: center;
			font-size: 28rpx;
			color: #ccc;
			padding: 20rpx 0;
		}

		.single-box {
			.content {
				
			}
		}

		.play-list,
		.djRadio-list,
		.album-list {
			.content {
				
			}
		}

		.video-list {
			.content {
			}
		}

		.search-about {
			.content {
				view {
					display: inline-block;
					padding: 16rpx 30rpx;
					background-color: #f7f7f7;
					font-size: 24rpx;
					border-radius: 40rpx;
					margin-right: 20rpx;
					margin-top: 20rpx;
				}
			}
		}

		.artist-list, 
		.user-list{
			.content {
				
			}
		}
	}
</style>
