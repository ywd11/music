<template>
	<view class="album-item">
		<view class="item" v-for="(item, index) in formatData" :key="index">
			<view class="left">
				<!-- <image :src="item.picUrl" mode="" lazy-load></image> -->
				<easy-loadimage mode="widthFix" :scroll-top="scrollTop" :image-src="item.picUrl" loading-mode="skeleton-1"></easy-loadimage>
			</view>
			<view class="right">
				<rich-text class="name" :nodes="item.name"></rich-text>
				<view class="tips">
					{{item.artists}} {{item.publishTime}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import easyLoadimage from '@/components/easy-loadimage/easy-loadimage.vue'
	import {
		textActive,
		formatDate
	} from "../../util/plugins.js"
	export default {
		components: {
			easyLoadimage
		},
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
						name: this.textActive(this.searchValue, item.name),
						artists: item.artists.map(_ => _.name).join('/'),
						publishTime: this.formatDate(item.publishTime).slice(0, 10)
					}
				})
			}
		},
		methods: {
			textActive,
			formatDate,
			goToplayer(id) {
				uni.navigateTo({
					url: "../player/player?id=" + id
				})
			}
		}
	}
</script>

<style lang="scss">
	.album-item {
		.item {
			display: flex;
			align-items: center;
			// overflow: hidden;
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
