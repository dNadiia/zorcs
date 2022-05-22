import React, { useEffect, useRef } from 'react';
import { View } from 'react-native';
import SpriteSheet from 'rn-sprite-sheet';
import { Images } from '../assets';
import { Entity } from '../types';

export function Explosion({ position, width, height }: Entity) {
  const spriteSheet = useRef<SpriteSheet>(null);

  useEffect(() => {
    spriteSheet.current?.play({ type: 'explosion', fps: 60, loop: false });
  }, []);

  return (
    <View
      style={{
        zIndex: 15,
        width: 2 * width,
        height: 2 * height,
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        left: position[0] - width * 0.5,
        top: position[1] - height * 0.5,
      }}
    >
      <SpriteSheet
        source={Images.Explosion}
        columns={8}
        rows={4}
        ref={spriteSheet}
        animations={{ explosion: Array.from({ length: 33 }, (v, k) => k) }}
        height={2 * height}
        width={2 * width}
        imageStyle={{ margin: -5 }}
      />
    </View>
  );
}
