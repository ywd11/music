<template>
	<view class="user-index">
		<view class="user-list" v-if="dataList.length > 0">
			<view class="title">
				<view class="title-text">
					用户
				</view>
			</view>
			<view class="content">
				<user-item :scrollTop="scrolltops" :dataList="dataList" :searchValue="searchValue"></user-item>
			</view>
		</view>
	</view>
</template>

<script>
	import userItem from "../baseComponents/userItem.vue"
	export default {
		components: {
			userItem
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
	.user-list {
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
