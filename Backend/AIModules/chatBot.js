const { ChatPromptTemplate } = require("@langchain/core/prompts");
const { ChatOpenAI } = require("@langchain/openai");
const { z } = require("zod");
const dotenv = require("dotenv");
const { StringOutputParser } = require("@langchain/core/output_parsers");
dotenv.config();


const doChat = async (input, context, chatHistory) => {
  try {
    const openaiModel = new ChatOpenAI({
      modelName: "gpt-4o",
      temperature: 0.7,
    });

    const prompt = ChatPromptTemplate.fromTemplate(
        `You are given context, analyze it and based on the given input, give a consize response in 20 words.

        Context:
        {context}

        Input:
        {input}
      `
      );
      const chain = prompt
      .pipe(openaiModel)
      .pipe(new StringOutputParser());

      const res = await chain.invoke({
        input,
        context
      });

      const response = {
        text: res,
        chatHistory: [...chatHistory,
            {role: "user",content: input},
            {role: "assistant",content: res}
        ]
    }
    return response
  } catch (error) {
    console.log(error);
    return error
  }
};

module.exports = {doChat}
