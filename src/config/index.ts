import 'dotenv/config'
import { env } from 'process'

interface IConfig {
    port: number;
    jwt: {
        secret: string;
        expiration: string
    }
}

export const config: IConfig = {
    port: Number(env.PORT),
    jwt: {
        secret: env.JWT_SECRET as string,
        expiration: env.JWT_EXPIRATION as string,
    },
}