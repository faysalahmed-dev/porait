export function getMimeType(file: ArrayBuffer, fallback = null) {
	const byteArray = new Uint8Array(file).subarray(0, 4);
	let header = '';
	// eslint-disable-next-line no-plusplus
	for (let i = 0; i < byteArray.length; i++) {
		header += byteArray[i].toString(16);
	}
	switch (header) {
		case '89504e47':
			return 'image/png';
		case '47494638':
			return 'image/gif';
		case 'ffd8ffe0':
		case 'ffd8ffe1':
		case 'ffd8ffe2':
		case 'ffd8ffe3':
		case 'ffd8ffe8':
			return 'image/jpeg';
		default:
			return fallback;
	}
}
