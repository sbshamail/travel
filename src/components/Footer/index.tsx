import { Pressable } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useTheme } from "../../@core/theme/themeContext";

import { useAppNavigation } from "../../navigation/useAppNavigation";
import { Card } from "../wrapper";

export const Footer = () => {
  const { ct, theme, toggleTheme } = useTheme();
  const navigation = useAppNavigation();

  return (
    <Card className="w-full flex-row justify-between items-center py-4 px-6 ">
      {/* Home Button */}
      <Pressable onPress={() => navigation.navigate("Home")}>
        <Icon name="home-outline" size={24} color={ct.foreground} />
      </Pressable>

      {/* Toggle Theme */}
      <Pressable onPress={toggleTheme}>
        <Icon
          name={theme === "dark" ? "sunny-outline" : "moon-outline"}
          size={24}
          color={ct.foreground}
        />
      </Pressable>

      {/* Auth Page Button */}
      <Pressable onPress={() => navigation.navigate("Login")}>
        <Icon name="person-circle-outline" size={24} color={ct.foreground} />
      </Pressable>
    </Card>
  );
};
