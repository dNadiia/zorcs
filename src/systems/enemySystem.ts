import { EngineSystemUpdate } from '../types';
import { Dimensions, Events } from '../constants';
import { isCollide, random } from '../utils';
import { Enemy, Explosion, DeadEnemy } from '../entities';

function addExplosion(entities: any, key: string) {
  entities[`dead_${key}`] = {
    position: entities[key].position,
    width: entities[key].width,
    height: entities[key].height,
    renderer: DeadEnemy,
  };
  entities[`explosion_${key}`] = {
    position: entities[key].position,
    width: entities[key].width,
    height: entities[key].height,
    renderer: Explosion,
  };
}

export function enemySystem(entities: any, update: EngineSystemUpdate) {
  const { sceneWidth, sceneHeight, enemyWidth, enemyHeight } = Dimensions;
  const { StartGame, NewEnemy, PressFire, GameOver } = Events;
  const { events, dispatch, touches, time } = update;

  if (events.length) {
    events.forEach((e) => {
      switch (e) {
        case StartGame:
        case NewEnemy:
          entities[`enemy${time.current}`] = {
            position: [random(0, sceneWidth - enemyWidth), -enemyHeight],
            velocity: 2,
            width: enemyWidth,
            height: enemyHeight,
            createAt: time.current,
            renderer: Enemy,
          };
          const timeout = setTimeout(() => {
            clearTimeout(timeout);
            dispatch(NewEnemy);
          }, random(1, 4) * 1000);
          return;
        case PressFire:
          for (const key in entities) {
            if (key.startsWith('enemy')) {
              if (isCollide(entities.sight, entities[key])) {
                entities.sight.ready = false;
                addExplosion(entities, key);
                delete entities[key];

                const timeout1 = setTimeout(() => {
                  clearTimeout(timeout1);
                  delete entities[`dead_${key}`];
                  delete entities[`explosion_${key}`];
                }, 1000);

                const timeout2 = setTimeout(() => {
                  clearTimeout(timeout2);
                  entities.sight.ready = true;
                }, 3000);
                dispatch(Events.EnemyDied);
              }
            }
          }
          return;
        case GameOver:
          for (const key in entities) {
            if (key.startsWith('enemy')) {
              entities[key].velocity = 0;
            }
          }
          break;
      }
    });
  }

  if (touches.length) {
    if (
      update.touches.find((t: any) => t.type === 'press') &&
      entities.sight.ready
    ) {
      dispatch(Events.PressFire);
    }
  }

  for (const key in entities) {
    if (key.startsWith('enemy')) {
      if (entities[key].position[1] <= sceneHeight) {
        entities[key].position[1] += entities[key].velocity;
      } else {
        delete entities[key];
        dispatch(Events.GameOver);
        continue;
      }

      const obstacles = Object.keys(entities).filter((v) =>
        v.startsWith('obstacle'),
      );

      for (const obstacle of obstacles) {
        if (isCollide(entities[obstacle], entities[key])) {
          addExplosion(entities, key);
          delete entities[key];
          delete entities[obstacle];

          const timeout = setTimeout(() => {
            clearTimeout(timeout);
            delete entities[`dead_${key}`];
            delete entities[`explosion_${key}`];
          }, 1000);
          dispatch(Events.EnemyDied);
          break;
        }
      }
    }
  }

  return entities;
}
