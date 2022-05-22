import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Entity } from '../types';

type SightEntity = Entity & { ready: boolean };

export function Sight({ position, width, height, ready }: SightEntity) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (ready) {
      setVisible(true);
    } else {
      const interval = setInterval(() => {
        clearInterval(interval);
        setVisible(!visible);
      }, 500);
    }
  }, [ready, visible]);

  return (
    <View
      style={[
        styles.container,
        {
          width,
          height,
          left: position[0],
          top: position[1],
          opacity: ready ? 1 : 0.5,
        },
      ]}
    >
      <View style={styles.leftVerticalLine} />
      <View style={styles.rightVerticalLine} />

      <View style={[styles.horizontalLine, { left: -10, width: width / 4 }]} />
      <View style={[styles.horizontalLine, { right: -10, width: width / 4 }]} />

      <View
        style={{
          top: height / 2,
          position: 'absolute',
          alignSelf: 'center',
          alignItems: 'center',
        }}
      >
        <View
          style={{
            height: 2,
            width: width / 3,
            backgroundColor: '#FAFA33',
          }}
        />

        <View
          style={{
            width: 2,
            height: height / 8,
            backgroundColor: '#FAFA33',
          }}
        />
      </View>
      {visible && (
        <Text style={styles.text}>{ready ? 'ready' : 'loading'}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    zIndex: 20,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  leftVerticalLine: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: -10,
    width: 2,
    backgroundColor: '#FAFA33',
  },
  rightVerticalLine: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: -10,
    width: 2,
    backgroundColor: '#FAFA33',
  },
  horizontalLine: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    borderTopWidth: 2,
    borderBottomWidth: 2,
    borderTopColor: '#FAFA33',
    borderBottomColor: '#FAFA33',
  },
  text: {
    fontSize: 10,
    color: '#FAFA33',
    textAlign: 'center',
    position: 'absolute',
    alignSelf: 'center',
    bottom: -12,
  },
});
