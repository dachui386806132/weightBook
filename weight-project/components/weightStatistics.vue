<template>
	<view class="weight_statistics_main">
		<view class="statistics_title">
			记录
		</view>
		<view class="weight_tiem_box" v-if="weightList">
			<view class="weight_tiem" v-for="(item,index) in weightList" :key='item.id'>
				<view class="weight_tiem_left">
					{{item.time}}
				</view>
				<view class="weight_tiem_right">
					<view class="weight_tiem_right_1">
						{{ $store.state.weightList.length-1 !== index ? getOffset(item.weight ,$store.state.weightList[index+1].weight) : '' }}
					</view>
					<view class="weight_tiem_right_2">
						{{item.weight}}{{$store.state.userMsg.weightType}}
					</view>
				</view>
			</view>
		<view class="weight_loding"  v-if="loading">
			<uni-load-more status="loading"></uni-load-more>
		</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:['showNum','loading'],
		name:"weightStatistics",
		data() {
			return {
				weightList:null
			};
		},
		methods:{
			getOffset(my,next){
				if(my-next > 0){
					return '+' + (my-next) + this.$store.state.userMsg.weightType
				}else if(my-next < 0){
					return  (my-next) +this.$store.state.userMsg.weightType
				}else{
					return ''
				}
			}
		},
		watch:{
			showNum:{
				immediate:true,
				handler(newNum){
					setTimeout(()=>{
						this.weightList = this.$store.state.weightList.filter((item,index)=>index<newNum)
					},500)
				}
			},
			'$store.state.weightList':{
				immediate:true,
				deep:true,
				handler(newVal){
					this.weightList = this.$store.state.weightList.filter((item,index)=>index<this.showNum)
				}
			}
		}
	}
</script>

<style lang="less" scoped>
.weight_statistics_main{
	padding: 60rpx 0 100rpx 0;
	background-color: white;
	.statistics_title{
		padding-left: 20rpx;
		padding-bottom: 20rpx;
	}
	.weight_tiem_box{
		.weight_tiem{
			padding: 0 20rpx;
			line-height: 115rpx;
			height: 115rpx;
			background-color: #f2faff;
			border-radius: 10rpx;
			margin-bottom: 5rpx;
			display: flex;
			justify-content: space-between;
			.weight_tiem_left{
				letter-spacing: 1rpx;
				font-size: 17px;
			}
			.weight_tiem_right{
				display: flex;
				.weight_tiem_right_1{
					font-size: 12px;
					margin-right: 20rpx;
				}
				.weight_tiem_right_2{
						font-size: 18px;
				}
			}
		}
	}
}
</style>
