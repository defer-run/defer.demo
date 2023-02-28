import { defer } from '@defer/client';

import { getName } from '$lib/utils/getName';
import { DEFER_TOKEN } from '$env/static/private';

const helloWorld = () =>
	new Promise((resolve) => {
		setTimeout(() => {
			if (DEFER_TOKEN) {
				console.log('Defer.');
			}
			console.log(`Hello ${getName()}!`);
			if (import.meta.vitest) {
				console.log('in testing');
			}
			resolve('done');
		}, 5000);
	});

export default defer(helloWorld);
