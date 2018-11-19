const fastify = require('fastify')();

fastify.get('/', (req, res) => {
  res.send('status ok');
})

fastify.listen(process.env.PORT || 3000,()=> {
  console.log('start dumbmy web process on', process.env.PORT);
});
