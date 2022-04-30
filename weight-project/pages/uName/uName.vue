<template>
	<view class="set_my_name_main">
		<h3 class="set_my_name_title">设置个人信息</h3>
		<view class="set_my_name_title_secend">给你的新账号设置头像昵称吧</view>
		<view class="choice_head_box" @click="choiceImg">
			<i class="iconfont" v-if='!head'>&#xe60d;</i>
			<image :src="head" mode="aspectFill" v-else></image>
		</view>
		<view class="input_box">
			<i class="iconfont user_name_icon">&#xe60d;</i>
			<input type="text" placeholder="输入昵称" v-model="name"/>
		</view>
		<view :class="name ? 'netx_stage haveName' : 'netx_stage noName'" :hover-class="name ? 'netx_stage_hover':''" @click="goNext">
			下一步
		</view>
	</view>
</template>

<script>
	import {pathToBase64} from '../../utils/image-tools/index.js'
	export default {
		data() {
			return {
				head:null,
				name:''
			}
		},
		methods: {
			choiceImg(){
				uni.chooseImage({
					count:1,
					sourceType:['album'],
					success:(res)=>{
						if(res.tempFiles[0].size<=2097152){
							pathToBase64(res.tempFilePaths[0]).then(base64 => this.head = base64 )
						}else{
							uni.showToast({
								icon:'none',
								title:'图片不能大于2MB!'
							})
						}
					}
				})
			},
			goNext(){
				if(this.name){
					this.$store.commit('addUserMsg',{type:'name',value:this.name})
					this.$store.commit('addUserMsg',{type:'head',value:this.head})
					uni.navigateTo({
						url:`../uMessage/uMessage`
					})
				}else{
					uni.showToast({
						icon:'none',
						title:'请先让我们您的名字哦！'
					})
				}
			}
		}
	}
</script>

<style lang="less" scoped>
	.set_my_name_main{
		position: absolute;
		width: 670rpx;
		height: calc(100% - 250rpx);
		top: 250rpx;
		left: 50%;
		transform: translate(-50%,0);
		.set_my_name_title{
			letter-spacing: 4rpx;
			font-size: 22px;
		}
		.set_my_name_title_secend{
			margin-top: 20rpx;
			color: #9f9f9f;
			font-size: 13px;
		}
		.choice_head_box{
			width: 100rpx;
			height: 100rpx;
			border-radius: 100%;
			margin-top: 15rpx;
			background-color: #D2D2D2;
			text-align: center;
			line-height: 100rpx;
			color: white;
			overflow: hidden;
			>i{
				font-size: 45rpx!important;
			}
			>image{
				width: 100rpx;
				height: 100rpx;
			}
		}
		.input_box{
			border: 1px solid #D3D4D5;
			border-radius: 40rpx;
			width: calc(100% - 70rpx);
			height: 60rpx;
			margin-top: 20rpx;
			line-height: 60rpx;
			padding-left: 70rpx;
			position: relative;
			>input{
				height: 40rpx;
				margin-top: 10rpx;
			}
			.user_name_icon{
				position: absolute;
				top: 0rpx;
				left: 20rpx;
				color: #646464;
			}
		}
		.netx_stage{
			position: absolute;
			height: 70rpx;
			width: 50%;
			bottom: 60rpx;
			left: 50%;
			transform: translate(-50%,0);
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
	}

</style>
