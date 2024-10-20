import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function Index() {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="font-pblack">Edit app/index.tsx to edit this screen.15</Text>
      <Link href="/home">Home</Link>
    </View>
  );
}