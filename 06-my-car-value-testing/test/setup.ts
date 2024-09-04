import { rm } from 'fs/promises';
import { join } from 'path';

/**
 * Take a look at jest-e2e.json
 * "setupFilesAfterEnv": ["<rootDir>/setup.ts"]
 *
 * It indicates that before every test, jest will execute this script (setup.ts)
 * <rootDir> = test folder
 *
 * So this script purpose is delete test.sqlite file for each e2e test
 * and that file will create automatically from TypeOrmModule inside app.module.ts
 */
global.afterEach(async () => {
    // __dirname = test folder, because it run in this script
    try {
        console.log(__dirname);
        console.log(join(__dirname, '..', 'test.sqlite'));
        console.log('setup remove before test.sqlite');

        // It this code below run and test.sqlite file is not exists, it will throw an error. So try catch and do nothing
        await rm(join(__dirname, '..', 'test.sqlite'));
        console.log('setup remove after test.sqlite');
    } catch (error) {
        console.log('setup failed');
    }
});
