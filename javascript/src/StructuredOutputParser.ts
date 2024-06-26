import {ChatPromptTemplate, HumanMessagePromptTemplate, SystemMessagePromptTemplate} from "@langchain/core/prompts";
import {RunnableSequence} from "@langchain/core/runnables";
import qwen from "../libs/llm/Qwen";
import {StructuredOutputParser} from "langchain/output_parsers";
import {z} from "zod";

const userSchema = z.object({
    name: z.string().describe("姓名"),
    age: z.number().describe("年龄"),
    sex: z.enum(['male', 'female']),
});


;(async function () {
    const chatTemplate = ChatPromptTemplate.fromMessages([
        SystemMessagePromptTemplate.fromTemplate('我叫zhoudailin，18岁，性别男'),
        HumanMessagePromptTemplate.fromTemplate(`
        我是谁
        {formatInstruction}
        `)
    ])
    const parser = StructuredOutputParser.fromZodSchema(userSchema)
    const chain = RunnableSequence.from([
        chatTemplate,
        qwen,
        parser
    ]);
    const ans = await chain.invoke({
        'formatInstruction': parser.getFormatInstructions()
    })
    console.log(ans)
})()

