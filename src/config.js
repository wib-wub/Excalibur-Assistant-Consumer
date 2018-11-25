const queueUrl = process.env.queueUrl || 'amqp://yigshbya:gllLerGdvCYeCMga46ChHCzE_qdjAKaM@mosquito.rmq.cloudamqp.com/yigshbya';
let apiUrl = process.env.NODE_ENV === 'production' ? 'https://excalibur-api.herokuapp.com': 'http://localhost:3003';
apiUrl = process.env.apiUrl || apiUrl;
module.exports = {
    apiUrl,
    queueUrl,
}
