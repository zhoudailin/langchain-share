import {AlibabaTongyiEmbeddings} from '@langchain/community/embeddings/alibaba_tongyi'


;(async function () {
    const embeddings = new AlibabaTongyiEmbeddings({
        apiKey: 'sk-90cba3edc3e1412b84547915475dca30',
        modelName: 'text-embedding-v2'
    })
    const vector = await embeddings.embedQuery('William曾经做过两年python工程师。他后来又干了七年前端工程师。现在他学起了java。')
    console.log(vector, vector.length)
})()