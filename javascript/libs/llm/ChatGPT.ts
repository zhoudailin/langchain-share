import {ChatOpenAI} from "@langchain/openai";
import {createInterface} from 'readline'
import {HttpsProxyAgent} from 'https-proxy-agent'

if (!process.env.OPENAI_API_KEY) {
    const readline = createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    readline.question('请输入你的openai key: ', key => {
        process.env.OPENAI_API_KEY = key;
        readline.close();
    })

}
const llm = new ChatOpenAI({
    temperature: 0.8,
    apiKey: process.env.OPENAI_API_KEY,
    configuration: {
        httpAgent: new HttpsProxyAgent('http://localhost:7890'),
    }
});
export default llm