import { createApp, h } from 'vue';
import { provideClient } from '@urql/vue';
import App from './App.vue';
import Router from './router/index';
import Layout from './components/layout.vue';
import { client } from './client';
import Toast, { PluginOptions, POSITION } from 'vue-toastification';

import 'vue-toastification/dist/index.css';
import 'eva-icons/style/eva-icons.css';
import './assets/style.css';
import 'loaders.css/loaders.css';

const app = createApp({
	setup() {
		provideClient(client);
	},
	render: () => h(App)
});
app.component('default-layout', Layout);
const options: PluginOptions = {
	position: POSITION.TOP_RIGHT,
	timeout: 3000,
	bodyClassName: ['font-body', 'capitalize', 'font-bold'],
	closeButtonClassName: ['opacity-100', 'text-white']
};
app.use(Toast, options);
app.use(Router);
app.mount('#app');
