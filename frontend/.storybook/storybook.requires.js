/* do not change this file, it is auto generated by storybook. */

import {
  configure,
  addDecorator,
  addParameters,
  addArgsEnhancer,
  clearDecorators,
} from '@storybook/react-native';

global.STORIES = [
  {
    titlePrefix: '',
    directory: './.storybook/stories',
    files: '**/*.stories.?(ts|tsx|js|jsx)',
    importPathMatcher:
      '^\\.[\\\\/](?:\\.storybook\\/stories(?:\\/(?!\\.)(?:(?:(?!(?:^|\\/)\\.).)*?)\\/|\\/|$)(?!\\.)(?=.)[^/]*?\\.stories\\.(?:ts|tsx|js|jsx)?)$',
  },
];

import '@storybook/addon-ondevice-controls/register';
import '@storybook/addon-ondevice-actions/register';

import { argsEnhancers } from '@storybook/addon-actions/dist/modern/preset/addArgs';

import { decorators, parameters } from './preview';

if (decorators) {
  if (__DEV__) {
    // stops the warning from showing on every HMR
    require('react-native').LogBox.ignoreLogs([
      '`clearDecorators` is deprecated and will be removed in Storybook 7.0',
    ]);
  }
  // workaround for global decorators getting infinitely applied on HMR, see https://github.com/storybookjs/react-native/issues/185
  clearDecorators();
  decorators.forEach((decorator) => addDecorator(decorator));
}

if (parameters) {
  addParameters(parameters);
}

try {
  argsEnhancers.forEach((enhancer) => addArgsEnhancer(enhancer));
} catch {}

const getStories = () => {
  return {
    './.storybook/stories/Button.stories.js': require('./stories/Button.stories.js'),
    './.storybook/stories/Level.stories.jsx': require('./stories/Level.stories.jsx'),
    './.storybook/stories/LevelCircle.stories.jsx': require('./stories/LevelCircle.stories.jsx'),
    './.storybook/stories/LevelPercent.stories.jsx': require('./stories/LevelPercent.stories.jsx'),
    './.storybook/stories/CoinDisplayer.stories.jsx': require('./stories/CoinDisplayer.stories.jsx'),
    './.storybook/stories/Dashboard.stories.jsx': require('./stories/Dashboard.stories.jsx'),
    './.storybook/stories/WeekProgress.stories.jsx': require('./stories/WeekProgress.stories.jsx'),
  };
};

configure(getStories, module, false);