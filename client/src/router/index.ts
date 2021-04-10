import * as VueRouter from 'vue-router';
import Home from '@/pages/home.vue';

const routes: VueRouter.RouteRecordRaw[] = [
	{ path: '/', name: 'home-page', component: Home }
];

export default VueRouter.createRouter({
	history: VueRouter.createWebHistory(),
	routes,
	strict: true
});
