import { open } from 'lmdb';
import { MediaData } from '../interfaces/mvtv';

async function openMyDB() {
    try {
        const mydb = await open({
            path: 'mydb',
            compression: true
        });
        console.log('Database opened successfully');
        return mydb;
    } catch (error) {
        console.error('Error opening database:', error);
        throw error; // Re-throw the error for handling elsewhere
    }
}

export async function getData(key: string) {
    console.log('getting data for key' + key)
    const mydb = await openMyDB(); // Await the database opening
    let data: MediaData | undefined = await mydb.get(key); // Await the get method
    return data;
}

export async function putData(key: string, value: string|MediaData|undefined) {
    console.log('writing data for key ' + key )
    const mydb = await openMyDB(); // Await the database opening
    await mydb.put(key, value); // Await the put method
}

// Example usage:
// async function exampleUsage() {
//     const key = 'exampleKey';
//     await putData(key, 'exampleValue');
//     const data = await getData(key);
//     console.log('Retrieved data:', data);
// }

// exampleUsage();
