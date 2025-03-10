import FalIcon from '@/components/svg/falai';
import OpenaiIcon from '@/components/svg/openai';
import { ImageAiProps } from '@/context/GenerateImageContext';

type AiModelProps = {
  type: ImageAiProps;
  props: any;
};

export const renderIcon = ({ type, props }: AiModelProps) => {
  switch (type) {
    case 'falai':
      return <FalIcon {...props} />;
    case 'openai':
      return <OpenaiIcon {...props} />;
    default:
      return <FalIcon {...props} />;
  }
};
