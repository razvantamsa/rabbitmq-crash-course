#!/usr/bin/env node

// const amqp = require('amqplib/callback_api');

// connect to rabbitmq server
// amqp.connect('amqp://localhost', function(error0, connection) {
//     if (error0) {
//         throw error0;
//     }

//     // create a channel
//     connection.createChannel(function(error1, channel) {
//         if (error1) {
//             throw error1;
//         }

//         // To send, we must declare a queue for us to send to; then we can publish a message to the queue
//         const queue = 'hello';
//         const msg = 'Hello World!';

//         channel.assertQueue(queue, {
//             durable: false
//         });
//         channel.sendToQueue(queue, Buffer.from(msg));

//         // Declaring a queue is idempotent - it will only be created if it doesn't exist already. The message content is a byte array, so you can encode whatever you like there
//         console.log(" [x] Sent %s", msg);
//     });
//     setTimeout(function() {
//         connection.close();
//         process.exit(0);
//     }, 500);
// });

// ------------------------------------------------ without callbacks implement
const amqp = require('amqplib');

(async () => {
    try {
        const connection = await amqp.connect('amqp://localhost');
        const channel = await connection.createChannel();
    
        const queue = 'hello';
        const msg = process.argv[2] || 'Nothing was said that day...';
    
        await channel.assertQueue(queue, { durable: false });
        channel.sendToQueue(queue, Buffer.from(msg));
    
        setTimeout(function() {
            connection.close();
            process.exit(0);
        }, 500);
    } catch (error) {
        console.log(error);
    }
})()