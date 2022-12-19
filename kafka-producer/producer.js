import { Kafka } from "kafkajs"
import { randomUUID } from "node:crypto"

async function bootstrap() {
  const kafka = new Kafka({
    brokers: ['promoted-caiman-12187-us1-kafka.upstash.io:9092'],
    sasl: {
      mechanism: 'scram-sha-256',
      username: 'cHJvbW90ZWQtY2FpbWFuLTEyMTg3JJKqKnopcAFy-GGr_szPxkY3LpdQEYiRZTQ',
      password: 'jXA2t-bBSehTdj0YRHyn7z1rskKunq1j8fgQtnrSkMRd60g43KLEKsdT2LZgsw4fqock8A==',
    },
    ssl: true,
  })

  const producer = kafka.producer();

  await producer.connect();
  await producer.send({
    topic: "notifications.send-notification",
    messages: [
      {
        value: JSON.stringify({
          content: "Nova solicitacao de amizade !",
          category: "social",
          recipientId: randomUUID(),
        })
      }
    ]
  })

  await producer.disconnect();
}

bootstrap();