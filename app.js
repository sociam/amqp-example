var amqp = require('amqp');
var config = require('./config');

var connection = amqp.createConnection(config.connection, {defaultExchangeName: config.exchange});

connection.on('error', function (e) {
    console.log("error:", e);
});

connection.on('ready', function () {
        connection.queue('livementions', function (q) {
            q.bind(config.exchange, '');
            q.subscribe(function (message, headers, deliveryInfo, messageObject) {
                var json = JSON.parse(message.data.toString());
                console.log(json);
            });
        });
});

