import dotenv from 'dotenv';

if (!dotenv) {
	throw new Error('Unable to use dot env lib');
}
// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const envFound = dotenv.config();
if (!envFound) {
	// This error should crash whole process
	throw new Error("⚠️ Couldn't find .env file ⚠️");
}

export default {
	/**
	 * Prod or development server
	 */
	ENV: process.env.ENV,

	NAME: process.env.NAME,
	VERSION: process.env.VERSION,

	/**
	 * Your favorite port
	 */
	port: parseInt(process.env.API_PORT, 10),
	api_url: process.env.API_URL,



	/* mongodb credentials */
	MONGO_HOST: process.env.MONGO_HOST,
	MONGO_USER: process.env.MONGO_USER,
	MONGO_PASSWORD: process.env.MONGO_PASSWORD,


	aesSecreteKey:process.env.AES_SECRETE_KEY,
	jwtExpireTime:process.env.JWT_EXPIRE_TIME,
	jwtSecret:process.env.JWT_SECRET,



	/**
	 * API configs
	 */
	api: {
		prefix: process.env.COMMON_API
	},
};
