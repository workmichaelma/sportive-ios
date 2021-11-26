import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Button, ThemeProvider } from "react-native-elements";

import Live from "./live";
import Player from "./player";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <ThemeProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{ headerShown: false, gestureEnabled: true }}
        >
          <Stack.Screen name="Live" component={Live} />
          <Stack.Screen name="Player" component={Player} />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
}
