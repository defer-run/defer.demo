import {defer} from '@defer/client';

async function helloWorldCron() {
  return new Promise(resolve => {
    setTimeout(() => {
      console.log('hello world');
      resolve('done');
    }, 5000);
  });
}

export default defer.cron(helloWorldCron, '@monthly');
