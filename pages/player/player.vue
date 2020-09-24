<template>
	<view class="player-index">
		<view class="bg" :style="{'background-image': 'url(' + songImg +'), linear-gradient(#000, #000)'}">
		</view>
		<view class="header">
			<view class="header-title">
				<view>{{songName}}</view>
				<view>{{songsAr}}</view>
			</view>
		</view>
		<view class="show-lryic" ref="lryic" v-show="showLryic" @click="showLryic = false">
			<scroll-view scroll-y="true" class="scroll-Y" :scroll-into-view="lryicItem" :show-scrollbar="false"
			 scroll-with-animation="true">
				<view :id="'lryicItem' + index " v-for="(item, index) in computedCurrent" :key="index" :class="['lryic-item', item.active ? 'lryic-active':'' ]"
				 :ref="item.active ? 'lryicActive':''">
					{{ item.content }}
				</view>
			</scroll-view>
		</view>
		<view class="play-box" v-show="!showLryic" @click="showLryic = true">
			<view class="player-Lever">
				<view :class="['lever-box', isPlayer !== 'iconfont icon-bofang'? 'player-bofang': '']">
					<view class="lever-garden1"></view>
					<view class="lever-garden2">
						<view class="lever-garden3">
							<view class="lever-garden4"> | |</view>
						</view>
					</view>
				</view>
			</view>
			<view class="garden-1 xuanzhuan" ref="xuanzhuan">
				<view class="garden-2 garden-box">
					<view class="garden-3 garden-box">
						<view class="garden-4 garden-box">
							<view class="garden-5 garden-box">
								<view class="garden-6 garden-box">
									<view class="garden-7 garden-box">
										<view class="garden-8 garden-box">
											<view class="garden-9 garden-box">
												<image class="garden-box" :src="songImg"></image>
											</view>
										</view>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="footer">
			<view class="progress-box">
				<view class="start-time">
					{{ currentTime ? currentTime.slice(0,5): '00:00'}}
				</view>
				<progress :percent="percent" stroke-width="3" backgroundColor="#6d7075" activeColor="#a9aaaa" />
				<view class="end-time">
					{{ duration.slice(0,5) }}
				</view>
			</view>
			<view class="footer-bottom">
				<view class="iconfont icon-danquxunhuan"></view>
				<view class="iconfont icon-shangyishoushangyige"></view>
				<view :class="isPlayer" @click="changePlayer">
				</view>
				<view class="iconfont icon-xiayigexiayishou"></view>
				<view class="iconfont icon-liebiao" @click="open"></view>
			</view>
		</view>
		<!-- 播放列表 -->
		<uni-popup ref="popup" type="bottom">
			<view class="popup-box">
				<view class="title">
					当前播放
				</view>
			</view>
		</uni-popup>
	</view>
