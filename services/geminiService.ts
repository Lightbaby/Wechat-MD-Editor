import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const MODELS = {
  FAST: 'gemini-2.5-flash',
  SMART: 'gemini-3-pro-preview',
};

export const enhanceContent = async (text: string, type: 'polish' | 'title' | 'summary' | 'grammar' | 'fix-markdown'): Promise<string> => {
  let prompt = "";
  let model = MODELS.FAST;

  switch (type) {
    case 'polish':
      prompt = `你是一个专业的微信公众号编辑。请润色以下 Markdown 文本，使其语气更加自然、吸引人，更有阅读感。保持原有的 Markdown 格式（如标题层级、粗体等）不变。文本内容：\n\n${text}`;
      break;
    case 'title':
      prompt = `你是一个爆款文案专家。请根据以下文章内容，生成 5 个吸引人的微信公众号标题。请直接列出标题，不要包含其他废话。文章内容：\n\n${text}`;
      break;
    case 'summary':
      prompt = `请为以下文章生成一个简短的摘要（50-100字），适合用作微信公众号的“摘要”字段。文章内容：\n\n${text}`;
      break;
    case 'grammar':
      prompt = `请检查以下文本的错别字和语法错误，并给出修正后的版本。如果没有错误，请原样返回。保持 Markdown 格式不变。文本内容：\n\n${text}`;
      break;
    case 'fix-markdown':
      prompt = `你是一个微信公众号 Markdown 排版专家。请对以下 Markdown 文本进行"语法修复"和"结构标准化"，使其在公众号中的渲染效果达到最佳。

请严格执行以下规则：
1. **结构转换（重要）**：
   - 检测文章开头的"副标题"、"引言"或"摘要段落"（通常位于 H1 标题之后，可能是加粗文本或单独的段落）。请将它们转换为引用块（>），这样它们会显示为带有竖线的精美样式。
   - 示例：将 "**副标题内容**" 转换为 "> **副标题内容**"。

2. **语法修复**：
   - 修复未闭合的标签（如 \`\`\`、**、*）。
   - 确保列表符号（- 或 1.）后有空格。
   - 确保标题符号（#）后有空格。
   - 修复表格格式错误。

3. **排版优化**：
   - 在中文和英文/数字之间增加必要的空格（如果原文本非常紧凑）。
   - 删除多余的连续空行（超过2行的空行压缩为1行）。
   - 确保代码块如果内容是代码，标明最可能的语言（如 javascript, python, css 等）。

请直接返回修复和优化后的 Markdown 内容，不要包含任何解释或 "Here is the fixed markdown" 之类的废话。
文本内容：\n\n${text}`;
      break;
  }

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
    });
    return response.text || "无法生成内容，请稍后再试。";
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};