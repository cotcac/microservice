var express = require('express');
var router = express.Router();
const amqp = require('amqplib');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({
    id:1,
    name:'Hello world',
    userId:1,
    content:'this is my first post so it not going to be good. It a shit one actually!'
  })
});

console.log('call me!');
const q = 'posts';
amqp.connect('amqp://localhost').then(conn =>conn.createChannel())
.then(ch => ch.assertQueue(q).then(()=> ch.consume(q,(msg)=>{
  if(msg !== null) {
    console.log(`Got message ${msg.content.toString()}`);
    const qm = JSON.parse(msg.content.toString());
    console.log(qm);
    console.log('Connect to database and insert new data');
    //now remove it
    ch.ack(msg)
  }
}))).catch(err=>{
  console.log(err);
})


module.exports = router;
