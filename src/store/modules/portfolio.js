// import stocks from '../../data/stocks'

const state = {
	login: {
		username: "",
	},
	stocks: []
}

const mutations = {
	'SET_LOGIN' (state, login) {
		state.login = login}
	}

}

const actions = {
	sellStock({commit}, order){
		commit('SELL_STOCK', order)
	}
}

const getters = {
	stockPortfolio (state, getters){
		return state.stocks.map(stock => {
			const record = getters.stocks.find(element => element.id ==stock.id)  //this getter is from store>modules>stocks.js
			return {
				id: stock.id,
				quantity: stock.quantity,
				name: record.name,
				price: record.price
			}
		})
	},
	funds(state) {
		return state.funds
	}
}

export default {
	state,
	mutations,
	actions,
	getters

}