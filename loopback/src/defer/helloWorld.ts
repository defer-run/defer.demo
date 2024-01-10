import {defer} from '@defer/client';

async function helloWorld() {
  return new Promise(resolve => {
    setTimeout(() => {
      console.log('hello world');
      resolve('done');
    }, 5000);
  });
}

export default defer(helloWorld);
