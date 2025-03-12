import FalIcon from '@/components/svg/falai';
import OpenaiIcon from '@/components/svg/openai';
import { MaterialIcons } from '@expo/vector-icons';

type AiModelProps = {
  type: string;
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
      return <MaterialIcons name="token" size={200} color={props.fill} />;
  }
};
