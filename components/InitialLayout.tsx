import { useAuth } from "@clerk/expo";
import { Stack, useRouter, useSegments } from "expo-router";
import { useEffect } from "react";

export default function InitialLayout() {
  const { isLoaded, isSignedIn } = useAuth();

  const segments = useSegments();
  const router = useRouter();

  const inAuthScreen = segments[0] === "(auth)";

  useEffect(() => {
    if (!isLoaded) return;

    if (!isSignedIn && !inAuthScreen) router.replace("/(auth)/login");
    else if (isSignedIn && inAuthScreen) router.replace("/(tabs)");
  }, [isLoaded, isSignedIn, inAuthScreen]);

  if (!isLoaded) return null;

  return <Stack screenOptions={{ headerShown: false }} />;
}
