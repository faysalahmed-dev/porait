import { IRequest } from './../../prisma';
import useragent from 'useragent';
import url from 'url';

function getVersion(str: string): string {
	const version = str.match(/(\d+.\d+.\d+)/g);
	return version ? version[0].split('.')[0] : '';
}

export function getUserAgent(agent: string): string {
	const agentObj = useragent.parse(agent);
	const toJson = agentObj.toJSON();
	const device = toJson.device.toString();
	const os = toJson.os.toString();
	return `${
		device.startsWith('Other')
			? ''
			: device.replace(/(\d+.\d+.\d+)/, getVersion(device))
	} ${toJson.family} ${toJson.major} ${os.replace(
		/(\d+.\d+.\d+)/,
		getVersion(os)
	)}`.trim();
}

export function getHostUrl(request: IRequest): string {
	return url.format({
		protocol: request.protocol,
		host: request.get('host')
	});
}
