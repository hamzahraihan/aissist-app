import { generateAPIUrl } from '@/utils/generateApiUrl';
import { Image } from '@fal-ai/client/endpoints';
import { AIRunResponse } from 'cloudflare/resources/ai/ai';
import { createContext, ReactNode, useState } from 'react';
import { Platform, ToastAndroid } from 'react-native';
import uuid from 'react-native-uuid';

export const GenerateImageContext = createContext<{
  generateImageWithCloudflare: (input: string, modelName: string) => Promise<void>;
  generatedImage: GeneratedImageProps[] | undefined;
  loading: boolean;
  input: string;
  setInput: React.Dispatch<React.SetStateAction<string>>;
  setImageAiModels: React.Dispatch<React.SetStateAction<string>>;
  imageAiModels: string;
}>({
  generateImageWithCloudflare: async () => {},
  generatedImage: [],
  loading: false,
  input: '',
  setInput: () => {},
  setImageAiModels: () => {},
  imageAiModels: 'openai',
});

export type OpenAiImageResponses = {
  input: string;
  source: string;
  created?: number;
  _request_id?: string | null;
};

export type FalAiImageResponses = {
  input: string;
  source: string;
  images: Image[];
  timings: any;
  seed: number;
  has_nsfw_concepts: boolean[];
  prompt: string;
};

type GeneratedImageProps = OpenAiImageResponses | FalAiImageResponses | AIRunResponse;

export function GenerateImageProvider({ children }: { children: ReactNode }) {
  const [generatedImage, setGeneratedImage] = useState<GeneratedImageProps[]>([]);

  const [imageAiModels, setImageAiModels] = useState<string>('@cf/black-forest-labs/flux-1-schnell');

  console.log(generatedImage);

  const [input, setInput] = useState<string>('');

  const [loading, setLoading] = useState<boolean>(false);

  // const generateImageUsingAi = (input: string): Promise<void> => {
  //   switch (imageAiModels) {
  //     case 'falai':
  //       return generateImageWithFalai(input);
  //     case 'openai':
  //       return generateImageWithOpenai(input);
  //     case 'cloudflare':
  //       return generateImageWithCloudflare(input, imageAiModels);
  //     default:
  //       return generateImageWithFalai(input);
  //   }
  // };

  const generateImageWithCloudflare = async (input: string, modelName: string) => {
    setLoading(true);
    try {
      if (!input) {
        console.log('input is empty');
        setGeneratedImage((prev) => prev);
        return;
      }

      const response = await fetch(generateAPIUrl('/api/generateImage') || '', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: input,
          modelName,
        }),
      });

      const result: any = await response.json();
      const image = result.image || response;

      console.log(result);

      if (image === undefined) {
        setGeneratedImage((prev) => prev);
      }

      setGeneratedImage((prev) => [
        ...prev,
        {
          source: 'cloudflare',
          input: input,
          images: `data:image/png;base64,${image}`,
          requestId: uuid.v4(),
        },
      ]);
      setLoading(false);
    } catch (error: any) {
      console.error(error);
      if (Platform.OS !== 'web') {
        ToastAndroid.show('Failed to generate image, try again with different models', ToastAndroid.LONG);
      }
    } finally {
      setLoading(false);
      setInput('');
    }
  };

  // const generateImageWithOpenai = async (input: string) => {
  //   setLoading(true);
  //   try {
  //     if (!input) {
  //       console.log('input is empty');
  //       setGeneratedImage((prev) => prev);
  //       return;
  //     }
  //     console.log('generating image using openai dall-e');
  //     const response = await openAiGenerateImage(input);
  //     if (response?._request_id) {
  //       setGeneratedImage((prev) => [...prev, { source: 'openai', input: input, images: response?.data, requestId: response?._request_id } as OpenAiImageResponses]);
  //     }
  //     setLoading(false);
  //   } catch (error) {
  //     throw new Error(error as any);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // const generateImageWithFalai = async (input: string) => {
  //   setLoading(true);
  //   try {
  //     if (!input) {
  //       console.log('input is empty');
  //       setGeneratedImage((prev) => prev);
  //       return;
  //     }
  //     console.log('generating image using fal ai');
  //     const { data, requestId } = await generateImageFalAI(input);
  //     setGeneratedImage((prev) => [...prev, { source: 'falai', input: input, images: data.images, prompt: data.prompt, seed: data.seed, timings: data.timings, has_nsfw_concepts: data.has_nsfw_concepts, requestId } as FalAiImageResponses]);
  //     setLoading(false);
  //   } catch (error) {
  //     throw new Error(error as any);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  return <GenerateImageContext.Provider value={{ generateImageWithCloudflare, generatedImage, setImageAiModels, imageAiModels, loading, input, setInput }}>{children}</GenerateImageContext.Provider>;
}
