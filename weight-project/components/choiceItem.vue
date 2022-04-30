<template>
	<view class="choice_item_main" @click="openPoup">
		<view class="choice_name">{{itemMsg.title}}</view>
		<view class="choice_btn" hover-class="choice_btn_click" >{{ nowText ? nowText : '点击设置'}}</view>
	</view>
</template>

<script>
	export default {
		name:"choiceItem",
		props:['itemMsg'],
		data() {
			return {
				nowText:''
			};
		},
		watch:{ 
			'$store.state.flag':{
				immediate:true,
				handler(newVal){
					const userMsg = this.$store.state.userMsg
					if(this.itemMsg.id === 1 && userMsg.age){
						this.nowText = userMsg.age + ' 年'
					}else if(this.itemMsg.id === 2 && userMsg.sex){
						this.nowText = userMsg.sex
					}else if(this.itemMsg.id === 3 && userMsg.height){
						this.nowText = userMsg.height + ' cm'
					}else if(this.itemMsg.id === 4 && userMsg.weightType){
						this.nowText = userMsg.weightType
					}else if(this.itemMsg.id === 5 && userMsg.startWeight){
						if(userMsg.weightType===2 || userMsg.weightType==='公斤'){
							this.nowText = userMsg.startWeight  + ' 公斤'
						}else{
							this.nowText = userMsg.startWeight  + ' 斤'
						}
					}else if(this.itemMsg.id === 6 && userMsg.endWeight){
						if(userMsg.weightType===2 || userMsg.weightType==='公斤'){
							this.nowText = userMsg.endWeight  +  '公斤'
						}else{
							this.nowText = userMsg.endWeight  + ' 斤'
						}
					}
				}
			}
		},
		onLoad() {
			
		},
		methods:{
			openPoup(){
				this.$emit('sendOpenPoup',this.itemMsg.ind)
			}
		}
	}
</script>

<style lang="less" scoped>
	.choice_item_main{
		width: 80%;
		margin: auto;
		height: 100rpx;
		margin-bottom: 40rpx;
		line-height: 100rpx;
		display: flex;
		justify-content: space-around;
		.choice_name{
			width: 150rpx;
			text-align: center;
		}
		.choice_btn{
			background-color: #F5F5F7;
			color: #999999;
			width: 300rpx;
			height: 60rpx;
			margin-top: 20rpx;
			line-height: 60rpx;
			text-align: center;
			border-radius: 16rpx;
			font-size: 14px;
		}
		.choice_btn_click{
			background-color: #cdcdce!important;
			color: white!important;;
		}
	}
</style>
