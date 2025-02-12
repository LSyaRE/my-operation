import { Slot } from "expo-router";
import { View } from "react-native";

const DailyLayout = () => {
  return (
    <View className="flex-1 bg-slate-950 px-5 pt-10">
      <Slot />
    </View>
  );
};

export default DailyLayout;
