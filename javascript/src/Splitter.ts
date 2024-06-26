import {RecursiveCharacterTextSplitter} from "@langchain/textsplitters";

;(async function () {
    const splitter = new RecursiveCharacterTextSplitter({
        chunkSize: 40,
        chunkOverlap: 14,
        separators: ['。']
    });
    const fragments = await splitter.splitText('William曾经做过两年python工程师。他后来又干了七年前端工程师。现在他学起了java。');
    console.log(fragments)
})()