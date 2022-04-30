<script>

	export default {
		onLaunch: function() {
			const user = uni.getStorageSync('userMsg')
			const weightList = uni.getStorageSync('writeWeight')
			
			if(user){
				this.$store.commit('changeUserMsg',user)
				this.$store.commit('appendWeightList',weightList)
			}else{
				uni.redirectTo({
					url:'pages/uName/uName'
				})
			}
		},
		onShow: function() {
			console.log('页面展示了')
		},
		onHide: function() {
			console.log('页面隐藏了')
		}
	}
</script> 

<style lang="scss">  
	@import url("./font/iconfont.css");
	@import "uview-ui/index.scss";
</style>
