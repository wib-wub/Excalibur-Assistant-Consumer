const queueUrl = 'amqp://yigshbya:gllLerGdvCYeCMga46ChHCzE_qdjAKaM@mosquito.rmq.cloudamqp.com/yigshbya';
const apiUrl = process.env.NODE_ENV === 'production' ? 'https://excalibur-api.herokuapp.com': 'http://localhost:3003';

module.exports = {
    apiUrl,
    queueUrl,
}
