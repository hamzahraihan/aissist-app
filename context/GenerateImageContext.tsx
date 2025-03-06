import { generateImageFalAI } from '@/services/fal-ai';
import { FluxDevOutput } from '@fal-ai/client/endpoints';
import { createContext, ReactNode, useState } from 'react';

export const FalaiContext = createContext<{
  generateImageUsingAi: (input: string) => Promise<void>;
  generatedImage: FluxDevOutput | undefined;
  loading: boolean;
}>({
  generateImageUsingAi: async () => {},
  generatedImage: { timings: '', images: [], has_nsfw_concepts: [], prompt: '', seed: 0 },
  loading: false,
});

type FalaiImageProps = FluxDevOutput & {
  input: string;
};

export function FalaiProvider({ children }: { children: ReactNode }) {
  const [generatedImage, setGeneratedImage] = useState<FalaiImageProps>({ input: '', images: [], timings: '', seed: 0, has_nsfw_concepts: [], prompt: '' });
  const [input, setInput] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const generateImageUsingAi = async () => {
    setLoading(true);
    try {
      const { data } = await generateImageFalAI();
      setGeneratedImage({ input: input, images: data.images, prompt: data.prompt, seed: data.seed, timings: data.timings, has_nsfw_concepts: data.has_nsfw_concepts });
      setLoading(false);
    } catch (error) {
      throw new Error(error as any);
    } finally {
      setLoading(false);
    }
  };

  return <FalaiContext.Provider value={{ generateImageUsingAi, generatedImage, loading }}>{children}</FalaiContext.Provider>;
}
