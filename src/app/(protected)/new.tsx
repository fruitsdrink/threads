import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function NewScreen() {
  const [text, setText] = useState("");
  return (
    <SafeAreaView className="p-4 flex-1" edges={["bottom"]}>
      <KeyboardAvoidingView
        style={{
          flex: 1,
        }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 140 : 120}
      >
        <Text className="text-white font-bold text-lg">New Post</Text>
        <TextInput
          value={text}
          onChangeText={setText}
          placeholder="What is on your mind?"
          className="text-lg text-white"
          placeholderTextColor={"gray"}
          multiline
          numberOfLines={4}
        />

        <View className="mt-auto">
          <Pressable
            onPress={() => console.log("post: ")}
            className="bg-white py-2 px-6 rounded-full self-end"
          >
            <Text className="text-black font-bold">Post</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
