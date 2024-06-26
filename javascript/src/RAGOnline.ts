import {AlibabaTongyiEmbeddings} from "@langchain/community/embeddings/alibaba_tongyi";
import {Pinecone} from "@pinecone-database/pinecone";
import {PineconeStore} from "@langchain/pinecone";
import {waitForKeyInput} from "./utils";


;(async function () {
    const indexName = 'share-langchain-rag'
    await waitForKeyInput()
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
    const res = await retriever.invoke('根据我国著作权保护法，软件保护期是多久')
    console.log(res)
})()