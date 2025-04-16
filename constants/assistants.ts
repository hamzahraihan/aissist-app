import { z, ZodType } from 'zod';

export type AssistantResponsesTypes = {
  type: string;
  logo: string;
  initialPrompt: string;
  description: string;
  assistantType: string;
  placeholder?: string;
  subtitle?: string;
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
        subtitle: 'Generate a Tiktok Content Idea',
      },
      {
        type: 'facebook',
        logo: 'logo-facebook',
        initialPrompt: 'Here is the post idea: ',
        description: 'you are the best content creator of facebook. you will help people to create the best content to get so much views or audiences.',
        assistantType: 'social',
        placeholder: 'Generate a Facebook Content Idea ✨',
        subtitle: 'Generate a Facebook Content Idea',
      },
      {
        type: 'instagram',
        logo: 'logo-instagram',
        initialPrompt: 'Here is the post idea: ',
        description: 'you are the best content creator of instagram. you will help people to create the best content to get so much views or audiences and followers.',
        assistantType: 'social',
        placeholder: 'Generate an Instagram Content Idea ✨',
        subtitle: 'Generate an Instagram Content Idea',
      },
    ],
    health: [
      {
        type: 'health',
        logo: 'medical',
        initialPrompt: 'Here is the patient illness or consult about their health: ',
        description: 'you are the best doctor that could provide the best health advice to a user illness and provide a recommentation of appropriate medicine user needs. ',
        assistantType: 'health',
        subtitle: 'Generate your medical recommendations',
        placeholder: '💬 Describe your age, gender, symptoms, allergies, and your current medications for your disease.',
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
  diagnosis: z.string().describe('The diagnosis or summary of the user’s condition based on the input.'),
  recommendedMedications: z
    .array(
      z.object({
        name: z.string().describe('The name of the recommended medication.'),
        dosage: z.string().describe('The recommended dosage for the medication.'),
        frequency: z.string().describe('How often the medication should be taken.'),
      })
    )
    .describe('A list of recommended medications with details.'),
  precautions: z.string().describe('Any precautions or warnings related to the diagnosis or medications.'),
  followUp: z.string().describe('Suggestions for follow-up actions or further consultation.'),
});

export const handleAiSchema = (schemaType: string): ZodType => {
  console.log('which schema: ', schemaType);
  switch (schemaType) {
    case 'social':
      return socialMediaSchema;
    case 'health':
      return healthAssistantSchema;
    default:
      return socialMediaSchema;
  }
};
