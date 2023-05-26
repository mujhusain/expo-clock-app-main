import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Switch,
} from "react-native";

import { View, Text } from "components/themed";
import { useThemeColors } from "hooks/useThemeColors";
import { useCustomTheme, Themes } from "context/Theme";


export default () => {
  const { colors } = useThemeColors();
  const { theme, setTheme } = useCustomTheme();
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => {
    setTheme(isEnabled ? "light" : "dark");

    setIsEnabled((previousState) => !previousState);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.text}> Switch to {theme==='dark'?"Light":"Dark"} mode</Text>

        <Switch
          trackColor={{ false: "#767577", true: "white" }}
          thumbColor={isEnabled ? "#f5dd4b" : "#011627"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },

  border: {
    flex: 1,
    height: 1,
    backgroundColor: "red",
  },

  row: {
    flexDirection: "row",
    marginVertical: 10,
    alignItems: "center",
    justifyContent:"space-between",
    borderRadius:10,
  },
  text: {
    fontSize: 20,
    fontVariant: ["tabular-nums"],
  },
});
