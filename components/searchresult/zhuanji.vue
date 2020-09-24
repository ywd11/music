<template>
	<view class="zhuanjiindex">
		<view class="album-list" v-if="dataList.length > 0">
			<view class="title">
				<view class="title-text">
					专辑
				</view>
			</view>
			<view class="content">
				<album-item :scrollTop="scrolltops" :dataList="dataList" :searchValue="searchValue"></album-item>
			</view>
		</view>
	</view>
</template>

<script>
	import albumItem from "../baseComponents/albumItem.vue"
	export default {
		components: {
			albumItem
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
	.album-list {
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

		.content {}
	}
</style>
