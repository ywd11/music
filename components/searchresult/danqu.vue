<template>
	<view class="danqu-index">
		<view class="single-box" v-if="dataList.length > 0">
			<view class="title">
				<view class="title-text">
					单曲
				</view>
			</view>
			<view class="content">
				<songs-item :scrollTop="scrolltops" :dataList="dataList" :searchValue="searchValue"></songs-item>
			</view>
		</view>
	</view>
</template>

<script>
	import songsItem from "../baseComponents/songsItem.vue"
	export default {
		components: {
			songsItem
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
		},
		onLoad() {
			console.log(this.this.data)
		},
		methods: {
			goToplayer(id) {
				uni.navigateTo({
					url: "../player/player?id=" + id
				})
			}
		}
	}
</script>

<style lang="scss">
	.single-box {
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
