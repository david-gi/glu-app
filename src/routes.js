import Home from './components/Home.vue'
import Portfolio from './components/portfolio/Portfolio.vue'
import Stocks from './components/stocks/Stocks.vue'

export const routes = [
	{ path: 'https://suzon007.github.io/stockTrader/', component: Home},
	{ path: 'https://suzon007.github.io/stockTrader/portfolio', component: Portfolio},
	{ path: 'https://suzon007.github.io/stockTrader/stocks', component: Stocks}
]
