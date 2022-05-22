import React from 'react';
import { Image, View } from 'react-native';
import { Images } from '../assets';
import { Entity } from '../types';

export function Obstacle({ position, width, height }: Entity) {
  return (
    <View
      style={{
        zIndex: 5,
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        left: position[0],
        top: position[1],
      }}
    >
      <Image
        style={{ width, height }}
        resizeMode={'stretch'}
        source={Images.Obstacle}
      />
    </View>
  );
}