</template>
<script>
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	import uniPopupMessage from '@/components/uni-popup/uni-popup-message.vue'
	import uniPopupDialog from '@/components/uni-popup/uni-popup-dialog.vue'
	export default {
		data() {
			return {
				isPlayer: 'iconfont icon-icon-',
				songs: [],
				songUrl: "",
				songLyric: [],
				showLryic: true,
				currentTime: '', // 当前进度
				duration: "00:00", //当前音频长度
				percent: 0, //进度条百分比
				lryicItem: ""
			}
		},
		components: {
			uniPopup,
			uniPopupMessage,
			uniPopupDialog
		},
		async onLoad(option) {
			// console.log(this.$store.state.playerList)
			await this.getSongDetail(option.id)
			await this.getSongUrl(option.id)
			await this.getSongLyric(option.id)
		},
		computed: {
			songName() {
				return this.$store.state.currentSong.name
			},
			songImg() {
				return this.$store.state.currentSong.al.picUrl
			},
			songsAr() {
				if (!this.$store.state.currentSong.ar) return ''
				const arr = this.$store.state.currentSong.ar
				let str = ''
				const newArr = arr.map((item) => {
					return item.name
				})
				return newArr.join('/')
			},
			computedCurrent() {
				this.songLyric.forEach((item, index) => {
					if (item.content && (item.time.slice(0, 5) === this.currentTime.slice(0, 5))) {
						item.active = true
						for (let i = 0; i < this.songLyric.length; i++) {
							if (index != i) {
								this.songLyric[i].active = false
							}
						}
					}
				})
				return this.songLyric
			}
		},
		methods: {
			scroll(e) {
				console.log(e)
				this.old.scrollTop = e.detail.scrollTop
			},
			open() {
				this.$refs.popup.open()
			},
			changePlayer() {
				if (this.isPlayer === 'iconfont icon-bofang') {
					this.isPlayer = 'iconfont icon-icon-'
					this.$audio.play()
					this.$nextTick(function() {
						const el = document.getElementsByClassName('xuanzhuan')[0]
						el.style.webkitAnimationPlayState = 'running'
					})
				} else {
					this.isPlayer = 'iconfont icon-bofang'
					this.$audio.pause()
					this.isXuanzhuan = ''
					// if (!this.showLryic) {
					this.$nextTick(function() {
						const el = document.getElementsByClassName('xuanzhuan')[0]
						el.style.webkitAnimationPlayState = 'paused'
					})
					// }
				}
			},
			// 获取歌曲详情
			async getSongDetail(id) {
				const res = await this.$myRuquest({
					url: `/song/detail?ids=${id}`
				})
				if (res.code === 200) {
					this.songs = res.songs
					this.$store.dispatch('SetStore', {
						key: "currentSong",
						value: res.songs[0]
					})
				}
			},
			//  播放地址
			async getSongUrl(id) {
				const res = await this.$myRuquest({
					url: `/song/url?id=${id}`
				})
				if (res.code === 200) {
					this.songUrl = res.data[0].url
					this.$audio.src = this.songUrl
					this.$audio.play()

					function comuptNum(num) {
						let str = ''
						if (num < 10) {
							str = "00:0" + num
						} else if (num >= 10 && num < 60) {
							str = "00:" + num
						} else if (num >= 60) {
							let num1 = Math.floor(num / 60)
							let num2 = (num % 60).toFixed(2)
							let str1 = ''
							if (num1 < 10) {
								str1 = '0' + num1 + ":"
							} else {
								str1 = num1 + ':'
							}
							str = str1 + `${num2<10? ('0'+ num2) : num2}`
						}
						return str
					}
					this.$audio.onTimeUpdate(() => {
						const num = this.$audio.currentTime.toFixed(2)
						this.getSongLyricLocation()
						this.currentTime = comuptNum(num)
						if (this.$audio.duration && this.$audio.currentTime) {
							this.percent = (this.$audio.currentTime / this.$audio.duration).toFixed(2) * 100
						}
					})
					setTimeout(() => {
						this.duration = comuptNum(this.$audio.duration)
					}, 1000);
				}
			},
			// 获取歌词
			async getSongLyric(id) {
				const res = await this.$myRuquest({
					url: `/lyric?id=${id}`
				})
				if (res.code === 200) {
					const arr = res.lrc.lyric.split(/[(\r\n)\r\n]+/)
					let newArr = []
					arr.forEach((item) => {
						let str1 = item.match(/\[.*?\]/g) ? item.match(/\[.*?\]/g)[0] : ''
						// if (str1) console.log(str1.slice(1, str1.length-1))
						let str2
						if (str1) {
							str2 = str1.slice(1, str1.length - 1)
							newArr.push({
								time: str2,
								content: item.replace(str1, '')
							})
							// obj[str2] = item.replace(str1, '')
						}
					})
					this.songLyric = newArr
				}
			},
			// 获取歌词位置
			getSongLyricLocation() {
				this.$nextTick(() => {
					let query = uni.createSelectorQuery();
					let dom = query.select('.lryic-active')
					// console.log(this.$refs.lryic)
					if (dom) {
						// dom.boundingClientRect((res) => {
						// 	//res:{left,top,right,bottom,width,height}
						// 	data = res
						// }).exec()
						dom.fields({
						  id: true,
						}, res => {
						  const itemId = parseInt(res.id.replace('lryicItem',''))
						  if (itemId > 4) {
						  	this.lryicItem = "lryicItem" + (itemId - 3)
						  }
						}).exec();
					}
				})
				// console.log(data && data.top)
				// if (data) {
				// 	console.log(data.top)
				// 	uni.createSelectorQuery().select('.show-lryic').boundingClientRect((res)=>{
				// 	    uni.pageScrollTo({
				// 	        duration:0,
				// 	        scrollTop: data.top - res.top
				// 	    })
				// 	}).exec()
				// }
				// try{
				// 	const top = this.$refs.lryicActive
				// 	console.log(top)
				// }catch(e){
				// 	//TODO handle the exception
				// 	console.log(e)
				// }
				// console.log(this.$refs.lryicActive.$el.getBoundingClientRect())
				// // #ifdef APP-PLUS
				// this.$nextTick(()=>{
				// 	const elBox = document.getElementsByClassName('show-lryic')[0]
				// 	const el = document.getElementsByClassName('lryic-active')[0]
				// 	function step(el,timestamp) {
				// 	      currentTop+=speed;
				// 	      if(currentTop<=top){
				// 	        window.scrollTo(0,currentTop);
				// 	        requestId=window.requestAnimationFrame(step);
				// 	      }else{
				// 	        window.cancelAnimationFrame(requestId);
				// 	      }
				// 	    }
				// 	if (el) {
				// 		elBox.scrollTop = el.offsetTop - 100
				// 	}
				// })
				// // #endif
				// // #ifdef MP-WEIXIN
				// 	this.$nextTick(()=>{
				// 		const query = wx.createSelectorQuery()
				// 		const item = query.selectAll(".show-lryic")
				// 		console.log(item)
				// 	})
				// // #endif
			}
		}
	}
