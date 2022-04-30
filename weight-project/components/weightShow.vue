<template>
	<view class="weight_show_main">
		<writeWeight @addShowNum='addShowNum'></writeWeight>
		<view class="weight_show_my_box_fat">
			<view class="weight_show_my_box">
				<view class="show_my_weight">
					<text>{{nowWeightFirst}}</text><text>.{{nowWeightSecond}}</text>
					<view>{{$store.state.userMsg.weightType}}</view>
				</view>
				<view class="show_my_weight_jian">
					<i class='iconfont'>&#xe63e;</i>积累减重
					<text v-html="totalJian"></text>
				</view>
			</view>
		</view>

		<view class="weight_show_my_message">
			<view class="my_message_left my_message_item">
				<view>
					{{$store.state.userMsg.startWeight+'.00'}}
				</view>
				<view>
					初始体重
				</view>
			</view>
			<view class="my_message_right my_message_item">
				<view>
					{{$store.state.userMsg.endWeight+'.00'}}
				</view>
				<view>
					目标体重
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import writeWeight from './writeWeight.vue'
	export default {
		name:"weightShow",
		data() {
			return {
				
			};
		},
		computed:{
			nowWeightFirst(){
				return this.$store.state.weightList[this.$store.state.weightList.length-1].weight.split('.')[0]
			},
			nowWeightSecond(){
				const second = this.$store.state.weightList[this.$store.state.weightList.length-1].weight.split('.')[1]
				if(second){
					return second
				}else{
					return '00'
				}
			},
			totalJian(){
				const nowWeight  = this.$store.state.weightList[this.$store.state.weightList.length-1].weight
				const startWeight = this.$store.state.userMsg.startWeight
				if((startWeight - nowWeight).toFixed(2)>=0){
					return (startWeight - nowWeight).toFixed(2)
				}else{
					return `<text style='color:red'>${'+' + Math.abs((startWeight - nowWeight).toFixed(2))}</text>`
				}
			}
		},
		methods:{
			addShowNum(){
				this.$emit('addShowNum',1)
			}
		},
		components:{
			writeWeight
		}
		
	}
</script>

<style lang="less" scoped>
.weight_show_main{
	background-color: #EAF2FF;
	position: relative;
	padding-top: 100rpx;
	.weight_show_my_box_fat{
		position: relative;
		z-index: 4;
		border-radius: 100%;
		border: 40rpx solid #E9F1FE;
		width: 340rpx;
		height: 340rpx;
		margin: auto;
		.weight_show_my_box{
			width: 260rpx;
			height: 260rpx;
			border-radius: 100%;
			border: 40rpx solid #A0D9FF;
			margin: auto;
			background-color: white;
			.show_my_weight{
				margin-top: 60rpx;
				text-align: center;
				position: relative;
				>text{
					letter-spacing: 3rpx;
					&:nth-child(1){
						text-align: center;
						font-weight: 600;
						font-size: 40px;
					}
					&:nth-child(2){
						font-size: 20px;
					}
				}
				>view{
					position: absolute;
					right: 55rpx;
					top: 10rpx;
					font-size:13px;
			
					
				}
			}
			.show_my_weight_jian{
				font-size: 12px;
				text-align: center;
				background-color: #DBF4F9;
				width: 220rpx;
				margin: auto;
				border-radius: 10rpx;
				>i{
					font-size: 12rpx;
					margin-right: 6rpx;
					color: #4BC4E3;
				}
			}
		}
	}

	
	.weight_show_my_message{
		z-index: 3;
		left: 0;
		bottom: -60rpx;
		position: absolute;
		width: calc(100% - 40rpx);
		display: flex;
		justify-content: space-between;
		background-color: white;
		padding: 50rpx 20rpx;
		.my_message_item{
			>view:nth-child(2){
				font-size: 13px;
				margin-top: 4rpx;
			}
		}
		.my_message_left{
	
		}
		.my_message_right{

		}
	}
}
</style>
