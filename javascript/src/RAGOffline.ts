import {PuppeteerWebBaseLoader} from "@langchain/community/document_loaders/web/puppeteer";
import {RecursiveCharacterTextSplitter} from "@langchain/textsplitters";
import {AlibabaTongyiEmbeddings} from "@langchain/community/embeddings/alibaba_tongyi";
import {PineconeStore} from "@langchain/pinecone";
import {Pinecone} from "@pinecone-database/pinecone";
import {waitForKeyInput} from "./utils";

const indexName = 'share-langchain-rag'

;(async function () {
    // 读取pinecone的key到环境变量，需要自己去申请pinecone的key
    await waitForKeyInput()
    // document loader
    const loader = new PuppeteerWebBaseLoader("https://www.gov.cn/flfg/2013-02/08/content_2332395.htm", {
        evaluate: async (page, browser) => {
            // @ts-ignore
            return await page.$eval('.p1', el => el.innerText)
        }
    });
    const docs = await loader.load();

    const textSplitter = new RecursiveCharacterTextSplitter({
        chunkSize: 1000,
        chunkOverlap: 100
    })

    const splittedDocs = await textSplitter.splitDocuments(docs)

    const embeddings = new AlibabaTongyiEmbeddings({
        apiKey: 'sk-90cba3edc3e1412b84547915475dca30',
        modelName: 'text-embedding-v2'
    })
    const pinecone = new Pinecone()
    const pineconeIndex = pinecone.Index(indexName)
    const vectorStore = await PineconeStore.fromDocuments(splittedDocs, embeddings, {
        pineconeIndex
    })
    const res = await vectorStore.similaritySearch('根据我国著作权保护法，软件保护期是多久', 10)
    console.log(res)
})()