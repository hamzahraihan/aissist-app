import { z, ZodType } from 'zod';

export type AiResponse = {
  type: string;
  logo: string;
  initialPrompt: string;
  description: string;
  assistantType: string;
  placeholder?: string;
};

export const AI_ASSISTANTS = [
  {
    socialMedia: [
      {
        type: 'tiktok',
        logo: 'logo-tiktok',
        initialPrompt: 'Here is the post idea: ',
        description: 'you are the best content creator of tiktok. you will help people to create the best content to get so much views or audiences.',
        assistantType: 'social',
        placeholder: 'Generate a Tiktok Content Idea ✨',
      },
      {
        type: 'facebook',
        logo: 'logo-facebook',
        initialPrompt: 'Here is the post idea: ',
        description: 'you are the best content creator of facebook. you will help people to create the best content to get so much views or audiences.',
        assistantType: 'social',
        placeholder: 'Generate a Facebook Content Idea ✨',
      },
      {
        type: 'instagram',
        logo: 'logo-instagram',
        initialPrompt: 'Here is the post idea: ',
        description: 'you are the best content creator of instagram. you will help people to create the best content to get so much views or audiences and followers.',
        assistantType: 'social',
        placeholder: 'Generate an Instagram Content Idea ✨',
      },
    ],
    health: [
      {
        type: 'health',
        logo: 'logo-facebook',
        initialPrompt: 'Here is the patient illness or consult about their health: ',
        description: 'you are the best doctor that could provide the best health advice to a user illness and provide a recommentation of appropriate medicine user needs. ',
        assistantType: 'health',
        placeholder: 'Generate a Health Advice ✨',
      },
    ],
  },
];

const socialMediaSchema = z.object({
  title: z.string().describe('Provide a concise and engaging title for the social media post.'),
  content: z.string().describe('Write the main content of the post, ensuring it is relevant and captivating.'),
  thoughts: z.string().describe('Provide a detailed strategy explaining why this content would perform well, ensuring consistency and accuracy across generations.'),
});

const healthAssistantSchema = z.object({
  userAge: z.number().int().positive().optional().describe('The age of the user, used to tailor medicine recommendations.'),
  userGender: z.enum(['male', 'female', 'other']).optional().describe('The gender of the user, used for personalized medicine suggestions.'),
  symptoms: z
    .array(
      z.object({
        name: z.string().describe('The name of the symptom.'),
        duration: z.string().optional().describe('How long the symptom has been present.'),
        severity: z.enum(['mild', 'moderate', 'severe']).optional().describe('The severity of the symptom.'),
      })
    )
    .nonempty()
    .describe('A list of symptoms the user is experiencing to recommend appropriate medicines.'),
  allergies: z.array(z.string()).optional().describe('A list of known allergies to avoid recommending harmful medicines.'),
  currentMedications: z.array(z.string()).optional().describe('A list of medications the user is currently taking to prevent interactions.'),
  medicalHistory: z.string().optional().describe('A brief description of the user’s medical history, if applicable.'),
});

export const handleAiSchema = (schemaType: string): ZodType => {
  switch (schemaType) {
    case 'social':
      return socialMediaSchema;
    case 'health':
      return healthAssistantSchema;
    default:
      return socialMediaSchema;
  }
};
