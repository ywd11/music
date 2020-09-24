<template>
	<view class="song-list">
		<view class="item" v-for="(item, index) in formatData" :key="index" @click="goToplayer(item.id)">
			<view class="left">
				<!-- <view class="name" v-html="textActive(item.name)">
				</view> -->
				<rich-text class="name" :nodes="item.name"></rich-text>
				<rich-text class="tips" :nodes="item.arString"></rich-text>
			</view>
			<view class="right">
				<view class="iconfont icon-ziyuan"></view>
				<view class="iconfont icon-ziyuan1"></view>
			</view>
		</view>
	</view>
</template>

<script>
	import { textActive } from "../../util/plugins.js"
	export default {
		props: {
			dataList: {
				type: Array,
				default:() => {return []}
			},
			searchValue: '',scrollTop: {
				type: Number,
				default: 0
			}
		},
		onLoad() {
			console,log('this.formatData')
			console,log(this.searchValue)
		},
		computed: {
			formatData() {
				return this.dataList.map(item => {
					return {
						...item,
						name: this.textActive(this.searchValue, item.name),
						arString: this.textActive(this.searchValue, item.ar ? item.ar.map(_=> _.name).join('/') : item.artists.map(_=> _.name).join('/'))
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
	.song-list{
		.item {
			padding: 20rpx 0;
			display: flex;
			border-bottom: 1px solid #ccc;
			justify-content: space-between;
			align-items: center;
		
			.left {
				flex: 1;
				overflow: hidden;
				white-space: nowrap;
		
				.name {
					font-size: 28rpx;
				}
		
				.tips {
					font-size: 20rpx;
				}
			}
		
			.right {
				margin-left: 40rpx;
				display: flex;
		
				.icon-ziyuan1 {
					margin-left: 20rpx;
					margin-right: 20rpx;
				}
			}
		}
	}
</style>
