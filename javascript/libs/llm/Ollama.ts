import {ChatOllama} from '@langchain/community/chat_models/ollama'

const llm = new ChatOllama({
    baseUrl: "http://localhost:11434",
    model: "qwen:14b",
})

export default llm