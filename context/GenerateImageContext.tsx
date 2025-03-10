import { generateImageFalAI } from '@/services/fal-ai';
import { openAiGenerateImage } from '@/services/openai';
import { Image } from '@fal-ai/client/endpoints';
import { createContext, ReactNode, useState } from 'react';

export type ImageAiProps = 'openai' | 'falai' | 'stable-diff' | undefined;

export const GenerateImageContext = createContext<{
  generateImageUsingAi: (input: string) => Promise<void>;
  generatedImage: GeneratedImageProps[] | undefined;
  loading: boolean;
  input: string;
  setInput: React.Dispatch<React.SetStateAction<string>>;
  setImageAiModels: React.Dispatch<React.SetStateAction<ImageAiProps>>;
  imageAiModels: ImageAiProps;
}>({
  generateImageUsingAi: async () => {},
  generatedImage: [],
  loading: false,
  input: '',
  setInput: () => {},
  setImageAiModels: () => {},
  imageAiModels: 'openai',
});

type OpenAiImageResponses = {
  input: string;
  source: string;
  created?: number;
  _request_id?: string | null;
};

type FalAiImageResponses = {
  input: string;
  source: string;
  images: Image[];
  timings: any;
  seed: number;
  has_nsfw_concepts: boolean[];
  prompt: string;
};

type GeneratedImageProps = OpenAiImageResponses | FalAiImageResponses;

export function GenerateImageProvider({ children }: { children: ReactNode }) {
  const [generatedImage, setGeneratedImage] = useState<GeneratedImageProps[]>([]);

  const [imageAiModels, setImageAiModels] = useState<ImageAiProps>('falai');

  console.log(generatedImage);

  const [input, setInput] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const generateImageUsingAi = (input: string): Promise<void> => {
    switch (imageAiModels) {
      case 'falai':
        return generateImageWithFalai(input);
      case 'openai':
        return generateImageWithOpenai(input);
      default:
        return generateImageWithFalai(input);
    }
  };

  const generateImageWithOpenai = async (input: string) => {
    setLoading(true);
    try {
      const { data, _request_id } = await openAiGenerateImage(input);
      setGeneratedImage((prev) => [...prev, { source: 'openai', input: input, images: data, requestId: _request_id } as OpenAiImageResponses]);
      setLoading(false);
    } catch (error) {
      throw new Error(error as any);
    } finally {
      setLoading(false);
    }
  };

  const generateImageWithFalai = async (input: string) => {
    setLoading(true);
    try {
      const { data, requestId } = await generateImageFalAI(input);
      setGeneratedImage((prev) => [...prev, { source: 'falai', input: input, images: data.images, prompt: data.prompt, seed: data.seed, timings: data.timings, has_nsfw_concepts: data.has_nsfw_concepts, requestId } as FalAiImageResponses]);
      setLoading(false);
    } catch (error) {
      throw new Error(error as any);
    } finally {
      setLoading(false);
    }
  };

  return <GenerateImageContext.Provider value={{ generateImageUsingAi, generatedImage, setImageAiModels, imageAiModels, loading, input, setInput }}>{children}</GenerateImageContext.Provider>;
}
