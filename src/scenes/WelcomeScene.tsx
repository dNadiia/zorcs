import React, { useEffect, useState } from 'react';
import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { SceneComponent } from '../types';
import { SceneIDs } from '../constants';
import { getScore } from '../utils';

export const WelcomeScene: SceneComponent = ({ componentId }) => {
  const [score, setScore] = useState<number>(0);

  useEffect(() => {
    const listener = Navigation.events().registerComponentDidAppearListener(
      () => getScore().then((res) => setScore(res)),
    );
    return () => listener.remove();
  }, []);

  const startGame = () =>
    Navigation.push(componentId, {
      component: {
        name: SceneIDs.StartGame,
      },
    }).then();

  return (
    <>
      <View style={styles.top}>
        {score > 0 && (
          <Text style={styles.scoreText}>{`Best score: ${score}`}</Text>
        )}
      </View>
      <View style={styles.bottom}>
        <TouchableOpacity onPress={startGame}>
          <Text style={styles.buttonText}>{'Start Game'}</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

WelcomeScene.options = {
  topBar: { visible: false },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  top: {
    flex: 1,
    backgroundColor: '#0057B7',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  bottom: {
    flex: 1,
    backgroundColor: '#FFDD00',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  buttonText: {
    color: '#0057B7',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 30,
    padding: 20,
  },
  scoreText: {
    color: '#FFDD00',
    textAlign: 'center',
    fontSize: 24,
    padding: 20,
  },
});
