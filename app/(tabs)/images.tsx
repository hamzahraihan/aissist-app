import { StyleSheet, Text, View } from 'react-native';

export default function ImagesScreen() {
  return (
    <View style={styles.container}>
      <Text>Image</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
