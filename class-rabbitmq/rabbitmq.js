#!/usr/bin/env node

import * as client from 'amqplib';

export class RabbitMq {

    async init(rabbitMqPort) {
        const connString = `amqp://localhost:${rabbitMqPort}`;
        try {
            this.connection = await client.connect(connString);
            this.logger.log(`Connected to rabbitmq ${connString}`);
        } catch (error) {
            this.logger.log(`Could not connect to rabbitmq ${connString}`, error);
        }
    }

    async createChannel() {
        this.channel = await this.connection.createChannel();
        await this.channel.assertQueue(this.queueName);
        await this.channel.assertExchange(this.exchange, 'direct');
    }
    
    async sendMessage(message) {
        this.channel.publish(this.exchange, this.routingKey, Buffer.from(JSON.stringify(message), 'utf8'));
    }

    async consumeMessage(message) {
        const message = await this.channel.consume();
    }

    channel.consume(queue, function(msg) {
        console.log(" [x] Received %s", msg.content.toString());
    }, {
        noAck: true
    });
}
