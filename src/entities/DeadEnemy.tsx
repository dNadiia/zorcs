import React, { useEffect, useRef, useState } from 'react';
import { Animated, Easing, Image, View } from 'react-native';
import { Images } from '../assets';
import { Entity } from '../types';

export function DeadEnemy({ position, width, height }: Entity) {
  const [spinValue] = useState(new Animated.Value(0));
  const [scaleValue] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.parallel([
      Animated.loop(
        Animated.timing(spinValue, {
          toValue: 1,
          duration: 600,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ),
      Animated.timing(scaleValue, {
        toValue: 1,
        duration: 600,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const scale = scaleValue.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0],
  });

  return (
    <Animated.View
      style={{
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 5,
        left: position[0],
        top: position[1],
        transform: [{ rotate: spin }, { scale }],
      }}
    >
      <Image
        style={{ width, height }}
        resizeMode={'stretch'}
        source={Images.Tank}
      />
    </Animated.View>
  );
}
