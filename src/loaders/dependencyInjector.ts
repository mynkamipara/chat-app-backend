import { Container } from 'typedi';
import config from '../config/index';

export default () => {
	try {
		Container.set('config', config);
		console.debug('Added config to container');
	} catch (e) {
		console.error('Failed to load dependencies');
	}
};
