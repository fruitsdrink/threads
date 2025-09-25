import { supabase } from "@/lib/supabase";
import { useAuth } from "@/providers/auth.provider";
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
  const [isPending, setIsPending] = useState(false)

  const {user} = useAuth()

  const handleSubmit = async()=>{
    if(!text || !user) return;
    
    try{
      setIsPending(true)
      const {data, error} = await supabase.from('posts').insert({
        content: text,
        user_id: user.id
      })

      
      if(error) throw error;

      setText("")
    }catch(error){
      console.log(error)
    }finally{
      setIsPending(false)
    }
  }

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
          autoCapitalize="none"
          autoCorrect={false}
          multiline
          numberOfLines={4}
        />

        <View className="mt-auto">
          <Pressable
            onPress={handleSubmit}
            className="bg-white py-2 px-6 rounded-full self-end"
            
            disabled={isPending}
          >
            <Text className="text-black font-bold">{isPending ? "Posting..." : "Post"}</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
