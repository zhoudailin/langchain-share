import {createInterface} from "readline";

export const waitForKeyInput = (envName = 'PINECONE_API_KEY', query = '请输入你的pinecone key: ') => {
    return new Promise<void>((resolve, reject) => {
        if (!process.env[envName]) {
            const readline = createInterface({
                input: process.stdin,
                output: process.stdout,
            });
            readline.question(query, key => {
                process.env[envName] = key;
                readline.close();
                resolve()
            })
        } else {
            resolve()
        }
    })
}