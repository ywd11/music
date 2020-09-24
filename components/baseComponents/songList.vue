<template>
	<view class="song-play-list">
		<view class="item" v-for="(item, index) in formatData" :key="index">
			<view class="left">
				
				<!-- <image :src="item.coverImgUrl" mode=""></image> -->
				<easy-loadimage mode="widthFix" :scroll-top="scrollTop" :image-src="item.coverImgUrl" loading-mode="skeleton-1"></easy-loadimage>
			</view>
			<view class="right">
				<rich-text class="name" :nodes="item.name"></rich-text>
				<view class="tips">
					{{item.trackCount}}首音乐 by{{ item.creator.nickname}}, 播放{{item.playCount}}次
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { textActive } from "../../util/plugins.js"
	import easyLoadimage from '@/components/easy-loadimage/easy-loadimage.vue'
	export default {
		props: {
			dataList: {
				type: Array,
				default:() => {return []}
			},
			searchValue: '',
			scrollTop: {
				type: Number,
				default: 0
			}
		},
		components:{
			easyLoadimage
		},
		onLoad() {
			console,log('this.formatData')
			console,log(this.searchValue)
		},
		computed: {
			formatData() {
				return this.dataList.map(item => {
					return Object.assign(item, {
						name: this.textActive(this.searchValue, item.name),
						playCount: String(item.playCount).length > 5 ? `${(item.playCount/10000).toFixed(1)}万` : item.playCount
					})
				})
			}
		},
		methods:{
			textActive,
			goToplayer(id) {
				uni.navigateTo({
					url:"../player/player?id=" + id
				})
			}
		}
	}
</script>

<style lang="scss">
	.song-play-list{
		.item {
			display: flex;
			align-items: center;
			overflow: hidden;
			padding: 20rpx 0;
			vertical-align: middle;
		
			.left {
				width: 120rpx;
				height: 120rpx;
				border-radius: 16rpx;
			
				// overflow: hidden;
			
				image {
					border-radius: 16rpx;
				}
			
			}
			.right {
				margin-left: 20rpx;
				flex: 1;
				height: 100%;
		
				.name {
					font-size: 28rpx;
				}
		
				.tips {
					font-size: 20rpx;
					margin-top: 16rpx;
				}
			}
		}
	}
</style>

