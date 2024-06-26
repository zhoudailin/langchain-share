import {waitForKeyInput} from "./utils";
import {ChatPromptTemplate} from "@langchain/core/prompts";
import {AlibabaTongyiEmbeddings} from "@langchain/community/embeddings/alibaba_tongyi";
import {Pinecone} from "@pinecone-database/pinecone";
import {PineconeStore} from "@langchain/pinecone";
import {RunnablePassthrough, RunnableSequence} from "@langchain/core/runnables";
import Qwen from "../libs/llm/Qwen";
import {StringOutputParser} from "@langchain/core/output_parsers";


;(async function () {
    const indexName = 'share-langchain-rag'
    await waitForKeyInput()
    const template = `
    你是一个用于问答任务的助手。
    使用以下检索到的内容来回答问题。
    如果你不知道答案，就说你不知道。
    保持答案的简洁
    问题: 
    -------
    {question}
    ------- 
    上下文: 
    -------
    {context} 
    -------
    回答:
    `
    const prompt = ChatPromptTemplate.fromTemplate(template)
    const embeddings = new AlibabaTongyiEmbeddings({
        apiKey: 'sk-90cba3edc3e1412b84547915475dca30',
        modelName: 'text-embedding-v2'
    })
    const pinecone = new Pinecone()
    const pineconeIndex = pinecone.Index(indexName)
    const vectorStore = await PineconeStore.fromExistingIndex(embeddings, {
        pineconeIndex
    })
    const retriever = vectorStore.asRetriever({searchType: 'similarity', k: 3})
    const ragChain = RunnableSequence.from([
        {"context": retriever, "question": new RunnablePassthrough()},
        prompt,
        Qwen,
        new StringOutputParser()
    ])
    const res = await ragChain.invoke('根据我国著作权保护法，软件保护期是多久')
    console.log(res)
})()