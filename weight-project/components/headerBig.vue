<template>
	<view class="index_header_main" 	:style="`background-color: rgba(255,255,255,${scroll/100}); `">
			<view class="index_header_top">
				<view class="index_header_big_btn" @click="isShowHeaderTop = !isShowHeaderTop">
					<text  v-if='isShowHeaderTop'>
						当前体重阶段
						<i class='iconfont' >&#xe63c;</i>
					</text>
					<text v-else>
						距离目标{{howFarWeight}} 
						<i class='iconfont' >&#xe63d;</i>
					</text>
				</view>
				<view class="index_header_share_btn" @click="share">
					<i class='iconfont' >&#xe8b0;</i>
				</view>
				<image :src="$store.state.userMsg.head" mode="aspectFill" class="index_header_my_head"></image>
			</view>
			<view :class="isShowHeaderTop ? 'index_header_big_box big_box_show':'index_header_big_box big_box_hidden'">
				<view class="big_box_show_item">
					<view>
						距离目标 / 预计天数
					</view>
					<view>
						{{howFarWeight}}/好多好多天
					</view>
				</view>
				<view class="big_box_show_item">
					<view>
						已经历
					</view>
					<view>
						{{experienceDays}}
					</view>
				</view>
				<view class="big_box_show_item">
					<view>
						BMI
					</view>
					<view>
						{{bmi}}
					</view>
				</view>
		</view>
	</view>
</template>

<script>
	import dayjs from 'dayjs'
	export default {
		props:['scroll'],
		name:"headerBig",
		data() { 
			return { 
				isShowHeaderTop:false,
				
			};
		},
		computed:{
			howFarWeight(){
				const nowWeight = parseFloat(this.$store.state.weightList[this.$store.state.weightList.length-1].weight)
				const endWeight = parseFloat(this.$store.state.userMsg.endWeight)
				return (nowWeight - endWeight).toFixed(2) +this.$store.state.userMsg.weightType
			},
			experienceDays(){
				const nowDay = dayjs(dayjs(new Date().getTime()).format('YYYY-MM-DD')).valueOf()
				const startDay = dayjs(this.$store.state.weightList[0].time).valueOf()
				const day = Math.ceil((nowDay - startDay) / 86400000)
				return day === 0 ? '今天' : day + '天'
			},
			bmi(){
				// 68/(1.75^2)
				let weight
				const height = parseFloat(this.$store.state.userMsg.height)*0.01
				const type = this.$store.state.userMsg.weightType
				if(type==='斤'){
					weight = parseFloat(this.$store.state.weightList[this.$store.state.weightList.length-1].weight)/2
				}else{
					weight = parseFloat(this.$store.state.weightList[this.$store.state.weightList.length-1].weight)
				}
				const myBmi = weight/(height*height)
				return myBmi.toFixed(1)
			}
		},
		methods:{
			share(){
				uni.share({
					provider: "weixin",
					scene: "WXSceneSession",
					type: 0,
					href: "https://www.baidu.com/s?wd=健身",
					title: "锤锤体重小本本",
					summary: `我(${this.$store.state.userMsg.name})已经瘦成⚡闪电了(${this.$store.state.weightList[this.$store.state.weightList.length-1].weight}斤),说实话在座的各位都是乐色。`,
					imageUrl: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fitem%2F202003%2F13%2F20200313200553_yktdc.thumb.400_0.jpg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1651655195&t=ffc713a2ccf13986b7abdb247d7a1ab3",
					success: function (res) {
						uni.showToast({
							icon:'none',  
							title:'分享成功!' 
						}) 
					}, 
					fail: function (err) {   
					uni.showToast({
						icon:'none',
						title:'分享失败'
					})
					}
				});
			}
		}
	}
</script>

<style lang="less" scoped>
	.index_header_main{
		width: 100%;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 999;
		padding-top: 70rpx;
			.index_header_top{
					position: relative;
					.index_header_big_btn{
						font-size: 15px;
						width: 280rpx;
						margin: auto; 
						text-align: center;
						>i{
							margin-left: 5rpx;
						}
					}
					.index_header_share_btn{
						position: absolute;
						right: 40rpx;
						top: 0;
						>i{
							font-weight: 550;
							font-size: 20px;
						}
					}
					.index_header_my_head{
						position: absolute;
						background-color: red;
						width: 60rpx;
						height: 60rpx;
						left: 20rpx;
						top: -20rpx;
						border-radius: 100%;
						overflow: hidden;
					}
				}
				.index_header_big_box{
					overflow: hidden;
					transition: all .2s ease;
					margin-top: ;
					display: flex;
					justify-content: space-between;
					width: 90%;
					margin:10rpx auto 0 auto;
					.big_box_show_item{
						text-align: left;
						min-width: 140rpx;
						display: inline-block;
						background-color: pink;
						padding: 10rpx 21rpx;
						font-size: 13px;
						background-color: white;
						border-radius: 10rpx;
						>view:nth-child(1){
							margin-bottom: 5rpx;
						}
						>view:nth-child(2){
							font-size: 12px;
						}
					} 
				}
				.big_box_show{
					height: 100rpx;
				}
				.big_box_hidden{
					height:0
				}
		}
</style>
