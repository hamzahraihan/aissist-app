import { generateImageFalAI } from '@/services/fal-ai';
import { FluxDevOutput } from '@fal-ai/client/endpoints';
import { createContext, ReactNode, useState } from 'react';

export const GenerateImageContext = createContext<{
  generateImageUsingAi: (input: string) => Promise<void>;
  generatedImage: FalaiImageProps[] | undefined;
  loading: boolean;
  input: string;
  setInput: React.Dispatch<React.SetStateAction<string>>;
}>({
  generateImageUsingAi: async () => {},
  generatedImage: [],
  loading: false,
  input: '',
  setInput: () => {},
});

type FalaiImageProps = FluxDevOutput & {
  input: string;
  requestId: string;
};

export function GenerateImageProvider({ children }: { children: ReactNode }) {
  const [generatedImage, setGeneratedImage] = useState<FalaiImageProps[]>([]);

  console.log(generatedImage);

  const [input, setInput] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const generateImageUsingAi = async (input: string) => {
    setLoading(true);
    try {
      const { data, requestId } = await generateImageFalAI(input);
      setGeneratedImage((prev) => [...prev, { input: input, images: data.images, prompt: data.prompt, seed: data.seed, timings: data.timings, has_nsfw_concepts: data.has_nsfw_concepts, requestId }]);
      setLoading(false);
    } catch (error) {
      throw new Error(error as any);
    } finally {
      setLoading(false);
    }
  };

  return <GenerateImageContext.Provider value={{ generateImageUsingAi, generatedImage, loading, input, setInput }}>{children}</GenerateImageContext.Provider>;
}
