const config = require('./config');
const amqlib = require('amqplib');
const axios = require('axios');
const facebookUrl = `${config.apiUrl}/facebook/api/messenger/receive/`;
const lineUrl = `${config.apiUrl}/line/api/messenger/receive/`;
const queueUrl = config.queueUrl;

console.log(`start consumer on destination ${facebookUrl}`);
const consumer = amqlib.connect(queueUrl);

consumer.then(conn => {
  return conn.createChannel().then(ch => {
    ch.assertQueue('facebook');
    ch.consume('facebook', message => {
      if(message !== null){
        console.log(`Get Message from facebook`);
        const content = JSON.parse(message.content);
        axios.post(facebookUrl, { data: content }).then(response => {
          if(response.status === 200){
            ch.ack(message);
            console.log('send messsage sucessful');
          } else {
            console.log('send messsage fail and send it to dead queue');
            ch.sendToQueue('facebook_dead', Buffer.from(JSON.stringify(content)));
            ch.ack(message);
          }
        }).catch(err => {
          console.log('send messsage fail and send it to dead queue');
          ch.sendToQueue('facebook_dead', Buffer.from(JSON.stringify(content)));
          ch.ack(message);
        })
      }
    });
  })
})
