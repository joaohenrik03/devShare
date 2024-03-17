import { SafeAreaView, ActivityIndicator } from "react-native";

export function StartLoading() {
  return (
    <SafeAreaView style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <ActivityIndicator size={48} color="00B37E" />
    </SafeAreaView>
  )
}
