import { CustomText } from '@/components/Text';
import { Card } from '@/components/Card';
import { ThemedView } from '@/components/ThemedView';
import { useCustomTheme } from '@/context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useRouter } from 'expo-router';
import { AI_ASSISTANTS, AssistantResponsesTypes } from '@/constants/assistants';
import { memo } from 'react';

const HorizontalCardList = memo(function HorizontalCardList({ item }: { item: AssistantResponsesTypes }) {
  const { themeMode } = useCustomTheme();

  const router = useRouter();
  const iconColor = themeMode === 'dark' ? 'white' : 'black';
  const backgroundIconColor = themeMode === 'dark' ? '#464646' : '#e2e2e2';

  return (
    <TouchableOpacity onPress={() => router.navigate(`/assistant/${item.type}?assistantType=${item.assistantType}`)}>
      <Card style={styles.card}>
        <Ionicons name={item.logo as any} size={24} color={iconColor} />
        <CustomText style={{ color: 'gray', fontSize: 10, textAlign: 'center' }} type="default">
          {item.subtitle}
        </CustomText>
        <View style={{ padding: 10, backgroundColor: backgroundIconColor, borderRadius: 99 }}>
          <Ionicons name="chevron-forward-outline" size={18} color={iconColor} />
        </View>
      </Card>
    </TouchableOpacity>
  );
});

export default function HomeScreen() {
  return (
    <ThemedView style={{ flex: 1 }}>
      <ScrollView style={styles.container}>
        <View style={{ paddingBottom: 34 }}>
          <CustomText style={{ paddingHorizontal: 34, paddingBottom: 27 }} type="title">
            Social Media
          </CustomText>

          <ScrollView horizontal contentContainerStyle={{ gap: 20, paddingHorizontal: 34 }} showsHorizontalScrollIndicator={false}>
            {AI_ASSISTANTS.map((item) => item.socialMedia.map((social) => <HorizontalCardList item={social} />))}
          </ScrollView>
        </View>

        <View style={{ paddingBottom: 34 }}>
          <CustomText style={{ paddingHorizontal: 34, paddingBottom: 27 }} type="title">
            Health
          </CustomText>

          <ScrollView horizontal contentContainerStyle={{ gap: 20, paddingHorizontal: 34 }} showsHorizontalScrollIndicator={false}>
            {AI_ASSISTANTS.map((item) => item.health.map((health) => <HorizontalCardList item={health} />))}
          </ScrollView>
        </View>

        <View style={{ paddingBottom: 34 }}>
          <CustomText style={{ paddingHorizontal: 34, paddingBottom: 27 }} type="title">
            Sports
          </CustomText>

          <ScrollView horizontal contentContainerStyle={{ gap: 20, paddingHorizontal: 34 }} showsHorizontalScrollIndicator={false}>
            {AI_ASSISTANTS.map((item) => item.sports.map((sport) => <HorizontalCardList item={sport} />))}
          </ScrollView>
        </View>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    gap: 34,
  },
  card: {
    display: 'flex',
    gap: 10,
    padding: 12,
    height: 163,
    width: 130,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});
