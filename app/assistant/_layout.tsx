import { Stack } from 'expo-router';

const AssistantLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="[assistantId]" />
    </Stack>
  );
};

export default AssistantLayout;
