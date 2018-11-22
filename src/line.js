const config = require('./config');
const amqlib = require('amqplib');
const axios = require('axios');
const facebookUrl = `${config.apiUrl}/facebook/api/messenger/receive/`;
const lineUrl = `${config.apiUrl}/line/api/messenger/receive/`;
const queueUrl = config.queueUrl;

console.log(`start consumer on destination ${lineUrl}`);
const consumer = amqlib.connect(queueUrl);

consumer.then(conn => {
  return conn.createChannel().then(ch => {
    ch.assertQueue('line');
    ch.consume('line', message => {
      if(message !== null){
        console.log(`Get Message from Line`);
        const content = JSON.parse(message.content);
        axios.post(lineUrl, { data: content }).then(response => {
          if(response.status === 200){
            ch.ack(message);
            console.log('send messsage sucessful');
          } else {
            console.log('send messsage fail and send it to dead queue');
            ch.sendToQueue('line_dead', Buffer.from(JSON.stringify(content)));
            ch.ack(message);
          }
        }).catch(err => {
          console.log('send messsage fail and send it to dead queue');
          ch.sendToQueue('line_dead', Buffer.from(JSON.stringify(content)));
          ch.ack(message);
        })
      }
    });
  })
})
