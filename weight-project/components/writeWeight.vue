<template>
	<view>
		<view class="write_weight_main" hover-class="write_weight_main_hover" @click="show=true">
			<i class='iconfont'>&#xe7da;</i>
			记录体重
		</view>
			<u-popup :show="show" :round="10" mode="bottom" @close="show=false">
				<view class="write_weight_box">
					<view class="write_weight_header">
						<i class='iconfont' @click="show=false">&#xe63f;</i>
						<input type="text" v-model="num" disabled="" placeholder="0.00" />
						<text>{{$store.state.userMsg.weightType}}</text>
					</view>
					<view class="write_weight_center">
						<view class="num_item" v-for="item in numList" @click="choiceNum(item.toString())" hover-class="num_item_hover" hover-start-time="0" hover-stay-time="200">
							{{item}}
						</view>
						<view class="num_item" @click="choiceNum('.')" hover-class="num_item_hover" hover-start-time="0" hover-stay-time="200">
							.
						</view>
						<view class="num_item" @click="choiceNum('0')" hover-class="num_item_hover" hover-start-time="0" hover-stay-time="200">
							0
						</view>
						<view class="num_item" @click="choiceNum('delete')" hover-class="num_item_hover" hover-start-time="0" hover-stay-time="200">
							<i class='iconfont'>&#xe64c;</i>
						</view>
					</view>
					<view class="write_weight_footer">
						<view :class="num ? 'netx_stage haveName' : 'netx_stage noName'" :hover-class="num ? 'netx_stage_hover':''" @click="goNext">
							确定
						</view>
					</view>
				</view>
			</u-popup>
	</view>
</template>

<script>
	export default {
		name:"writeWeight",
		data() {
			return {
				show:false,
				num:'',
				numList:[1,2,3,4,5,6,7,8,9] 
			};
		},
		methods:{
			goNext(){
				const newWeight = this.num 
				this.$store.commit('addWeightList',newWeight)
				this.num = ''
				this.show = false
				console.log('wright')
				this.$emit('addShowNum',1)
			},
			
			choiceNum(val){
				if(val === '.'){
					if(this.num){
						this.num += '.' 
					}else{
						this.num += '0.' 
					}
				}else if(val === 'delete'){
					if(this.num) this.num = this.num.substr(0, this.num.length - 1);  
				}else{
					if(parseInt(this.num+val)<300){
						if(this.num+val!=='00'){
							if((this.num+val).split('.')[1]){
								if((this.num+val).split('.')[1].length<=2){
									this.num += val
								}
							}else{
								this.num += val
							}
						}
						
					}	
				}
			}
		}
	}
</script>

<style lang="less" scoped>
	.write_weight_main_hover{
		background-color: #8ed4ff!important;
	}
	.write_weight_main{
		z-index: 8;
		position: absolute;
		left: 20rpx;
		top: 160rpx;
		background-color: #A0D9FF;
		color: white;
		padding: 6rpx 10rpx;
		border-radius: 10rpx;
		>i{
			margin-right: 10rpx;
		}
	}
	.write_weight_box{
		padding: 30rpx 20rpx;
		position: relative;
		.write_weight_header{
			display: flex;
			>i{
				position: absolute;
				font-size: 24px;
				top: 40rpx;
			}
			>input{
				width: 200rpx;
				margin: auto;
				font-size: 30px;
				text-align: center;
			}
			>text{
				position: absolute;
				right: 210rpx;
				top: 50rpx;
			}
		}
		.write_weight_center{
			margin-top: 30rpx;
			height: 500rpx;
			display: flex;
			justify-content: space-between;
			flex-wrap: wrap;
			.num_item{
				font-size: 20px;
				width: 33%;
				height: 25;
				line-height: calc(500rpx * 0.25);
				// background-color:pink;
				text-align: center;
				>i{
					font-size: 27px;
				}
			}
			.num_item_hover{
				background-color: #DFDFDF!important;
			}
		}
		.write_weight_footer{
			margin-top: 30rpx;
			height: 70rpx;
			padding: 20rpx 0 10rpx 0 ;
		}
	}
	
	.netx_stage{
		width: 300rpx;
		margin: auto;
		height: 70rpx;
		color: white;
		text-align: center;
		line-height: 70rpx;
		border-radius: 10rpx;
	}
	.netx_stage_hover{
		background: linear-gradient(to right,#8ca7ff,#5d83ff,#5d83ff)!important; 
	}
	.haveName{
		background: linear-gradient(to right,#c0caff,#799AFF,#799AFF); 
	}
	.noName{
		background-color: #EBEBEB;
	}
</style>
