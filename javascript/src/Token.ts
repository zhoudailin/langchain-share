import {Ollama} from '@langchain/community/llms/ollama'

(async function () {
    const ollama = new Ollama({
        baseUrl: "http://localhost:11434",
        model: "qwen:14b",
    });
    // @ts-ignore
    for await (const chunk of await ollama.stream('hello')) {
        process.stdout.write(chunk + "|")
    }
})()