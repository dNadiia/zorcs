import { Navigation } from 'react-native-navigation';
import { LogBox } from 'react-native';
import { SceneIDs } from './constants';

LogBox.ignoreLogs([
  "ViewPropTypes will be removed from React Native. Migrate to ViewPropTypes exported from 'deprecated-react-native-prop-types'",
  'Require cycles are allowed, but can result in uninitialized values. Consider refactoring to remove the need for a cycle.',
]);

export const Scenes = {
  [SceneIDs.Welcome]: () => require('./scenes/WelcomeScene').WelcomeScene,
  [SceneIDs.StartGame]: () => require('./scenes/GameScene').GameScene,
};

(function () {
  Object.keys(Scenes).forEach((screenId) => {
    Navigation.registerComponent(
      screenId,
      Scenes[screenId as keyof typeof Scenes],
    );
  });
})();

Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setRoot({
    root: {
      stack: {
        children: [
          {
            component: {
              name: SceneIDs.Welcome,
            },
          },
        ],
      },
    },
  }).then();
});
