import { supabase } from "@/lib/supabase";
import { useAuth } from "@/providers/auth.provider";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { router } from "expo-router";
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

const createPost = async(content: string, user_id: string) => {
  const {data} = await supabase.from('posts').insert({
    content,
    user_id
  })
  .select("*")
  .single()
  .throwOnError()

  return data
}

export default function NewScreen() {
  const [text, setText] = useState("");

  const {user} = useAuth()

  const queryClient = useQueryClient()


  const {mutate, isPending, error} = useMutation({
    mutationFn: ()=>createPost(text, user!.id),
    onSuccess: ()=>{
      setText("")
      queryClient.invalidateQueries({
        queryKey: ["posts"],
      })
      router.back()
    },
    onError: ()=>{
      console.error(error)
    //  Alert.alert("Error", "Something went wrong") 
    }
  })

  const handleSubmit = ()=>{
    if(!text || !user) return;
    
     mutate()
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

        {
          error && (
            <Text className="text-red-500 mt-4 text-sm">{error.message}</Text>
          ) 
        }

        <View className="mt-auto">
          <Pressable
            onPress={handleSubmit}
            className={`bg-white py-2 px-6 rounded-full self-end ${isPending ? "opacity-50" : ""}`}
            
            disabled={isPending}
          >
            <Text className="text-black font-bold">{isPending ? "Posting..." : "Post"}</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
