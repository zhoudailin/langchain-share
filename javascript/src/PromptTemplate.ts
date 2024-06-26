import {ChatPromptTemplate, HumanMessagePromptTemplate, SystemMessagePromptTemplate} from "@langchain/core/prompts";
import {RunnableSequence} from "@langchain/core/runnables";
import qwen from "../libs/llm/Qwen";
import {StringOutputParser} from "@langchain/core/output_parsers";

;(async function () {
    const chatTemplate = ChatPromptTemplate.fromMessages([
        SystemMessagePromptTemplate.fromTemplate("你是一个专业的会议问答助手, 根据会议内容对用户问题进行回答"),
        HumanMessagePromptTemplate.fromTemplate(`
        会议内容:'{content}'
        问题:{question}
        `)
    ])
    const content = `感谢大家今天参加会议。我们的主要议题是如何更好地利用语言模型来提升我们的业务效率和创新能力，希望大家积极发言，提出宝贵的建议。语言模型在客户服务方面有很大的潜力，可以使用它们来自动回复客户的常见问题，提高客服效率，减少人工成本。除了客户服务，语言模型在内容创作方面也有很大的应用前景，比如可以用它来生成营销文案、产品描述以及社交媒体内容，提升品牌影响力。语言模型还可以用于数据分析，特别是对于大量的文本数据进行分类和总结，这对于市场调研和竞争分析非常有帮助。为了成功实施这些应用，需要先选择合适的语言模型，比如GPT-4或者其他开源模型，然后需要一个专业团队来进行模型的调试和优化，确保它们能够准确理解和生成需要的内容。此外，还需要考虑数据隐私和安全问题，确保客户和公司的数据不会被泄露，同时定期评估模型的性能，及时调整和更新模型。总结一下，语言模型可以在客户服务、内容创作和数据分析等方面为我们带来很大帮助。下一步，我们将成立一个专项小组来具体研究和落实这些建议，并在下次会议上汇报进展。感谢大家的积极参与，今天的会议到此结束。如果有其他补充意见，请随时联系。`;
    const chain = RunnableSequence.from([
        chatTemplate,
        qwen,
        new StringOutputParser(),
    ]);
    const ans = await chain.invoke({content, question: '这次会议最终得出了啥结论或者共识'})
    console.log(ans)
})()