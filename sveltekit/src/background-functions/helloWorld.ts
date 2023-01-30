import { defer } from '@defer.run/client';

import { getName } from '$lib/utils/getName';

const helloWorld = () =>
	new Promise((resolve) => {
		setTimeout(() => {
			console.log(`Hello ${getName()}!`);
			if (import.meta.vitest) {
				console.log('in testing');
			}
			resolve('done');
		}, 5000);
	});

export default defer(helloWorld);
