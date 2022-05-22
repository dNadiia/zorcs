import React, { useEffect, useRef, useState } from 'react';
import {
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { GameEngine } from 'react-native-game-engine';
import { Navigation } from 'react-native-navigation';
import { enemySystem, initEntities, sightSystem } from '../systems';
import { getScore, storeScore } from '../utils';
import { SceneComponent } from '../types';
import { Images } from '../assets';
import { Events } from '../constants';

export const GameScene: SceneComponent = ({ componentId }) => {
  const engineRef = useRef<GameEngine>(null);
  const [currentScore, setCurrentSore] = useState(0);
  const [isGameOver, setGameOver] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    engineRef.current?.dispatch(Events.StartGame);
    return () => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      engineRef.current?.dispatch(Events.GameOver);
    };
  }, []);

  const onBackHandler = () => {
    getScore().then((score) => {
      if (currentScore > score) {
        storeScore(currentScore).then();
      }
      Navigation.pop(componentId).then();
    });
  };

  const onEvenHandler = (e: any) => {
    switch (e) {
      case Events.EnemyDied:
        setCurrentSore(currentScore + 1);
        return;
      case Events.GameOver:
        setGameOver(true);
        getScore().then((score) => {
          if (currentScore > score) {
            storeScore(currentScore).then();
          }
          const timeout = setTimeout(() => {
            clearTimeout(timeout);
            Navigation.pop(componentId).then();
          }, 1500);
        });
        return;
    }
  };

  return (
    <View style={styles.canvas}>
      <ImageBackground
        resizeMode={'cover'}
        source={Images.Background}
        style={StyleSheet.absoluteFill}
      />
      <GameEngine
        ref={engineRef}
        entities={initEntities()}
        systems={[sightSystem, enemySystem]}
        onEvent={onEvenHandler}
      />
      <Text style={styles.scoreText}>{`Score: ${currentScore}`}</Text>
      <TouchableOpacity style={styles.backButton} onPress={onBackHandler}>
        <Text style={styles.backButtonText}>{'Back'}</Text>
      </TouchableOpacity>

      {isGameOver && <Text style={styles.gameOverText}>{'Game Over'}</Text>}
    </View>
  );
};

GameScene.options = {
  topBar: { visible: false },
};

const styles = StyleSheet.create({
  canvas: {
    flex: 1,
  },
  scoreText: {
    top: '5%',
    left: '2%',
    fontSize: 20,
    color: '#FAFA33',
    fontWeight: 'bold',
    position: 'absolute',
  },
  backButton: {
    borderWidth: 2,
    borderColor: '#FAFA33',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: '3%',
    left: '3%',
  },
  gameOverText: {
    fontSize: 40,
    color: '#FAFA33',
    textAlign: 'center',
    fontWeight: 'bold',
    padding: 20,
    backgroundColor: '#000',
    position: 'absolute',
    bottom: '15%',
    alignSelf: 'center',
  },
  backButtonText: {
    padding: 16,
    fontSize: 20,
    color: '#FAFA33',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
