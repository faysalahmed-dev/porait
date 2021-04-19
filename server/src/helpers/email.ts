import nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';
import path from 'path';
import pug from 'pug';
import crypto from 'crypto';

interface EmailInfo {
	from: string;
	to: string;
	subject: string;
	template: {
		name: string;
		data?: any;
	};
}

export const genEmailToken = (size = 90) => {
	return crypto.createHash('sha512').update(crypto.randomBytes(32).toString('hex')).digest('hex');
};

class Email {
	private transporter: Mail;
	constructor() {
		this.transporter = this.init();
	}
	private init() {
		return nodemailer.createTransport({
			// @ts-ignore
			host: process.env.MAIL_HOST,
			port: process.env.MAIL_PORT,
			auth: {
				user: process.env.MAIL_USER!,
				pass: process.env.MAIL_PASS!
			}
		});
	}
	sendMail({ from, to, subject, template }: EmailInfo) {
		return this.transporter.sendMail({
			from,
			to,
			subject,
			html: pug.renderFile(
				path.join(__dirname, '..', 'templates', template.name),
				template.data
			)
		});
	}
}

export default new Email();
