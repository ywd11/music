<template>
	<view class="user-item">
		<view class="item" v-for="(item, index) in formatData" :key="index">
			<view class="left">
				<!-- <image :src="item.avatarUrl || item.img1v1Url" mode="aspectFill"></image> -->
				<easy-loadimage mode="widthFix" :scroll-top="scrollTop" :image-src="item.avatarUrl || item.img1v1Url" loading-mode="skeleton-1"></easy-loadimage>
			</view>
			<view class="right">
				<rich-text class="name" :nodes="item.nickname"></rich-text>
				<view style="color: blue;font-weight: 700;" v-if="item.gender"> ♂</view>
				<view style="color: pink;font-weight: 700;" v-else> ♀</view>
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
		computed: {
			formatData() {
				return this.dataList.map(item => {
					return {
						...item,
						nickname: this.textActive(this.searchValue, item.nickname)
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
	.user-item{
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
