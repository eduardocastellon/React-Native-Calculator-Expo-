import { Stack } from "expo-router";

export default function RootLayout() {
  return (
      <Stack screenOptions={{ headerStyle: {backgroundColor: "black" }, headerTintColor: "white", headerTitleStyle: {fontWeight: "bold"},}}>
        <Stack.Screen name="index" options={{ title: "Calculator" }} />
        <Stack.Screen name="modal" options={{ title: "History", headerBackButtonDisplayMode: "minimal", presentation: "modal", headerStyle: {backgroundColor: "#ffffffff" }, headerTintColor: "black" }} />
      </Stack>
  )
}
