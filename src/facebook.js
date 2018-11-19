const config = require('./config');
const rabbitmq = require('./utils/rabitmq');

const facebookUrl = `${config.apiUrl}/facebook/api/messenger/receive/`;
const lineUrl = `${config.apiUrl}/line/api/messenger/receive/`;

( function () {
  console.log(`start excalibur consumer on destination ${config.apiUrl}`);
    setInterval(async ()=> {
      try {
        await rabbitmq.consumer('facebook', facebookUrl);
      } catch(error) {
        console.log(error);
      }
      
    }, 1500)
  
}());

