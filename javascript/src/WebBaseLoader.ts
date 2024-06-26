import {PuppeteerWebBaseLoader} from "@langchain/community/document_loaders/web/puppeteer";

;(async function () {
    const loader = new PuppeteerWebBaseLoader("https://python.langchain.com/v0.2/docs/concepts/", {
        evaluate: async (page, browser) => {
            await page.waitForSelector('.docItemCol_YAwJ')
            const docs = await page.select('.docItemCol_YAwJ')
            return docs.join(',')
        }
    });
    const docs = await loader.load();
    console.log(docs);
})()