import {ChatAlibabaTongyi} from "@langchain/community/chat_models/alibaba_tongyi";

const qwen = new ChatAlibabaTongyi({
    model: 'qwen-72b-chat',
    alibabaApiKey: 'sk-90cba3edc3e1412b84547915475dca30',
});
export default qwen