import { Application } from 'express-serve-static-core';
import { config } from '../config'

export const runner = (app: Application): void => {
    app.listen(config.port, () => {
        console.log(`Server running on port ${config.port}`);
    })
}