import { Button, StyleSheet } from "react-native";

import { Text, View } from "components/themed";
import { useThemeColors } from "src/hooks/useThemeColors";
import { useEffect, useState } from "react";
import AnalogClock from "src/components/anlogClock/AnalogClock";

export default () => {
  const { colors } = useThemeColors();
  const [currentTime, setCurrentTime] = useState("");
  const [is24HourFormat, setIs24HourFormat] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      const date = new Date();

      let hours = date.getHours();
      let minutes = date.getMinutes();
      let seconds = date.getSeconds();

      if (!is24HourFormat) {
        const suffix = hours >= 12 ? "PM" : "AM";
        hours = hours % 12 || 12;
        setCurrentTime(
          `${hours}:${minutes < 10 ? "0" + minutes : minutes}:${
            seconds < 10 ? "0" + seconds : seconds
          } ${suffix}`
        );
      } else {
        setCurrentTime(
          `${hours < 10 ? "0" + hours : hours}:${
            minutes < 10 ? "0" + minutes : minutes
          }:${seconds < 10 ? "0" + seconds : seconds}`
        );
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [is24HourFormat]);

  const toggleTimeFormat = () => {
    setIs24HourFormat((prevFormat) => !prevFormat);
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.text, { color: colors.textSubtle }]}>India</Text>
      <Text style={styles.timeText}>{currentTime}</Text>
      <AnalogClock />
      <Button
        title={is24HourFormat ? "Switch to 12-hour" : "Switch to 24-hour"}
        onPress={toggleTimeFormat}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-evenly",
    paddingBottom:80
  },
  timeText: {
    fontSize: 60,
    fontWeight: "300",
    fontVariant: ["tabular-nums"], // fixed width character
  },
  text: {
    fontSize: 22,
  },
});
