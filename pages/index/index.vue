<template>
	<view class="index">
		<view class="header">
			<view class="iconfont icon-luyinshuohuashengyin"></view>
			<view class="input" @click="goToSearch"> <text class="iconfont icon-search"></text> 南方姑娘-赵雷</view>
		</view>
		<view class="banner">
			<swiper indicator-dots indicator-active-color="#ff261b">
				<swiper-item
				  class="banner-item"
				  v-for="(item,index) in bannerData"
				  :key="index"
				  @click="goToPlay(item.song)"
				 >
					<image :src="item.pic" lazy-load></image>
					<view class="banner-tag" :style="'background-color:'+ item.titleColor">{{item.typeTitle}}</view>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				bannerData: [],
				tag:{
					"数字专辑": "#43a4f0",
					"独家": "#ff261b"
				}
			}
		},
		onLoad() {
			this.getBannerData()
		},
		methods: {
			// 跳转至搜索界面
			goToSearch() {
				uni.navigateTo({
					url:'../search/search'
				})
			},
			async getBannerData() {
				const res = await this.$myRuquest({
					url: '/banner',
					data: {
						type: 2
					}
				})
				console.log(res)
				if (res) {
					this.bannerData = res.banners
					console.log(this.bannerData)
				}
			},
			async goToPlay(value) {
				if (!value) return
				await this.$store.dispatch('SetStore', {
					key:  "playerList",
					value: value
				})
				uni.navigateTo({
					url: `/pages/player/player?id=${value.id}`
				})
			}
		}
	}
</script>

<style lang="scss">
	.index {
		padding: 10px;

		.header {
			display: flex;
			justify-content: space-between;

			.iconfont.icon-luyinshuohuashengyin {
				width: 60rpx;
				font-size: 46rpx;
			}

			.input {
				background-color: #f7f7f7;
				height: 60rpx;
				border-radius: 30rpx;
				flex: 1;
				font-size: 30rpx;
				text-align: center;
				color: #c8c8c8;
				line-height: 60rpx;

				.iconfont {
					color: #a4a4a4;
				}
			}
		}
		.banner{
			margin: 10px -10px 0 -10px;
			.banner-item{
				padding: 0 10px;
				box-sizing: border-box;
				border-radius: 10px;
				position: relative;
				image{
					border-radius: 10px;
					height: 100%;
					width: 100%;
				}
				.banner-tag {
					height: 20rpx;
					line-height: 20rpx;
					border-radius: 10rpx;
					color: #fff;
					padding: 5px;
					font-size: 24rpx;
					position: absolute;
					bottom: 0;
					right: 10px;
				}
			}
		}
	}
</style>
