import Vue from 'vue'
import Vuex from 'vuex'
import dayjs from 'dayjs'
Vue.use(Vuex)
const store = new Vuex.Store({
    state: {
			userMsg:{},
			flag:false,
			weightList:null
		},
    mutations: {
			changeUserMsg(state,val){
				state.userMsg = val
			},
			addUserMsg(state,val){
				state.userMsg[val.type] = val.value
			},
			changeFlag(state){
				state.flag = !state.flag
			},
			appendWeightList(state,val){
				state.weightList = val
			},
			addWeightList(state,val){
				state.weightList = [{time:dayjs().format('YYYY-MM-DD'),weight:val,id:parseInt(state.weightList[0].id)+1},...state.weightList]
				uni.setStorage({
					key: 'writeWeight',
					data: state.weightList
				})
			}
		},
    actions: {
			
		},
		getters:{
			
		}
}) 
export default store