<template>
	<view class="video-item">
		<view class="item" v-for="(item, index) in formatData" :key="index">
			<view class="left">
				<!-- <image :src="item.coverUrl" mode=""></image> -->
				<easy-loadimage mode="widthFix" :scroll-top="scrollTop" :image-src="item.coverUrl" loading-mode="skeleton-1"></easy-loadimage>
			</view>
			<view class="right">
				<rich-text class="name" :nodes="item.title"></rich-text>
				<view class="tips">
					{{item.durationms}} by{{ item.creatorString}}
				</view>
			</view>
		</view>
	</view>
	</view>
</template>

<script>
	import {
		textActive,
		comuptNum
	} from "../../util/plugins.js"
	import easyLoadimage from '@/components/easy-loadimage/easy-loadimage.vue'
	export default {
		props: {
			dataList: {
				type: Array,
				default: () => {
					return []
				}
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
			console,
			log('this.formatData')
			console,
			log(this.searchValue)
		},
		computed: {
			formatData() {
				return this.dataList.map(item => {
					return {
						...item,
						title: this.textActive(this.searchValue, item.title),
						durationms: this.comuptNum(item.durationms && String(parseInt(item.durationms / 1000))).slice(0, 5),
						creatorString: item.creator.map(_ => _.userName).join('/')
					}
				})
			}
		},
		methods: {
			textActive,
			comuptNum,
			goToplayer(id) {
				uni.navigateTo({
					url: "../player/player?id=" + id
				})
			}
		}
	}
</script>

<style lang="scss">
	.video-item {
		.item {
			display: flex;
			align-items: center;
			overflow: hidden;
			padding: 20rpx 0;
			vertical-align: middle;
			.left {
				width: 260rpx;
				height: 160rpx;
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
