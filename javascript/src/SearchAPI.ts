import {SearchApi} from "@langchain/community/tools/searchapi";
import {waitForKeyInput} from "./utils";
import * as process from "node:process";

;(async function () {
    await waitForKeyInput('SEARCHAPI_API_KEY', '请输入你的searchapi key: ')
    const searchAPI = new SearchApi(process.env.SEARCHAPI_API_KEY);
    const res = await searchAPI.invoke('下周成都天气如何')
    console.log(res);
})()