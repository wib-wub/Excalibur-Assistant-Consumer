const config = require('./config');
const rabbitmq = require('./utils/rabitmq');

const url = `${config.apiUrl}/facebook/api/messenger/receive/`;

(async function () {
  console.log(`start excalibur consumer on destination ${url}`);
  try {
    await rabbitmq.consumer('ch1', url)
  } catch(error) {
    console.error(error);
  }
}());

