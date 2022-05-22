import { Dimensions as ScreenDimensions } from 'react-native';

export const Dimensions = {
  sceneWidth: ScreenDimensions.get('screen').width,
  sceneHeight: ScreenDimensions.get('screen').height,

  enemyWidth: 70,
  enemyHeight: 90,

  sightWidth: 60,
  sightHeight: 80,

  obstacleHeight: 50,
  obstacleWidth: 60,
};

export const Events = {
  StartGame: 'start_game',
  NewEnemy: 'new_enemy',
  EnemyDied: 'enemy_died',
  GameOver: 'game_over',
  PressFire: 'press_fire',
} as const;

export const SceneIDs = {
  Welcome: 'Welcome',
  StartGame: 'StartGame',
} as const;
