/* eslint-disable import/no-unresolved */
import { Dispatch, SetStateAction } from 'react';
import { View } from 'react-native';
import { AssistantResponseCompound } from './AssistantResponseCompound';

export function AssistantResponse({ input, setInput }: { input: string; setInput: Dispatch<SetStateAction<string>> }) {
  return (
    <AssistantResponseCompound.Root setInput={setInput} input={input}>
      <View style={{ paddingBottom: 50 }}>
        <AssistantResponseCompound.Inputs />

        {/* divider line */}
        <AssistantResponseCompound.Divider />

        <View style={{ display: 'flex', gap: 14 }}>
          <AssistantResponseCompound.Response />
        </View>
      </View>
    </AssistantResponseCompound.Root>
  );
}
