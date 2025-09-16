import React, { useEffect, useRef } from "react";
import { Animated, Easing, StyleProp, ViewStyle } from "react-native";

type FadeInViewProps = {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  duration?: number; // Animation duration in ms
  delay?: number; // Delay before animation starts
  initialOpacity?: number; // Starting opacity (default: 0)
  finalOpacity?: number; // Ending opacity (default: 1)
  translateY?: number; // Optional slide up effect (default: 20)
  staggerDelay?: number; // For staggered animations when used in lists
  index?: number; // Index for staggered animations
};

const FadeInView = ({
  children,
  style,
  duration = 800,
  delay = 0,
  initialOpacity = 0,
  finalOpacity = 1,
  translateY = 20,
  staggerDelay = 100,
  index = 0,
  ...rest
}: FadeInViewProps) => {
  const opacity = useRef(new Animated.Value(initialOpacity)).current;
  const translateYValue = useRef(new Animated.Value(translateY)).current;
  const scale = useRef(new Animated.Value(0.95)).current; // Slight scale for extra smoothness

  useEffect(() => {
    const totalDelay = delay + index * staggerDelay;

    // Start the fade-in animation after delay
    const timer = setTimeout(() => {
      Animated.parallel([
        // Opacity animation
        Animated.timing(opacity, {
          toValue: finalOpacity,
          duration: duration,
          easing: Easing.bezier(0.25, 0.1, 0.25, 1), // Smooth ease-out
          useNativeDriver: true,
        }),
        // Slide up animation
        Animated.timing(translateYValue, {
          toValue: 0,
          duration: duration,
          easing: Easing.bezier(0.25, 0.1, 0.25, 1),
          useNativeDriver: true,
        }),
        // Scale animation for subtle zoom-in effect
        Animated.timing(scale, {
          toValue: 1,
          duration: duration,
          easing: Easing.bezier(0.25, 0.1, 0.25, 1),
          useNativeDriver: true,
        }),
      ]).start();
    }, totalDelay);

    return () => clearTimeout(timer);
  }, [
    opacity,
    translateYValue,
    scale,
    duration,
    delay,
    finalOpacity,
    index,
    staggerDelay,
  ]);

  return (
    <Animated.View
      style={[
        {
          opacity,
          transform: [{ translateY: translateYValue }, { scale }],
        },
        style,
      ]}
      {...rest}
    >
      {children}
    </Animated.View>
  );
};

export default FadeInView;
