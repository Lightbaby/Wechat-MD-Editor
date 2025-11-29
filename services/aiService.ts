/**
 * AI Service - OpenAI SDK 兼容的 API 调用
 * 
 * 支持所有兼容 OpenAI API 格式的服务：
 * - OpenAI
 * - Azure OpenAI
 * - DeepSeek
 * - Moonshot
 * - 通义千问
 * - 智谱 GLM
 * - SiliconFlow
 * - 其他兼容服务
 */

import { AIConfig, loadAIConfig, isAIConfigured } from '../types';

export type AIActionType = 'polish' | 'title' | 'summary' | 'grammar' | 'fix-markdown';

interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

interface ChatCompletionResponse {
  choices: {
    message: {
      content: string;
    };
  }[];
}

const getPrompt = (text: string, type: AIActionType): ChatMessage[] => {
  const systemPrompts: Record<AIActionType, string> = {
    'polish': '你是一个专业的微信公众号编辑。请润色用户提供的 Markdown 文本，使其语气更加自然、吸引人，更有阅读感。保持原有的 Markdown 格式（如标题层级、粗体等）不变。直接返回润色后的内容，不要包含任何解释。',
    'title': '你是一个爆款文案专家。请根据用户提供的文章内容，生成 5 个吸引人的微信公众号标题。请直接列出标题，每行一个，不要包含编号或其他内容。',
    'summary': '请为用户提供的文章生成一个简短的摘要（50-100字），适合用作微信公众号的"摘要"字段。直接返回摘要内容，不要包含任何解释。',
    'grammar': '请检查用户提供的文本的错别字和语法错误，并给出修正后的版本。如果没有错误，请原样返回。保持 Markdown 格式不变。直接返回修正后的内容，不要包含任何解释。',
    'fix-markdown': `你是一个微信公众号 Markdown 排版专家。请对用户提供的 Markdown 文本进行"语法修复"和"结构标准化"，使其在公众号中的渲染效果达到最佳。

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

请直接返回修复和优化后的 Markdown 内容，不要包含任何解释或 "Here is the fixed markdown" 之类的废话。`,
  };

  return [
    { role: 'system', content: systemPrompts[type] },
    { role: 'user', content: text },
  ];
};

export const enhanceContent = async (
  text: string, 
  type: AIActionType,
  config?: AIConfig
): Promise<string> => {
  // 使用传入的 config 或从 localStorage 加载
  const aiConfig = config || loadAIConfig();
  
  if (!isAIConfigured(aiConfig)) {
    throw new Error('请先在设置中配置 API Key、API 端点和模型');
  }

  const messages = getPrompt(text, type);
  
  // 构建 API URL
  let apiUrl = aiConfig.apiUrl;
  if (!apiUrl.endsWith('/chat/completions')) {
    apiUrl = apiUrl.replace(/\/$/, '') + '/chat/completions';
  }

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${aiConfig.apiKey}`,
      },
      body: JSON.stringify({
        model: aiConfig.model,
        messages: messages,
        temperature: 0.7,
        max_tokens: 4096,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const errorMessage = errorData.error?.message || response.statusText;
      throw new Error(`API 请求失败 (${response.status}): ${errorMessage}`);
    }

    const data: ChatCompletionResponse = await response.json();
    
    if (!data.choices || data.choices.length === 0) {
      throw new Error('API 返回结果为空');
    }

    return data.choices[0].message.content || '无法生成内容，请稍后再试。';
  } catch (error) {
    if (error instanceof Error) {
      // 网络错误或其他错误
      if (error.message.includes('Failed to fetch')) {
        throw new Error('网络连接失败，请检查 API 端点是否正确，或是否存在跨域问题');
      }
      throw error;
    }
    throw new Error('未知错误，请稍后再试');
  }
};

