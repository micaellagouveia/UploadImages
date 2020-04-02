const amqp = require('amqplib/callback_api')

module.exports = {

    emitPost: (post) => {

        amqp.connect('amqp://localhost', function (err, connection) {
            if (err) throw err

            connection.createChannel(function (err1, channel) {
                if (err1) throw err1

                const exchange = 'Posts'

                const name = post.name

                channel.assertExchange(exchange, 'fanout', { durable: true })
                channel.publish(exchange, " ", Buffer.from(name));
                console.log(' [x] Sent name: %s', name)

            })

            setTimeout(function () {
                connection.close()
                process.exit(0)
            }, 5000)

        })
    },

    receivePost: () => {
        amqp.connect('amqp://localhost', function (err, connection) {
            if (err) throw err
            connection.createChannel(function (err1, channel) {
                if (err1) throw err1

                const exchange = 'Posts'

                channel.assertExchange(exchange, 'fanout', { durable: true })

                channel.assertQueue('', { exclusive: true }, function (err2, q) {
                    if (err2) throw err2

                    console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", q.queue)

                    channel.bindQueue(q.queue, exchange, '')

                    channel.consume(q.queue, function (msg) {
                        if (msg.content) {
                            console.log(' [x] Received: %s', msg.content.toString())
                        }
                    }, {
                        noAck: true
                    })
                })
            })
        })
    }
}
