import fs from 'fs';
export default async function tearDown() {


    if (fs.existsSync('auth/storageState.json')) {
        fs.unlinkSync('auth/storageState.json');
        console.log('cleaned up auth info')
    }




}