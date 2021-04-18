const fs = require('fs');
const { join, resolve, extname } = require('path');
const copyfiles = require('copyfiles');

const pathList = [];

function readServer(path) {
	const dirs = fs.readdirSync(path, { withFileTypes: true });
	dirs.forEach(dir => {
		const dirPath = join(path, dir.name);
		// console.log(dirPath);
		if (dir.isDirectory()) {
			readServer(dirPath);
		} else {
			if (!extname(dir.name).includes('.ts' || '.js')) {
				pathList.push(dirPath);
			}
		}
	});
}

readServer('./server');
pathList.push(join(__dirname, 'dist'));
copyfiles(
	pathList,
	{
		up: 1
	},
	err => {
		if (err) console.log(err);
		else console.log('successfuly copied');
	}
);
