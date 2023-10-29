import config from '../config';
import { ConnectionOptions, connect } from 'mongoose';

const connectDB = async () => {
	try {
		const mongo_host: string = config.MONGO_HOST;
		const options: ConnectionOptions = {
			user: config.MONGO_USER,
			pass: config.MONGO_PASSWORD,
			useNewUrlParser: true,
			useCreateIndex: true,
			useFindAndModify: false,
			useUnifiedTopology: true
		};
		await connect(mongo_host, options);
		console.info('MongoDB Connected...');
	} catch (err) {
		console.error(err.message);
		// Exit process with failure
		process.exit(1);
	}
};

export default connectDB;
