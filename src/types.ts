import React from 'react';
import {
  Options,
  NavigationComponentProps as Props,
} from 'react-native-navigation';
import { GameEngineUpdateEventOptionType } from 'react-native-game-engine';

export type SceneComponent<P = unknown> = React.FC<P & Props> & {
  options?: Options;
};

export type Entity = {
  position: number[];
  width: number;
  height: number;
};

export type EngineSystemUpdate = GameEngineUpdateEventOptionType;
