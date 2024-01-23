import {Story} from '@storybook/react-native';
import {LevelPercent, Props} from '../components/LevelPercent';

export default {
  title: 'LevelPercent',
  component: LevelPercent,

  args: {
    level: '06',
    percent: 60,
  },

  argTypes: {
    level: {
      control: {type: 'text'},
    },
    percent: {
      control: {type: 'number'},
    },
  },
};

const Template: Story<Props> = args => <LevelPercent {...args} />;

export const Level660: Story<Props> = Template.bind({});
Level660.args = {
  level: '06',
  percent: '60',
};
