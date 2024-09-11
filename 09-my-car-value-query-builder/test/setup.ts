import { unlinkSync, existsSync, renameSync } from 'fs';
// import { rm } from 'fs/promises';
import { join } from 'path';
import { checkSync, unlockSync } from 'proper-lockfile';

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

global.beforeEach(async () => {
    const fileDir = join(__dirname, '..', 'test.sqlite');
    // const fileDirTemp = join(__dirname, '..', 'testtemp.sqlite');

    try {
        // if (existsSync(fileDir)) renameSync(fileDir, fileDirTemp); // It's not going to affect the current open handles
        // if (existsSync(fileDirTemp)) unlinkSync(fileDirTemp);
        // if (existsSync(fileDir)) unlinkSync(fileDir);
        // await new Promise((resolve) => setTimeout(resolve, 3000));
        // await rm(fileDir);

        const isLocked: boolean = checkSync(fileDir);
        if (isLocked) unlockSync(fileDir);
        unlockSync(fileDir);
        unlinkSync(fileDir);

        console.log('setup success', fileDir);
    } catch (err) {
        console.log(err);
        console.log('setup failed', fileDir);
    }
});

// global.afterEach(async () => {
//     // try {
//     await new Promise((resolve) => setTimeout(resolve, 500));
//     await rm(join(__dirname, '..', 'test.sqlite'));
//     console.log('setup success');
//     // } catch (err) {
//     //     console.log('setup failed');
//     // }
// });

// global.beforeEach(async () => {
//     // __dirname = test folder, because it run in this script
//     try {
//         // console.log(__dirname);
//         // console.log(join(__dirname, '..', 'test.sqlite'));
//         // console.log('setup remove before test.sqlite');

//         // It this code below run and test.sqlite file is not exists, it will throw an error. So try catch and do nothing
//         await rm(join(__dirname, '..', 'test.sqlite'));
//         console.log('setup success');
//     } catch (error) {
//         console.log('setup failed');
//     }
// });

// global.afterEach(async () => {
//     // __dirname = test folder, because it run in this script
//     try {
//         // console.log(__dirname);
//         // console.log(join(__dirname, '..', 'test.sqlite'));
//         // console.log('setup remove before test.sqlite');

//         // It this code below run and test.sqlite file is not exists, it will throw an error. So try catch and do nothing
//         await rm(join(__dirname, '..', 'test.sqlite'));
//         console.log('setup success');
//     } catch (error) {
//         console.log('setup failed');
//     }
// });
