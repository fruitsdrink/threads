import { Slot } from "expo-router";

import { ThemeProvider, DarkTheme } from "@react-navigation/native";
import "../../tailwind.css";
import { StatusBar } from "expo-status-bar";
import { AuthProvider } from "@/providers/auth.provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const black = "#111111";
const white = "#e5e5e7";
const myTheme: typeof DarkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: white,
    text: white,
    background: black,
    card: "#101010",
    border: "#101010",
  },
};

const queryClient = new QueryClient()

export default function RootLayout() {
  return (
    <>
      <ThemeProvider value={myTheme}>
        <AuthProvider>
          <QueryClientProvider client={queryClient}>
            <Slot />
          </QueryClientProvider>
        </AuthProvider>
        <StatusBar style="light" />
      </ThemeProvider>
    </>
  );
}
