import { getCurrentInstance } from 'vue';

export default () => {
	const progress = getCurrentInstance()?.appContext.app.config.globalProperties
		.$Progress;
	return progress;
};
