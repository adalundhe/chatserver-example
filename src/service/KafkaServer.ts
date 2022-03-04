import { Admin, Consumer, Kafka, Producer } from 'kafkajs';
import { Message } from '../types/chat';


export class KafkaServer {
    private kafka: Kafka;
    private brokers: string[]
    private clientId: string;
    private consumer: Consumer;
    private producer: Producer;
    private admin: Admin;
    private group: string;

    constructor({ brokers, clientId, group }: {brokers?: string[], clientId?: string, group?: string}){
        this.brokers = brokers ? brokers : process.env.KAFKA_BROKERS ? process.env.KAFKA_BROKERS.split(',') : ['localhost:9092']
        this.clientId = clientId ? clientId : process.env.KAFKA_CLIENT_ID ? process.env.KAFKA_CLIENT_ID : "CHAT_MESSAGES_SERVER";
        this.group = group ? group : process.env.KAFKA_CONSUMER_GROUP ? process.env.KAFKA_CONSUMER_GROUP : "chatserver-messages";

        this.kafka = new Kafka({
            clientId: this.clientId,
            brokers: this.brokers
        });

        this.consumer = this.kafka.consumer({
            groupId: this.group
        });

        this.producer = this.kafka.producer()
        this.admin = this.kafka.admin();
    }

    async connect(){
        this.admin.connect()
        this.producer.connect()
        this.consumer.connect()

        console.log("Kafka server running...")
    }

    async produce({ topic, message }: {topic: string, message: Message}) {
        await this.producer.send({
            topic: `chat_${topic}`,
            messages: [
                {value: JSON.stringify(message)}
            ]
        });
    }

    async consume() {
        await this.consumer.subscribe({
            topic: /chat_\w+$/,
            fromBeginning: true
        })

        this.consumer.run({
            eachMessage: async({ topic, partition, message }) => {
                console.log(`${topic} - ${partition} - ${message.value?.toJSON()}`)
            }
        })
    }
}