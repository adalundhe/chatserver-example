import crypto from 'crypto';


export class Crypto {
    private algorithm: string;
    private secretKey: string;
    private salt: Buffer;

    constructor(){
        this.algorithm = process.env.CHAT_ENCRYPT_ALGORITHM ?? 'aes-256-ctr';
        
        this.secretKey = crypto.createHash('sha256').update(process.env.CHAT_SECRET_KEY as string).digest('base64').substr(0, 32);
        this.salt = crypto.randomBytes(
            process.env.CHAT_ENCRYPT_BYTES ? parseInt(process.env.CHAT_ENCRYPT_BYTES) : 16
        );
    }

    encrypt = async (text: string) => {
        const cipher = await crypto.createCipheriv(this.algorithm, this.secretKey, this.salt);
        const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);

        return {
            salt: this.salt.toString('hex'),
            content: encrypted.toString('hex')
        }
    }

    decrypt = async (hash: {salt: string, content: string}) => {

        const decipher = await crypto.createDecipheriv(
            this.algorithm, 
            this.secretKey, 
            Buffer.from(hash.salt, 'hex')
        );

        const decrypted = await Buffer.concat([
            decipher.update(
                Buffer.from(hash.content, 'hex')
            ),
            decipher.final()
        ]);

        return {
            content: decrypted.toString()
        }

    }
}