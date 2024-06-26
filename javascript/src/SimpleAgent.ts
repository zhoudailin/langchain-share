import {waitForKeyInput} from "./utils";
import {SearchApi} from "@langchain/community/tools/searchapi";
import process from "node:process";
import {AgentExecutor, createReactAgent} from "langchain/agents";
import Qwen from "../libs/llm/Qwen";
import * as hub from 'langchain/hub'

    ;

(async function () {
    await waitForKeyInput('SEARCHAPI_API_KEY', '请输入你的searchapi key: ')
    const searchAPI = new SearchApi(process.env.SEARCHAPI_API_KEY);
    const agent = await createReactAgent({
        llm: Qwen,
        tools: [searchAPI],
        prompt: await hub.pull('captain/react'),
    });
    const agentExecutor = new AgentExecutor({
        agent: agent,
        tools: [searchAPI]
    })
    const res = await agentExecutor.invoke({input: '根据成都下周天气推荐一个旅游的攻略'})
    console.log(res)
})()