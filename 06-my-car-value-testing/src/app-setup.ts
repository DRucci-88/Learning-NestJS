import { INestApplication, ValidationPipe } from '@nestjs/common';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const cookieSession = require('cookie-session'); // Compability Issue

export const appSetup = (app: INestApplication) => {
    app.use(
        cookieSession({
            keys: ['LeRucco'],
        }),
    );
    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true, // make sure that incoming request don't have extraneous properties within the body that we are not expecting
        }),
    );
};
