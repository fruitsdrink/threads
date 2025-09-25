import { supabase } from "@/lib/supabase";
import { User } from "@supabase/supabase-js";
import React, { createContext, use, useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
});

export const useAuth = () => {
  const context = use(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};

export const AuthProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log('useEffect')
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log('getSession')
      if (session) {
        setUser(session.user);
        setIsAuthenticated(true);
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }
      setIsLoading(false)
      });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      console.log('onAuthStateChange')
      if (session) {
        setUser(session.user);
        setIsAuthenticated(true);
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  if(isLoading) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size={"large"} />
      </View>
    )
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
