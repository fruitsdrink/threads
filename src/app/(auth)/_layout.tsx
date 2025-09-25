import { useAuth } from "@/providers/auth.provider";
import { Redirect, Stack } from "expo-router";

export default function AuthLayout() {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Redirect href={"/(protected)/(tabs)"} />;
  }

  return (
    <Stack>
      <Stack.Screen
        name="sign-in"
        options={{ headerShown: false, title: "Sign In" }}
      />
      <Stack.Screen
        name="sign-up"
        options={{ title: "Sign Up", headerBackButtonDisplayMode: "minimal" }}
      />
    </Stack>
  );
}
