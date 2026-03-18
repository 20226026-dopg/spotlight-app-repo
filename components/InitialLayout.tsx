import { api } from "@/convex/_generated/api";
import { useAuth, useUser } from "@clerk/expo";
import { useMutation } from "convex/react";
import { Stack, useRouter, useSegments } from "expo-router";
import { useEffect } from "react";

export default function InitialLayout() {
  const { isLoaded, isSignedIn } = useAuth();
  const { user } = useUser();

  const segments = useSegments();
  const router = useRouter();
  const syncUser = useMutation(api.users.syncUser);

  const inAuthScreen = segments[0] === "(auth)";

  useEffect(() => {
    if (!isLoaded) return;

    if (!isSignedIn && !inAuthScreen) router.replace("/(auth)/login");
    else if (isSignedIn && inAuthScreen) router.replace("/(tabs)");
  }, [isLoaded, isSignedIn, inAuthScreen]);

  // Sync user to Convex when authenticated
  useEffect(() => {
    if (!isSignedIn || !user) return;

    const email = user.emailAddresses[0]?.emailAddress || "";
    console.log("Syncing user to Convex:", { clerkId: user.id, email });

    syncUser({
      clerkId: user.id,
      email,
      fullname: user.fullName || user.firstName || "User",
      username: email.split("@")[0] || user.id,
      image: user.imageUrl || "",
    })
      .then((result) => console.log("User synced successfully:", result))
      .catch((error) => console.error("Failed to sync user:", error));
  }, [isSignedIn, user]);

  if (!isLoaded) return null;

  return <Stack screenOptions={{ headerShown: false }} />;
}
