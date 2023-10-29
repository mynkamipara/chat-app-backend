import expressLoader from './express';
import connectDB from './database';
import dependencyInjector from './dependencyInjector';

export default async ({ expressApp }) => {
	// Establish a database connection for node's process
	await connectDB();

	// Load dependencies
	dependencyInjector();
	console.info('✌️ Dependency injector loaded');

	console.info('✌️ Express loaded');
	await expressLoader({ app: expressApp });
};
