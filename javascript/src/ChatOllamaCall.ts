import {ChatOllama} from '@langchain/community/chat_models/ollama'
import {HumanMessage, AIMessage, SystemMessage} from '@langchain/core/messages'

(async function () {
    const ollama = new ChatOllama({
        baseUrl: "http://localhost:11434",
        model: "qwen:14b",
    });
    const ans = await ollama.invoke([
        new SystemMessage('你好，我叫周代琳，我是你的主人，你是一个智能助手，你叫小冰'),
        new AIMessage('好的，主人'),
        new HumanMessage('我叫什么，你是谁')
    ])
    console.log(ans)
})()