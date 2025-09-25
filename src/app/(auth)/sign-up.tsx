import { supabase } from "@/lib/supabase";
import { Link, router } from "expo-router";
import { useState } from "react";
import {
  Alert,
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function SignUpScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSignUp() {
    if (!email || !password) {
      Alert.alert("Please enter email and password");
      return;
    }
    try {
      setIsLoading(true);
      const {
        data: { session },
        error,
      } = await supabase.auth.signUp({
        email,
        password,
      });
      if (error) {
        Alert.alert(error.message);
        return;
      }
      if (!session) {
        Alert.alert("Please check your inbox for email verification!");
        return;
      }
      router.dismissTo("/sign-in");
    } catch (error) {
      console.error(error);
      if (error instanceof Error) Alert.alert(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <View className="flex-1 items-center justify-center bg-neutral-900 px-6">
      <View className="w-full max-w-sm">
        <Text className="text-3xl font-bold text-center mb-8 text-white">
          Create an account
        </Text>
        <View className="gap-4">
          <View>
            <Text className="text-sm font-medium text-gray-300 mb-1">
              Email
            </Text>
            <TextInput
              className="w-full px-4 py-3 border border-neutral-700 rounded-lg bg-neutral-800 text-white"
              placeholderTextColor={"#6b7280"}
              placeholder="Enter your email"
              keyboardType="email-address"
              autoCapitalize={"none"}
              autoCorrect={false}
              value={email}
              onChangeText={setEmail}
            />
          </View>
          <View>
            <Text className="text-sm font-medium text-gray-300 mb-1">
              Password
            </Text>
            <TextInput
              className="w-full px-4 py-3 border border-neutral-700 rounded-lg bg-neutral-800 text-white"
              placeholderTextColor={"#6b7280"}
              placeholder="Enter your password"
              keyboardType="visible-password"
              autoCapitalize={"none"}
              autoCorrect={false}
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
          </View>

          <TouchableOpacity
            activeOpacity={0.8}
            className="w-full bg-white py-3 rounded-lg mt-6"
            onPress={handleSignUp}
            disabled={isLoading}
          >
            <Text className="text-black text-center font-semibold">
              {isLoading ? "Sign up..." : "Sign Up"}
            </Text>
          </TouchableOpacity>
          <View className="flex-row justify-center mt-4">
            <Text className="text-gray-400">Already have an account?</Text>
            <Link asChild href={"/sign-in"} dismissTo>
              <Pressable>
                <Text className="text-blue-400 font-medium">Sign in</Text>
              </Pressable>
            </Link>
          </View>
        </View>
      </View>
    </View>
  );
}
