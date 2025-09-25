import { supabase } from "@/lib/supabase";
import { Link } from "expo-router";
import { useState } from "react";
import {
  Alert,
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function SignInScreen() {
  const [email, setEmail] = useState("fruitsdrink@126.com");
  const [password, setPassword] = useState("12345678");
  const [isLoading, setIsLoading] = useState(false);

  async function handleLogin() {
    if (!email || !password) {
      Alert.alert("Please enter email and password");
      return;
    }

    try {
      setIsLoading(true);
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        Alert.alert(error.message);
        return;
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <View className="flex-1 items-center justify-center bg-neutral-900 px-6">
      <View className="w-full max-w-sm">
        <Text className="text-3xl font-bold text-center mb-8 text-white">
          Welcome Back
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
            onPress={handleLogin}
            disabled={isLoading}
          >
            <Text className="text-black text-center font-semibold">
              {isLoading ? "Sing in..." : "Sign In"}
            </Text>
          </TouchableOpacity>
          <View className="flex-row justify-center mt-4">
            <Text className="text-gray-400">Don't have an account?</Text>
            <Link asChild href={"/sign-up"}>
              <Pressable>
                <Text className="text-blue-400 font-medium">Create one</Text>
              </Pressable>
            </Link>
          </View>
        </View>
      </View>
    </View>
  );
}
