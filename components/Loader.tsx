import { COLORS } from "@/constants/theme";
import { useAuth } from "@clerk/expo";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";

export function Loader() {
  const { signOut } = useAuth();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: COLORS.background,
      }}
    >
      <ActivityIndicator size="large" color={COLORS.primary} />
      <TouchableOpacity
        onPress={() => signOut()}
        style={{ marginTop: 40, padding: 12 }}
      >
        <Text style={{ color: COLORS.grey }}>Sign out</Text>
      </TouchableOpacity>
    </View>
  );
}
