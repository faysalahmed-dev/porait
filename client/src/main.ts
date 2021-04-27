import { createApp, h } from 'vue';
import { provideClient } from '@urql/vue';
import Toast from 'vue-toastification';
// @ts-ignore
import VueProgressBar from '@aacassandra/vue3-progressbar';
import App from './App.vue';
import Router from './router';
import Layout from './components/layout.vue';
import { client } from './client';
import { progressBarOpt, toastOpt } from './utils/appOptions';

import 'vue-toastification/dist/index.css';
import 'eva-icons/style/eva-icons.css';
import './assets/style.css';
import 'loaders.css/loaders.css';
import 'vue-advanced-cropper/dist/style.css';

const app = createApp({
	setup() {
		provideClient(client);
	},
	render: () => h(App)
});
app.component('default-layout', Layout);
app.use(Toast, toastOpt);
app.use(VueProgressBar, progressBarOpt);
app.use(Router);

app.mount('#app');
