import {ChatPromptTemplate, HumanMessagePromptTemplate, SystemMessagePromptTemplate} from "@langchain/core/prompts";
import {RunnableSequence} from "@langchain/core/runnables";
import qwen from "../libs/llm/Qwen";
import {JsonOutputParser} from "@langchain/core/output_parsers";
import {OutputFixingParser} from 'langchain/output_parsers'

type User = {
    name: string
    age: number
    sex: 'male' | 'female'
}

;(async function () {
    const chatTemplate = ChatPromptTemplate.fromMessages([
        SystemMessagePromptTemplate.fromTemplate('我叫zhoudailin，18岁，性别男'),
        HumanMessagePromptTemplate.fromTemplate(`
        我是谁
        {formatInstruction}
        `)
    ])
    const jsonParser = new JsonOutputParser<User>()
    const autoFixingParser = OutputFixingParser.fromLLM(qwen, jsonParser)
    const chain = RunnableSequence.from([
        chatTemplate,
        qwen,
        autoFixingParser
    ]);
    const ans = await chain.invoke({
        'formatInstruction': autoFixingParser.getFormatInstructions()
    })
    console.log(ans)
})()
