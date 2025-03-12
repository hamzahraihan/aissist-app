import FalIcon from '@/components/svg/falai';
import OpenaiIcon from '@/components/svg/openai';
import { ImageAiProps } from '@/context/GenerateImageContext';
import { MaterialIcons } from '@expo/vector-icons';

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
    case 'cloudflare':
      return <MaterialIcons name="token" size={200} color={props.fill} />;
    default:
      return <FalIcon {...props} />;
  }
};
