<template>
	<view class="gedan-index">
		<view class="play-list" v-if="dataList.length > 0">
			<view class="title">
				<view class="title-text">
					歌单
				</view>
			</view>
			<view class="content">
				<song-list  :scrollTop="scrolltops" :dataList="dataList" :searchValue="searchValue"></song-list>
			</view>
		</view>
	</view>
</template>

<script>
	import songList from "../baseComponents/songList.vue"
	export default {
		components:{
			songList
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
		},
		data() {
			return {

			}
		}
	}
</script>

<style lang="scss">
	.play-list {
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