</script>

<style lang="scss">
	page {
		height: 100%;
	}

	// 旋转
	@keyframes circle {
		0% {
			transform: rotate(0deg)
		}

		100% {
			transform: rotate(360deg)
		}
	}

	.xuanzhuan {
		animation: circle 16s infinite linear;
	}

	.player-index {
		background-color: #575a5c;
		height: 100%;
		position: relative;

		.bg {
			position: absolute;
			width: 100%;
			filter: blur(20px);
			top: 0;
			bottom: 0;
			left: 0;
			z-index: 1;
			opacity: 0.5
		}

		.header {
			padding: 12rpx 0;
			width: 100%;
			position: absolute;
			z-index: 2;

			.header-title {
				text-align: center;
				color: #fff;

				view:nth-child(1) {
					font-size: 32rpx;
				}

				view:nth-child(2) {
					font-size: 24rpx;
				}
			}
		}

		.show-lryic {
			position: absolute;
			transition: all 0.5s;
			z-index: 2;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			height: 500rpx;
			width: 100%;
			font-size: 28rpx;
			overflow: hidden;
			text-align: center;
			color: #b0b0b3;
			padding: 20rpx;

			.scroll-Y {
				height: 500rpx;
			}

			.lryic-item {
				text-align: center;
				line-height: 60rpx;

				&.lryic-active {
					transition: color,fontSzie 0.5s;
					color: #fff;
					font-size: 32rpx;
				}
			}
		}

		.play-box {
			position: absolute;
			z-index: 2;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			animation: fucircle 16s infinite linear;

			.player-Lever {
				width: 80rpx;
				height: 80rpx;
				background-color: rgba(0, 0, 0, .5);
				position: absolute;
				top: -160rpx;
				left: 50%;
				z-index: 999;
				transform: translate(-50%);
				border-radius: 50%;

				.lever-box {
					background-color: #fefefe;
					width: 60rpx;
					height: 60rpx;
					border-radius: 50%;
					position: absolute;
					top: 50%;
					left: 50%;
					transform: translate(-50%, -50%) rotate(40deg);
					transition: all 0.5s;

					&.player-bofang {
						transition: all 0.5s;
						transform: translate(-50%, -50%) rotate(75deg);
					}

					.lever-garden1 {
						position: absolute;
						width: 20rpx;
						height: 20rpx;
						background-color: #dad8d9;
						border-radius: 50%;
						top: 50%;
						left: 50%;
						transform: translate(-50%, -50%);
					}

					.lever-garden2 {
						position: absolute;
						width: 200rpx;
						height: 20rpx;
						left: 56rpx;
						top: 50%;
						transform: translateY(-50%);
						transform-origin: left center;
						// transform: translateY(-50%) rotate(45deg);
						background-color: #fefefe;
						box-sizing: 0 0 2rpx 2rpx #000;

						.lever-garden3 {
							width: 120rpx;
							height: 20rpx;
							position: absolute;
							background-color: #fefefe;
							transform-origin: left center;
							transform: rotate(-30deg);
							left: 97%;
							top: 0;

							.lever-garden4 {
								position: absolute;
								height: 48rpx;
								width: 40rpx;
								background-color: #fefefe;
								right: -40rpx;
								top: -12rpx;
								border-radius: 8rpx;
								font-size: 28rpx;
								line-height: 48rpx;
								text-align: center;
								transform: rotate(90deg);
								box-sizing: 0 0 0 10rpx #000;
							}
						}
					}
				}
			}

			.garden-1 {
				width: 500rpx;
				height: 500rpx;
				background-color: rgba(57, 51, 37, .5);
				border-radius: 250rpx;
				position: relative;

				.garden-2 {
					width: 440rpx;
					height: 440rpx;
					box-shadow: 0 0 4rpx #000;
				}

				.garden-3 {
					width: 400rpx;
					height: 400rpx;
				}

				.garden-4 {
					width: 380rpx;
					height: 380rpx;
				}

				.garden-5 {
					width: 360rpx;
					height: 360rpx;
				}

				.garden-6 {
					width: 340rpx;
					height: 340rpx;
				}

				.garden-7 {
					width: 320rpx;
					height: 320rpx;
				}

				.garden-8 {
					width: 300rpx;
					height: 300rpx;
				}

				.garden-9 {
					width: 280rpx;
					height: 280rpx;
				}

				image {
					width: 240rpx;
					height: 240rpx;
				}

				.garden-box {
					background-color: #090909;
					border-radius: 50%;
					position: absolute;
					top: 50%;
					left: 50%;
					transform: translate(-50%, -50%);
					border: 2rpx solid #171717;

				}
			}

		}

		.footer {
			position: absolute;
			z-index: 2;
			bottom: 0;
			width: 100%;
			height: 200rpx;

			.progress-box {
				position: absolute;
				width: 100%;
				opacity: .6;
				top: 0;
				padding: 0 20rpx;
				box-sizing: border-box;
				display: flex;
				justify-content: space-between;
				font-size: 24rpx;
				color: #fff;
				align-items: center;

				progress {
					flex: 1;
					margin: 0 20rpx;
				}
			}

			// background-color: #fff;
			.footer-bottom {
				position: absolute;
				bottom: 0;
				width: 100%;
				height: 200rpx;
				padding: 0 40rpx;
				z-index: 2;
				box-sizing: border-box;
				// background-color: pink;
				display: flex;
				justify-content: space-between;
				align-items: center;

				view {
					font-size: 50rpx;
					color: #fff;

					&:nth-child(3) {
						font-size: 100rpx;
					}
				}
			}
		}

		.popup-box {
			height: 600rpx;
			background-color: #fff;
			border-radius: 20rpx;
			overflow: hidden;
			padding: 20rpx;
			margin: 20rpx;

			.title {
				font-size: 28rpx;
				font-weight: 700;
			}
		}
	}
</style>
