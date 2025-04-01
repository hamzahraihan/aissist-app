export type AiModelType = {
  label: string;
  name: string;
  model: string;
  available: boolean;
  version?: string;
};

export const TEXT_MODELS: AiModelType[] = [
  {
    label: 'gemini',
    name: 'gemini-2.0-flash-001',
    model: 'gemini-2.0-flash-001',
    available: true,
    version: 'stable',
  },
  {
    label: 'gemini',
    name: 'gemini-1.5-flash',
    model: 'gemini-1.5-flash',
    available: true,
    version: 'stable',
  },
  {
    label: 'openai',
    name: 'gpt-4o-mini',
    model: 'gpt-4o-mini',
    available: true,
    version: 'stable',
  },
  {
    label: 'cloudflare',
    name: 'deepseek-r1-distill-qwen-32b',
    model: '@cf/deepseek-ai/deepseek-r1-distill-qwen-32b',
    available: true,
    version: 'stable',
  },
  {
    label: 'cloudflare',
    name: 'deepseek-coder-6.7b-base-awq',
    model: '@hf/thebloke/deepseek-coder-6.7b-base-awq',
    available: true,
    version: 'beta',
  },
  {
    label: 'cloudflare',
    name: 'deepseek-math-7b-instruct',
    model: '@cf/deepseek-ai/deepseek-math-7b-instruct',
    available: true,
    version: 'beta',
  },
  {
    label: 'cloudflare',
    name: 'deepseek-coder-6.7b-instruct-awq',
    model: '@hf/thebloke/deepseek-coder-6.7b-instruct-awq',
    available: true,
    version: 'beta',
  },
  {
    label: 'cloudflare',
    name: 'falcon-7b-instruct',
    model: '@cf/tiiuae/falcon-7b-instruct',
    available: true,
    version: 'beta',
  },
  {
    label: 'cloudflare',
    name: 'gemma-2b-it-lora',
    model: '@cf/google/gemma-2b-it-lora',
    available: true,
    version: 'beta',
  },
  {
    label: 'cloudflare',
    name: 'gemma-7b-it-lora',
    model: '@cf/google/gemma-7b-it-lora',
    available: true,
    version: 'beta',
  },
  {
    label: 'cloudflare',
    name: 'gemma-7b-it',
    model: '@hf/google/gemma-7b-it',
    available: true,
    version: 'beta',
  },
  {
    label: 'cloudflare',
    name: 'hermes-2-pro-mistral-7b',
    model: '@hf/nousresearch/hermes-2-pro-mistral-7b',
    available: true,
    version: 'beta',
  },
  {
    label: 'cloudflare',
    name: 'llama-2-13b-chat-awq',
    model: '@hf/thebloke/llama-2-13b-chat-awq',
    available: true,
    version: 'stable',
  },
  {
    label: 'cloudflare',
    name: 'llama-2-7b-chat-fp16',
    model: '@cf/meta/llama-2-7b-chat-fp16',
    available: true,
    version: 'stable',
  },
];

export const IMAGE_MODELS: AiModelType[] = [
  {
    label: 'cloudflare',
    name: 'flux-1-schnell',
    model: '@cf/black-forest-labs/flux-1-schnell',
    available: true,
  },
  {
    label: 'cloudflare',
    name: 'dreamshaper-8-lcm',
    model: '@cf/lykon/dreamshaper-8-lcm',
    available: false,
  },
  {
    label: 'cloudflare',
    name: 'stable-diffusion-v1-5-img2img',
    model: '@cf/runwayml/stable-diffusion-v1-5-img2img',
    available: false,
  },
  {
    label: 'cloudflare',
    name: 'stable-diffusion-v1-5-inpainting',
    model: '@cf/runwayml/stable-diffusion-v1-5-inpainting',
    available: false,
  },
  {
    label: 'cloudflare',
    name: 'stable-diffusion-xl-base-1.0',
    model: '@cf/stabilityai/stable-diffusion-xl-base-1.0',
    available: false,
  },
  {
    label: 'cloudflare',
    name: 'stable-diffusion-xl-lightning',
    model: '@cf/bytedance/stable-diffusion-xl-lightning',
    available: false,
  },
];
