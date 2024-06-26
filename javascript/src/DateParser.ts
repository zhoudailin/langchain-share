import {ChatPromptTemplate, HumanMessagePromptTemplate} from "@langchain/core/prompts";
import {RunnableSequence} from "@langchain/core/runnables";
import {DatetimeOutputParser} from 'langchain/output_parsers'

import qwen from "../libs/llm/Qwen";

;(async function () {
    const chatTemplate = ChatPromptTemplate.fromMessages([
        HumanMessagePromptTemplate.fromTemplate(`
         回答下面的问题：
         {question}
         {formatInstruction}
        `)
    ])
    const parser = new DatetimeOutputParser()
    const chain = RunnableSequence.from([
        chatTemplate,
        qwen,
        parser,
    ]);
    const ans = await chain.invoke({
        "question": "二战结束是哪一天",
        'formatInstruction': parser.getFormatInstructions()
    })
    console.log(ans)
})()