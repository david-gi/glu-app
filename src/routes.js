import Home from './components/Home.vue'
import About from './components/About.vue'
import Learn from './components/Learn.vue'
import Privacy from './components/Privacy.vue'

export const routes = [
	{ path: '/', component: Home},
	{ path: '/about', component: About},
	{ path: '/learn', component: Learn},
	{ path: '/privacy', component: Privacy}
]
