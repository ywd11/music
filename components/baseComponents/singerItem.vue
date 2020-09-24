<template>
	<view class="singer-item">
		<view class="item" v-for="(item, index) in formatData" :key="index">
			<view class="left">
				<!-- <image lazy-load :src="item.picUrl || item.img1v1Url" mode="aspectFill"></image> -->
				<easy-loadimage mode="widthFix" :scroll-top="scrollTop" :image-src="item.picUrl || item.img1v1Url" loading-mode="skeleton-1"></easy-loadimage>
			</view>
			<view class="right">
				<rich-text class="name" :nodes="item.name"></rich-text>
			</view>
		</view>
	</view>
</template>

<script>
	import { textActive } from "../../util/plugins.js"
	import easyLoadimage from '@/components/easy-loadimage/easy-loadimage.vue'
	export default {
		components:{
			easyLoadimage
		},
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
	.singer-item{
		.item {
			display: flex;
			align-items: center;
			overflow: hidden;
			padding: 10rpx 0;
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
				display: flex;
				margin-left: 20rpx;
				flex: 1;
				height: 100%;
				.name {
					font-size: 28rpx;
					margin-right: 20rpx;
				}
			}
		}
	}
</style>
