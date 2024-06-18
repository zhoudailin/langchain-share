import {Ollama} from '@langchain/community/llms/ollama'

(async function () {
    const ollama = new Ollama({
        baseUrl: "http://localhost:11434",
        model: "qwen:14b",
    });
    const ans =await ollama.invoke('介绍下你自己')
    process.stdout.write(ans)
})()