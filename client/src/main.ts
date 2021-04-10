import { createApp, provide, h } from 'vue';
import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client/core';
import App from './App.vue';
import { ApolloClients } from '@vue/apollo-composable';
import './assets/style.css';
import 'eva-icons/style/eva-icons.css';
import Layout from './components/layout.vue';
import 'loaders.css/loaders.css';

// HTTP connection to the API
const httpLink = createHttpLink({
	// You should use an absolute URL here
	uri: 'http://localhost:8000/graphql'
});

// Create the apollo client
const apolloClient = new ApolloClient({
	link: httpLink,
	cache: new InMemoryCache()
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

app.mount('#app');
