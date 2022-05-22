import React from 'react';
import { Image, View } from 'react-native';
import { Entity } from '../types';
import { Images } from '../assets';

export function Enemy({ position, width, height }: Entity) {
  return (
    <View
      style={{
        zIndex: 5,
        position: 'absolute',
        left: position[0],
        top: position[1],
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Image
        style={{
          width,
          height,
        }}
        resizeMode={'stretch'}
        source={Images.Tank}
      />
    </View>
  );
}
