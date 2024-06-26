import {PuppeteerWebBaseLoader} from "@langchain/community/document_loaders/web/puppeteer";

;(async function () {
    const loader = new PuppeteerWebBaseLoader("https://www.gov.cn/flfg/2013-02/08/content_2332395.htm", {
        evaluate: async (page, browser) => {
            // @ts-ignore
            return await page.$eval('.p1', el => el.innerText)
        }
    });
    const docs = await loader.load();
    console.log(docs);
})()