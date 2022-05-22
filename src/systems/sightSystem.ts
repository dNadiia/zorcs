import { EngineSystemUpdate } from '../types';
import { Dimensions } from '../constants';

export function sightSystem(entities: any, update: EngineSystemUpdate) {
  update.touches
    .filter((t) => t.type === 'move')
    .forEach((t) => {
      const { sceneWidth, sceneHeight, sightWidth, sightHeight } = Dimensions;
      let xPos = entities.sight.position[0] + t.delta?.pageX;
      const xPosMax = sceneWidth - sightWidth;
      if (xPos < 10) xPos = 10;
      if (xPos > xPosMax - 10) xPos = xPosMax - 10;

      let yPos = entities.sight.position[1] + t.delta?.pageY;
      const yPosMax = sceneHeight - sightHeight;
      if (yPos < 0) yPos = 0;
      if (yPos > yPosMax) yPos = yPosMax;

      entities.sight.position = [xPos, yPos];
    });

  return entities;
}
