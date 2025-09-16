import React, { useRef } from "react";
import {
  Animated,
  Easing,
  GestureResponderEvent,
  Pressable,
  PressableProps,
  StyleProp,
  ViewStyle,
} from "react-native";

type AnimatedPressableProps = PressableProps & {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  scaleTo?: number; // how much to scale (default: 1.02 for slight scale up)
  scaleInDuration?: number; // duration for scale in animation
  scaleOutDuration?: number; // duration for scale out animation
  hapticFeedback?: boolean; // enable haptic feedback on press
};

const AnimatedPressable = ({
  children,
  style,
  onPressIn,
  onPressOut,
  scaleTo = 1.02,
  scaleInDuration = 300,
  scaleOutDuration = 500,
  hapticFeedback = false,
  ...rest
}: AnimatedPressableProps) => {
  const scale = useRef(new Animated.Value(1)).current;
  const opacity = useRef(new Animated.Value(1)).current;

  const handlePressIn = (event: GestureResponderEvent) => {
    scale.stopAnimation();
    opacity.stopAnimation();

    Animated.parallel([
      Animated.timing(scale, {
        toValue: scaleTo,
        duration: scaleInDuration,
        easing: Easing.bezier(0.25, 0.46, 0.45, 0.94), // Custom smooth easing
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 0.85, // Slight opacity change for visual feedback
        duration: scaleInDuration,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
    ]).start();

    if (hapticFeedback && typeof require !== "undefined") {
      try {
        const { HapticFeedback } = require("react-native-haptic-feedback");
        HapticFeedback.trigger("impactLight");
      } catch (error) {}
    }

    onPressIn?.(event);
  };

  const handlePressOut = (event: GestureResponderEvent) => {
    scale.stopAnimation();
    opacity.stopAnimation();

    Animated.parallel([
      Animated.timing(scale, {
        toValue: 1,
        duration: scaleOutDuration,
        easing: Easing.bezier(0.23, 1, 0.32, 1), // Gentle, controlled return
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: scaleOutDuration * 0.7, // Opacity returns smoothly
        easing: Easing.out(Easing.sin), // Gentle sine easing
        useNativeDriver: true,
      }),
    ]).start();

    onPressOut?.(event);
  };

  return (
    <Pressable onPressIn={handlePressIn} onPressOut={handlePressOut} {...rest}>
      <Animated.View
        style={[
          {
            transform: [{ scale }],
            opacity,
          },
          style,
        ]}
      >
        {children}
      </Animated.View>
    </Pressable>
  );
};

export default AnimatedPressable;
