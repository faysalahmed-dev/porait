import { PluginOptions, POSITION } from 'vue-toastification';

export const toastOpt: PluginOptions = {
	position: POSITION.TOP_RIGHT,
	timeout: 3000,
	bodyClassName: ['font-body', 'capitalize', 'font-bold'],
	closeButtonClassName: ['opacity-100', 'text-white']
};

export const progressBarOpt = {
	color: 'rgb(134, 239, 172)',
	failedColor: '#874b4b',
	thickness: '3px',
	transition: {
		speed: '0.25s'
	},
	autoRevert: true,
	location: 'top',
	inverse: false
};
