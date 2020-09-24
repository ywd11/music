<template>
	<view class="geshou-index">
		<view class="artist-list" v-if="dataList.length > 0">
			<view class="title">
				<view class="title-text">
					歌手
				</view>
			</view>
			<view class="content">
				<singer-item  :scrollTop="scrolltops" :dataList="dataList" :searchValue="searchValue"></singer-item>
			</view>
		</view>
	</view>
</template>

<script>
	import singerItem from "../baseComponents/singerItem.vue"
	export default {
		components: {
			singerItem
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
	.artist-list {
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

		.content {
		}
	}
</style>
