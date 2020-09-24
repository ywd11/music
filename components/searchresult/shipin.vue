<template>
	<view class="shipin-index">
		<view class="video-list" v-if="dataList.length > 0">
			<view class="title">
				<view class="title-text">
					视频
				</view>
			</view>
			<view class="content">
				<video-item  :scrollTop="scrolltops" :dataList="dataList" :searchValue="searchValue"></video-item>
			</view>
		</view>
	</view>
</template>

<script>
	import videoItem from "../baseComponents/videoItem.vue"
	export default {
		components: {
			videoItem
		},
		props: {
			dataList: {
				type: Array,
				default: () => {
					return []
				}
			},
			searchValue: {
				type: String,
				default: ''
			},scrollTop: {
				type: Number,
				default: 0
			}
		},
		computed: {
			scrolltops(){
				return this.scrollTop
			}
		}
	}	
</script>
<style lang="scss">
	.video-list {
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
	}
</style>
