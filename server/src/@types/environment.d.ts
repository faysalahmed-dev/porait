declare namespace NodeJS {
	interface ProcessEnv {
		NODE_ENV: 'development' | 'production';
		PORT: string;
		JWT: string;
		MAIL_USER: string;
		MAIL_PASS: string;
		MAIL_HOST: string;
		MAIL_PORT: string;
	}
}
