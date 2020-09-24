<template>
	<view class="search-index">
		<view class="header">
			<view class="input">
				<view class="iconfont icon-search"></view>
				<input class="uni-input" cursor="30" focus v-model.trim="inputValue" placeholder="赵雷" confirm-type="search" @confirm="searchConfirm"/> 
			</view>
			<view
			  class="cancel"
			  @click="navigateToHome"
			>
				取消
			</view>
		</view>
		<view class="body-content">
			<view class="search-history" v-if=" searchList.length > 0">
				<view class="title">
					<view>搜索历史</view>
					<view @click="removeSearchListStore">删除</view>
				</view>
				<view class="content">
					<view
						class="search-item"
						v-for="(item,index) in searchList"
						:key="index"
						@click="handleHistory(item)"
					>
						{{item}}
					</view>
				</view>
			</view>
			<view class="search-hot">
				<view class="title">
					热搜榜
				</view>
				<view class="content">
					<view
					  class="item"
					  v-for="(item, index) in hotList"
					  :key="index"
					  @click="handlerHot(item)"
					>
						<view class="left">{{index + 1}}</view>
						<view class="right">
							<view class="song-name">
								{{ item.searchWord.slice(0,5)  }} {{item.searchWord.length > 5 ? '...' : ''}}
								<image :src="item.iconUrl" mode="aspectFit"></image>
							</view>
							<view class="song-content">{{ item.content.slice(0,8)}} {{item.content.length > 8? '...' : ''}}</view>
						</view>
					</view>
				</view>
			</view>
				
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				inputFocus: true,
				inputValue: '',
				hotList: [],
				searchList: []
			}
		},
		onLoad(option) {
			const searJson = uni.getStorageSync('searchList')
			this.searchList = searJson ? JSON.parse(searJson) : []
			if (option.keywords) {
				this.inputValue = option.keywords
				this.inputFocus = true
			}
			this.searchHot()
		},
		beforeDestroy() {
			if (this.inputValue) {
				const list = this.searchList.map((item)=> {
					if (item && (item.trim() !== this.inputValue.trim())) {
						return item
					}
				})
				const searJson  = JSON.stringify([this.inputValue, ...list])
				uni.setStorageSync('searchList', searJson)
			}	
		},
		methods: {
			// 取消搜索
			navigateToHome() {
				uni.switchTab({
				    url: '/pages/index/index'
				});
			},
			searchConfirm() {
				if (!this.inputValue.trim()) {
					return
				}
				uni.navigateTo({
					url:"../searchresult/searchresult?keywords=" + this.inputValue
				})
			},
			// 点击历史搜索
			handleHistory(value) {
				this.inputValue = value
				uni.navigateTo({
					url:"../searchresult/searchresult?keywords=" + this.inputValue
				})
			},
			// 清空历史搜索
			removeSearchListStore() {
				this.searchList = []
				uni.removeStorageSync('searchList')
			},
			// 搜索
			async search(value) {
				const res = await this.$myRuquest({
					url: "/search/suggest?keywords= " + value
				})
				console.log(res)
			},
			// 热门搜索
			async searchHot() {
				const res = await this.$myRuquest({
					url: "/search/hot/detail"
				})
				if (res.code === 200) {
					this.hotList = res.data
				}
			},
			// 点击热门
			handlerHot(item) {
				uni.navigateTo({
					url:"../searchresult/searchresult?keywords=" + item.searchWord
				})
				this.inputValue = item.searchWord
				// this.search(item.searchWord)
			}
		}
	}
</script>

<style lang="scss">
 .search-index {
	 padding: 0 20rpx 40rpx 20rpx;
	 .header {
		display: flex;
		 justify-content: space-between;
		 align-items: center;
		 position: fixed;
		 background-color: #fff;
		 width: 100%;
		 height: 120rpx;
		 z-index: 99;
		 left: 0;
		 padding: 0 20rpx;
		 box-sizing: border-box;
		 .input {
			 display: flex;
			 height: 72rpx;
			 flex: 1;
			 position: relative;
			 .iconfont {
				 position: absolute;
				 left: 20rpx;
				 top: 50%;
				 transform: translateY(-50%);
			 }
			 .uni-input {
				 background-color: #f7f7f7;
				 border-radius: 36rpx;
				 flex: 1;
				 font-size: 32rpx;
				 padding-left: 80rpx;
				 height: 100%;
			 }
		 }
		 .cancel {
			 margin-left: 20rpx;
			 font-size: 32rpx;
		 }
	 }
		.body-content {
			padding-top: 120rpx;
		}
	.search-history {
		.title {
			display: flex;
			justify-content: space-between;
			view:nth-child(1){
				font-size: 32rpx;
				font-weight: 700;
			}
		}
		.content{
			view{
				display: inline-block;
				padding: 16rpx 30rpx;
				background-color: #f7f7f7;
				font-size: 24rpx;
				border-radius: 40rpx;
				margin-right: 20rpx;
				margin-top: 20rpx;
			}
		}
	}
	.search-hot {
		margin-top: 40rpx;
		.title{
			font-size: 32rpx;
			font-weight: 700;
		}
		.content{
			display: flex;
			flex-wrap: wrap;
			width: 100%;
			.item {
				margin-top: 40rpx;
				width: 50%;
				display: flex;
				align-items: center;
				&:nth-child(1),
				&:nth-child(2),
				&:nth-child(3),
				&:nth-child(4){
					.left {
						color: #e9434a;
					}
				}
				.left {
					width: 40rpx;
					color: #999999;
				}
				.right{
					flex: 1;
					margin-left: 20rpx;
					.song-name{
						font-size: 32rpx;
						font-weight: 700;
						line-height: 40px;
						image{
							height: 40rpx;
							width: 60rpx;
							margin-left: 20rpx;
							vertical-align: middle;
						}
					}
					.song-content {
						font-size: 24rpx;
						color: #b5b5b5;
						margin-top: 12rpx;
					}
				}
			}
		}
	}
 }
</style>
