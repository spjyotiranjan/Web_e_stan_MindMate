require("dotenv").config();
const { ChatOpenAI } = require("@langchain/openai");
const { StringOutputParser } = require("@langchain/core/output_parsers");
const { ChatPromptTemplate } = require("@langchain/core/prompts");

const getTherapySessionSummary = async (chatHistory) => {
  const model = new ChatOpenAI({
    modelName: "gpt-4o",
    temperature: 0.7,
  });

  const prompt = ChatPromptTemplate.fromMessages([
    [
      "system",
      "Below is the chat history of a therapy session, there the role user is me, and role assistant is the therapist(you). Analyze whole chat and give the summary of the same in a way in which you are telling to me.",
    ],
    ["human", "{chatHistory}"],
  ]);

  const chain = prompt.pipe(model).pipe(new StringOutputParser());

  const res = await chain.invoke({
    chatHistory: JSON.stringify(chatHistory),
  });

  console.log(res);
  return res;
};

module.exports = { getTherapySessionSummary };
