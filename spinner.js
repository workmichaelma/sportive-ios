import React from "react";
import tw from "tailwind-rn";
import { ActivityIndicator, View } from "react-native";

function Spinner() {
  return (
    <View style={tw(`flex w-full h-full items-center justify-center`)}>
      <ActivityIndicator size="large" color="#aaaaaa" />
    </View>
  );
}

export default Spinner;
