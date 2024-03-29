import fs from 'fs';

export async function Home() {
    return new Promise((resolve, reject) => {
        fs.readFile('./src/templates/index.html', 'utf8', (err, data) => {
            if (err) {
                console.error('Error reading HTML file:', err);
                reject(err); // Reject the promise with the error
            } else {
                console.log(data);
                resolve(data); // Resolve the promise with the file content
            }
        });
    });
}
