import { Dimensions } from '../constants';
import { Sight, Obstacle } from '../entities';

export function initEntities() {
  const {
    sightHeight,
    sightWidth,
    sceneWidth,
    sceneHeight,
    obstacleHeight,
    obstacleWidth,
  } = Dimensions;

  const count = Math.trunc(sceneWidth / obstacleWidth);
  const space = (sceneWidth - obstacleWidth * (count - 1)) / count;
  const obstacles = {};

  for (let i = 0; i < count - 1; i++) {
    const leftPosition = i * (obstacleWidth + space) + space;
    const topPosition = sceneHeight - (i % 2 == 0 ? 1 : 1.5) * obstacleHeight;

    Object.assign(obstacles, {
      [`obstacle_${i}`]: {
        position: [leftPosition, topPosition],
        height: obstacleHeight,
        width: obstacleWidth,
        renderer: Obstacle,
      },
    });
  }

  return {
    ...obstacles,
    sight: {
      ready: true,
      width: sightWidth,
      height: sightHeight,
      renderer: Sight,
      position: [
        sceneWidth * 0.5 - sightWidth * 0.5,
        sceneHeight * 0.5 - sightHeight * 0.5,
      ],
    },
  };
}
