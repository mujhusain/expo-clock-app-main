import { StyleSheet, Dimensions } from "react-native";

import { View } from "components/themed";

import React, { useState, useEffect } from "react";
import { Svg, Line, Circle, Text} from "react-native-svg";
import { useThemeColors } from "hooks/useThemeColors";

export default () => {
  const { colors, isDark } = useThemeColors();
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const timerID = setInterval(() => setDate(new Date()), 1000);
    return () => {
      clearInterval(timerID);
    };
  }, []);

  let { width } = Dimensions.get("window");
  width = width > 500 ? 500 : width - 150;

  const clockRadius = width / 2;
  const clockCenter = width / 2;

  let minutes = date.getMinutes();
  let hours = date.getHours();
  let seconds = date.getSeconds();

  let minuteHandDegrees = (360 / 60) * minutes;
  let hourHandDegrees = (360 / 12) * hours + (30 / 60) * minutes;
  let secondHandDegrees = (360 / 60) * seconds;

  return (
    <View style={styles.container}>
      <Svg height={width+10} width={width+10}>
        <Circle
          cx={clockCenter}
          cy={clockCenter}
          r={clockRadius}
          stroke={isDark? "white":"black"}
          strokeWidth="1"
          fill={isDark ? colors.background : "white"}
        />
      <Circle  cx={clockCenter} cy={clockCenter} r="8" fill={isDark?"white":"black"} />
        {[...Array(12)].map((_, i) => (
          <Text
          key={i}
            x={
              clockCenter +
              (clockRadius - 20) *
                Math.cos(Math.PI / 2 - (i + 1) * (30 * (Math.PI / 180)))
            }
            y={
              clockCenter -
              (clockRadius - 20) *
                Math.sin(Math.PI / 2 - (i + 1) * (30 * (Math.PI / 180)))
            }
            fontSize="20"
            stroke={isDark ? "white" : "black"}
            textAnchor="middle"
            alignmentBaseline="middle"
          >
            {i + 1}
          </Text>
        ))}

        <Line
          x1={clockCenter}
          y1={clockCenter}
          x2={
            clockCenter +
            (clockRadius - 50) *
              Math.cos(Math.PI / 2 - hourHandDegrees * (Math.PI / 180))
          }
          y2={
            clockCenter -
            (clockRadius - 50) *
              Math.sin(Math.PI / 2 - hourHandDegrees * (Math.PI / 180))
          }
          stroke={isDark ? "white" : "black"}
          strokeWidth="6"
        />

        <Line
          x1={clockCenter}
          y1={clockCenter}
          x2={
            clockCenter +
            (clockRadius - 30) *
              Math.cos(Math.PI / 2 - minuteHandDegrees * (Math.PI / 180))
          }
          y2={
            clockCenter -
            (clockRadius - 30) *
              Math.sin(Math.PI / 2 - minuteHandDegrees * (Math.PI / 180))
          }
          stroke={isDark ? "white" : "black"}
          strokeWidth="4"
        />

        <Line
          x1={clockCenter}
          y1={clockCenter}
          x2={
            clockCenter +
            (clockRadius - 10) *
              Math.cos(Math.PI / 2 - secondHandDegrees * (Math.PI / 180))
          }
          y2={
            clockCenter -
            (clockRadius - 10) *
              Math.sin(Math.PI / 2 - secondHandDegrees * (Math.PI / 180))
          }
          stroke="red"
          strokeWidth="2"
        />
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 22,
  },
  timeText: {
    fontSize: 60,
    fontWeight: "300",
    fontVariant: ["tabular-nums"], // fixed width character
  },
});
