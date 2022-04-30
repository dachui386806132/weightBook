<template>
	<view>
		<view class="back_btn" @click="back">
			<i class="iconfont">&#xeb15;</i>
		</view>
		<u-picker :show="show" :title='`选择`+choiceList[nowIndex].title'  :columns="choiceList[nowIndex].list" @cancel="show = false" @confirm='getchoice'></u-picker>
		<view class="set_my_massage_main">
			<h2 class="set_my_massage_title">填写基本信息</h2>
			<view class="set_my_massage_text">
				请设置你的必要信息,让可爱的小锤锤精确计算你的胖瘦情况,提供说实话一般的体重管理体验,所有信息将被严格加密,请放心填写。
			</view>
			<view class="set_my_massage_box">
					<choice-item v-for="(item,index) in choiceList" :itemMsg='{title:item.title,id:item.id,ind:index}' @sendOpenPoup='getOpenId'></choice-item>
			</view>
			<view :class="isWriteAll ? 'netx_stage haveName' : 'netx_stage noName'" :hover-class="isWriteAll ? 'netx_stage_hover':''" @click="goNext">
				完成
			</view>
		</view>
	</view>
</template>

<script>
		import dayjs from 'dayjs'
	export default {
		data() {
			return {
				show: false,
				choiceList:[
					{
						id:1,
						title:'出生年份',
						type:'age',
						list:[]
					},
					{
						id:2,
						title:'性别',
						type:'sex',
						list:[['男','女']]
					},
					{
						id:3,
						title:'身高',
						type:'height',
						list:[]
					},
					{
						id:4,
						title:'体重单位',
						type:'weightType',
						list:[['斤','公斤']]
					},
					{
						id:5,
						title:'初始体重',
						type:'startWeight',
						list:[]
					},
					{
						id:6,
						title:'目标体重',
						type:'endWeight',
						list:[]
					},
				],
				// 计算类型1为斤,2为公斤
				countType:1,
				isWriteAll:false,
				nowIndex:0
			}
		},
		methods: {
			back(){
				uni.navigateBack(1)
			},
			
			getAge(){
				let ageList = []
				for (var i = 1920; i <= new Date().getFullYear(); i++) {
					ageList.push(i+' 年')
				}
					this.choiceList[0].list = [ageList]
			},
			
			getHeight(){
				let heightList = []
				for (var i = 140; i <= 210; i++) {
					heightList.push(i+' cm')
				}
				this.choiceList[2].list = [heightList]
			},
			
			getWeight(type){
				let weightList = []
					if(type === 2 || type === '公斤'){
						for (var i = 25; i <= 150; i+=0.5) {
							weightList.push(i+' 公斤')
						}
					}else{
						for (var i = 50; i <= 300; i++) {
							weightList.push(i+' 斤')
						}
				}
				this.choiceList[4].list = [weightList]
				this.choiceList[5].list = [weightList]
			},
			
			goNext(){
				if(this.isWriteAll){
					uni.setStorage({
						key: 'writeWeight',
						data: [{time:dayjs().format('YYYY-MM-DD'),weight:this.$store.state.userMsg.startWeight,id:1}]
					}),
					uni.setStorage({
						key: 'userMsg',
						data: this.$store.state.userMsg,
						success: ()=> {
							uni.showToast({
								icon:'none',
								title:'注册成功!'
							})
							setTimeout(()=>{
								uni.redirectTo({
									url: '../index/index'
								});
							},800)
						}
					})
				
				}else{
					uni.showToast({
						icon:'none',
						title:'请填写完整您的信息'
					})
				}
			},
			
			getOpenId(index){
				this.nowIndex = index
				this.show = true
			},
			
			getchoice(val){
				if(this.nowIndex === 5 && this.$store.state.userMsg.startWeight){
					if(val.value[0].split(' ')[0] >= this.$store.state.userMsg.startWeight){
						uni.showToast({
							icon:'none',
							title:'目标体重不可以大于等于初始体重哦'
						})
					}else{
						this.$store.commit('addUserMsg',{type:this.choiceList[this.nowIndex].type,value:val.value[0].split(' ')[0]})
						this.$store.commit('changeFlag')
						this.show = false
					}
				}else if(this.nowIndex === 4 && this.$store.state.userMsg.endWeight){
					if(val.value[0].split(' ')[0] <= this.$store.state.userMsg.endWeight){
						uni.showToast({
							icon:'none',
							title:'目标体重不可以大于等于初始体重哦'
						})
					}else{
						this.$store.commit('addUserMsg',{type:this.choiceList[this.nowIndex].type,value:val.value[0].split(' ')[0]})
						this.$store.commit('changeFlag')
						this.show = false
					}
				}else{
					this.$store.commit('addUserMsg',{type:this.choiceList[this.nowIndex].type,value:val.value[0].split(' ')[0]})
					this.$store.commit('changeFlag')
					this.show = false
				}
			
			}
			
		},
		onLoad(){
			this.getHeight()	
			this.getAge()	
			this.getWeight(this.countType)
		},
		
		watch:{
			'$store.state.flag':{
				immediate:true,
				handler(){
					const userMsg = this.$store.state.userMsg
					this.getWeight(userMsg.weightType)
					if(userMsg.age && userMsg.sex && userMsg.height && userMsg.weightType && userMsg.startWeight && userMsg.endWeight ){
						this.isWriteAll = true
					}
				}
			}
		}
	}
</script>

<style lang="less" scoped>
	.back_btn{
		position: absolute;
		top: 55rpx;
		left: 20rpx;
		>i{
			font-size: 24px!important;
		}
	}
	.set_my_massage_main{
		position: absolute;
		width: 670rpx;
		height: calc(100% - 180rpx);
		top: 180rpx;
		left: 50%;
		transform: translate(-50%,0);
		.set_my_massage_title{
			letter-spacing: 3px;
			text-align: center;
		}
		.set_my_massage_text{
			font-size: 13px;
			color: #9f9f9f;
			margin-top: 20rpx;
		}
		.set_my_massage_box{
			margin-top: 40rpx;
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
	
	.popup_main{
		.popup_title{
			text-align: center;
			position: relative;
			border-bottom: 1px solid #CCCCCC;
			padding: 30rpx;
			.popup_close{
				position: absolute;
				right: 20rpx;
				top: 30rpx;
				font-size: 20px;
				font-weight: 550;
			}
		}
		.popup_box{
			padding: 20rpx;
			height: 600rpx;
		}
		.sure_btn_box{
			padding: 20rpx 0 30rpx 0;
			box-shadow: 0px -8px 16px -1px rgba(0,0,0,0.06);
			-webkit-box-shadow: 0px -8px 16px -1px rgba(0,0,0,0.06);
			-moz-box-shadow: 0px -8px 16px -1px rgba(0,0,0,0.06);
			.popup_sure_btn{
				height: 70rpx;
				width: 46%;
				color: white;
				text-align: center;
				line-height: 70rpx;
				border-radius: 10rpx;
				background: linear-gradient(to right,#c0caff,#799AFF,#799AFF); 
				margin: auto;
			}
			.prpup_sure_hover{
				background: linear-gradient(to right,#8ca7ff,#5d83ff,#5d83ff)!important; 
			}
		}
		
	}
	/deep/ .u-popup__content{
	border-top-left-radius: 20rpx;
	border-top-right-radius: 20rpx;
	}
	
</style>
