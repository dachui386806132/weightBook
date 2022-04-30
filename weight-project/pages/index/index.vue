<template>
	<view class="index_main">
		<header-big :scroll='scroll'/>
		<weight-show @addShowNum='addShowNum'/>
		<weight-statistics :showNum='nowShowNum' :loading='loading'/>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				scroll:false,
				nowShowNum:10,
				loading:false
			}
		},
		onLoad() {
			this.getWeight()
		},
		methods: {
			getWeight(){
				const weightList = uni.getStorageSync('writeWeight')
				if(weightList){
					this.$store.commit('appendWeightList',weightList)
				}
			},
			addShowNum(){
				this.nowShowNum+=1
			},
		},
		onReachBottom (){

			const max = this.$store.state.weightList.length
			if(this.nowShowNum < max){
				this.loading = true
				this.nowShowNum += 10
				if(this.nowShowNum > max){
					this.nowShowNum = max
				}
				setTimeout(()=>{
					this.loading =false
				},500)
			}
		},
		onPageScroll(object) {
			this.scroll= object.scrollTop
		}
	}
</script>

<style lang="less" scoped>
	.index_main{
		background-color: white;
		width: 100%;
		height: 100vh;
	}
</style>
