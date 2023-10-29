import config from './config';
import express from 'express';
import * as path from 'path';
import * as socketio from "socket.io";
import socketAuth from './middleware/socketAuth';
var Global: any = require('./global');

async function startServer() {
	const app = express();

	/**
	 * A little hack here
	 * Import/Export can only be used in 'top-level code'
	 * Well, at least in node 10 without babel and at the time of writing
	 * So we are using good old require.
	 **/
	await require('./loaders').default({ expressApp: app });
	app.use(express.static(path.join(__dirname, 'public')));


	let server = app.listen(config.port, config.api_url, (err?: any) => {
		if (err) {
			console.info(err);
			process.exit(1);
			return;
		}
		console.info(`
      ################################################
      🛡️  Server listening on port: ${config.port}   🛡️
      ################################################
    `);
	});

	const io = new socketio.Server(server, {
		cors: { origin: "*" }
	});
	io.use(socketAuth);
	Global.io = io;
	require('./services/socket/room');


}

startServer();

