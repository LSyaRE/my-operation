import { Slot } from "expo-router";
import { ScrollView, View } from "react-native";

const DailyLayout = () => {
  return (
    <ScrollView className="flex-1 bg-slate-950 px-5 pt-10">
      <Slot />
    </ScrollView>
  );
};

export default DailyLayout;
