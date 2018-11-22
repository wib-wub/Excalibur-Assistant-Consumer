const amqplib = require('amqplib');
const axios = require('axios');
const config = require('../config');

const urlrmq = config.queueUrl;

class rabitmq {
  constructor () {
    this.amqplib = amqplib.connect(urlrmq)
  }

  publisher(content, queueName) {
    return new Promise((resolve, reject) => {
      this.amqplib.then( conn => {
        return conn.createChannel().then(worker => {
          worker.assertQueue(queueName);
          worker.sendToQueue(queueName, Buffer.from(JSON.stringify(content)));
        });
      }).then(() => {
        resolve();
      }).catch(error => {
        reject(error);
      });
    });
  }


}

module.exports =  new rabitmq();
