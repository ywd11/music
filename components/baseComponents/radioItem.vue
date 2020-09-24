<template>
	<view class="radio-item">
		<view class="item" v-for="(item, index) in formatData" :key="index">
			<view class="left">
				<easy-loadimage mode="widthFix" :scroll-top="scrollTop" :image-src="item.picUrl" loading-mode="skeleton-1"></easy-loadimage>
				<!-- <image :src="item.picUrl" mode=""></image> -->
			</view>
			<view class="right">
				<rich-text class="name" :nodes="item.name"></rich-text>
				<view class="tips">
					{{item.dj.nickname}}
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
			searchValue: '',scrollTop: {
				type: Number,
				default: 0
			},
			scrollTop: {
				type: Number,
				default: 0
			}
		},
		components:{
			easyLoadimage
		},
		computed: {
			formatData() {
				return this.dataList.map(item => {
					return {
						...item,
						name: this.textActive(this.searchValue, item.name)
					}
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
	.radio-item{
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
