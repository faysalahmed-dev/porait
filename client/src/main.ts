import { createApp, provide, h } from 'vue';
import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client/core';
import App from './App.vue';
import { ApolloClients } from '@vue/apollo-composable';
import Router from './router/index';
import Layout from './components/layout.vue';
import Toast, { PluginOptions, POSITION } from 'vue-toastification';

import 'vue-toastification/dist/index.css';
import 'eva-icons/style/eva-icons.css';
import './assets/style.css';
import 'loaders.css/loaders.css';

// HTTP connection to the API
const httpLink = createHttpLink({
	// You should use an absolute URL here
	uri: 'http://localhost:8000/graphql'
});

// Create the apollo client
const apolloClient = new ApolloClient({
	link: httpLink,
	cache: new InMemoryCache(),
	connectToDevTools: true
});

const app = createApp({
	setup() {
		provide(ApolloClients, {
			default: apolloClient
		});
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
