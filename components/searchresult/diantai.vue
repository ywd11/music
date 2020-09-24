<template>
	<view class="diantai-index">
		<view class="djRadio-list" v-if="dataList.length > 0">
			<view class="title">
				<view class="title-text">
					电台
				</view>
			</view>
			<view class="content">
				<radio-item :scrollTop="scrolltops" :dataList="dataList" :searchValue="searchValue"></radio-item>
			</view>
		</view>
	</view>
</template>

<script>
	import radioItem from "../baseComponents/radioItem.vue"
	export default {
		components: {
			radioItem
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
			},
			scrollTop: {
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
	.djRadio-list {
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
