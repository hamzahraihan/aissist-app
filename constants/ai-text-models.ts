export type AiTextModelType = {
  name: string;
  model: string;
  available: boolean;
};

export const TEXT_MODELS: AiTextModelType[] = [
  {
    name: 'deepseek-r1-distill-qwen-32b',
    model: '@cf/deepseek-ai/deepseek-r1-distill-qwen-32b',
    available: true,
  },
  {
    name: 'deepseek-coder-6.7b-base-awq',
    model: '@hf/thebloke/deepseek-coder-6.7b-base-awq',
    available: true,
  },
  {
    name: 'deepseek-math-7b-instruct',
    model: '@cf/deepseek-ai/deepseek-math-7b-instruct',
    available: true,
  },
  {
    name: 'deepseek-coder-6.7b-instruct-awq',
    model: '@hf/thebloke/deepseek-coder-6.7b-instruct-awq',
    available: true,
  },
  {
    name: 'falcon-7b-instruct',
    model: '@cf/tiiuae/falcon-7b-instruct',
    available: true,
  },
  {
    name: 'gemma-2b-it-lora',
    model: '@cf/google/gemma-2b-it-lora',
    available: true,
  },
  {
    name: 'gemma-7b-it-lora',
    model: '@cf/google/gemma-7b-it-lora',
    available: true,
  },
  {
    name: 'gemma-7b-it',
    model: '@hf/google/gemma-7b-it',
    available: true,
  },
  {
    name: 'hermes-2-pro-mistral-7b',
    model: '@hf/nousresearch/hermes-2-pro-mistral-7b',
    available: true,
  },
  {
    name: 'llama-2-13b-chat-awq',
    model: '@hf/thebloke/llama-2-13b-chat-awq',
    available: true,
  },
  {
    name: 'llama-2-7b-chat-fp16',
    model: '@cf/meta/llama-2-7b-chat-fp16',
    available: true,
  },
];
